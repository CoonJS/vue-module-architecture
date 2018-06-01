<script>
    import FunnelDashboard from './com/dashboard/Funnel.vue';
    import SaleVolumeDashboard from './com/dashboard/SaleVolume.vue';

  export default {
    components: {
      FunnelDashboard,
      SaleVolumeDashboard
    },
    mounted() {
      this.loadDashboardData();
    },
    data () {
      return {
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
    methods: {
      async loadDashboardData() {
        const { dateFrom, dateTo } = this.period;

        const fromMoment = dateFrom && new Date(dateFrom).toISOString();
        const toMoment = dateTo && new Date(dateTo).toISOString();

        this.isDataLoading = true;

        const { data } = await this.$locator.Api.get('currentAccountDashboardsUsingGET', {}, {
          fromMoment,
          toMoment
        });

        this.funnelItems = data[0].data;
        this.chartData = data[1].data;

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
                type="datetime"
                placeholder="От"
            />
            <el-date-picker
                v-model="period.dateTo"
                type="datetime"
                placeholder="До"
            />
        </div>
        <div class="dashboards">
            <div class="row">
                <el-card class="box-card" :body-style="{display: 'flex', flex: 1}">
                    <div v-loading.body="isDataLoading" class="loader">
                        <funnel-dashboard :items="funnelItems"/>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <sale-volume-dashboard :items="chartData"/>
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