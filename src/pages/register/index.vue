<template>
    <page-container style="display: flex; align-items: center">
        <div class="form-wrapper">
            <div class="register-form">
                <div class="title">
                    <h1>Регистрация</h1>
                </div>
                <div class="field">
                    <el-input type="text" placeholder="Имя" v-model="firstName"/>
                </div>
                <div class="field">
                    <el-input type="text" placeholder="Фамилия" v-model="lastName"/>
                </div>
                <div class="field">
                    <el-input type="text" placeholder="Почта" v-model="email"/>
                </div>
                <div class="field">
                    <el-input type="password" placeholder="Пароль" v-model="password"/>
                </div>
                <div class="field">
                    <el-input type="password" placeholder="Подтверждение пароля" v-model="passwordConfirm"/>
                </div>
                <div class="actions">
                    <el-button
                        type="success"
                        class="register-button"
                        @click="register"
                    >
                        Зарегистрироваться
                    </el-button>
                </div>
            </div>
        </div>
    </page-container>
</template>

<script>
  import PageContainer from '../../com/Container/Page.vue';

  export default {
    components: {
      PageContainer
    },
    data () {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    },
    methods: {
      async register() {
        const {
          email,
          lastName,
          password,
          firstName
        } = this;

        if (this.password !== this.passwordConfirm) {
          this.showRegisterError();
          return;
        }

        try {
          await this.$locator.Api.register(email, password, lastName, firstName);
          this.redirectToRegisterPage();
        } catch(e) {
          throw e;
        }
      },
      redirectToRegisterPage() {
        this.$router.push('/');
      },
      showRegisterError() {
        this.$message({
          showClose: true,
          message: 'Пароли должны совпадать',
          type: 'error',
          duration: 2000
        });
      },
    }
  }
</script>

<style scoped>
    .form-wrapper {
        display: flex;
        justify-content: center;
    }

    .title {
        padding: 8px;
        display: flex;
        justify-content: center;
    }

    .register-form {
        width: 280px;
    }

    .field {
        padding: 12px 0;
    }

    .actions {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
    }

    .register-button {
        width: 100%;
    }
</style>