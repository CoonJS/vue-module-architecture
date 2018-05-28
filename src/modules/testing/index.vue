<script>
  import CreateQuestionForm from './src/com/Question/CreateForm.vue';

  export default {
    components: {
      CreateQuestionForm
    },
    mounted() {

    },
    data () {
      return {
        isShowQuestionPopup: false
      }
    },
    computed: {

    },
    methods: {
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
    <page-container>
        <div slot="header" class="header">
            <h3>Тестирование</h3>
            <el-button type="success" @click="showCreateQuestionPopup">Создать вопрос</el-button>
        </div>
        <el-dialog :visible.sync="isShowQuestionPopup">
            <create-question-form />
        </el-dialog>
        <div>

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
</style>