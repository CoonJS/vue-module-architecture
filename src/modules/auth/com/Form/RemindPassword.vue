<script>
  export default {
    created() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data () {
      return {
        email: '',
        loading: false
      }
    },
    methods: {
      async sendRemindPasswordRequest() {
        this.loading = true;

        try {
          await this.api.post('createRemindPasswordRequestUsingPOST', {}, {
            email: this.email
          });
        } catch(e) {
          throw e;
        }

        this.loading = false;
        this.showSuccessMessage();
      },
      showSuccessMessage() {
        this.$message({
          message: `Письмо отправлено на почту ${this.email}`,
          type: 'success'
        });
      }
    }
  }
</script>

<template>
    <div>
        <h3>Форма восстановления пароля</h3>
        <div class="form">
            <div class="title">Введите email, на который придет письмо со ссылкой на сброс пароля</div>
            <el-input v-model="email">
                <el-button
                    slot="append"
                    icon="el-icon-message"
                    :loading="loading"
                    @click="sendRemindPasswordRequest"
                >
                    Отправить
                </el-button>
            </el-input>
        </div>
    </div>
</template>

<style scoped>
    .title {
        padding: 16px 0;
        font-size: 14px;
        color: #999;
    }

    .form {

    }
</style>