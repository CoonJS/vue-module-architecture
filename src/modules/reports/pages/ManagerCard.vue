<script>
  import SaleCard from '../com/manager/Feed/Card/Sale.vue';
  import ManagerInfoCard from '../com/manager/Card/Info.vue';
  import ActivityFeed from '../com/manager/Feed/Activity.vue';
  import FeedTabs from '../com/manager/Feed/Tabs/Default.vue';

  export default {
    components: {
      FeedTabs,
      SaleCard,
      ActivityFeed,
      ManagerInfoCard
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
      /** @type {ArrayUtils}*/
      this.arrayUtils = this.$locator.ArrayUtils;
    },
    mounted() {
      this.loadManager();
      this.loadDeals();
    },
    data() {
      return {
        //manages
        id: this.$router.currentRoute.params.id,
        isDataLoading: false,
        manager: null,
        //sales
        sales: [],
        loading: false,
        salesPage: 0,
        totalSize: 0,
        groupedStatuses: {},
        selectedStatuses: []
      }
    },
    computed: {
      hasManager() {
        return this.manager !== null;
      },
      statuses() {
        return Object.keys(this.groupedStatuses);
      },
      filteredSales() {
        return this.sales.filter(sale => {
          return this.selectedStatuses.includes(sale.status);
        })
      },
      isShowPaginationButton() {
        const sales = this.sales;
        return (sales.length > 0) && (sales.length !== this.totalSize);
      }
    },
    watch: {
      sales(val) {
        this.groupedStatuses = this.arrayUtils.groupBy(val, prop => {
          return prop.status;
        });

        this.selectedStatuses = Object.keys(this.groupedStatuses);
      }
    },
    methods: {
      async loadManager() {
        this.isDataLoading = true;
        const { data: manager } = await this.api.get('managerUsingGET', { id: this.id });
        this.manager = manager;
        this.isDataLoading = false;
      },
      async loadDeals() {
        this.loading = true;
        const { data: dealsResponse } = await this.api.get('dealsUsingGET', { id: this.id }, { size: 100, page: this.salesPage });
        this.sales = [ ...this.sales, ...dealsResponse.content ];
        this.totalSize = dealsResponse.totalElements;
        this.loading = false;
      },
      async handlePaginationClick() {
        this.dealsLoading = true;
        this.salesPage = this.salesPage + 1;
        await this.loadDeals();
        this.dealsLoading = false;
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
            </el-breadcrumb>

            <div class="right-filters">
                <el-tag type="info" size="mini">
                    Всего сделок: <strong>{{totalSize}}</strong>
                </el-tag>
                <el-checkbox-group v-model="selectedStatuses" size="mini">
                    <el-checkbox-button
                        :key="status"
                        v-for="status in statuses"
                        :label="status"
                    >
                        {{`${status} (${groupedStatuses[status].length})`}}
                    </el-checkbox-button>
                </el-checkbox-group>
            </div>
        </div>
        <div class="manager-card">
            <div class="info">
                <manager-info-card v-if="hasManager" :manager="manager"/>
            </div>
            <div class="feed">
                <div class="feed-wrapper">
                    <div class="sale-card" v-for="sale in filteredSales" :key="sale.id">
                        <sale-card :sale="sale"/>
                    </div>
                    <div class="pagination-action" v-if="isShowPaginationButton">
                        <el-button
                                :loading="loading"
                                :disabled="loading"
                                @click="handlePaginationClick"
                        >
                            {{ loading ? 'Загрузка...' : 'Загрузить еще' }}
                        </el-button>
                    </div>
                </div>
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

    .right-filters {
        display: flex;
        align-items: center;
    }

    .right-filters .el-tag {
        margin-right: 16px;
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

    .feed-wrapper {
        padding: 16px;
    }

    .sale-card {
        margin: 8px 0;
    }

    .sale-card:first-child {
        margin-top: 0;
    }

    .sale-card:last-child {
        margin-bottom: 0;
    }

    .pagination-action {
        display: flex;
        justify-content: center;
    }

    .pagination-action .el-button {
        width: 100%;
    }
</style>
