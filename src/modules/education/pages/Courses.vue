<script>

export default {
  data() {
    return {
      search: '',
      courses: [],
      loading: false
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
    redirectToCreateCoursePage() {
      this.$router.push('courses/new');
    },
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
        @click="redirectToCreateCoursePage"
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
                :src="`api/files/${course.imageFileId}`" 
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
            </div>
          </div>
        </router-link>
      </div>
    </div>
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
            width: 100%;
            background: rgba(255,255,255, .4);
            padding: 16px;
            font-size: 12px;
            color: #948c8c;
            overflow: hidden;
            height: 80px;
        }
    }
</style>