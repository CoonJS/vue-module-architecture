<script>
import Highcharts from 'highcharts';

export default {
  name: 'LineChart',
  mounted() {

    Highcharts.chart('line-chart-container', {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Объём продаж'
      },
      xAxis: {
        allowDecimals: false,
        labels: {
          formatter: function () {
            return this.value; // clean, unformatted number for year
          }
        }
      },
      yAxis: {
        title: {
          text: 'Объём в рублях'
        },
        labels: {
          formatter: function () {
            return this.value / 1000 + ' Руб.';
          }
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          pointStart: 2000,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: [{
        name: 'Выручка',
        data: [
          11982, 12040, 11233, 21224, 23342,
          26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
          24304, 23464, 23708, 44099, 44357, 44237, 44401, 44344, 53586, 62380
        ]
      }]
    });
  }
};
</script>

<template>
  <div id="line-chart-container" />
</template>

<style scoped>
    #line-chart-container {
        height: 350px;
    }
</style>