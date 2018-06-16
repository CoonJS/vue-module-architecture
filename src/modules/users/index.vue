<script>
  import UsersList from './pages/usersList.vue';

  export default {
    components: {
      UsersList
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
    <users-list v-if="access.canViewUsers"/>
    <access-denied v-else/>
</template>

<style scoped>

</style>