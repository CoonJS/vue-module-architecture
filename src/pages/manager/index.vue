<script>
    import ManagerTable from './com/Table/Manager.vue';

  export default {
    components: {
      ManagerTable
    },
    data() {
      return {
      };
    }
  }
</script>


<template>
    <div>
        <h1>{{`Manager ${$route.params.managerId}`}}</h1>
        <ManagerTable />
    </div>
</template>