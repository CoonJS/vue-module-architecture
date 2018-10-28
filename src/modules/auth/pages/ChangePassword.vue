<script>
import bgImage from '../src/img/bg.jpg';

export default {
  data () {
    return {
      bgImage,
      loading: false,
      newPassword: '',
      newPasswordConfirm: '',
      token: this.$route.query.token,
    };
  },
  computed: {
    canChangePasswords() {
      return (
        this.newPassword === this.newPasswordConfirm
      ) && (
        this.newPassword.length >=8
      );
    }
  },
  created() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    async changePassword() {
      if (!this.canChangePasswords) {
        this.showErrorMessage();
        return;
      }

      this.loading = true;

      try {
        await this.api.changePassword(this.token, this.newPassword);
      } catch(e) {
        throw e;
      }

      this.loading = false;

      this.redirectToAuth();

    },
    redirectToAuth() {
      this.$router.push('/');
    },
    showErrorMessage() {
      this.$message({
        message: 'Пароли не совпадают',
        type: 'error'
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
      <h3>Смена пароля</h3>
      <div class="form-fields">

        <div class="hint">Введите новый пароль</div>
        <el-input
          ref="input"
          v-model="newPassword"
          :disabled="loading"
          type="password"
          @keydown.native.enter="changePassword"
        />

        <div class="hint">Подтвердите новый пароль</div>
        <el-input
          v-model="newPasswordConfirm"
          :disabled="loading"
          type="password"
          @keydown.native.enter="changePassword"
        />

        <el-button
          :loading="loading"
          type="success"
          @click="changePassword"
        >
          Сменить пароль
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
        width: 280px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    .form-fields {
        margin-top: 16px;
    }

    .hint {
        padding: 12px 0;
        font-size: 14px;
        color: #999;
    }

    .el-button {
        margin-top: 16px;
        width: 100%
    }
</style>