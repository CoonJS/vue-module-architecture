<script>
import FeedActivity from '../Feed/Activity.vue';
import FunnelDashboard from '../dashboard/Funnel.vue';
import SaleVolumeDashboard from '../dashboard/SaleVolume.vue';

export default {
  components: {
    FeedActivity,
    FunnelDashboard,
    SaleVolumeDashboard
  },
  props: {
    manager: {
      type: Object,
      default() {
        return {};
      }
    },
    dateFrom: {
      type: [ Date, String ],
      default() {
        return Date.now();
      }
    },
    dateTo: {
      type: [ Date, String ],
      default() {
        return new Date();
      }
    }
  },
  data() {
    return {
      activeName: 'reports',
      funnelData: [],
      saleVolume: [],
      managerData: null,
      events: []
    };
  },
  computed: {
    hasManagerData() {
      return this.managerData !== null;
    }
  },
  watch: {
    activeName: {
      immediate: true,
      handler() {
        this.loadData();
      }
    },
    dateFrom() {
      this.loadData();
    },
    dateTo() {
      this.loadData();
    }
  },
  beforeCreate() {
    /**@type {Api}*/
    this.api = this.$locator.Api;
    /**@type {NumberUtils}*/
    this.number = this.$locator.NumberUtils;
  },
  methods: {
    async loadReports() {
      this.loading = true;
      const { dateFrom, dateTo } = this;
      const { data: reports } = await this.api.get('managerReportUsingGET',
        { id: this.manager.id },
        { fromMoment: dateFrom, toMoment: dateTo }
      );

      this.funnelData = reports[0].data;
      this.saleVolume = reports[1].data;
      this.managerData = reports[2].data[0];
      this.loading = false;
    },
    async loadActivity() {
      this.loading = true;
      const { data: events } = await this.api.get('managerEventsUsingGET',
        { id: this.manager.id },
        { size: 100, sort: 'createdMoment,desc', fromMoment: this.dateFrom, toMoment: this.dateTo }
      );
      this.events = events.content;
      this.loading = false;
    },
    loadData() {
      if (this.activeName === 'reports') {
        this.loadReports();
      }

      if (this.activeName === 'activity') {
        this.loadActivity();
      }
    }
  }
};
</script>

<template>
  <div>
    <div 
      v-if="hasManagerData" 
      class="common"
    >
      <div class="field">
        <span class="title">Имя:</span>
        <span>{{ managerData.name }}</span>
      </div>
      <div class="field">
        <span class="title">Количество сделок:</span>
        <span>{{ managerData.deals }}</span>
      </div>
      <div class="field">
        <span class="title">Сумма закрытых сделок:</span>
        <span>{{ number.format(managerData.closedDealsSum) }}</span>
      </div>
      <div class="field">
        <span class="title">Процент закрытых сделок:</span>
        <span>{{ managerData.closedPercent }}%</span>
      </div>
    </div>
    <div class="content">
      <el-tabs 
        v-model="activeName" 
        type="card"
      >
        <el-tab-pane 
          label="Отчеты" 
          name="reports"
        >
          <el-card shadow="hover">
            <funnel-dashboard :items="funnelData" />
          </el-card>
          <el-card 
            shadow="hover" 
            style="margin-top: 16px"
          >
            <sale-volume-dashboard :items="saleVolume" />
          </el-card>
        </el-tab-pane>
        <el-tab-pane 
          label="Активность" 
          name="activity"
        >
          <feed-activity :events="events" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
    .common {
        padding: 12px;
        background-color: #096ba7;
        border-bottom: 1px solid #eee;
    }

    .field {
        color: #fff;
        padding: 4px 0;
        font-size: 14px;
    }

    .content {
        padding: 12px;
    }

    .el-card__body {
        padding: 0;
    }
</style>