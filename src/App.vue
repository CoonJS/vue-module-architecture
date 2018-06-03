<script>
  export default {
    created() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
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
        loading: false,
        feedbackType: 'POSITIVE',
        feedbackComment: '',
        isUserLoaded: false,
        isShowMenu: true,
        isShowSidebar: false,
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
        const response = await this.api.get('currentUserUsingGET');
        this.user = response ? response.data : null;
        this.isUserLoaded = true;
      },
      async sendFeedBack() {
        this.loading = true;
        try {
          await this.api.post('createFeedbackUsingPOST', {}, {
            type: this.feedbackType,
            text: this.feedbackComment
          });
        } catch(e) {
          throw e;
        }

        this.loading = false;
        this.closeSidebar();
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
      },
      showSidebar() {
        this.isShowSidebar = true;
      },
      closeSidebar() {
        this.isShowSidebar = false;
      },
      toggleSidebar() {
        this.isShowSidebar = !this.isShowSidebar;
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
            <menu-item-feedback slot="right" @click="toggleSidebar"/>
            <menu-item-icon icon="goods" slot="right" link="/marketplace"/>
            <menu-item-dropdown slot="right">
                <div class="user-info">
                    <div>{{userInfo}}</div>
                    <div class="login">{{userLogin}}</div>
                </div>
            </menu-item-dropdown>
        </nav-layout>
        <root-container v-if="isUserLoaded">
            <router-view></router-view>
        </root-container>



        <sidebar v-model="isShowSidebar">
            <div>
                <h4>Оставьте свой фидбэк</h4>
                <div class="feedback-form">
                    <div class="field">
                        <div class="text-hint">Ваш отзыв о нашей системе:</div>
                        <el-radio-group size="small" v-model="feedbackType">
                            <el-radio-button label="POSITIVE">Позитивный</el-radio-button>
                            <el-radio-button label="NEUTRAL">Нейтральный</el-radio-button>
                            <el-radio-button label="NEGATIVE">Негативный</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="field">
                        <div class="text-hint">Комментарий:</div>
                        <el-input type="textarea" v-model="feedbackComment"></el-input>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <el-button :loading="loading" type="success" @click="sendFeedBack">Отправить</el-button>
                <el-button @click="closeSidebar">Отмена</el-button>
            </div>
        </sidebar>



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

    .settings-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .settings-title {
        color: #000;
        margin-left: 16px;
    }

    .left-side {
        display: flex;
        align-items: center;
    }

    .feedback-form {
        margin-top: 32px;
    }

    .field {
        margin-top: 16px;
    }

    .text-hint {
        padding: 8px 0;
        font-size: 14px;
        color: #999;
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