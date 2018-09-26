<script>

  export default {
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    methods: {
      redirectToCreateCoursePage() {
        this.$router.push('education/new');
      }
    }
  }
</script>

<template>
    <page-container>
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
    </page-container>
</template>

<style scoped>
    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>