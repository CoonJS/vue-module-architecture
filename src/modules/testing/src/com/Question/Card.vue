<script>
export default {
  props: {
    question: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data () {
    return {
      loading: false,
      access: {
        isAdmin: this.api.hasAccess('TESTS_ADMIN')
      }
    };
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  methods: {
    editQuestion() {
      const questionCopy = JSON.parse(JSON.stringify(this.question));
      this.$emit('edit', questionCopy);
    },
    removeQuestion() {
      this.loading = true;
      this.$emit('remove', this.question.id);
    },
    selectAnswer(value, answer) {
      this.$emit('select', { value, id: answer.id });
    }
  }
};
</script>

<template>
  <div class="question">
    <div>
      <h5>{{ question.text }}</h5>
      <div class="answers">
        <div>
          <div
            v-for="answer in question.answers"
            :key="answer.id"
            class="answer"
          >
            <el-checkbox @change="selectAnswer($event, answer)">
              <span class="text">{{ answer.text }}</span>
            </el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div 
      v-if="access.isAdmin" 
      class="actions"
    >
      <div>
        <el-tooltip 
          effect="dark" 
          content="Редактировать вопрос" 
          placement="top-start"
        >
          <div @click="editQuestion">
            <i class="el-icon-edit" />
          </div>
        </el-tooltip>
      </div>
      <div>
        <el-tooltip 
          effect="dark" 
          content="Удалить вопрос" 
          placement="top-start"
        >
          <div @click="removeQuestion">
            <i 
              v-if="loading" 
              class="el-icon-loading"
            />
            <i 
              v-else 
              class="el-icon-delete"
            />
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .question {
        display: flex;
        padding: 16px;
        background-color: #fff;
        border: 1px solid #cacaca;
        justify-content: space-between;
    }

    .answers {
        display: flex;
        padding: 8px 0;
        justify-content: space-between;
    }

    .answer .text {
        font-size: 14px;
    }

    .actions {
        display: flex;
    }

    .actions div div {
        padding: 8px;
        cursor: pointer;
    }

    .actions div div i {
        font-size: 18px;
    }

    .el-icon-edit {
        color: #409EFF;
    }

    .el-icon-delete {
        color: #f56c6c;
    }

</style>