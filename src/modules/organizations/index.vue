<script>
import OrgList from './pages/OrgList.vue';

export default {
  components: {
    OrgList
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  }
};
</script>

<template>
  <org-list />
</template>
