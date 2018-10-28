<script>
import SaleCard from '../com/manager/Feed/Card/Sale.vue';
import ManagerInfoCard from '../com/manager/Card/Info.vue';

export default {
  components: {
    SaleCard,
    ManagerInfoCard
  },
  data() {
    return {
      period: {
        dateFrom: null,
        dateTo: new Date()
      },
      id: this.$router.currentRoute.params.id,
      isDataLoading: false,
      manager: null,
      sales: [],
      loading: false,
      salesPage: 0,
      totalSize: 0,
      groupedStatuses: {},
      selectedStatuses: []
    };
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
      });
    },
    isShowPaginationButton() {
      const sales = this.sales;
      return (sales.length > 0) && (sales.length !== this.totalSize);
    },
    fromMoment() {
      const { dateFrom } = this.period;
      return dateFrom && dateFrom.toISOString();
    },
    toMoment() {
      const { dateTo } = this.period;
      return dateTo === null ? '' : dateTo.toISOString();
    }
  },
  watch: {
    sales(val) {
      this.groupedStatuses = this.arrayUtils.groupBy(val, prop => {
        return prop.status;
      });

      this.selectedStatuses = Object.keys(this.groupedStatuses);
    },
    fromMoment() {
      this.sales = [];
      this.loadDeals();
    },
    toMoment() {
      this.sales = [];
      this.loadDeals();
    }
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
  methods: {
    async loadManager() {
      this.isDataLoading = true;
      const { data: manager } = await this.api.get('managerUsingGET', { id: this.id });
      this.manager = manager;
      this.isDataLoading = false;
    },
    async loadDeals() {
      this.loading = true;
      const { fromMoment, toMoment } = this;

      const { data: dealsResponse } = await this.api.get('dealsUsingGET',
        { id: this.id },
        { size: 50, page: this.salesPage, sort: 'createdMoment,desc', fromMoment, toMoment }
      );

      this.sales = [ ...this.sales, ...dealsResponse.content ];
      this.totalSize = dealsResponse.totalElements;
      this.loading = false;
    },

    handlePaginationClick() {
      this.salesPage = this.salesPage + 1;
      this.loadDeals();
    }
  }
};
</script>

<template>
  <page-container 
    v-loading.body="isDataLoading" 
    flex-content 
    fluid
  >
    <div 
      slot="header" 
      class="header"
    >
      <div class="left-filters">
        <el-breadcrumb 
          v-if="hasManager" 
          separator-class="el-icon-arrow-right"
        >
          <el-breadcrumb-item :to="{ path: '/' }">Отчеты</el-breadcrumb-item>
          <el-breadcrumb-item>{{ `${manager.firstName} ${manager.lastName || ''}` }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-date-picker
          v-model="period.dateFrom"
          size="mini"
          type="datetime"
          placeholder="От"
          format="dd:MM:yyyy HH:mm:ss"
          style="margin-left: 16px; width: 180px"
        />
        <el-date-picker
          v-model="period.dateTo"
          size="mini"
          type="datetime"
          placeholder="До"
          format="dd:MM:yyyy HH:mm:ss"
          style="margin-left: 8px; width: 180px"
        />
      </div>

      <div class="right-filters">
        <el-checkbox-group 
          v-model="selectedStatuses" 
          size="mini"
        >
          <el-checkbox-button
            v-for="status in statuses"
            :key="status"
            :label="status"
          >
            {{ status }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <div class="manager-card">
      <div class="info">
        <manager-info-card
          v-if="hasManager"
          :manager="manager"
          :date-from="fromMoment"
          :date-to="toMoment"
        />
      </div>
      <div class="feed">
        <div class="feed-wrapper">
          <div 
            v-for="sale in filteredSales" 
            :key="sale.id" 
            class="sale-card"
          >
            <sale-card :sale="sale" />
          </div>
          <div 
            v-if="isShowPaginationButton" 
            class="pagination-action"
          >
            <el-button
              :loading="loading"
              :disabled="loading"
              type="info"
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

    .left-filters {
        display: flex;
        align-items: center;
    }

    .right-filters {
        display: flex;
        align-items: center;
    }

    .right-filters .el-tag {
        margin-right: 16px;
    }

    .info {
        overflow: auto;
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
