<script>
  import SalesFeed from '../com/manager/Feed/Sales.vue';
  import ManagerInfoCard from '../com/manager/Card/Info.vue';

  export default {
    components: {
      SalesFeed,
      ManagerInfoCard
    },
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
    <page-container v-loading.body="isDataLoading" flex-content fluid>
        <div slot="header">
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="hasManager">
                <el-breadcrumb-item :to="{ path: '/managers' }">Менеджеры</el-breadcrumb-item>
                <el-breadcrumb-item>{{manager.firstName + ' ' + manager.lastName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="manager-card">
            <div class="info">
                <manager-info-card v-if="hasManager" :manager="manager"/>
            </div>
            <div class="feed">
                <sales-feed v-if="hasManager" :sales="manager.deals"/>
            </div>
        </div>
    </page-container>
</template>

<style scoped>
    .manager-card {
        flex: 1;
        display: flex;
    }

    .info {
        width: 400px;
        border-right: 1px solid #cacaca;
    }

    .feed {
        width: 100%;
        overflow: auto;
        background-color: #eee;
    }
</style>