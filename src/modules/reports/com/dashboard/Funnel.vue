<script>
import Highcharts from 'highcharts';
import Funnel from 'highcharts/modules/funnel';

Funnel(Highcharts);

export default {
  name: 'FunnelDashboard',
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch: {
    items() {
      this.renderFunnel();
    }
  },
  mounted() {
    this.renderFunnel();
  },
  methods: {
    renderFunnel() {
      const data = this.items.map(item => {
        return [item.statusName, item.count];
      });

      Highcharts.chart('funnel-container', {
        chart: {
          type: 'funnel'
        },
        title: {
          text: 'Воронка продаж'
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b> ({point.y:,.0f})',
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
              softConnector: true
            },
            center: ['40%', '50%'],
            neckWidth: '30%',
            neckHeight: '25%',
            width: '80%'
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Воронка продаж',
          data: data
        }]
      });
    }
  }
};
</script>

<template>
  <div id="funnel-container" />
</template>

<style scoped>
    #funnel-container {
        width: 100%;
        height: 350px;
    }
</style>