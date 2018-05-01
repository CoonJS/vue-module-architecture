<script>
  export default {
    created() {
      /** @type {Module} */
      this.moduleService = this.$locator.Module;
    },
    mounted() {

      this.loadIntegrations();
    },
    data () {
      return {
        searchQuery: '',
        integrations: [],
        selectedIntegration: {},
        isLoading: false,
        isShowSidebar: false,
        isEnabledSelectedModule: false

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
      async saveSettings() {
        const integration = this.selectedIntegration;
        await this.$locator.Api.put(`/api/integrations/${integration.id}`, integration);
        await this.loadIntegrations();
        this.closeSideBar();
      },
      async disableIntegration() {
        const integration = this.selectedIntegration;
        await this.$locator.Api.put(`/api/integrations/${integration.id}`,
          Object.assign({}, integration, { active: false })
        );
        await this.loadIntegrations();
        this.closeSideBar();
      },
      async enableIntegration() {
        const integration = this.selectedIntegration;
        await this.$locator.Api.put(`/api/integrations/${integration.id}`,
          Object.assign({}, integration, { active: true })
        );
        await this.loadIntegrations();
        this.closeSideBar();
      },
      showSettings(integration) {
        this.selectedIntegration = integration;
        this.isEnabledSelectedModule = integration.active;
        this.isShowSidebar = true;
      },
      closeSideBar() {
        this.isShowSidebar = false;
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

        <div class="modules">
            <el-card
                class="module-card"
                v-for="integration in searchedIntegrations"
                @click.native="showSettings(integration)"
            >
                <div slot="header">
                    <h3>{{integration.type}}</h3>
                </div>
                <img src="https://www.amocrm.ru/version2/images/logo_bill.png" width="150px" height="150px" alt="amocrm">
                <div class="status">
                    <el-switch
                        :value="integration.active"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    />
                </div>
            </el-card>
        </div>

        <sidebar v-model="isShowSidebar">
            <div class="settings-header" slot="header">
                <div class="left-side">
                    <el-button round size="mini" icon="el-icon-arrow-right" @click="closeSideBar"/>
                    <h3 class="settings-title">{{selectedIntegration.type}}</h3>
                </div>
                <el-button
                    v-if="isEnabledSelectedModule"
                    size="mini"
                    type="danger"
                    @click="disableIntegration"
                >
                    Отключить
                </el-button>
                <el-button
                    v-else
                    size="mini"
                    type="success"
                    @click="enableIntegration"
                >
                    Подключить
                </el-button>
            </div>

            <component :is="moduleService.getSettingsComponent(selectedIntegration.type)" v-model="selectedIntegration"/>

            <div slot="footer">
                <el-button type="success" @click="saveSettings">Сохранить</el-button>
            </div>
        </sidebar>

    </page-container>
</template>

<style scoped>
    .header {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
    }

    .settings-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .settings-title {
        margin-left: 16px;
    }

    .left-side {
        display: flex;
        align-items: center;
    }

    .modules {
        display: flex;
    }

    .module-card {
        margin: 8px;
        cursor: pointer;
    }

    .status {
        margin-top: 12px;
        display: flex;
        justify-content: center;
    }
</style>