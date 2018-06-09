<script>
  import FunnelDashboard from './com/dashboard/Funnel.vue';
  import NoDataDashboard from './com/dashboard/NoData.vue';
  import ManagersTable from './com/dashboard/Managers.vue';
  import SaleVolumeDashboard from './com/dashboard/SaleVolume.vue';

  export default {
    components: {
      ManagersTable,
      FunnelDashboard,
      NoDataDashboard,
      SaleVolumeDashboard
    },
    mounted() {
      this.loadDashboardData();
    },
    data () {
      return {
        isDataLoaded: false,
        isDataLoading: false,
        funnelItems: [],
        chartData: [],
        period: {
          dateFrom: null,
          dateTo: null
        }
      }
    },
    watch: {
      period: {
        deep: true,
        handler() {
          this.loadDashboardData();
        }
      }
    },
    computed: {
      hasChartData() {
        const items = this.chartData;
        return this.isDataLoaded && Array.isArray(items) && items.length > 0;
      },
      hasFunnelData() {
        const items = this.funnelItems;
        return this.isDataLoaded && Array.isArray(items) && items.length > 0;
      }
    },
    methods: {
      async loadDashboardData() {
        const { dateFrom, dateTo } = this.period;

        const fromMoment = dateFrom && new Date(dateFrom).toISOString();
        const toMoment = dateTo && new Date(dateTo).toISOString();

        this.isDataLoading = true;
        this.isDataLoaded = false;

        const { data } = await this.$locator.Api.get('currentAccountDashboardsUsingGET', {}, {
          fromMoment,
          toMoment
        });

        this.funnelItems = data[0].data;
        this.chartData = data[1].data;

        this.isDataLoaded = true;
        this.isDataLoading = false;
      }
    }
  }
</script>

<template>
    <page-container>
        <div slot="header">
            <el-date-picker
                v-model="period.dateFrom"
                size="medium"
                type="datetime"
                placeholder="От"
                format="yyyy:MM:dd HH:mm:ss"
            />
            <el-date-picker
                v-model="period.dateTo"
                size="medium"
                type="datetime"
                placeholder="До"
                format="yyyy:MM:dd HH:mm:ss"
            />
        </div>
        <div class="dashboards">
            <div class="row">
                <el-card class="box-card" :body-style="{display: 'flex', flex: 1}" v-loading.body="isDataLoading">
                    <funnel-dashboard v-if="hasFunnelData" :items="funnelItems"/>
                    <no-data-dashboard v-else="isDataLoaded"/>
                </el-card>
                <el-card class="box-card" v-loading.body="isDataLoading">
                    <sale-volume-dashboard v-if="hasChartData" :items="chartData"/>
                    <no-data-dashboard v-else="isDataLoaded"/>
                </el-card>
            </div>
            <div class="row">
                <el-card class="box-card fluid">
                    <managers-table/>
                </el-card>
            </div>
        </div>
    </page-container>
</template>

<style scoped>
    .box-card {
        display: flex;
        flex-direction: column;
        width: 50%;
        margin-right: 12px;
        height: 400px;
    }

    .box-card.fluid {
        width: 100%;
    }

    .box-card:last-child {
        margin-right: 0;
    }

    .loader {
        flex: 1;
        display: flex;
        align-items: stretch;
    }

    .row {
      display: flex;
      margin-bottom: 12px;
    }

    .row:last-child {
        margin-bottom: 0;
    }
</style>