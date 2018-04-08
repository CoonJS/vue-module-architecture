<script>
  export default {
    data() {
      return {
        tableData: [
          {
            id: '1',
            managerName: 'Manager 1',
            salesCount: '8 902',
            totalSum: '5 000 900 $',
            cost: '1 234 $'
          },
          {
            id: '2',
            managerName: 'Manager 2',
            salesCount: '2 093',
            totalSum: '2 230 900 $',
            cost: '948 $'
          },
          {
            id: '3',
            managerName: 'Manager 3',
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
            prop="managerName"
            label="Manager"
            width="180"
        >
            <template slot-scope="scope">
                <router-link :to="`/managers/${scope.row.id}`">{{scope.row.managerName}}</router-link>
            </template>
        </el-table-column>
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
