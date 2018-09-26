<script>
  import Step from '../src/com/Step/Default.vue';

  export default {
    components: {
      Step
    },
    created() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data () {
      return {
        steps: []
      }
    },
    methods: {
      addStep() {
        this.steps = [...this.steps, this.steps.length + 1]
      }
    }
  }
</script>

<template>
    <page-container>
        <div slot="header" class="header">
            <h3>Создание курса</h3>
            <el-button type="success" size="mini">Создать курс</el-button>
        </div>
        <div class="body">
            <div class="steps">
                <el-tooltip content="Добавить шаг" placement="top">
                    <div class="add-step step" @click="addStep">
                        <i class="el-icon-plus"></i>
                    </div>
                </el-tooltip>
                <step v-for="(step, idx) in steps" :key="idx" :number="idx"/>
            </div>
        </div>
    </page-container>
</template>

<style lang="less" scoped>
    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .body {

    }

    .steps {
        display: flex;
    }

    .step {
        cursor: pointer;
        width: 100px;
        height: 100px;
        margin: 8px;
        border: 1px solid;
    }

    .add-step {
        border-radius: 25%;
        display: flex;
        border: 1px dashed;
        align-items: center;
        justify-content: center;

        i {
            font-size: 32px;
        }
    }
</style>