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
      return {};
    }
  }
</script>

<template>
    <div class="question">
        <h5>{{question.text}}</h5>
        <div class="answers">
            <div class="answer"
                 v-for="answer in question.answers"
                 :key="answer.id"
            >
                <el-checkbox>
                    <span class="text">{{answer.text}}</span>
                </el-checkbox>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .question {
        background-color: #fff;
        padding: 16px;
        border: 1px solid #cacaca;
    }

    .answers {
        padding: 8px 0;
    }

    .answer .text {
        font-size: 14px;
    }

</style>