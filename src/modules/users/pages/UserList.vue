<script>
export default {
  data () {
    return {
      users: [],
      roles: [],
      roleId: null,
      email: '',
      isUsersLoading: false,
      isShowModal: false,
      isInviting: false,
      currentUser: this.api.getCurrentUser(),
      access: {
        canEditUsers: this.api.hasAccess('EDIT_USERS'),
        canRemoveUsers: this.api.hasAccess('REMOVE_USERS'),
        canInviteUsers: this.api.hasAccess('INVITE_USERS')
      },
      columns: [
        {
          key: 'id',
          name: 'ID',
          width: 50,
          align: 'center'
        },
        {
          key: 'firstName',
          name: 'Имя',
          width: 180
        },
        {
          key: 'lastName',
          name: 'Фамилия',
          width: 180
        },
        {
          key: 'email',
          name: 'Почта',
          width: 180
        }
      ]
    };
  },
  watch: {
    isShowModal(val) {
      if (val === true) {
        this.focusInput();
      }
    }
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      this.isUsersLoading = true;
      try {
        const { data: users } = await this.api.get('accountUsersUsingGET');
        this.users = users;
        await this.loadRoles();
      } catch(e) {
        this.isUsersLoading = false;
        throw e;
      }

      this.isUsersLoading = false;
    },
    async loadRoles() {
      const { data: roles } = await this.api.get('rolesUsingGET');
      this.roles = roles.filter(role => role.editable);
      this.selectDefaultRole();
    },
    async deleteUserById(id) {
      await this.api.delete('deleteUserUsingDELETE', { id });
      this.loadUsers();
    },
    async inviteUser() {
      this.isInviting = true;
      try {
        const email = this.email;
        const roleId = this.roleId;
        await this.api.post('createUserRegistrationRequestUsingPOST', {}, { email, roleId });
        this.closeInviteModal();
      } catch(e) {
        throw e;
      }

      this.isInviting = false;
    },
    async handleSelectChange(newRoleId, user) {
      const userId = user.id;

      await this.api.put('updatedUserUsingPUT', { id: userId }, { roleId: newRoleId });

      this.loadUsers();
    },
    showConfirmModal(user) {
      this.$confirm(`Вы действительно хотите удалить пользователя ${user.firstName} ${user.lastName}?`, {
        title: 'Удаление пользователя',
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'error'
      }).then(() => {
        this.deleteUserById(user.id);
      });
    },
    getRoleTitleById(roleId) {
      const role = this.roles.find(role => role.id === roleId);

      return role ? role.name : '';
    },
    selectDefaultRole() {
      const roles = this.roles;
      this.roleId = roles.length > 0 ? roles[0].id : null;
    },
    focusInput() {
      this.$nextTick(() => {
        this.$refs.emailInput.$el.querySelector('input').focus();
      });
    },
    showInviteModal() {
      this.isShowModal = true;
    },
    closeInviteModal() {
      this.isShowModal = false;
    },
    copy(obj) {
      return { ...obj };
    }
  }
};
</script>

<template>
  <page-container>
    <div 
      slot="header" 
      class="header"
    >
      <h3>Пользователи</h3>
      <el-button 
        v-if="access.canInviteUsers" 
        type="success" 
        @click="showInviteModal"
      >
        Пригласить
      </el-button>
    </div>

    <el-dialog 
      :visible.sync="isShowModal" 
      title="Пригласить пользователя" 
      width="400px"
    >
      <div class="field">
        <div class="title">Роль</div>
        <el-select v-model="roleId">
          <el-option
            v-for="role in roles"
            :key="role.id"
            :label="role.name"
            :value="role.id"
          />
        </el-select>
      </div>
      <div class="field">
        <div class="title">Email</div>
        <el-input
          ref="emailInput"
          v-model="email"
          :disabled="isInviting"
          placeholder="Email"
          @keydown.native.enter="inviteUser"
        />
      </div>
      <div slot="footer">
        <el-button 
          :loading="isInviting" 
          type="success" 
          @click="inviteUser"
        >
          Пригласить
        </el-button>
        <el-button @click="closeInviteModal">Отмена</el-button>
      </div>
    </el-dialog>

    <div class="users">
      <el-table
        v-loading.body="isUsersLoading"
        :data="users"
        border
        style="width: 100%"
      >
        <el-table-column
          v-for="column in columns"
          :key="column.key"
          :prop="column.key"
          :label="column.name"
          :width="column.width"
          :align="column.align"
        />

        <el-table-column
          :width="250"
          label="Логин"
          align="left"
        >
          <template slot-scope="scope">
            <ui-link :to="`/users/${scope.row.id}`">{{ scope.row.username }}</ui-link>
          </template>
        </el-table-column>

        <el-table-column label="Роль">
          <template slot-scope="scope">
            <el-select 
              v-if="scope.row.owner === false && access.canEditUsers && scope.row.id !== currentUser.id" 
              :value="scope.row.roleId" 
              @change="handleSelectChange($event, scope.row)"
            >
              <el-option
                v-for="role in roles"
                :key="role.id"
                :label="role.name"
                :value="copy(role).id"
              />
            </el-select>
            <el-tag v-else-if="scope.row.owner !== true">
              {{ getRoleTitleById(scope.row.roleId) }}
            </el-tag>
            <el-tag 
              v-if="scope.row.owner === true" 
              type="danger"
            >
              Владелец проекта
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Действия">
          <template 
            v-if="scope.row.owner === false && scope.row.id !== currentUser.id" 
            slot-scope="scope"
          >
            <el-button 
              v-if="access.canRemoveUsers" 
              size="mini" 
              type="danger" 
              @click="showConfirmModal(scope.row)"
            >
              Удалить
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </page-container>
</template>

<style scoped>
    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .field {
        margin: 8px 0;
    }

    .field:first-child {
        margin-top: 0;
    }

    .field .title {
        font-size: 12px;
        margin-bottom: 8px;
    }

    .el-select {
        width: 100%;
    }
</style>