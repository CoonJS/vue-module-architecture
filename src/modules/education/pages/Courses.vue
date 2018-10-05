<script>

  export default {
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    mounted() {
      this.loadCourses();
    },
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
        return this.courses.filter(course => course.title.indexOf(searchString) !== -1);
      }
    },
    methods: {
      async loadCourses() {
        this.loading = true;
        const { data: courses } = await this.api.get('coursesUsingGET');
        this.courses = courses;
        this.loading = false;
      },
      redirectToCreateCoursePage() {
        this.$router.push('education/new');
      },
    }
  }
</script>

<template>
    <page-container v-loading.body="loading">
        <div slot="header" class="header">
            <h3>Обучение</h3>
            <el-button
                type="success"
                size="mini"
                @click="redirectToCreateCoursePage"
            >
                Создать курс
            </el-button>
        </div>
        <h1 class="search-title">Поиск курсов</h1>
        <div class="search">
            <el-input v-model="search" size="medium" placeholder="Поиск курсов...">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div class="courses">
            <div v-for="course in filteredCourses" :key="course.id">
                <div class="card">
                    <img class="img" :src="course.image" :alt="course.title" width="180px" height="180px">
                    <div class="title">
                        <span>{{course.title}}</span>
                    </div>
                    <div class="description">
                        <span>{{course.description}}</span>
                    </div>
                </div>
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

    .courses {
        display: flex;
    }

    .search-title {
        padding: 24px;
        font-weight: normal;
        text-align: center;
        color: rgba(0,0,0, .2);
        text-transform: uppercase;
    }

    .search {
        display: flex;
        justify-content: center;
        padding: 16px;

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
        padding: 4px 12px;
        cursor: pointer;
        width: 200px;
        background: #4a84c217;
        border: 1px solid #eee;

        .img {
            border: 1px dashed #eee;
        }

        &:hover {
            box-shadow: 4px 4px 4px #eee;
        }

        .title {
            width: 100%;
            font-size: 12px;
            padding: 10px 12px;
            font-weight: bold;
            border-top: 1px solid #eee;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .description {
            width: 100%;
            background: rgba(255,255,255, .4);
            padding: 16px;
            font-size: 12px;
            color: #948c8c;
            overflow-y: auto;
            height: 80px;
        }
    }
</style>