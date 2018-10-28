<script>

import CreateQuestionForm from './Question/CreateForm.vue';

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
    CreateQuestionForm
  },
  data() {
    return {
      isShowForm: false,
      question: DEFAULT_QUESTION,
    };
  },
  methods: {
    showForm() {
      this.isShowForm = true;
    }
  }
};
</script>

<template>
  <div class="tests">
    <el-dialog 
      :visible.sync="isShowForm" 
      title="Новый вопрос"
    >
      <create-question-form v-model="question" />
      <div slot="footer">
        <el-button
          type="success"
          size="mini"
        >
          Сохранить
        </el-button>
        <el-button size="mini">Отмена</el-button>
      </div>
    </el-dialog>
    <div class="header">
      <el-button 
        size="mini" 
        @click="showForm"
      >
        Добавить вопрос
      </el-button>
    </div>
    <div class="body" />
  </div>
</template>

<style lang="less" scoped>
    .tests {
        flex: 1;
        display: flex;
        flex-direction: column;

        .header {
            display: flex;
            justify-content: flex-end;
            padding: 16px 0;
        }

        .body {
            flex: 1;
            background-color: #fff;
            border: 1px solid #cacaca;
        }
    }
</style>