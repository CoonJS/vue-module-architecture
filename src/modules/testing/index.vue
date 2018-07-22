<script>
  import TestsPage from './pages/Tests.vue';

  export default {
    components: {
      TestsPage
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data() {
      return {
        access: {
          canViewTests: this.api.hasAccess('TESTS_USER') || this.api.hasAccess('TESTS_ADMIN')
        }
      };
    }
  }
</script>

<template>
    <tests-page v-if="access.canViewTests"/>
    <access-denied v-else/>
</template>
