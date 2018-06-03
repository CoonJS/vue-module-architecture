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
          {
            key:'testing',
            title: 'Тесты',
            link: '/testing'
          },
        ]
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
      userLogin() {
        const user = this.user || null;
        return user !== null ? `${user.username}` : '';
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
  }
</script>

<template>
    <page-layout>
        <nav-layout v-if="hasUser && isShowMenu">
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
            <!--<menu-item-icon icon="bell" slot="right" link="/notifications"/>-->
            <menu-item-dropdown slot="right">
                <div class="user-info">
                    <div>{{userInfo}}</div>
                    <div class="login">{{userLogin}}</div>
                </div>
            </menu-item-dropdown>
        </nav-layout>
        <root-container v-if="hasUser">
            <router-view></router-view>
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

    /*BGC ANIMATION*/
    /*-webkit-animation: card-plug-loader 1.5s infinite;*/
    /*animation: card-plug-loader 1.5s infinite;*/
    /*-webkit-animation-timing-function: linear;*/
    /*animation-timing-function: linear;*/
    /*-webkit-animation-fill-mode: forwards;*/
    /*animation-fill-mode: forwards;*/
    /*background: -webkit-linear-gradient(left,#eaeaea 8%,#e4e3e3 18%,#eaeaea 33%);*/
    /*background: linear-gradient(to right,#eaeaea 8%,#e4e3e3 18%,#eaeaea 33%);*/
</style>