<script>

  import { VueEditor } from 'vue2-editor';
  import Step from '../src/com/Step/Default.vue';

  export default {
    components: {
      Step,
      VueEditor
    },
    created() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data () {
      return {
        steps: [0],
        selectedStepIdx: 0
      }
    },
    methods: {
      addStep() {
        this.steps = [...this.steps, this.steps.length + 1]
      },
      handleStepClick(idx) {
        this.selectedStepIdx = idx;
      },
      handleRemove(idx) {
        console.log(idx);
        this.steps = this.steps.filter((step, index) => index !== idx);

      }
    }
  }
</script>

<template>
    <page-container flex-content fluid>
        <div slot="header" class="header">
            <h3>Создание курса</h3>
            <el-button type="success" size="mini">Сохранить</el-button>
        </div>
        <div class="body">
            <div class="steps">
                <transition-group name="list">
                    <step
                        v-for="(step, idx) in steps"
                        :key="step"
                        :number="idx"
                        :active="selectedStepIdx === idx"
                        @click="handleStepClick"
                        @remove="handleRemove"
                    />
                </transition-group>
                <el-tooltip content="Добавить шаг" placement="top">
                    <div class="add-step step" @click="addStep">
                        <i class="el-icon-plus"></i>
                    </div>
                </el-tooltip>
            </div>
            <div class="step-content">
                <VueEditor></VueEditor>
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
        flex: 1;
        display: flex;
    }

    .steps {
        padding: 12px 40px 20px 40px;
        overflow-x: auto;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: #0606060f;
        border-right: 1px solid #cacaca;

        .add-step {
            cursor: pointer;
            width: 100px;
            min-width: 100px;
            min-height: 100px;
            border-radius: 25%;
            display: flex;
            border: 2px dashed rgba(0, 0, 0, 0.2);
            align-items: center;
            justify-content: center;
            margin: 8px;

            &:hover {
                background: rgba(0,0,0,.1);
            }

            i {
                color: rgba(0,0,0, .4);
                font-size: 32px;
            }
        }
    }

    .step-content {
        width: 100%;
        min-height: 600px;
        background-color: #eee;
    }

    .list-enter-active, .list-leave-active {
        transition: all .2s;
        transform: scale(1);
    }
    .list-enter, .list-leave-to {
        transform: scale(0);
    }
</style>