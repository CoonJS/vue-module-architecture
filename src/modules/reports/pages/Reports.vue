<script>
import FunnelDashboard from '../com/dashboard/Funnel.vue';
import NoDataDashboard from '../com/dashboard/NoData.vue';
import ManagersTable from '../com/dashboard/Managers.vue';
import SaleVolumeDashboard from '../com/dashboard/SaleVolume.vue';

export default {
  components: {
    ManagersTable,
    FunnelDashboard,
    NoDataDashboard,
    SaleVolumeDashboard
  },
  data () {
    return {
      access: {
        canViewReport: this.api.hasAccess('VIEW_REPORTS')
      },
      isDataLoaded: false,
      isDataLoading: false,
      funnelItems: [],
      chartData: [],
      managerData: [],
      period: {
        dateFrom: null,
        dateTo: null
      },
      preset: 'ALL'
    };
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
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  mounted() {
    this.loadDashboardData();
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
      this.managerData = data[2].data;

      this.isDataLoaded = true;
      this.isDataLoading = false;
    },
    setPeriod(preset) {
      if (preset === 'ALL') {

        this.period = {
          dateFrom: null,
          dateTo: null
        };
      }

      if (preset === 'YEAR') {
        const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);

        this.period = {
          dateFrom: firstDayOfYear,
          dateTo: new Date(new Date().getFullYear(), 11, 31)
        };
      }

      if (preset === 'MONTH') {
        const date = new Date();
        const dateFrom = new Date(date.getFullYear(), date.getMonth(), 1);
        const dateTo = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        this.period = { dateFrom, dateTo };
      }

      if (preset === 'WEEK') {
        const dateFrom = new Date();
        const dayFrom = dateFrom.getDay(),
          diffFrom = dateFrom.getDate() - dayFrom + (dayFrom === 0 ? -6:1);
        dateFrom.setDate(diffFrom);
        dateFrom.setHours(0);
        dateFrom.setMinutes(0);
        dateFrom.setSeconds(0);

        const lastDayOfWeek = new Date();

        const last = dateFrom.getDate() + 6;

        lastDayOfWeek.setDate(last);
        lastDayOfWeek.setHours(23);
        lastDayOfWeek.setMinutes(59);
        lastDayOfWeek.setSeconds(59);

        const dateTo = new Date(lastDayOfWeek);

        this.period = {
          dateFrom,
          dateTo
        };
      }

      if (preset === 'DAY') {
        const dateFrom = new Date();
        dateFrom.setHours(0);
        dateFrom.setMinutes(0);
        dateFrom.setSeconds(0);

        const dateTo = new Date();
        dateTo.setHours(23);
        dateTo.setMinutes(59);
        dateTo.setSeconds(59);


        this.period = {
          dateFrom,
          dateTo
        };
      }
    }
  }
};
</script>

<template>
  <page-container 
    v-if="access.canViewReport"
    width="1440px"
  >
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
      <el-radio-group 
        v-model="preset" 
        size="mini"
      >
        <el-radio-button label="ALL">Все время</el-radio-button>
        <el-radio-button label="YEAR">Год</el-radio-button>
        <el-radio-button label="MONTH">Месяц</el-radio-button>
        <el-radio-button label="WEEK">Неделя</el-radio-button>
        <el-radio-button label="DAY">День</el-radio-button>
      </el-radio-group>
    </div>
    <div class="dashboards">
      <div class="row">
        <el-card 
          v-loading.body="isDataLoading" 
          :body-style="{display: 'flex', flex: 1}" 
          class="box-card"
        >
          <funnel-dashboard 
            v-if="hasFunnelData" 
            :items="funnelItems"
          />
          <no-data-dashboard v-else />
        </el-card>
        <el-card 
          v-loading.body="isDataLoading" 
          class="box-card"
        >
          <sale-volume-dashboard 
            v-if="hasChartData" 
            :items="chartData"
          />
          <no-data-dashboard v-else />
        </el-card>
      </div>
      <div class="row">
        <el-card class="box-card fluid full-height">
          <managers-table :items="managerData" />
        </el-card>
      </div>
    </div>
  </page-container>
  <access-denied v-else />
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
    .box-card.full-height {
        height: 100%;
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