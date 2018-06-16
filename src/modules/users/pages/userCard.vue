<script>
  export default {
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    mounted() {
      this.loadUser();
    },
    data () {
      return {
        user: null,
        isUserLoading: false,
        userId: this.$route.params.userId,
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
        this.isUserLoading = true;
        try {
          const { data: user } = await this.api.get('userUsingGET', { id: this.userId });
          const { data: role } = await this.api.get('roleUsingGET', { id: user.roleId });
          this.user = {...user, role };
        } catch(e) {
          this.isUserLoading = false;
          throw e;
        }
        this.isUserLoading = false;
      },
    }
  }
</script>

<template>
    <page-container flexContent center v-loading.body="isUserLoading">
        <div slot="header" class="header">
            <h3 v-if="hasUser">{{user.firstName + ' ' + user.lastName}}</h3>
        </div>
        <div class="user-card" v-if="hasUser">
            <ui-model-view-card :model="user" :groups="groups" titleWidth="100px"/>
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

    .user-card {
        padding: 16px;
        background-color: #eee;
        border: 1px solid rgba(0,0,0, .1);
        width: 900px;
    }
</style>