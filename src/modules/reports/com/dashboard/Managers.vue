<script>
  export default {
    mounted() {
      this.loadManagers();
    },
    data() {
      return {
        isDataLoading: false,
        searchQuery: '',
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
    computed: {
      filteredManagers() {
        return this.managers.filter(manager => {
          const preparedFirstName = typeof manager.firstName === 'string' ? manager.firstName.toLowerCase() : '';
          const preparedLastName = typeof manager.lastName === 'string' ? manager.lastName.toLowerCase() : '';
          const searchString = `${preparedFirstName} ${preparedLastName}`;

          return searchString.indexOf(this.preparedSearchQuery) !== -1;
        });
      },
      preparedSearchQuery() {
        return this.searchQuery.trim().toLowerCase();
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
        this.$router.push({ path: `/managers/${managerID}` });
      }
    }
  }
</script>

<template>
    <page-container>
        <el-table
            border
            :data="filteredManagers"
            style="width: 100%"
            v-loading="isDataLoading"
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
                label="Сделки"
                width="100"
                align="center"
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