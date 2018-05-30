<script>
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
      CreateTestForm,
      QuestionCard,
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
        tests: [],
        question: DEFAULT_QUESTION,
        selectedTest: null,
        userAnswers: [

        ]
      }
    },
    computed: {
      hasSelectedTest() {
        return this.selectedTest !== null;
      },
      hasCorrectAnswers() {
        return this.question.answers.some(answer => answer.correct === true);
      }
    },
    methods: {
      async loadTests() {
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
      clearQuestionForm() {
        this.question = DEFAULT_QUESTION;
        this.$refs.questionForm.clearForm()
      },
      selectTest(test) {
        this.selectedTest = test;
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
      }
    }
  }
</script>

<template>
    <page-container flex-content fluid>
        <div slot="header" class="header">
            <h3>Тестирование</h3>
            <el-button type="success" icon="el-icon-plus" @click="showCreateTestPopup">Создать тест</el-button>
        </div>
        <el-dialog :visible.sync="isShowTestPopup" title="Новый тест" width="400px">
            <create-test-form v-model="testName"/>
            <div slot="footer">
                <el-button type="success" :loading="saving" @click="saveTest">Создать</el-button>
                <el-button @click="closeCreateTestPopup">Отмена</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="isShowQuestionPopup" title="Новый вопрос" width="500px">
            <create-question-form v-model="question" ref="questionForm"/>
            <div slot="footer">
                <el-button type="success" :disabled="!hasCorrectAnswers" :loading="saving" @click="saveQuestion">Создать</el-button>
                <el-button @click="closeCreateQuestionPopup">Отмена</el-button>
            </div>
        </el-dialog>
        <div class="testing-data">
            <div class="tests">
                <div
                    class="test"
                    v-for="test in tests"
                    :key="test.id"
                    :class="{ active: test.id === selectedTest.id}"
                    @click="selectTest(test)"
                >
                    {{test.name}}
                </div>
            </div>
            <div class="questions">
                <template v-if="hasSelectedTest">
                    <div class="panel">
                        <el-button
                            type="primary"
                            size="mini"
                            icon="el-icon-plus"
                            @click="showCreateQuestionPopup"
                        >
                            Добавить вопрос
                        </el-button>
                    </div>
                    <div class="questions-container">
                        <div class="question-wrapper" v-for="question in selectedTest.questions" :key="question.id">
                            <question-card :question="question"/>
                        </div>
                        <div class="actions-block">
                            <el-button type="success" icon="el-icon-circle-check-outline">Отправить ответы</el-button>
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

    .test {
        padding: 16px;
        background: #fff;
        cursor: pointer;
        font-size: 14px;
        border-bottom: 1px solid #eee;
    }

    .test.active {
        background: rgba(14, 176, 253, .1);
    }

    .test:hover {
        background: rgba(14, 176, 253, .1);
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

    .actions-block {
        display: flex;
        padding: 0 16px;
        align-items: center;
        justify-content: flex-end;
        position: absolute;
        z-index: 1000;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: #fff;
        border-top: 1px solid #cacaca;
    }
</style>