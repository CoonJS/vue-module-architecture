<script>
import TestCard from '../src/com/Test/Card.vue';
import CreateTestForm from '../src/com/Test/CreateForm.vue';
import QuestionContainer from '../src/com/Question/Container.vue';

export default {
  components: {
    TestCard,
    CreateTestForm,
    QuestionContainer
  },
  data () {
    return {
      testName: '',
      saving: false,
      loading: false,
      tests: [],
      selectedTest: null,
      isShowTestPopup: false,
      currentTestResults: null,
      access: {
        isAdmin: this.api.hasAccess('TESTS_ADMIN')
      }
    };
  },
  computed: {
    hasSelectedTest() {
      return this.selectedTest != null;
    },
    hasCurrentTestResults() {
      const results =this.currentTestResults;
      return results !== null && Array.isArray(results) && results.length > 0;
    }
  },
  watch: {
    selectedTest() {
      this.loadTestResults();
    }
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  mounted() {
    this.loadTests();
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
    async loadTestResults() {
      const testId = this.selectedTest.id;
      const { data: results } = await this.api.get('currentUserResultsUsingGET', { testId });
      this.currentTestResults = results;
    },
    async startCurrentTest() {
      this.loading = true;
      const testId = this.selectedTest.id;
      await this.api.post('createdResultUsingPOST', { testId });
      await this.loadTestResults();
      this.loading = false;
    },
    async saveTest() {
      this.saving = true;
      await this.api.post('createdTestUsingPOST', {}, { name: this.testName });
      this.saving = false;
      this.closeCreateTestPopup();
      this.loadTests();
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
    selectTest(test) {
      this.selectedTest = test;
    },
    showCreateTestPopup() {
      this.isShowTestPopup = true;
    },
    closeCreateTestPopup() {
      this.isShowTestPopup = false;
    }
  }
};
</script>

<template>
  <page-container 
    flex-content 
    fluid
  >
    <div 
      slot="header" 
      class="header"
    >
      <div class="header-info">
        <h3>Тестирование</h3>
        <ui-link 
          v-if="access.isAdmin" 
          to="/testing/statistics"
        >
          Статистика
        </ui-link>
      </div>
      <el-button
        v-if="access.isAdmin"
        type="success"
        size="medium"
        icon="el-icon-plus"
        @click="showCreateTestPopup"
      >
        Создать тест
      </el-button>
    </div>

    <el-dialog 
      :visible.sync="isShowTestPopup" 
      title="Новый тест" 
      width="400px"
    >
      <create-test-form
        v-model="testName"
        @keydown.native.enter="saveTest"
      />
      <div slot="footer">
        <el-button
          :loading="saving"
          type="success"
          @click="saveTest"
        >
          Создать
        </el-button>
        <el-button @click="closeCreateTestPopup">Отмена</el-button>
      </div>
    </el-dialog>

    <div class="testing-data">
      <div 
        v-if="tests.length > 0 && hasSelectedTest"
        class="tests"
      >
        <test-card
          v-for="test in tests"
          :key="test.id"
          :test="test"
          :active="test.id === selectedTest.id"
          @remove="handleRemoveTest"
          @click.native="selectTest(test)"
        />
      </div>

      <question-container
        v-if="tests.length > 0 && hasCurrentTestResults"
        :test-id="selectedTest.id"
        :results="currentTestResults"
      />

      <div 
        v-else 
        class="start-test-button"
      >
        <el-button
          :disabled="loading"
          :loading="loading"
          type="success"
          @click="startCurrentTest"
        >
          Начать тест
        </el-button>
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

    .header-info {
        display: flex;
        align-items: center;
    }

    .header-info h3 {
        margin-right: 8px;
    }

    .testing-data {
        flex: 1;
        display: flex;
    }

    .tests {
        min-width: 300px;
        width: 300px;
        border-right: 1px solid #cacaca;
    }

    .start-test-button {
        padding: 64px;
        width: 100%;
        text-align: center;
        background-color: #eee;
    }
</style>