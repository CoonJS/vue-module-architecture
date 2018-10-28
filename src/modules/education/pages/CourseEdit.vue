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
  data () {
    return {
      id: this.$route.params.id,
      data: null,
      course: null,
      type: 'article',
      steps: [
        { index: 0, content: null, title: '' }
      ],
      selectedStepIdx: 0,
      loading: false,
      isPublishing: false
    };
  },
  computed: {
    hasCourse() {
      return this.course !== null;
    },
    hasData() {
      return this.data !== null;
    }
  },
  created() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  mounted() {
    this.loadCourse();
  },
  methods: {
    async loadCourse() {
      const { data: course } = await this.api.get('courseUsingGET', { id: this.id });
      this.course = course;
      this.data = {
        title: course.title,
        description: course.description,
        imageFileId: course.imageFileId
      };
    },
    async saveCourse() {
      const { title, description, imageFileId } = this.data;

      this.loading = true;
      await this.api.put('updatedCourseUsingPUT', { id : this.id }, {
        title,
        description,
        imageFileId,
        status: 'DRAFT'
      });
      this.loading = false;

      this.$router.push('/courses');

    },
    async publishCourse() {
      const { title, description, image } = this.data;
      const newCourse = {
        ...this.course,
        ...{ status: 'PUBLISHED' },
        ...{ title, description, image }
      };

      this.isPublishing = true;

      try {
        await this.api.put('updatedCourseUsingPUT', { id: this.id }, newCourse);
        this.redirectToCoursesPage();
      } catch (e) {
        this.isPublishing = false;
      }

      this.isPublishing = false;
    },
    handleCourseFormChange(data) {
      this.data = data;
    },
    addStep() {
      this.steps = [...this.steps, { index: this.steps.length, content: null, title: '' }];
    },
    redirectToCoursesPage() {
      this.$router.push('/courses');
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
      <div class="header-title">
        <h3 v-if="hasCourse">
          {{ course.title }}
        </h3>
        <i 
          v-else 
          class="el-icon-loading"
        />
        <el-tag 
          v-if="hasCourse && course.status === 'DRAFT'" 
          type="info" 
          size="mini"
        >
          Черновик
        </el-tag>
      </div>
      <div 
        v-if="hasCourse" 
        class="header-actions"
      >
        <el-button
          :loading="isPublishing"
          size="mini"
          type="primary"
          icon="el-icon-upload"
          @click="publishCourse"
        >
          Опубликовать
        </el-button>
        <el-button
          :loading="loading"
          type="success"
          size="mini"
          @click="saveCourse"
        >
          Сохранить
        </el-button>
      </div>
    </div>
    <div class="body">
      <div class="steps">
        <transition-group name="list">
          <step
            v-for="(step, idx) in steps"
            :key="step.index"
            :content="step.content"
            :title="step.title"
            :number="idx"
            :active="idx === selectedStepIdx"
            @click="handleStepClick"
            @remove="handleRemove"
          />
        </transition-group>
        <el-tooltip 
          content="Добавить шаг" 
          placement="top"
        >
          <div 
            class="add-step step" 
            @click="addStep"
          >
            <i class="el-icon-plus" />
          </div>
        </el-tooltip>
      </div>
      <div 
        v-if="selectedStepIdx !== 0" 
        class="step-content"
      >
        <div class="step-title">
          <div>
            <span>Название:</span>
          </div>
          <el-input 
            v-model="steps[selectedStepIdx].title" 
            size="mini"
          />
        </div>
        <div class="step-type">
          <el-radio-group v-model="type">
            <el-radio label="article">Статья</el-radio>
            <el-radio label="test">Тест</el-radio>
          </el-radio-group>
        </div>
        <div 
          v-if="type === 'article'" 
          class="editor-wrapper"
        >
          <VueEditor v-model="steps[selectedStepIdx].content" />
        </div>
        <div 
          v-if="type === 'test'" 
          class="testing-wrapper"
        >
          <test-wrapper />
        </div>
      </div>
      <div 
        v-else 
        class="course-settings"
      >
        <create-course-form 
          v-if="hasData" 
          :data="data" 
          @change="handleCourseFormChange"
        />
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

        .header-title {
            display: flex;
            align-items: center;

            .el-tag {
                margin-left: 8px;
            }
        }
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

    .step-title {
        font-size: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid #cacaca;

        .el-input {
            max-width: 300px;
            margin-top: 8px;
        }
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

    .header-actions {
        display: flex;
        align-items: center;
    }
</style>