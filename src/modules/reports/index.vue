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
      // this.loadDashboardData();
    },
    data () {
      return {
        isDataLoaded: false,
        isDataLoading: false,
        funnelItems: [],
        chartData: [],
        period: {
          dateFrom: null,
          dateTo: new Date()
        },
        preset: 'ALL'
      }
    },
    watch: {
      period: {
        deep: true,
        handler() {
          this.loadDashboardData();
        }
      },
      preset: {
        handler(val) {
          this.setPeriod(val);
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
      },
      setPeriod(preset) {
        if (preset === 'ALL') {
            this.period = {
              dateFrom: null,
              dateTo: new Date()
            };
        }

        if (preset === 'YEAR') {
          const yearAgo = new Date();
          yearAgo.setTime(yearAgo.getTime() - 3600 * 1000 * 24 * 365);

          this.period = {
            dateFrom: yearAgo,
            dateTo: new Date()
          };
        }

        if (preset === 'MONTH') {
          const monthAgo = new Date();
          monthAgo.setTime(monthAgo.getTime() - 3600 * 1000 * 24 * 30);

          this.period = {
            dateFrom: monthAgo,
            dateTo: new Date()
          };
        }

        if (preset === 'WEEK') {
          const weekAgo = new Date();
          weekAgo.setTime(weekAgo.getTime() - 3600 * 1000 * 24 * 7);

          this.period = {
            dateFrom: weekAgo,
            dateTo: new Date()
          };
        }

        if (preset === 'DAY') {
          const today = new Date();
          today.setTime(today.getTime() - 3600 * 1000 * 24);

          this.period = {
            dateFrom: today,
            dateTo: new Date()
          };
        }
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
                format="dd:MM:yyyy HH:mm:ss"
            />
            <el-date-picker
                v-model="period.dateTo"
                size="medium"
                type="datetime"
                placeholder="До"
                format="dd:MM:yyyy HH:mm:ss"
            />
            <el-radio-group v-model="preset" size="mini">
                <el-radio-button label="ALL">Все время</el-radio-button>
                <el-radio-button label="YEAR">Год</el-radio-button>
                <el-radio-button label="MONTH">Месяц</el-radio-button>
                <el-radio-button label="WEEK">Неделя</el-radio-button>
                <el-radio-button label="DAY">День</el-radio-button>
            </el-radio-group>
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

    .el-radio-group {
        margin-left: 16px;
    }

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