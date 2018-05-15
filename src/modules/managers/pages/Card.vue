<script>
  export default {
    mounted() {
      this.loadManager();
    },
    data() {
      return {
        id: this.$router.currentRoute.params.id,
        isDataLoading: false,
        manager: null
      }
    },
    computed: {
      hasManager() {
        return this.manager !== null;
      }
    },
    methods: {
      async loadManager() {
        this.isDataLoading = true;
        const { data: manager } = await this.$locator.Api.get('managerUsingGET', { id: this.id });
        this.manager = manager;
        this.isDataLoading = false;
      }
    }
  }
</script>

<template>
    <page-container v-loading.body="isDataLoading">
        <div slot="header">
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="hasManager">
                <el-breadcrumb-item :to="{ path: '/managers' }">Менеджеры</el-breadcrumb-item>
                <el-breadcrumb-item>{{manager.firstName + ' ' + manager.lastName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        Страница менеджеров
    </page-container>
</template>