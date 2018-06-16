<script>
  export default {
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    mounted() {
      if (this.access.canViewRoles) {
        this.loadRole();
      }
    },
    data () {
      return {
        role: null,
        isRemoving: false,
        isLoading: false,
        roleId: this.$route.params.roleId,
        access: {
          canViewRoles: this.api.hasAccess('VIEW_ROLES'),
          canRemoveRoles: this.api.hasAccess('REMOVE_ROLES')
        }
      }
    },
    computed: {
      hasRole() {
        return this.role !== null;
      }
    },
    methods: {
      async loadRole() {
        this.isLoading = true;
        try {
          const { data: role } = await this.api.get('roleUsingGET', { id: this.roleId });
          this.role = role;
        } catch(e) {
          this.isLoading = false;
          throw e;
        }

        this.isLoading = false;
      },
      async deleteRole() {
        this.isRemoving = true;

        try {
          await this.api.delete('deleteRoleUsingDELETE', { id: this.roleId });
        } catch(e) {
          this.isRemoving = false;
        }

        this.isRemoving = false;
        this.redirectToRolesPage();
      },
      showConfirmModal() {
        this.$confirm('Вы действительно хотите удалить роль?', {
          title: 'Удаление роли',
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
          type: 'error'
        }).then(() => {
          this.deleteRole();
        });
      },
      redirectToRolesPage() {
        this.$router.push('/roles');
      }
    }
  }
</script>

<template>
    <page-container flexContent center v-loading.body="isRoleLoading" v-if="access.canViewRoles">
        <div slot="header" class="header">
            <template v-if="hasRole">
                <h3>{{role.name}}</h3>
                <el-button
                    v-if="access.canRemoveRoles"
                    size="medium"
                    type="danger"
                    icon="el-icon-delete"
                    :loading="isRemoving"
                    @click="showConfirmModal"
                >
                    Удалить
                </el-button>
            </template>
        </div>
        <div class="role-card" v-if="hasRole">
            <!--<ui-model-view-card :model="user" :groups="groups" titleWidth="100px"/>-->
        </div>
    </page-container>
    <access-denied v-else/>
</template>

<style scoped>
    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .role-card {
        padding: 16px;
        background-color: #fdfdfd;
        border: 1px solid rgba(0,0,0, .1);
        width: 900px;
    }
</style>