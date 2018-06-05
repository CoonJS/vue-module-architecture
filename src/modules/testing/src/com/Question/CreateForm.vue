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
          }
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
      clearForm() {
        this.question = Object.assign({}, DEFAULT_QUESTION, { answers: [{ text: '', correct: false } ]});
      }
    }
  }
</script>

<template>
    <div class="form">
        <div class="form-item">
            <el-input type="textarea" placeholder="Текст вопроса" :rows="3" v-model="question.text"/>
        </div>
        <div class="form-item">
            <div class="title">Варианты ответов</div>
            <div class="answer" v-for="(answer,idx) in question.answers" :key="answer.id">
                <el-input v-model="answer.text">
                    <el-button
                        :key="idx"
                        slot="append"
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
                <el-button type="primary" @click="addAnswer" size="mini">Добавить вариант</el-button>
                <el-tag v-if="isShowMaxAnswersCountError" size="medium">Максимальное количество ответов {{maxAnswersCount}}</el-tag>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .form {

    }

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
    }

    .delete-icon {
        padding: 0 16px;
        cursor: pointer;
        color: #f56c6c;
    }

    .action-button {
        padding: 16px 0;
    }

    .checkbox-title {
        font-size: 12px;
    }

    .el-tag {
        margin-left: 16px;
    }

</style>