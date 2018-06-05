<script>
  import TestCard from './src/com/Test/Card.vue';
  import QuestionCard from './src/com/Question/Card.vue';
  import CreateTestForm from './src/com/Test/CreateForm.vue';
  import CreateQuestionForm from './src/com/Question/CreateForm.vue';

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
      TestCard,
      QuestionCard,
      CreateTestForm,
      CreateQuestionForm
    },
    created() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    mounted() {
      this.loadTests();
    },
    data () {
      return {
        isShowTestPopup: false,
        isShowQuestionPopup: false,
        testName: '',
        saving: false,
        loading: false,
        questionsLoading: false,
        isEditModeQuestion: false,
        tests: [],
        questions: [],
        question: DEFAULT_QUESTION,
        selectedTest: null
      }
    },
    computed: {
      hasSelectedTest() {
        return this.selectedTest !== null;
      },
      hasTestQuestions() {
        return this.hasSelectedTest && this.questions.length > 0;
      },
      hasCorrectAnswers() {
        return this.question.answers.some(answer => answer.correct === true);
      }
    },
    watch: {
      isShowQuestionPopup(isShow) {
        if (isShow === false) {
          this.isEditModeQuestion = false;
          this.clearQuestionForm();
        }
      }
    },
    methods: {
      async loadTests() {
        this.loading = true;
        const { data: tests } = await this.api.get('testsUsingGET');
        this.tests = tests;

        if (this.hasSelectedTest) {
          const selectedTestId = this.selectedTest.id;
          const test = this.tests.find(test => test.id === selectedTestId);
          this.selectTest(test);
        }

        if (!this.hasSelectedTest) {
          this.selectTest(tests[0]);
        }

        this.loading = false;
      },
      async loadQuestions(testID) {
        this.questionsLoading = true;
        const { data: questions } = await this.api.get('questionsUsingGET', { id: testID });
        this.questions = questions;
        this.questionsLoading = false;
      },
      async saveTest() {
        this.saving = true;
        await this.api.post('createdTestUsingPOST', {} ,{ name: this.testName });
        this.saving = false;
        this.closeCreateTestPopup();
        this.loadTests();
      },
      async saveQuestion() {
        const { id } = this.selectedTest;
        const question = this.question;
        this.saving = true;
        await this.api.post('createdQuestionUsingPOST', { id }, question);
        this.saving = false;
        this.closeCreateQuestionPopup();
        this.clearQuestionForm();
        await this.loadTests();
      },
      async handleRemoveTest(testId) {
        try {
          await this.api.delete('deleteTestUsingDELETE', { id: testId });
        } catch (e) {
          throw e;
        }

        if (this.tests.length > 0) {
          this.selectTest(this.tests[0]);
        } else {
          this.selectedTest = null;
        }

        this.tests = this.tests.filter(test => test.id !== testId);
      },
      async removeQuestion(qid) {
        try {
          await this.api.delete('deleteQuestionUsingDELETE', {
            id: this.selectedTest.id,
            qid
          });
        } catch(e) {
          throw e;
        }

        this.loadQuestions(this.selectedTest.id);
      },
      async updateQuestion() {
        this.saving = true;

        try {
          await this.api.post('updatedQuestionUsingPOST', {
            id: this.selectedTest.id,
            qid: this.question.id
          }, this.question);
        } catch (e) {
          throw e;
        }

        this.saving = false;

        this.loadQuestions(this.selectedTest.id);
        this.closeCreateQuestionPopup();
      },
      showEditQuestionForm(question) {
        this.isEditModeQuestion = true;
        this.question = question;
        this.showCreateQuestionPopup();
      },
      selectTest(test) {
        this.selectedTest = test;
        this.loadQuestions(test.id);
      },
      showCreateTestPopup() {
        this.isShowTestPopup = true;
      },
      closeCreateTestPopup() {
        this.isShowTestPopup = false;
      },
      showCreateQuestionPopup() {
        this.isShowQuestionPopup = true;
      },
      closeCreateQuestionPopup() {
        this.isShowQuestionPopup = false;
      },
      clearQuestionForm() {
        this.question = DEFAULT_QUESTION;
        this.$refs.questionForm.clearForm();
      }
    }
  }
</script>

<template>
    <page-container flex-content fluid>
        <div slot="header" class="header">
            <h3>Тестирование</h3>
            <el-button
                type="success"
                size="medium"
                icon="el-icon-plus"
                @click="showCreateTestPopup"
            >
                Создать тест
            </el-button>
        </div>

        <el-dialog :visible.sync="isShowTestPopup" title="Новый тест" width="400px">
            <create-test-form
                v-model="testName"
                @keydown.native.enter="saveTest"
            />
            <div slot="footer">
                <el-button
                    type="success"
                    :loading="saving"
                    @click="saveTest"
                >
                    Создать
                </el-button>
                <el-button @click="closeCreateTestPopup">Отмена</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="isShowQuestionPopup" title="Новый вопрос" width="500px">
            <create-question-form v-model="question" ref="questionForm"/>
            <div slot="footer">
                <el-button
                    v-if="isEditModeQuestion"
                    type="success"
                    :disabled="!hasCorrectAnswers"
                    :loading="saving"
                    @click="updateQuestion"
                >
                    Обновить
                </el-button>
                <el-button
                    v-else
                    type="success"
                    :disabled="!hasCorrectAnswers"
                    :loading="saving"
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

        <div class="testing-data" v-loading.body="loading">
            <div class="tests">
                <test-card
                    v-for="test in tests"
                    :key="test.id"
                    :test="test"
                    :active="test.id === selectedTest.id"
                    @remove="handleRemoveTest"
                    @select="selectTest"
                />
            </div>
            <div class="questions" v-loading.body="questionsLoading">
                <template v-if="hasSelectedTest">
                    <div class="panel">
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
                        <div class="question-wrapper"
                             v-for="question in questions"
                             :key="question.id"
                        >
                            <question-card
                                :question="question"
                                @remove="removeQuestion"
                                @edit="showEditQuestionForm"
                            />
                        </div>
                        <div v-if="!hasTestQuestions" class="no-questions">
                            <div>Нет вопросов</div>
                            <el-button
                                size="mini"
                                type="info"
                                @click="showCreateQuestionPopup"
                            >
                                Добавить вопрос
                            </el-button>
                        </div>
                        <div class="actions-block">
                            <el-button
                                type="success"
                                size="medium"
                                icon="el-icon-circle-check-outline"
                            >
                                Отправить ответы
                            </el-button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </page-container>
</template>

<style scoped>
    .header {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }

    .testing-data {
        flex: 1;
        display: flex;
    }

    .tests {
        width: 300px;
        border-right: 1px solid #cacaca;
    }

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