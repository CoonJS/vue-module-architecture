<script>
  export default {
    mounted() {
      this.loadManagers();
    },
    data() {
      return {
        isDataLoading: false,
        managers: [],
        columns: [
          {
            key: 'id',
            name: 'ID',
            width: 50,
            align: 'center'
          },
          {
            key: 'firstName',
            name: 'Имя',
            width: 180
          },
          {
            key: 'lastName',
            name: 'Фамилия',
            width: 180
          }
        ]
      }
    },
    methods: {
      async loadManagers() {
        this.isDataLoading = true;
        const { data: managers } = await this.$locator.Api.get('managersUsingGET');
        this.managers = managers;
        this.isDataLoading = false;
      },
      goToManagerPage(managerID) {
        this.$router.push({ path: `/managers/${managerID}` })
      }
    }
  }
</script>

<template>
    <page-container>
        <div slot="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/managers' }">Менеджеры</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table
            border
            :data="managers"
            style="width: 100%"
            v-loading="isDataLoading"
        >
            <el-table-column
                v-for="column in columns"
                :prop="column.key"
                :label="column.name"
                :width="column.width"
                :align="column.align"
            />
            <el-table-column
                label="Сделки"
                width="100"
            >
                <template slot-scope="scope">
                    {{scope.row.deals.length}}
                </template>
            </el-table-column>
            <el-table-column
                label="Действия"
            >
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="goToManagerPage(scope.row.id)">Перейти</el-button>
                </template>
            </el-table-column>
        </el-table>
    </page-container>
</template>