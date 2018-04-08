<script>
  export default {
    data() {
      return {
        tableData: [
          {
            salesCount: '8 902',
            totalSum: '5 000 900 $',
            cost: '1 234 $'
          },
          {
            salesCount: '2 093',
            totalSum: '2 230 900 $',
            cost: '948 $'
          },
          {
            salesCount: '1 324',
            totalSum: '1 000 900 $',
            cost: '100 $'
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
            prop="salesCount"
            label="Sales count"
            width="180"
        />
        <el-table-column
            prop="totalSum"
            label="Total sum"
            width="180"
        />
        <el-table-column
            prop="cost"
            label="Cost per minute"
            width="180"
        />
    </el-table>
</template>
