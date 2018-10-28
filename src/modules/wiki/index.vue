<script>
import WikiPage from './pages/Wiki.vue';

export default {
  components: {
    WikiPage
  },
  data () {
    return {
      access: {
        canViewWiki: this.api.hasAccess('VIEW_WIKI')
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
  <wiki-page v-if="access.canViewWiki" />
  <access-denied v-else />
</template>
