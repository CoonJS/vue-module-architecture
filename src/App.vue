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
            <menu-item-action slot="right" @click="logout">
                Выйти
            </menu-item-action>
        </nav-layout>
        <page-container>
            <router-view></router-view>
        </page-container>
    </page-layout>
</template>

<script>
    import PageLayout from './com/Layout/Page.vue';
    import NavLayout from './com/Layout/Nav.vue';
    import PageContainer from './com/Container/Page.vue';
    import MenuItemLink from './com/Menu/Item/Link.vue';
    import MenuItemLogo from './com/Menu/Item/Logo.vue';
    import MenuItemAction from './com/Menu/Item/Action.vue';

  export default {
    components: {
      PageLayout,
      NavLayout,
      MenuItemLink,
      MenuItemLogo,
      MenuItemAction,
      PageContainer
    },
    mounted() {
      this.$locator.Api.get('/api/me');

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
    methods: {
      async logout() {
        const response = await this.$locator.Api.get('/logout');
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