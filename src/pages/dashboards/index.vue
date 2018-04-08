<template>
    <div class="dashboard-page">
        <div class="params">
            <div class="left">
                <div class="chart">
                    <pie-chart :chart-data="datacollection"/>
                </div>
            </div>
            <div class="right">
                <h1>Воронка продаж</h1>
            </div>
        </div>
        <div class="center">
            <div><h1>Входящие</h1></div>
            <received-calls-table />
            <div><h1>Исходящие</h1></div>
            <outgoing-calls-table />

        </div>
    </div>
</template>

<script>
  import PieChart from '../../com/Chart/Pie';
  import LineChart from '../../com/Chart/Line';
  import OutgoingCallsTable from './com/Table/OutgoingCalls.vue';
  import ReceivedCallsTable from './com/Table/ReceivedCalls.vue';

  export default {
    components: {
      PieChart,
      LineChart,
      OutgoingCallsTable,
      ReceivedCallsTable
    },
    data () {
      return {
        datacollection: {
          labels: ['Принятые (3500)', 'Пропущенные (120)', 'Активные звонки (300)', 'Новые номера (580)'],
          datasets: [
            {
              backgroundColor: [
                '#41B883',
                '#DD1B16',
                '#00D8FF',
                '#E46651'
              ],
              data: [3500, 120 , 300, 580]
            }
          ]

        }
      }
    }
  }
</script>

<style>
    .dashboard-page {
        height: 100%;
    }

    .params {
        display: flex;
        justify-content: space-between;
    }

    .left {
        flex: 1;
    }

    .chart {
        max-width: 400px;
    }

    .right {
        flex: 1
    }
</style>