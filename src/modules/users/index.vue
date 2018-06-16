<script>
  import UserList from './pages/UserList.vue';

  export default {
    components: {
      UserList
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data () {
      return {
        access: {
          canViewUsers: this.api.hasAccess('VIEW_USERS'),
        }
      };
    }
  }
</script>

<template>
    <user-list v-if="access.canViewUsers"/>
    <access-denied v-else/>
</template>

<style scoped>

</style>