<script>
import QuestionCard from '../../../src/com/Question/Card.vue';
import CreateQuestionForm from '../../../src/com/Question/CreateForm.vue';

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
  components: {
    QuestionCard,
    CreateQuestionForm
  },
  props: {
    testId: {
      type: Number,
      default() {
        return null;
      }
    },
    results: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data () {
    return {
      question: DEFAULT_QUESTION,
      questions: [],
      testAnswersMap: {},
      saving: false,
      questionsLoading: false,
      isEditModeQuestion: false,
      isShowQuestionPopup: false,
      access: {
        isAdmin: this.api.hasAccess('TESTS_ADMIN')
      }
    };
  },
  computed: {
    hasQuestions() {
      return this.questions.length > 0;
    },
    hasCorrectAnswers() {
      return this.question.answers.some(answer => answer.correct === true);
    }
  },
  watch: {
    testId: {
      immediate: true,
      handler(testID) {
        if (!testID) {
          return;
        }

        this.loadQuestions();
      }
    },
    isShowQuestionPopup(isShow) {
      if (isShow === false) {
        this.isEditModeQuestion = false;
        this.clearQuestionForm();
      }
    }
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  methods: {
    async loadQuestions() {
      this.questionsLoading = true;
      const { data: questions } = await this.api.get('questionsUsingGET', { id: this.testId });
      this.questions = questions;
      this.questionsLoading = false;
    },
    async saveQuestion() {
      const question = this.question;
      this.saving = true;
      await this.api.post('createdQuestionUsingPOST', { id: this.testId }, question);
      this.saving = false;

      this.closeCreateQuestionPopup();
      this.clearQuestionForm();
      this.loadQuestions();
    },
    async removeQuestion(qid) {
      try {
        await this.api.delete('deleteQuestionUsingDELETE', {
          id: this.testId,
          qid
        });
      } catch(e) {
        throw e;
      }

      this.loadQuestions();
    },
    async updateQuestion() {
      this.saving = true;

      try {
        await this.api.put('updatedQuestionUsingPUT', {
          id: this.testId,
          qid: this.question.id
        }, this.question);
      } catch (e) {
        throw e;
      }

      this.saving = false;

      this.loadQuestions();
      this.closeCreateQuestionPopup();
    },
    async sendResults() {
      this.loading = true;
      const testId = this.testId;
      const answers = Object.keys(this.testAnswersMap).map(questionId => {
        return {
          questionId: Number(questionId),
          answerIds: this.testAnswersMap[questionId]
        };
      });

      await this.api.post('createdResultUsingPOST', { testId }, { answers });
      this.testAnswersMap = {};
      this.loading = false;
    },
    showEditQuestionForm(question) {
      this.isEditModeQuestion = true;
      this.question = question;
      this.showCreateQuestionPopup();
    },
    handleSelectAnswers(answer, questionId) {
      const answerId = answer.id;
      const value = answer.value;
      const hasQuestionAnswers = Array.isArray(this.testAnswersMap[questionId]);

      if (!hasQuestionAnswers) {
        this.testAnswersMap[questionId] = [ answerId ];
        return;
      }

      const hasAnswerId = this.testAnswersMap[questionId].includes(answerId);

      if (hasAnswerId) {
        this.testAnswersMap[questionId] = this.testAnswersMap[questionId].filter(id => id !== answerId);
        return;
      }

      if (value === true) {
        this.testAnswersMap[questionId] = [...this.testAnswersMap[questionId], answerId ];
      }
    },
    clearQuestionForm() {
      this.question = DEFAULT_QUESTION;
      this.$refs.questionForm.clearForm();
    },
    showCreateQuestionPopup() {
      this.isShowQuestionPopup = true;
    },
    closeCreateQuestionPopup() {
      this.isShowQuestionPopup = false;
    }
  }
};
</script>

<template>
  <div 
    v-loading.body="questionsLoading" 
    class="questions"
  >
    <div 
      v-if="access.isAdmin" 
      class="panel"
    >
      <el-button
        type="info"
        size="mini"
        icon="el-icon-plus"
        @click="showCreateQuestionPopup"
      >
        Добавить вопрос
      </el-button>
    </div>

    <div class="questions-container">
      <div 
        v-for="questionItem in questions"
        :key="questionItem.id"
        class="question-wrapper"
      >
        <question-card
          :question="question"
          @remove="removeQuestion"
          @edit="showEditQuestionForm"
          @select="handleSelectAnswers($event, question.id)"
        />
      </div>

      <div 
        v-if="!hasQuestions" 
        class="no-questions"
      >
        <div>Нет вопросов</div>
        <el-button
          v-if="access.isAdmin"
          size="mini"
          type="info"
          @click="showCreateQuestionPopup"
        >
          Добавить вопрос
        </el-button>
      </div>

      <div class="actions-block">
        <el-button
          v-if="hasQuestions"
          type="success"
          size="medium"
          icon="el-icon-circle-check-outline"
          @click="sendResults"
        >
          Отправить ответы
        </el-button>
      </div>
    </div>

    <el-dialog 
      :visible.sync="isShowQuestionPopup" 
      title="Новый вопрос" 
      width="500px"
    >
      <create-question-form 
        ref="questionForm" 
        v-model="question"
      />
      <div slot="footer">
        <el-button
          v-if="isEditModeQuestion"
          :disabled="!hasCorrectAnswers"
          :loading="saving"
          type="success"
          @click="updateQuestion"
        >
          Обновить
        </el-button>
        <el-button
          v-else
          :disabled="!hasCorrectAnswers"
          :loading="saving"
          type="success"
          @click="saveQuestion"
        >
          Создать
        </el-button>
        <el-button
          @click="closeCreateQuestionPopup"
        >
          Отмена
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
    .questions {
        flex: 1;
        display: flex;
        position: relative;
        flex-direction: column;
        width: 100%;
        background-color: #eee;
    }

    .questions-container {
        padding-bottom: 60px;
        overflow: auto;
    }

    .question-wrapper {
        margin: 16px;
    }


    .panel {
        background-color: #fff;
        padding: 16px;
        border-top: 1px solid #cacaca;
        border-bottom: 1px solid #cacaca;
    }

    .no-questions {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 32px;
        font-size: 32px;
        color: rgba(0,0,0, .2);
    }

    .no-questions .el-button {
        margin-top: 16px;
    }

    .actions-block {
        display: flex;
        padding: 0 16px;
        align-items: center;
        justify-content: flex-end;
        position: absolute;
        z-index: 10;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: #fff;
        border-top: 1px solid #cacaca;
    }

</style>