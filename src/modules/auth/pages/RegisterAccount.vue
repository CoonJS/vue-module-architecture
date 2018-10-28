<script>
import bgImage from '../src/img/bg.jpg';

export default {
  data () {
    return {
      bgImage,
      name: '',
      token: this.$route.query.token,
      adminFirstName: '',
      adminLastName: '',
      password: '',
      passwordConfirm: '',
      isLoading: false
    };
  },
  computed: {
    isValidFields() {
      const hasToken = this.token !== null;
      const isValidName = this.name.trim() !== '';
      const isValidAdminFirstName = this.adminFirstName.trim() !== '';
      const isValidAdminLastName = this.adminLastName.trim() !== '';
      const isValidPassword = this.password.trim() !== '';
      const isValidPasswordConfirm = this.passwordConfirm.trim() !== '';

      return hasToken && isValidName && isValidAdminFirstName && isValidAdminLastName && isValidPassword && isValidPasswordConfirm;
    },
    isValidPasswordLength() {
      return this.password.length >=8;
    }
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    async register() {
      const { name, token, password, adminFirstName, adminLastName } = this;

      if (!this.isValidFields) {
        this.showRegisterError();
        return;
      }

      if (!this.isValidPasswordLength) {
        this.showPasswordLengthError();
        return;
      }

      if (this.password !== this.passwordConfirm) {
        this.showPasswordError();
        return;
      }

      this.isLoading = true;

      try {
        await this.$locator.Api.registerAccount({
          name,
          token,
          password,
          adminFirstName,
          adminLastName
        });
      } catch(e) {
        throw e;
      }

      this.redirectToRegisterPage();

      this.isLoading = false;
    },
    redirectToRegisterPage() {
      this.$router.push('/');
    },
    showRegisterError() {
      this.$message({
        showClose: true,
        message: 'Заполните все поля',
        type: 'error',
        duration: 2000
      });
    },
    showPasswordLengthError() {
      this.$message({
        showClose: true,
        message: 'Длина пароля должна быть более 8 символов',
        type: 'error',
        duration: 2000
      });
    },
    showPasswordError() {
      this.$message({
        showClose: true,
        message: 'Пароли должны совпадать',
        type: 'error',
        duration: 2000
      });
    },
    focusInput() {
      this.$nextTick(() => {
        this.$refs.input.$el.querySelector('input').focus();
      });
    }
  }
};
</script>

<template>
  <div 
    :style="{backgroundImage: `url(${bgImage})`}" 
    class="form-wrapper"
  >
    <div class="form">
      <div class="title">
        <h1>Регистрация</h1>
      </div>

      <div class="field">
        <el-input
          ref="input"
          v-model="name"
          type="text"
          placeholder="Название кампании"
          @keydown.native.enter="register"
        />
      </div>
      <div class="field">
        <el-input
          v-model="adminFirstName"
          type="text"
          placeholder="Имя"
          @keydown.native.enter="register"
        />
      </div>
      <div class="field">
        <el-input
          v-model="adminLastName"
          type="text"
          placeholder="Фамилия"
          @keydown.native.enter="register"
        />
      </div>
      <div class="field">
        <el-input
          v-model="password"
          type="password"
          placeholder="Пароль"
          @keydown.native.enter="register"
        />
      </div>
      <div class="field">
        <el-input
          v-model="passwordConfirm"
          type="password"
          placeholder="Подтверждение пароля"
          @keydown.native.enter="register"
        />
      </div>
      <div class="actions">
        <el-button
          :loading="isLoading"
          type="success"
          class="register-button"
          @click="register"
        >
          Зарегистрироваться
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .form-wrapper {
        background-size: cover;
        background-color: #f1f1f1;
        width: 100%;
        display: flex;
        margin-top: -46px;
        flex-direction: column;
        align-items: center;
    }

    .form {
        padding: 24px;
        border-radius: 4px;
        background-color: #f3f3f3;
        margin-top: 80px;
        width: 320px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    .title {
        padding: 8px;
        display: flex;
        justify-content: center;
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