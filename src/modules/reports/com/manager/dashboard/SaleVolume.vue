<script>
import Highcharts from 'highcharts';

export default {
  name: 'SaleVolumeDashboard',
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
  beforeCreate() {
    /**@type {NumberUtils}*/
    this.number = this.$locator.NumberUtils;
  },
  mounted() {
    this.renderLineChart();
  },
  methods: {
    renderLineChart() {
      const self = this;

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
          text: 'Объём продаж'
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
              return self.number.format(this.value, 2);
            }
          }
        },
        credits: {
          enabled: false
        }
      });
    }
  }
};
</script>

<template>
  <div id="line-chart-container" />
</template>

<style scoped>
    #line-chart-container {
        width: 100%;
        height: 300px;
    }
</style>