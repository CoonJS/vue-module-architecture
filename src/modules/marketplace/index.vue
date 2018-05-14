<script>
  import ModuleCard from './src/com/Card/Module.vue';

  export default {
    components: {
      ModuleCard
    },
    created() {
      /** @type {Module} */
      this.moduleService = this.$locator.Module;
    },
    mounted() {
      this.loadIntegrations();
    },
    data () {
      return {
        searchIntegrationsQuery: '',
        searchEnabledIntegrationsQuery: '',
        integrationSchemas: [],
        enabledIntegrations: [],
        selectedIntegration: {},
        isLoading: false,
        isShowSidebar: false,
        isEnabledSelectedModule: false

      }
    },
    computed: {
      searchIntegrations() {
        return this.integrationSchemas.filter(integration => {
          const preparedDisplayName = integration.displayName.toLowerCase();
          const preparedSearchQuery = this.searchIntegrationsQuery.trim().toLowerCase();
          return preparedDisplayName.indexOf(preparedSearchQuery) !== -1;
        });
      },
      searchEnabledIntegrations() {
        return this.enabledIntegrations.filter(integration => {
          const preparedDisplayName = integration.displayName.toLowerCase();
          const preparedSearchQuery = this.searchEnabledIntegrationsQuery.trim().toLowerCase();
          return preparedDisplayName.indexOf(preparedSearchQuery) !== -1;
        });
      }
    },
    methods: {
      async loadIntegrations() {
        this.isLoading = true;
        const { data: integrations } = await this.$locator.Api.get('integrationsUsingGET');
        const { data: integrationSchemas} = await this.$locator.Api.get('schemaUsingGET');
        this.integrationSchemas = integrationSchemas;

        this.enabledIntegrations = integrations.map(integration => {
          const schema = this.integrationSchemas.find(schema => schema.type === integration.type);
          return Object.assign(
            {},
            integration,
            {
              fields: schema.fields,
              displayName: schema.displayName,
              imageUrl: schema.imageUrl
            });
        });
        this.isLoading = false;
      },
      async saveSettings() {
        const integration = this.selectedIntegration;
        const isNewIntegration = integration.id === undefined;

        if (isNewIntegration) {
          await this.createNewIntegration(integration);
        } else {
          await this.updateIntegrationSettings(integration);
        }

        this.loadIntegrations();
        this.closeSideBar();
      },
      async createNewIntegration(integration) {
        const fieldKeys = integration.fields.map(field => field.name);
        const integrationData = fieldKeys.reduce((prev,fieldKey) => {
          prev[fieldKey] = integration[fieldKey];
          return prev;
        }, {});
        const preparedIntegrationData = Object.assign({}, integrationData, { type: integration.type });

        await this.$locator.Api.post('createdIntegrationUsingPOST', {}, preparedIntegrationData);
      },
      async updateIntegrationSettings(integration) {
        await this.$locator.Api.put('updatedIntegrationUsingPUT', { id: integration.id }, integration);
      },
      async disableIntegration() {
        const integration = this.selectedIntegration;
        const newIntegration = Object.assign({}, integration, { active: false });
        await this.$locator.Api.put('updatedIntegrationUsingPUT', { id: integration.id }, newIntegration);
        await this.loadIntegrations();
        this.closeSideBar();
      },
      async enableIntegration() {
        const integration = this.selectedIntegration;
        const newIntegration = Object.assign({}, integration, { active: true });
        await this.$locator.Api.put('updatedIntegrationUsingPUT', { id: integration.id }, newIntegration);
        await this.loadIntegrations();
        this.closeSideBar();
      },
      showEnabledIntegrationSettings(integration) {
        this.selectedIntegration = integration;
        this.isEnabledSelectedModule = integration.active;
        this.isShowSidebar = true;
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
            <h3>Интеграции</h3>
        </div>

        <el-card v-if="enabledIntegrations.length > 0" class="enabled-integrations">
            <div slot="header" class="header">
                <h4>Подключенные</h4>
                <div>
                    <el-input placeholder="Поиск" v-model="searchEnabledIntegrationsQuery">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </div>

            <div class="modules">
                <module-card
                    v-for="integration in searchEnabledIntegrations"
                    :title="integration.displayName"
                    :key="integration.displayName"
                    :img="integration.imageUrl"
                    :status="integration.active ? 'ACTIVE' : 'DISABLED'"
                    @click.native="showEnabledIntegrationSettings(integration)"
                />
                <div v-show="searchEnabledIntegrations.length === 0 && searchEnabledIntegrationsQuery.trim() !== ''" class="empty-search-message">
                    <h2>Ничего не найдено...</h2>
                </div>
            </div>
        </el-card>

        <el-card>
            <div slot="header" class="header">
                <h4>Магазин</h4>
                <div>
                    <el-input placeholder="Поиск" v-model="searchIntegrationsQuery">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </div>

            <div class="marketplace-modules">
                <module-card
                    v-for="integration in searchIntegrations"
                    :title="integration.displayName"
                    :key="integration.type"
                    :img="integration.imageUrl"
                    status="NEW"
                    @click.native="showSettings(integration)"
                />
                <div v-show="searchIntegrations.length === 0 && searchIntegrationsQuery.trim() !== ''" class="empty-search-message">
                    <h2>Ничего не найдено...</h2>
                </div>
            </div>
        </el-card>

        <sidebar v-model="isShowSidebar">
            <div class="settings-header" slot="header">
                <div class="left-side">
                    <el-button round size="mini" icon="el-icon-arrow-right" @click="closeSideBar"/>
                    <h3 class="settings-title">{{selectedIntegration.displayName}}</h3>
                </div>
                <template v-if="selectedIntegration.id !== undefined">
                    <el-button
                        v-if="isEnabledSelectedModule"
                        size="mini"
                        type="danger"
                        @click="disableIntegration"
                    >
                        Выключить
                    </el-button>
                    <el-button
                        v-else
                        size="mini"
                        type="success"
                        @click="enableIntegration"
                    >
                        Включить
                    </el-button>
                </template>
            </div>

            <dynamic-form :fields="selectedIntegration.fields" v-model="selectedIntegration"/>

            <div slot="footer">
                <el-button type="success" @click="saveSettings">Сохранить</el-button>
            </div>
        </sidebar>

    </page-container>
</template>

<style scoped>
    .header {
        display: flex;
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

    .enabled-integrations {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
    }

    .modules {
        display: flex;
        height: 230px;
        overflow-x: auto;
    }

    .marketplace-modules {
        display: flex;
        min-height: 230px;
        flex-wrap: wrap;
    }

    .empty-search-message {
        color: #adadad;
        display: flex;
        justify-content: center;
    }
</style>