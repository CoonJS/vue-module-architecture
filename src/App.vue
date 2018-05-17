<script>
  export default {
    mounted() {
      this.loadUser();
      this.$locator.Api.onLogout(() => {
        this.isShowMenu = false;
        this.redirectToLoginPage();
      });

      this.$locator.Api.onLogin(() => {
        this.loadUser();
        this.isShowMenu = true;
        this.redirectToHomePage();
      });
    },
    data() {
      return {
        user: null,
        isUserLoaded: false,
        isShowMenu: true,
        menuItems: [
          {
            key:'dashboards',
            title: 'Дашборды',
            link: '/'
          },
          {
            key:'managers',
            title: 'Менеджеры',
            link: '/managers'
          },
          {
            key:'wiki',
            title: 'Wiki',
            link: '/wiki'
          },
        ]
      };
    },
    computed: {
      hasUser() {
        return this.user != null;
      },
      userInfo() {
        const user = this.user || null;
        return user !== null ? `${user.lastName} ${user.firstName}` : '';
      }
    },
    methods: {
      async loadUser() {
        this.isUserLoaded = false;
        const { data } = await this.$locator.Api.get('currentUserUsingGET');
        this.user = data;
        this.isUserLoaded = true;
      },
      redirectToLoginPage() {
        const isAuthPage = this.$route.name === 'AuthPage';
        if (isAuthPage) {
          return;
        }
        this.$router.push('auth');
      },
      redirectToHomePage() {
        const isRootPage = this.$route.name === 'Root';
        if (isRootPage) {
          return;
        }
        this.$router.push('/');
      }
    }
  }
</script>

<template>
    <page-layout>
        <nav-layout v-if="isShowMenu">
            <menu-item-logo slot="left"/>
            <menu-item-link
                    slot="left"
                    v-for="item in menuItems"
                    :key="item.key"
                    :link="item.link"
            >
                {{item.title}}
            </menu-item-link>
            <menu-item-icon icon="goods" slot="right" link="/marketplace"/>
            <menu-item-icon icon="bell" slot="right" link="/notifications"/>
            <menu-item-dropdown slot="right">{{userInfo}}</menu-item-dropdown>
        </nav-layout>
        <root-container>
            <router-view></router-view>
        </root-container>
    </page-layout>
</template>

<style scoped>

    .menu {
        height: 40px;
        padding: 0 16px;
        background-color: #2a3a4d;
        display: flex;
        justify-content: space-between;
    }

    .page {
        height: 100%;
        padding: 16px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }

    .pages {
        display: flex;
    }

    .actions {
        display: flex;
    }

</style>