<script>
  import RoleList from './pages/RoleList.vue';

  export default {
    components: {
      RoleList
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data() {
      return {
        access: {
          canViewRoles: this.api.hasAccess('VIEW_ROLES')
        }
      }
    }
  }
</script>

<template>
    <role-list v-if="access.canViewRoles"/>
    <access-denied v-else/>
</template>
