<template>
    <page-layout>
        <nav-layout v-if="isUserLoaded">
            <menu-item-logo slot="left"/>
            <menu-item-link
                slot="left"
                v-for="item in menuItems"
                :key="item.key"
                :link="item.link"
            >
                {{item.title}}
            </menu-item-link>
            <user-menu-item
                v-if="hasUser"
                slot="right"
            >
                {{ userInfo }}
            </user-menu-item>
            <menu-item-action slot="right" @click="logout">
                Выйти
            </menu-item-action>
        </nav-layout>
        <root-container>
            <router-view></router-view>
        </root-container>
    </page-layout>
</template>

<script>
    import PageLayout from './com/Layout/Page.vue';
    import NavLayout from './com/Layout/Nav.vue';
    import RootContainer from './com/Container/Root.vue';
    import MenuItemLink from './com/Menu/Item/Link.vue';
    import MenuItemLogo from './com/Menu/Item/Logo.vue';
    import UserMenuItem from './com/Menu/Item/User.vue';
    import MenuItemAction from './com/Menu/Item/Action.vue';

  export default {
    components: {
      PageLayout,
      NavLayout,
      MenuItemLink,
      MenuItemLogo,
      UserMenuItem,
      MenuItemAction,
      RootContainer
    },
    mounted() {
      this.loadUser();

      this.$locator.Api.onLogout(() => {
        this.isShowMenu = false;
        this.redirectToLoginPage();
      });

      this.$locator.Api.onLogin(() => {
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
            title: 'Отчеты',
            link: '/managers'
          }
        ]
      };
    },
    computed: {
      hasUser() {
        return this.user !== null;
      },
      userInfo() {
        const user = this.user;
        return this.hasUser ? `${user.lastName} ${user.firstName}` : ''
      }
    },
    methods: {
      async logout() {
        const response = await this.$locator.Api.get('/logout');
      },
      async loadUser() {
        this.isUserLoaded = false;
        this.user = await this.$locator.Api.get('/api/users/me');
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

<style scoped>

    .menu {
        height: 40px;
        padding: 0 16px;
        background-color: #333;
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