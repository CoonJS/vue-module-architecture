<script>
export default {
  data() {
    return {
      user: null,
      isShowMenu: true,
      isShowSidebar: false,
      isUserLoading: false,
      isUserLoaded: false,
      menuItems: []
    };
  },
  computed: {
    hasUser() {
      return this.user !== null;
    },
    userInfo() {
      const user = this.user || null;
      return user !== null ? `${user.firstName} ${user.lastName}` : '';
    },
    userInitials() {
      const user = this.user || null;
      return user !== null ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : '';
    },
    userLogin() {
      const user = this.user || null;
      return user !== null ? `${user.username}` : '';
    },
    visibleMenuItems() {
      return this.menuItems.filter(item => item.hasAccess);
    }
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  async mounted() {
    this.loadUser();

    this.api.onLogout(() => {
      this.isShowMenu = false;
      this.redirectToLoginPage();
    });

    this.api.onError((msg) => {
      this.$notify.error({
        title: 'Ошибка',
        message: msg
      });
    });

    this.api.onLogin(() => {
      this.loadUser();
      this.isShowMenu = true;
      this.redirectToHomePage();
    });
  },
  methods: {
    async loadUser() {
      this.isUserLoaded = false;
      this.isUserLoading = true;
      this.user = await this.api.loadUser();
      this.isUserLoading = false;
      this.isUserLoaded = true;

      this.initMenuItems();
    },
    initMenuItems() {
      this.menuItems = [
        {
          key:'reports',
          title: 'Отчеты',
          link: '/',
          hasAccess: this.api.hasAccess('VIEW_REPORTS')
        },
        {
          key:'wiki',
          title: 'База знаний',
          link: '/wiki',
          hasAccess: this.api.hasAccess('VIEW_WIKI')
        },
        {
          key:'testing',
          title: 'Тесты',
          link: '/testing',
          hasAccess: this.api.hasAccess('TESTS_USER') || this.api.hasAccess('TESTS_ADMIN')
        },
        {
          key:'education',
          title: 'Обучение',
          link: '/courses',
          hasAccess: true
        }
      ];
    },
    redirectToLoginPage() {
      const isAuthPage = this.$route.name === 'AuthPage';
      const isRegisterAccountPage = this.$route.name === 'AccountRegistration';
      const isUserRegistrationPage = this.$route.name === 'UserRegistration';
      const isChangePasswordChange = this.$route.name === 'ChangePassword';

      if (isAuthPage || isRegisterAccountPage || isUserRegistrationPage || isChangePasswordChange) {
        return;
      }

      this.$router.push('/auth');
    },
    redirectToHomePage() {
      const isRootPage = this.$route.name === 'Root';
      if (isRootPage) {
        return;
      }

      this.$router.push('/');
    }
  }
};
</script>

<template>
  <page-layout v-if="isUserLoaded">
    <nav-layout v-if="hasUser && isShowMenu">
      <menu-item-logo slot="left" />
      <menu-item-link
        v-for="item in visibleMenuItems"
        slot="left"
        :key="item.key"
        :link="item.link"
      >
        {{ item.title }}
      </menu-item-link>
      <menu-item-feedback slot="right" />
      <menu-item-notifications slot="right" />
      <menu-item-icon 
        slot="right" 
        icon="goods" 
        link="/marketplace"
      />
      <menu-item-dropdown 
        slot="right" 
        :title="userInitials"
      >
        <div class="user-info">
          <div>{{ userInfo }}</div>
          <div class="login">{{ userLogin }}</div>
        </div>
      </menu-item-dropdown>
    </nav-layout>
    <root-container>
      <router-view />
    </root-container>
  </page-layout>
</template>

<style scoped>
    .user-info {
        display: flex;
        flex-direction: column;
    }

    .login {
        display: flex;
        justify-content: flex-end;
        font-size: 10px;
        color: rgba(255,255,255, .7);
    }
</style>