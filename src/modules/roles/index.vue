<script>
import RoleList from './pages/RoleList.vue';

export default {
  components: {
    RoleList
  },
  data() {
    return {
      access: {
        canViewRoles: this.api.hasAccess('VIEW_ROLES')
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
  <role-list v-if="access.canViewRoles" />
  <access-denied v-else />
</template>
