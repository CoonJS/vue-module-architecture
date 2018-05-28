<template>
    <page-container style="display: flex; margin-top: 150px;">
        <div class="form-wrapper">
            <div class="register-form">
                <div class="title">
                    <h1>Регистрация</h1>
                </div>
                <div class="field">
                    <el-input type="text" placeholder="Название кампании" v-model="name"/>
                </div>
                <div class="field">
                    <el-input type="text" placeholder="Имя" v-model="adminFirstName"/>
                </div>
                <div class="field">
                    <el-input type="text" placeholder="Фамилия" v-model="adminLastName"/>
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
  export default {
    data () {
      return {
        name: '',
        token: this.$route.query.token,
        adminFirstName: '',
        adminLastName: '',
        password: '',
        passwordConfirm: ''
      }
    },
    methods: {
      async register() {
        const {
          name,
          token,
          password,
          adminFirstName,
          adminLastName
        } = this;

        if (this.password !== this.passwordConfirm) {
          this.showRegisterError();
          return;
        }

        try {
          await this.$locator.Api.registerAccount(this);
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