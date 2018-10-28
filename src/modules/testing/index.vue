<script>
import TestsPage from './pages/Tests.vue';

export default {
  components: {
    TestsPage
  },
  data() {
    return {
      access: {
        canViewTests: this.api.hasAccess('TESTS_USER') || this.api.hasAccess('TESTS_ADMIN')
      }
    };
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
};
</script>

<template>
  <tests-page v-if="access.canViewTests" />
  <access-denied v-else />
</template>
