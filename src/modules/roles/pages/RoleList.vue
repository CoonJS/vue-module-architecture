<script>
  import CreateRoleModal from '../src/com/Modal/CreateRole.vue';
  import RemoveRoleModal from '../src/com/Modal/RemoveRole.vue';

  export default {
    components: {
      CreateRoleModal,
      RemoveRoleModal
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
      /** @type {Role}*/
      this.roleService = this.$locator.Role;
    },
    mounted() {
      this.loadRoles();
    },
    data () {
      return {
        roles: [],
        removingRoleId: null,
        isShowCreateRoleModal: false,
        isShowRemoveRoleModal: false,
        isRolesLoading: false,
        columns: this.roleService.getTableColumns(),
        access: {
          canCreateRole: this.api.hasAccess('ADD_ROLES'),
          canRemoveRole: this.api.hasAccess('REMOVE_ROLES')
        }
      };
    },
    methods: {
      async loadRoles() {
        this.isRolesLoading = true;
        const { data: roles } = await this.api.get('rolesUsingGET');
        this.roles = roles;
        this.isRolesLoading = false;
      },
      handleRemoveRole(roleId) {
        this.removingRoleId = null;
        this.roles = this.roles.filter(role => role.id !== roleId);
        this.closeRemoveRoleModal();
      },
      showRemoveRoleModal(roleId) {
        this.removingRoleId = roleId;
        this.isShowRemoveRoleModal = true;
      },
      closeRemoveRoleModal() {
        this.removingRoleId = null;
        this.isShowRemoveRoleModal = false;
      },
      showCreateRoleModal() {
        this.isShowCreateRoleModal = true;
      },
      closeCreateRoleModal() {
        this.isShowCreateRoleModal = false;
      }
    }
  }
</script>

<template>
    <page-container>
        <div slot="header" class="header">
            <h3>Роли</h3>
            <el-button v-if="access.canCreateRole" type="success" @click="showCreateRoleModal">Новая роль</el-button>
        </div>
        <div class="users">
            <el-table
                border
                :data="roles"
                style="width: 100%"
                v-loading.body="isRolesLoading"
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
                    prop="name"
                    label="Название"
                    :width="300"
                >
                    <template slot-scope="scope">
                        <ui-link :to="`/roles/${scope.row.id}`">{{scope.row.name}}</ui-link>
                    </template>
                </el-table-column>
                <el-table-column label="Действия">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.editable && access.canRemoveRole" size="mini" type="danger" @click="showRemoveRoleModal(scope.row.id)">Удалить</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <create-role-modal
            v-model="isShowCreateRoleModal"
            @save="loadRoles"
        />
        <remove-role-modal
            v-model="isShowRemoveRoleModal"
            :roleId="removingRoleId"
            :roles="roles"
            @remove="handleRemoveRole"
        />
    </page-container>
</template>

<style scoped>
    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>