<script>

import CreateCourseForm from '../src/com/Form/CreateCourse.vue';

export default {
  components: {
    CreateCourseForm
  },
  data() {
    return {
      search: '',
      courses: [],
      saving: false,
      loading: false,
      isShowCreateCourseModal: false,
      data: {
        title: null,
        description: null,
        imageFileId: null
      }
    };
  },
  computed: {
    filteredCourses() {
      const searchString = this.search.trim();
      const hasCourseMatch = course => course.title.toLowerCase().indexOf(searchString) !== -1;
      return this.courses.filter(hasCourseMatch);
    },
    hasNoSearchedCourses() {
      return this.search.trim().length !== 0 && this.filteredCourses.length === 0;
    },
    isDisabledSaveCourseButton() {
      const title = this.data.title;
      return title === null || title.trim() === '';
    }
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  mounted() {
    this.loadCourses();
  },
  methods: {
    async loadCourses() {
      this.loading = true;
      const { data: courses } = await this.api.get('coursesUsingGET');
      this.courses = courses;
      this.loading = false;
    },
    async saveCourse() {
      const { title, description, imageFileId } = this.data;

      this.saving = true;
      const { data: course } = await this.api.post('createdCourseUsingPOST', {}, {
        title,
        description,
        imageFileId
      });
      this.saving = false;

      this.editCourseById(course.id);
    },
    async removeCourseById(id) {
      try {
        await this.api.delete('deleteCourseUsingDELETE', { id });
        this.loadCourses();
      } catch (e) {
        throw new Error(e);
      }
    },
    editCourseById(id) {
      this.$router.push(`/courses/edit/${id}`);
    },
    handleCourseFormChange(data) {
      this.data = data;
    },
    showConfirmRemoveMessage(id) {
      this.$confirm('Вы действительно хотите удалить курс?', 'Подтвердите удаление', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'error'
      }).then(() => {
        this.removeCourseById(id);
      }).catch(() => {});
    },
    showCreateCourseModal() {
      this.isShowCreateCourseModal = true;
    },
    closeCreateCourseModal() {
      this.isShowCreateCourseModal = false;
    }
  }
};
</script>

<template>
  <page-container flex-column>
    <div 
      slot="header" 
      class="header"
    >
      <h3>Обучение</h3>
      <el-button
        type="success"
        size="mini"
        @click="showCreateCourseModal"
      >
        Создать курс
      </el-button>
    </div>
    <h2 class="search-title">Поиск курсов</h2>
    <div class="search">
      <el-input 
        v-model="search" 
        size="medium" 
        placeholder="Поиск курсов..."
      >
        <i 
          slot="prefix" 
          class="el-input__icon el-icon-search"
        />
      </el-input>
    </div>
    <div 
      v-loading.body="loading" 
      class="courses"
    >
      <h3 
        v-if="hasNoSearchedCourses" 
        class="search-title"
      >
        {{ `Курсы с названием "${search}" не найдены` }}
      </h3>
      <div 
        v-for="course in filteredCourses" 
        :key="course.id"
      >
        <router-link :to="`/courses/${course.id}`">
          <div class="card">
            <div class="img-wrap">
              <img 
                :src="buildFileUrlById(course.imageFileId)"
                :alt="course.title" 
                width="180px" 
                height="180px"
              >
            </div>
            <div class="title">
              <span class="name">{{ course.title }}</span>
              <el-tag 
                v-if="course.status === 'DRAFT'" 
                type="info" 
                size="mini" 
                color="#fff"
              >
                Черновик
              </el-tag>
            </div>
            <div class="description">
              <span>{{ course.description }}</span>
              <div class="actions">
                <el-tooltip content="Редактировать">
                  <i
                    class="el-icon-edit"
                    @click.stop.prevent="editCourseById(course.id)"
                  />
                </el-tooltip>
                <el-tooltip content="Удалить">
                  <i
                    class="el-icon-delete"
                    @click.stop.prevent="showConfirmRemoveMessage(course.id)"
                  />
                </el-tooltip>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <el-dialog
      width="40%"
      title="Создание курса"
      :visible.sync="isShowCreateCourseModal"
    >
      <create-course-form
        :data="data"
        @change="handleCourseFormChange"
      />
      <div slot="footer">
        <el-button
          size="mini"
          @click="closeCreateCourseModal"
        >
          Отмена
        </el-button>
        <el-button
          type="primary"
          size="mini"
          :loading="saving"
          :disabled="isDisabledSaveCourseButton"
          @click="saveCourse"
        >
          Сохранить
        </el-button>
      </div>
    </el-dialog>
  </page-container>
</template>

<style scoped lang="less">
    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    a {
        text-decoration: none;
        color: #000;
    }

    .courses {
        overflow: auto;
        margin-top: 32px;
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        border-top: 2px solid #eee;
    }

    .search-title {
        width: 100%;
        padding: 12px;
        font-weight: normal;
        text-align: center;
        color: rgba(0,0,0, .2);
        text-transform: uppercase;
    }

    .search {
        display: flex;
        justify-content: center;
        padding: 12px;

        .el-input {
            width: 900px;
        }
    }

    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 16px;
        padding: 4px;
        cursor: pointer;
        width: 200px;
        background: #4a84c217;
        border: 1px solid #eee;

        .img-wrap {
            border: 2px solid #eee;
            padding: 4px;
            background: #fff;

            .actions {

              padding: 8px;
              position: absolute;
              top: 0;
              right: 0;
            }
        }

        &:hover {
            box-shadow: 4px 4px 4px #eee;
        }

        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            font-size: 12px;
            padding: 10px 12px;
            font-weight: bold;
            border-top: 1px solid #eee;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            .name {
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .description {
            position: relative;
            width: 100%;
            background: rgba(255,255,255, .4);
            padding: 16px;
            font-size: 12px;
            color: #948c8c;
            overflow: hidden;
            height: 80px;

            .actions {
              position: absolute;
              right: 8px;
              bottom: 8px;

              i {
                cursor: pointer;
                padding: 4px;
              }
            }
        }
    }
</style>
