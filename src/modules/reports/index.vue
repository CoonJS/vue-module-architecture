<script>
import ReportsPage from './pages/Reports.vue';

export default {
  components: {
    ReportsPage
  },
  data () {
    return {
      access: {
        canViewReports: this.api.hasAccess('VIEW_REPORTS')
      }
    };
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  mounted() {
    if (!this.access.canViewReports) {
      this.redirectToProfile();
    }
  },
  methods: {
    redirectToProfile() {
      this.$router.push('/profile');
    }
  }
};

</script>

<template>
  <reports-page v-if="access.canViewReports" />
  <access-denied v-else />
</template>
