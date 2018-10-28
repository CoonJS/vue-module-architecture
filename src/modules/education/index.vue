<script>
import CoursesPage from './pages/Courses.vue';

export default {
  components: {
    CoursesPage
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  }
};
</script>

<template>
  <courses-page />
</template>
