<script>
import ModuleCard from './src/com/Card/Module.vue';

export default {
  components: {
    ModuleCard
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

    };
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
    },
    isAddedIntegration() {
      return this.selectedIntegration.id !== undefined;
    },
    isSyncing() {
      return this.isAddedIntegration && this.selectedIntegration.status === 'SYNCING';
    },
    isActive() {
      return this.isAddedIntegration && this.selectedIntegration.status === 'SYNCED';
    },
    isError() {
      return this.isAddedIntegration && this.selectedIntegration.status === 'FAILED';
    }
  },
  created() {
    /** @type {Api} */
    this.api = this.$locator.Api;
    /** @type {Module} */
    this.moduleService = this.$locator.Module;
  },
  mounted() {
    this.loadIntegrations();
  },
  methods: {
    async loadIntegrations() {
      // this.isLoading = true;
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
      // this.isLoading = false;
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

      setTimeout(() => {
        this.loadIntegrations();
      }, 10000);
    },
    async updateIntegrationSettings(integration) {
      await this.api.put('updatedIntegrationUsingPUT', { id: integration.id }, integration);
    },
    async disableIntegration() {
      const integration = this.selectedIntegration;
      const newIntegration = Object.assign({}, integration, { active: false });
      await this.api.put('updatedIntegrationUsingPUT', { id: integration.id }, newIntegration);
      await this.loadIntegrations();
      this.closeSideBar();
    },
    async enableIntegration() {
      const integration = this.selectedIntegration;
      const newIntegration = Object.assign({}, integration, { active: true });
      await this.api.put('updatedIntegrationUsingPUT', { id: integration.id }, newIntegration);
      await this.loadIntegrations();
      this.closeSideBar();
    },
    async syncIntegration() {
      const id = this.selectedIntegration.id;
      await this.api.put('syncIntegrationUsingPUT', { id });
      this.loadIntegrations();
      this.closeSideBar();
    },
    deleteIntegration() {
      const integration = this.selectedIntegration;
      this.showConfirmMessage().then(async () => {
        await this.api.delete('deleteIntegrationUsingDELETE', { id: integration.id });
        await this.loadIntegrations();
        this.closeSideBar();
      });
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
    showConfirmMessage() {
      return this.$confirm('Вы действительно хотите удалить интеграцию?', {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'Danger'
      });
    },
    closeSideBar() {
      this.isShowSidebar = false;
    }
  }
};
</script>

<template>
  <page-container v-loading.body="isLoading">
    <div 
      slot="header" 
      class="header"
    >
      <h3>Интеграции</h3>
    </div>

    <el-card 
      v-if="enabledIntegrations.length > 0" 
      class="enabled-integrations" 
      shadow="never"
    >
      <div 
        slot="header" 
        class="header"
      >
        <h4>Подключенные</h4>
        <div>
          <el-input 
            v-model="searchEnabledIntegrationsQuery" 
            placeholder="Поиск"
          >
            <i 
              slot="prefix" 
              class="el-input__icon el-icon-search"
            />
          </el-input>
        </div>
      </div>

      <div class="modules">
        <module-card
          v-for="integration in searchEnabledIntegrations"
          :key="integration.displayName"
          :title="integration.displayName"
          :img="integration.imageUrl"
          :status="integration.status"
          :active="integration.active"
          @click.native="showEnabledIntegrationSettings(integration)"
        />
        <div 
          v-show="searchEnabledIntegrations.length === 0 && searchEnabledIntegrationsQuery.trim() !== ''" 
          class="empty-search-message"
        >
          <h2>Ничего не найдено...</h2>
        </div>
      </div>
    </el-card>

    <el-card shadow="never">
      <div 
        slot="header" 
        class="header"
      >
        <h4>Магазин</h4>
        <div>
          <el-input 
            v-model="searchIntegrationsQuery" 
            placeholder="Поиск"
          >
            <i 
              slot="prefix" 
              class="el-input__icon el-icon-search"
            />
          </el-input>
        </div>
      </div>

      <div class="marketplace-modules">
        <module-card
          v-for="integration in searchIntegrations"
          :key="integration.type"
          :title="integration.displayName"
          :img="integration.imageUrl"
          @click.native="showSettings(integration)"
        />
        <div 
          v-show="searchIntegrations.length === 0 && searchIntegrationsQuery.trim() !== ''" 
          class="empty-search-message"
        >
          <h2>Ничего не найдено...</h2>
        </div>
      </div>
    </el-card>

    <sidebar v-model="isShowSidebar">
      <div 
        slot="header" 
        class="settings-header"
      >
        <div class="left-side">
          <el-button 
            round 
            size="mini" 
            icon="el-icon-arrow-right" 
            @click="closeSideBar"
          />
          <div class="settings-title">
            <h3>{{ selectedIntegration.displayName }}</h3>
            <div class="status-wrapper">
              <div 
                v-if="isSyncing" 
                class="text-status"
              >
                Идет синхронизация
              </div>
              <div 
                v-if="isActive" 
                class="text-status"
              >
                Подключена
              </div>
              <div 
                v-if="isError" 
                class="text-status"
              >
                Ошибка
              </div>
              <i 
                v-if="isSyncing" 
                class="el-icon-loading status syncing"
              />
              <i 
                v-if="isActive" 
                class="el-icon-success status active"
              />
              <i 
                v-if="isError" 
                class="el-icon-error status error"
              />
            </div>
          </div>
        </div>
        <template v-if="selectedIntegration.id !== undefined">
          <div class="integration-actions">
            <div v-if="isError" />
            <template v-if="isError">
              <el-button
                type="primary"
                size="mini"
                @click="syncIntegration"
              >
                Повторить
              </el-button>
            </template>

            <template v-else>
              <el-button
                v-if="isEnabledSelectedModule"
                size="mini"
                type="warning"
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

            <el-button
              size="mini"
              type="danger"
              @click="deleteIntegration"
            >
              Удалить
            </el-button>
          </div>
        </template>
      </div>

      <dynamic-form 
        v-model="selectedIntegration" 
        :fields="selectedIntegration.fields" 
        :disabled="isAddedIntegration"
      />

      <div 
        v-if="!isAddedIntegration" 
        slot="footer"
      >
        <el-button 
          type="success" 
          @click="saveSettings"
        >
          Сохранить
        </el-button>
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

    .integration-actions {
        display: flex;
    }

    .status-wrapper {
        display: flex;
    }

    .text-status {
        font-size: 10px;
        color: rgba(0,0,0, .4);
    }

    .status {
        margin: 0 8px;
        font-size: 10px;
    }

    .status.syncing {
        color: rgba(0,0,0, .4);
    }

    .status.active {
        color: #67c23a;
    }

    .status.error {
        color: #f78989;
    }
</style>