<script>
  import ReportsPage from './pages/Reports.vue';

  export default {
    components: {
      ReportsPage
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data () {
      return {
        access: {
          canViewReports: this.api.hasAccess('VIEW_REPORTS')
        }
      }
    }
  };

</script>

<template>
    <reports-page v-if="access.canViewReports"/>
    <access-denied v-else/>
</template>
