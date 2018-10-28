<script>
export default {
  name: 'MenuItemFeedback',
  data() {
    return {
      isShow: false,
      loading: false,
      feedbackType: 'POSITIVE',
      feedbackComment: ''
    };
  },
  watch: {
    isShow(val) {
      if (val === true) {
        this.focusTextArea();
      }
    }
  },
  created() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  methods: {
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
      this.showSuccessMessage();
      this.close();
    },
    focusTextArea() {
      this.$nextTick(() => {
        this.$refs.textArea.$el.querySelector('textarea').focus();
      });
    },
    showSuccessMessage() {
      this.$message({
        message: 'Ваш отзыв успешно отправлен',
        type: 'success',
        duration: 1500
      });
    },
    handleClick() {
      this.$emit('click');
    },
    show() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    }
  }
};
</script>

<template>
  <div class="menu-item">
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-service"
      @click="show"
    >
      Обратная связь
    </el-button>

    <el-dialog 
      :visible.sync="isShow" 
      title="Обратная связь" 
      width="420px"
    >
      <div class="feedback-form">
        <div class="field">
          <div class="text-hint">Ваш отзыв о нашей системе:</div>
          <el-radio-group 
            v-model="feedbackType" 
            size="mini"
          >
            <el-radio-button label="POSITIVE">Позитивный</el-radio-button>
            <el-radio-button label="NEUTRAL">Нейтральный</el-radio-button>
            <el-radio-button label="NEGATIVE">Негативный</el-radio-button>
          </el-radio-group>
        </div>
        <div class="field">
          <div class="text-hint">Комментарий:</div>
          <el-input 
            ref="textArea" 
            v-model="feedbackComment" 
            :disabled="loading" 
            type="textarea"
          />
        </div>
      </div>
      <div slot="footer">
        <el-button 
          :loading="loading" 
          type="success" 
          size="mini" 
          @click="sendFeedBack"
        >
          Отправить
        </el-button>
        <el-button 
          size="mini" 
          @click="close"
        >
          Отмена
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
    .menu-item {
        display: flex;
        cursor: pointer;
        padding: 16px;
        align-items: center;
        color: #fff;
        font-size: 12px;
    }

    .text-hint {
        margin-bottom: 8px;
        font-size: 12px;
    }

    .field {
        margin-top: 16px;
    }

    .field:first-child {
        margin-top: 0;
    }
</style>