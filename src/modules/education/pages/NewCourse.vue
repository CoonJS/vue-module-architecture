<script>

  import { VueEditor } from 'vue2-editor';

  import Step from '../src/com/Step/Default.vue';
  import TestWrapper from '../src/com/Test/Wrapper.vue';
  import CreateCourseForm from '../src/com/Form/CreateCourse.vue';

  export default {
    components: {
      Step,
      VueEditor,
      TestWrapper,
      CreateCourseForm
    },
    created() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data () {
      return {
        data: {},
        type: 'article',
        steps: [{ index: 0, content: null }],
        selectedStepIdx: 0,
        loading: false
      }
    },
    methods: {
      async saveCourse() {
        const { title, description, image } = this.data;

        this.loading = true;
        await this.api.post('createdCourseUsingPOST', {}, {
          title,
          description,
          image
        });
        this.loading = false;

        this.$router.push('/education');

      },
      handleCourseFormChange(data) {
        this.data = data;
      },
      addStep() {
        this.steps = [...this.steps, { index: this.steps.length, content: null }];
      },
      handleStepClick(idx) {
        this.selectedStepIdx = idx;
      },
      handleRemove(idx) {
        if (this.steps.length === 1) {
          return;
        }

        this.selectedStepIdx = 0;
        this.steps = this.steps.filter((step, index) => index !== idx);

      }
    }
  }
</script>

<template>
    <page-container flex-content fluid>
        <div slot="header" class="header">
            <h3>Создание курса</h3>
            <el-button
                    type="success"
                    size="mini"
                    :loading="loading"
                    @click="saveCourse">Сохранить</el-button>
        </div>
        <div class="body">
            <div class="steps">
                <transition-group name="list">
                    <step
                        v-for="(step, idx) in steps"
                        :content="step.content"
                        :key="step.index"
                        :number="idx"
                        :active="idx === selectedStepIdx"
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
            <div class="step-content" v-if="selectedStepIdx !== 0">
                <div class="step-type">
                    <el-radio-group v-model="type">
                        <el-radio label="article">Статья</el-radio>
                        <el-radio label="test">Тест</el-radio>
                    </el-radio-group>
                </div>
                <div class="editor-wrapper" v-if="type === 'article'">
                    <VueEditor v-model="steps[selectedStepIdx].content"/>
                </div>
                <div class="testing-wrapper" v-if="type === 'test'">
                    <test-wrapper/>
                </div>
            </div>
            <div class="course-settings" v-else>
                <create-course-form @change="handleCourseFormChange"/>
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
        padding: 12px 24px 20px 24px;
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

    .step-type {
        padding: 24px 16px;
        border-bottom: 1px solid #cacaca;
    }

    .step-content, .course-settings {
        display: flex;
        flex-direction: column;
        margin-left: -1px;
        width: 100%;
    }

    .list-enter-active, .list-leave-active {
        transition: all .2s;
        transform: scale(1);
    }

    .list-enter, .list-leave-to {
        transform: scale(0);
    }

    .quillWrapper {
        margin-top: -1px;
        height:596px;
    }

    .testing-wrapper {
        display: flex;
        flex: 1;
        padding: 0 16px 16px;
        flex-direction: column;
    }
</style>