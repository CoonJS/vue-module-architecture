<script>
  export default {
    props: {
      items: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    beforeCreate() {
      /** @type {NumberUtils}*/
      this.number = this.$locator.NumberUtils;
    },
    data() {
      return {
        managers: this.items,
        columns: [
          {
            key: 'name',
            name: 'Имя',
            width: 180
          },
          {
            key: 'deals',
            name: 'Количество сделок',
            width: 180,
            align: 'center'
          },
        ]
      };
    },
    watch: {
      items: {
        deep: true,
        handler(items) {
          this.managers = items;
        }
      }
    },
    methods: {
      goToManagerPage(managerID) {
        this.$router.push({ path: `/managers/${managerID}` });
      }
    }
  }
</script>

<template>
    <page-container>
        <el-table
            border
            :data="managers"
            style="width: 100%"
        >
            <el-table-column
                v-for="column in columns"
                :key="column.key"
                :prop="column.key"
                :label="column.name"
                :width="column.width"
                :align="column.align"
            />
            <el-table-column
                label="Процент закрытых сделок"
                :width="220"
                align="center"
            >
                <template slot-scope="scope">
                    <el-progress
                        type="circle"
                        :width="40"
                        :color="scope.row.closedPercent > 50 ? '#67c23a' : '#f56c6c'"
                        :percentage="scope.row.closedPercent"
                    />
                </template>
            </el-table-column>
            <el-table-column
                label="Сумма закрытых сделок"
                :width="220"
                align="center"
            >
                <template slot-scope="scope">
                    <span>{{number.format(scope.row.closedDealsSum, 2)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="Действия">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="goToManagerPage(scope.row.id)">Перейти</el-button>
                </template>
            </el-table-column>
        </el-table>
    </page-container>
</template>