<script>
  export default {
    mounted() {
      this.loadDashboardData();
    },
    data () {
      return {
        isDataLoading: false,
        funnelItems: [],
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
        const hasPeriod = dateFrom !== null && dateTo !== null;

        const fromMoment = dateFrom && new Date(dateFrom).toISOString();
        const toMoment = dateTo && new Date(dateTo).toISOString();

        this.isDataLoading = true;
        const response = hasPeriod
          ? await this.$locator.Api.get(`api/dashboards?fromMoment=${fromMoment}&toMoment=${toMoment}`)
          : await this.$locator.Api.get(`api/dashboards`);
        this.funnelItems = response[0].data;
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
                <el-card class="box-card">
                    <line-chart></line-chart>
                </el-card>
                <el-card class="box-card" :body-style="{display: 'flex', flex: 1}">
                    <div slot="header">
                        <span>Воронка продаж</span>
                    </div>
                    <div v-loading.body="isDataLoading" class="loader">
                        <funnel-dashboard :items="funnelItems"/>
                    </div>
                </el-card>
            </div>
            <div class="row">
                <el-card class="box-card">
                    <div slot="header">
                        <span>Dashboard 3</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header">
                        <span>Dashboard 4</span>
                    </div>
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