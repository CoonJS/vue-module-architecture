<script>
  export default {
    created() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data () {
      return {
        loading: false,
        newPassword: '',
        newPasswordConfirm: '',
        token: this.$route.query.token,
      }
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
      }
    }
  }
</script>

<template>
    <page-container style="display: flex; margin-top: 150px;">
        <div class="form-wrapper">
            <div class="form">
                <h3>Смена пароля</h3>
                <div class="form-fields">
                    <div class="hint">Введите новый пароль</div>
                    <el-input v-model="newPassword" type="password"/>
                    <div class="hint">Подтвердите новый пароль</div>
                    <el-input v-model="newPasswordConfirm" type="password" />
                    <el-button
                        type="success"
                        :loading="loading"
                        @click="changePassword"
                    >
                        Сменить пароль
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

    .form {
        width: 300px;
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