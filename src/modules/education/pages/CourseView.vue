<script>
  export default {
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    mounted() {
      this.loadCourse();
    },
    data() {
      return {
        course: null
      };
    },
    computed: {
      hasCourse() {
        return this.course !== null;
      }
    },
    methods: {
      async loadCourse() {
        const { id } = this.$route.params;
        const { data: course } = await this.api.get('courseUsingGET', { id });

        this.course = course;
      },
      redirectToCoursesPage() {
        this.$router.push('/courses');
      }
    }
  }
</script>

<template>
    <page-container flexColumn>
        <div slot="header" class="header">
            <el-button circle size="mini" icon="el-icon-arrow-left" @click="redirectToCoursesPage"></el-button>
            <h3 v-if="hasCourse">{{course.title}}</h3>
            <i v-else class="el-icon-loading"/>
        </div>
        <div>
            <img :src="course.image" :alt="course.title"/>
        </div>
    </page-container>
</template>

<style lang="less" scoped>
    .header {
        display: flex;
        align-items: center;

        .el-button {
            margin-right: 16px;
        }
    }
</style>