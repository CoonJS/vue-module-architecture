<script>
  export default {
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    mounted() {
      if (this.access.canViewUsers) {
        this.loadUser();
      }
    },
    data () {
      return {
        user: null,
        isRemoving: false,
        isLoading: false,
        userId: this.$route.params.userId,
        access: {
          canViewUsers: this.api.hasAccess('VIEW_USERS'),
          canRemoveUsers: this.api.hasAccess('REMOVE_USERS')
        },
        groups: [
          {
            id: 'common',
            title: 'Персональные данные',
            fields: [
              {
                key: 'firstName',
                title: 'Имя:'
              },
              {
                key: 'lastName',
                title: 'Фамилия:'
              },
              {
                key: 'username',
                title: 'Логин:'
              }
            ]
          },
          {
            id: 'contacts',
            title: 'Контакты',
            fields: [
              {
                key: 'email',
                title: 'Почта:'
              },
            ]
          }
        ]
      }
    },
    computed: {
      hasUser() {
        return this.user !== null;
      }
    },
    methods: {
      async loadUser() {
        this.isLoading = true;
        try {
          const { data: user } = await this.api.get('userUsingGET', { id: this.userId });
          const { data: role } = await this.api.get('roleUsingGET', { id: user.roleId });
          this.user = {...user, role };
        } catch(e) {
          this.isLoading = false;
          throw e;
        }
        this.isLoading = false;
      },
      async deleteUser() {
        this.isRemoving = true;

        try {
          await this.api.delete('deleteUserUsingDELETE', { id: this.userId });
        } catch(e) {
          this.isRemoving = false;
        }

        this.isRemoving = false;
        this.redirectToUsersPage();
      },
      showConfirmModal() {
        this.$confirm('Вы действительно хотите удалить пользователя?', {
          title: 'Удаление пользователя',
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
          type: 'error'
        }).then(() => {
          this.deleteUser();
        });
      },
      redirectToUsersPage() {
        this.$router.push('/users');
      }
    }
  }
</script>

<template>
    <page-container flexContent center v-loading.body="isLoading" v-if="access.canViewUsers">
        <div slot="header" class="header">
            <template v-if="hasUser">
                <h3>{{user.firstName + ' ' + user.lastName}}</h3>
                <el-button
                    v-if="access.canRemoveUsers"
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
        <div class="user-card" v-if="hasUser">
            <ui-model-view-card :model="user" :groups="groups" titleWidth="100px"/>
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

    .user-card {
        padding: 16px;
        overflow: auto;
        background-color: #fdfdfd;
        border: 1px solid rgba(0,0,0, .1);
        width: 900px;
    }
</style>