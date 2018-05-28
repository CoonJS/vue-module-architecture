<script>
  export default {
    created() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data () {
      return {
        login: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: '',
        token: this.$route.query.token,
        isLoading: false
      }
    },
    methods: {
      async register() {
        const {
          login,
          token,
          firstName,
          lastName,
          password,
          passwordConfirm,
        } = this;

        this.isLoading = true;

        if (password !== passwordConfirm) {
          this.showRegisterError();
          return;
        }

        try {
          await this.api.registerUser({ login, token, firstName, lastName, password });
          this.redirectToRegisterPage();
        } catch(e) {
          throw e;
        }

        this.isLoading = false;
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

<template>
    <page-container style="display: flex; margin-top: 150px;">
        <div class="form-wrapper">
            <div class="register-form">
                <div class="title">
                    <h1>Регистрация</h1>
                </div>
                <div class="field">
                    <el-input type="text" placeholder="Логин" v-model="login"/>
                </div>
                <div class="field">
                    <el-input type="text" placeholder="Имя" v-model="firstName"/>
                </div>
                <div class="field">
                    <el-input type="text" placeholder="Фамилия" v-model="lastName"/>
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
                        :loading="isLoading"
                    >
                        Зарегистрироваться
                    </el-button>
                </div>
            </div>
        </div>
    </page-container>
</template>

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