<script>
import CreateOrgModal from '../src/com/Modal/CreateOrg.vue';

export default {
  components: {
    CreateOrgModal
  },
  data () {
    return {
      isShowCreateOrgModal: false,
      organizations: [],
      columns: this.orgService.getTableColumns()
    };
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
    /** @type {Organization}*/
    this.orgService = this.$locator.Organization;
  },
  methods: {
    showCreateOrgModal() {
      this.isShowCreateOrgModal = true;
    }
  }
};
</script>

<template>
  <page-container>
    <div 
      slot="header" 
      class="header"
    >
      <h3>Ораганизации</h3>
      <el-button 
        type="success" 
        @click="showCreateOrgModal"
      >
        Создать организацию
      </el-button>
    </div>
    <div class="organizations">
      <el-table
        :data="organizations"
        border
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
          :width="300"
          prop="name"
          label="Название"
        >
          <template slot-scope="scope">
            <ui-link :to="`/organizations/${scope.org.id}`">{{ scope.row.name }}</ui-link>
          </template>
        </el-table-column>
        <el-table-column label="Действия">
          <template>
            <el-button 
              size="mini" 
              type="danger"
            >
              Удалить
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <create-org-modal v-model="isShowCreateOrgModal" />
  </page-container>
</template>

<style scoped>
    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>