<script>
  export default {
    props: {
      value: {
        type: Object,
        default() {
          return {
            text: '',
            answers: [
              {
                text: '',
                correct: false
              }
            ]
          }
        }
      }
    },
    data () {
      return {
        question: this.value
      };
    },
    watch: {
      question: {
        deep: true,
        handler(val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      addAnswer() {
        const newAnswer = {
          text: '',
          correct: false
        };

        this.question.answers = [ ...this.question.answers, newAnswer ];
      },
      removeAnswerByIndex(removeIndex) {
        const answers = this.question.answers;

        if (answers.length <= 1) {
          return;
        }
        this.question.answers = answers.filter((answer,idx) => idx !== removeIndex);
      }
    }
  }
</script>

<template>
    <div class="form">
        <div class="form-item">
            <div class="title">Вопрос</div>
            <el-input type="textarea" :rows="3" v-model="question.text"/>
        </div>
        <div class="form-item">
            <div class="title">Варианты ответов</div>
            <div class="answer" v-for="(answer,idx) in question.answers">
                <el-input v-model="answer.text"/>
                <el-checkbox v-model="answer.correct">Правильный</el-checkbox>
                <i class="el-icon-delete delete-icon" @click="removeAnswerByIndex(idx)"/>
            </div>
            <div class="action-button">
                <el-button type="primary" @click="addAnswer">Добавить вариант</el-button>
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

</style>