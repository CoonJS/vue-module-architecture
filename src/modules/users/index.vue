<script>
  export default {
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    mounted() {
      this.loadUsers();
      this.loadRoles();
    },
    data () {
      return {
        users: [],
        roles: [],
        roleId: null,
        email: '',
        isUsersLoading: false,
        isShowModal: false,
        isInviting: false,

        access: {
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
            key: 'username',
            name: 'Логин',
            width: 250,
            align: 'left'
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
          },
          {
            key: 'roleId',
            name: 'Роль',
            width: 180
          }
        ]
      }
    },
    watch: {
      isShowModal(val) {
        if (val === true) {
          this.focusInput();
        }
      }
    },
    methods: {
      async loadUsers() {
        this.isUsersLoading = true;
        const { data: users } = await this.api.get('accountUsersUsingGET');
        this.users = users;
        this.isUsersLoading = false;
      },
      async loadRoles() {
        const { data: roles } = await this.api.get('rolesUsingGET');
        this.roles = roles.filter(role => role.editable);
        this.selectDefaultRole();
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
      async deleteUserById(id) {
        await this.api.delete('deleteUserUsingDELETE', { id });
        this.loadUsers();
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
      }
    }
  }
</script>

<template>
    <page-container>
        <div slot="header" class="header">
            <h3>Пользователи</h3>
            <el-button v-if="access.canInviteUsers" type="success" @click="showInviteModal">Пригласить</el-button>
        </div>

        <el-dialog :visible.sync="isShowModal" title="Пригласить пользователя" width="400px">
            <div class="field">
                <div class="title">Роль</div>
                <el-select v-model="roleId">
                    <el-option
                        v-for="role in roles"
                        :key="role.id"
                        :label="role.name"
                        :value="role.id">
                    </el-option>
                </el-select>
            </div>
            <div class="field">
                <div class="title">Email</div>
                <el-input
                    ref="emailInput"
                    v-model="email"
                    placeholder="Email"
                    :disabled="isInviting"
                    @keydown.native.enter="inviteUser"
                />
            </div>
            <div slot="footer">
                <el-button type="success" @click="inviteUser" :loading="isInviting">Пригласить</el-button>
                <el-button @click="closeInviteModal">Отмена</el-button>
            </div>
        </el-dialog>

        <div class="users">
            <el-table
                border
                :data="users"
                style="width: 100%"
                v-loading="isUsersLoading"
            >
                <el-table-column
                    v-for="column in columns"
                    :key="column.key"
                    :prop="column.key"
                    :label="column.name"
                    :width="column.width"
                    :align="column.align"
                />
                <el-table-column label="Действия">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteUserById(scope.row.id)">Удалить</el-button>
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