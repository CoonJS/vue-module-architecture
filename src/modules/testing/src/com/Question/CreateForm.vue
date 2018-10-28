<script>
const DEFAULT_QUESTION = {
  text: '',
  answers: [
    {
      text: '',
      correct: false
    }
  ]
};

export default {
  props: {
    value: {
      type: Object,
      default() {
        return {
          question: DEFAULT_QUESTION
        };
      }
    }
  },
  data () {
    return {
      question: this.value,
      maxAnswersCount: 4,
      isShowMaxAnswersCountError: false
    };
  },
  computed: {
    hasMaxAnswersCountError() {
      return this.question.answers.length === this.maxAnswersCount;
    }
  },
  watch: {
    question: {
      deep: true,
      handler(val) {
        this.$emit('input', val);
      },
    },
    value: {
      deep: true,
      handler(val) {
        this.question = val;
      }
    },
    hasMaxAnswersCountError(value) {
      if (value === false) {
        this.isShowMaxAnswersCountError = value;
      }
    }
  },
  mounted() {
    this.focusTextArea();
  },
  methods: {
    addAnswer() {
      const newAnswer = {
        text: '',
        correct: false
      };

      if (this.hasMaxAnswersCountError) {
        this.isShowMaxAnswersCountError = true;
        return;
      }

      this.question.answers = [ ...this.question.answers, newAnswer ];
    },
    removeAnswerByIndex(removeIndex) {
      const answers = this.question.answers;

      if (answers.length <= 1) {
        return;
      }

      this.question.answers = answers.filter((answer,idx) => idx !== removeIndex);
    },
    focusTextArea() {
      this.$nextTick(() => {
        this.$refs.textArea.$el.querySelector('textarea').focus();
      });
    },
    clearForm() {
      this.question = Object.assign({}, DEFAULT_QUESTION, { answers: [{ text: '', correct: false } ]});
    }
  }
};
</script>

<template>
  <div class="form">
    <div class="form-item">
      <el-input
        ref="textArea"
        v-model="question.text"
        :rows="3"
        type="textarea"
        placeholder="Текст вопроса"
      />
    </div>
    <div class="form-item">
      <div class="title">Варианты ответов</div>
      <div 
        v-for="(answer,idx) in question.answers" 
        :key="answer.id" 
        class="answer"
      >
        <el-input v-model="answer.text">
          <el-button
            slot="append"
            :key="idx"
            type="danger"
            icon="el-icon-delete"
            @click="removeAnswerByIndex(idx)"
          />
        </el-input>
        <el-switch
          v-model="answer.correct"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="Правильный"
        />
      </div>
      <div class="action-button">
        <el-button 
          type="primary" 
          size="mini" 
          @click="addAnswer"
        >
          Добавить вариант
        </el-button>
        <el-tag 
          v-if="isShowMaxAnswersCountError" 
          size="medium"
        >
          Максимальное количество ответов {{ maxAnswersCount }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .form-item {
        padding: 12px 0;
    }

    .title {
        padding: 4px 0;
    }

    .answer {
        padding: 12px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .answer .el-input {
        margin-right: 24px;
        width: 290px;
    }

    .action-button {
        padding: 16px 0;
    }
</style>