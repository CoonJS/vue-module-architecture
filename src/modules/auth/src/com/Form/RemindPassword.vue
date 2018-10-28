<script>
export default {
  data () {
    return {
      email: '',
      loading: false
    };
  },
  created() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  mounted() {
    this.focusInput();
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
      this.$emit('send');
    },
    focusInput() {
      this.$refs.input.$el.querySelector('input').focus();
    },
    showSuccessMessage() {
      this.$message({
        message: `Письмо отправлено на почту ${this.email}`,
        type: 'success'
      });
    }
  }
};
</script>

<template>
  <div class="form">
    <div class="title">Введите email, на который придет письмо со ссылкой на сброс пароля</div>
    <el-input
      ref="input"
      v-model="email"
      @keydown.native.enter="sendRemindPasswordRequest"
    >
      <el-button
        slot="append"
        :loading="loading"
        icon="el-icon-message"
        @click="sendRemindPasswordRequest"
      >
        Отправить
      </el-button>
    </el-input>
  </div>
</template>

<style scoped>
    .title {
        padding: 16px 0;
        font-size: 14px;
        color: #999;
    }
</style>