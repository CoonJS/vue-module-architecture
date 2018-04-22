<script>
  export default {
    data() {
      return {
        tableData: [
          {
            totalCalls: '1890',
            receivedCalls: '989',
            missedCalls: '510',
            activeCalls: '832',
            newNumbers: '313'
          }
        ],
        tableColumns: [
          {
            key: 'totalCalls',
            title: 'Всего звонков',
            width: '180'
          },
          {
            key: 'receivedCalls',
            title: 'Принято звонков',
            width: '180'
          },
          {
            key: 'missedCalls',
            title: 'Пропущено звонков',
            width: '180'
          },
          {
            key: 'activeCalls',
            title: 'Активных звонков',
            width: '180'
          },
          {
            key: 'newNumbers',
            title: 'Новые номера',
            width: '180'
          }
        ]
      }
    }
  }
</script>

<template>
    <el-table
        :data="tableData"
        style="width: 100%"
    >
        <el-table-column
            v-for="column in tableColumns"
            :key="column.key"
            :prop="column.key"
            :label="column.title"
            :width="column.width"
        />
    </el-table>
</template>
