<template>
    <div class="app">
        <div class="menu" v-if="isShowMenu">
            <div class="pages">
                <router-link
                    v-for="item in menuItems"
                    :key="item.key"
                    :to="item.link"
                >
                    <div class="menu-item">
                        {{item.title}}
                    </div>
                </router-link>
            </div>
            <div class="actions">
                <div class="menu-item" @click="logout">Выйти</div>
            </div>
        </div>
        <div class="page">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  export default {
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
            key: 'home',
            title: 'Salestat',
            link: '/'
          },
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
    .app {
        height: 100vh;
    }

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

    a {
        display: flex;
        height: 100%;
        color: #fff;
        text-decoration: none;
    }
    .menu-item {
        cursor: pointer;
        background-color: rgba(51, 51, 51, 1);
        padding: 12px;
        color: #fff;
    }
    .menu-item:hover {
        background-color: rgba(210, 210, 210, .1);
    }
</style>