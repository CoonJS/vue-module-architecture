<script>
  export default {
    mounted() {
      this.loadIntegrations();
    },
    data () {
      return {
        searchQuery: '',
        integrations: [],
        isLoading: false

      }
    },
    computed: {
      searchedIntegrations() {
        return this.integrations.filter(integration => {
          return integration.type.indexOf(this.searchQuery) !== -1;
        });
      }
    },
    methods: {
      async loadIntegrations() {
        this.isLoading = true;
        this.integrations = await this.$locator.Api.get('/api/integrations');
        this.isLoading = false;
      },
      async enableIntegration(integration) {
        const credentials = {
          type: "AMOCRM",
          login: "uwared@yandex.ru",
          token: "d6ceec42a68f698283977b0c5e0b6289",
          subdomain: "new5ad28e13d52dc"
        };

        await 'ok';

        console.log(integration);

        // const status = integrations[0].status;
        //
        // const isEnabled = status === 'ENABLED';
        // const isDisabled = status === 'DISABLED';
      }
    }
  }
</script>

<template>
    <page-container v-loading.body="isLoading">
        <div slot="header" class="header">
            <div>
                <h3>Интеграции</h3>
            </div>
            <div>
                <el-input placeholder="Поиск" v-model="searchQuery">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
        </div>
        <div>
            <div class="card" v-for="integration in searchedIntegrations" @click="enableIntegration(integration)">
                <div class="img">
                    <img src="https://www.amocrm.ru/version2/images/logo_bill.png" width="150px" height="150px" alt="amocrm">
                </div>
                <div class="title">
                    {{integration.type}}
                </div>
                <div class="status">
                    {{integration.status}}
                </div>
            </div>
        </div>
    </page-container>
</template>

<style scoped>
    .header {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
    }

    .el-input {
        width: 260px;
    }

    .card {
        cursor: pointer;
        width: 200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 4px rgba(0,0,0, .4);
    }

    .img {
        display: flex;
        justify-content: center;
        padding: 8px 0;
    }

    .title {
        display: flex;
        justify-content: center;
    }

    .status {
        display: flex;
        justify-content: center;
    }
</style>