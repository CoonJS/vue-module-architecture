<script>
  import SalesFeed from '../com/manager/Feed/Sales.vue';
  import ManagerInfoCard from '../com/manager/Card/Info.vue';
  import ActivityFeed from '../com/manager/Feed/Activity.vue';
  import FeedTabs from '../com/manager/Feed/Tabs/Default.vue';

  export default {
    components: {
      FeedTabs,
      SalesFeed,
      ActivityFeed,
      ManagerInfoCard
    },
    mounted() {
      this.loadManager();
    },
    data() {
      return {
        id: this.$router.currentRoute.params.id,
        isDataLoading: false,
        manager: null,
        feedType: 'activity'
      }
    },
    computed: {
      hasManager() {
        return this.manager !== null;
      },
      isShowSalesFeed() {
        return this.feedType === 'sales'
      },
      isShowActivityFeed() {
        return this.feedType === 'activity'
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
        <div slot="header" class="header">
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="hasManager">
                <el-breadcrumb-item :to="{ path: '/' }">Отчеты</el-breadcrumb-item>
                <el-breadcrumb-item>{{`${manager.firstName} ${manager.lastName || ''}`}}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="isShowSalesFeed">Сделки</el-breadcrumb-item>
                <el-breadcrumb-item v-if="isShowActivityFeed">Активность</el-breadcrumb-item>
            </el-breadcrumb>

            <feed-tabs v-model="feedType"/>
        </div>
        <div class="manager-card">
            <div class="info">
                <manager-info-card v-if="hasManager" :manager="manager"/>
            </div>
            <div class="feed">
                <sales-feed v-if="isShowSalesFeed && hasManager" :sales="manager.deals"/>
                <activity-feed v-if="isShowActivityFeed && hasManager" :events="manager.events"/>
            </div>
        </div>
    </page-container>
</template>

<style scoped>
    .manager-card {
        flex: 1;
        display: flex;
    }

    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .info {
        width: 500px;
        min-width: 500px;
        border-right: 1px solid #cacaca;
    }

    .feed {
        width: 100%;
        overflow: auto;
        background-color: #f5f5f5;
    }
</style>