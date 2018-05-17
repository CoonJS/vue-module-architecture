<script>
  import Highcharts from 'highcharts';

  export default {
    name: "SaleVolumeDashboard",
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
        this.renderLineChart();
      }
    },
    methods: {
      renderLineChart() {

        const series = this.items.map(item => {
          return {
            name: item.title,
            data: item.points.map(point => point.y)
          };
        });

        const categories = this.items.map(item => {
          return item.points.map(point => point.x);
        });

        Highcharts.chart('line-chart-container', {
          chart: {
            type: 'area'
          },
          title: {
            text: 'Объём оплат/отказов'
          },
          series,
          xAxis: {
            categories: categories[0],
            labels: {
              formatter: function () {
                return this.value;
              }
            },
          },
          yAxis: {
            title: {
              text: 'Объём в рублях'
            },
            labels: {
              formatter: function () {
                return this.value / 1000 + 'Тыс. руб.';
              }
            }
          },
          credits: {
            enabled: false
          }
        });
      }
    }
  }
</script>

<template>
    <div id="line-chart-container">

    </div>
</template>

<style scoped>
    #line-chart-container {
        height: 350px;
    }
</style>