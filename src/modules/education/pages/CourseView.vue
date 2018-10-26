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
        course: null,
        isRemoving: false
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
      async removeCourse() {
        this.isRemoving = true;
        try {
          await this.api.delete('deleteCourseUsingDELETE', { id: this.course.id });
          this.redirectToCoursesPage();
        } catch (e) {
          this.isRemoving = false;
        }
        this.isRemoving = false;
      },
      redirectToCoursesPage() {
        this.$router.push('/courses');
      },
      redirectToEditCoursePage() {
        this.$router.push(`/courses/edit/${this.course.id}`);
      },
      showConfirmMessage() {
        this.$confirm('Вы действительно хотите удалить курс?', 'Удаление курса', {
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
          type: 'error'
        })
          .then(() => this.removeCourse())
          .catch(() => {});
      }
    }
  }
</script>

<template>
    <page-container flexColumn>
        <div slot="header" class="header">
            <div class="left">
                <el-button circle size="mini" icon="el-icon-arrow-left" @click="redirectToCoursesPage"/>
                <h3 v-if="hasCourse">{{course.title}}</h3>
                <i v-else class="el-icon-loading"/>
                <el-tag v-if="hasCourse && course.status === 'DRAFT'" type="info" size="mini">Черновик</el-tag>
            </div>
            <div v-if="hasCourse">
                <el-tooltip class="item" effect="dark" content="Редактировать курс" placement="top-start">
                    <el-button
                            v-if="course.status === 'DRAFT'"
                            class="edit"
                            circle size="mini"
                            icon="el-icon-edit"
                            @click="redirectToEditCoursePage"/>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Удалить курс" placement="top-start">
                    <el-button
                            circle
                            class="remove"
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            :loading="isRemoving"
                            @click="showConfirmMessage"/>
                </el-tooltip>
            </div>
        </div>
        <div v-if="hasCourse">
            <img :src="course.image" :alt="course.title"/>
        </div>
    </page-container>
</template>

<style lang="less" scoped>
    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;

            .el-tag {
                margin-left: 8px;
            }
        }

        .el-button {
            margin-right: 8px;
        }

        .edit {
            margin-right: 4px;
        }

        .remove {
            margin-left: 0;
        }
    }
</style>