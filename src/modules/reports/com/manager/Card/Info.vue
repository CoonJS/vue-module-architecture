<script>
  import FunnelDashboard from '../dashboard/Funnel.vue';
  import SaleVolumeDashboard from '../dashboard/SaleVolume.vue';

  export default {
    components: {
      FunnelDashboard,
      SaleVolumeDashboard
    },
    props: {
      manager: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    beforeCreate() {
      /**@type {Api}*/
      this.api = this.$locator.Api;
    },
    mounted() {
      this.loadReports();
    },
    data() {
      return {
        activeName: 'reports',
        funnelData: [],
        saleVolume: []
      };
    },
    methods: {
      async loadReports() {
        const { data: reports } = await this.api.get('managerReportUsingGET', { id: this.manager.id });
        this.funnelData = reports[0].data;
        this.saleVolume = reports[1].data;
      }
    }
  }
</script>

<template>
    <div>
        <div class="common">
            <div class="field">
                <span class="title">Имя:</span>
                <span>{{manager.firstName}}</span>
            </div>
            <div class="field">
                <span class="title">Фамилия:</span>
                <span>{{manager.lastName}}</span>
            </div>
            <div class="field">
                <span class="title">Телефон:</span>
                <span>+7 (984) 434 43 43</span>
            </div>
            <div class="field">
                <span class="title">Email:</span>
                <span>user@email.com</span>
            </div>
        </div>
        <div class="content">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="Отчеты" name="reports">
                    <el-card shadow="hover">
                        <funnel-dashboard :items="funnelData"/>
                    </el-card>
                    <el-card shadow="hover" style="margin-top: 16px">
                        <sale-volume-dashboard :items="saleVolume"/>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="Активность" name="activity">
                    Activity
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

    .progress {
        padding: 8px 0;
    }
</style>