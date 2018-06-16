<script>
  import CreateRoleModal from '../src/com/Modal/CreateRole.vue';

  export default {
    components: {
      CreateRoleModal
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
        isShowCreateRoleModal: false,
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
      removeRole(id) {
        this.$confirm('Вы действительно хотите удалить роль?', {
          title: 'Удаление роли',
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
          type: 'error'
        }).then(async () => {
          await this.api.delete('deleteRoleUsingDELETE', { id });
          this.roles = this.roles.filter(role => role.id !== id);
        });
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
                v-loading="isRolesLoading"
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
                        <el-button v-if="scope.row.editable && access.canRemoveRole" size="mini" type="danger" @click="removeRole(scope.row.id)">Удалить</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <create-role-modal v-model="isShowCreateRoleModal" @save="loadRoles"/>
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