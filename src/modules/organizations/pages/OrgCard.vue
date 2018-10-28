<script>
export default {
  data () {
    return {
      org: {}
    };
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
    /** @type {ArrayUtils}*/
    this.array = this.$locator.ArrayUtils;
  },
  methods: {
  }
};
</script>

<template>
  <page-container 
    flex-content 
    center
  >
    <div 
      slot="header" 
      class="header"
    >
      <template>
        <h3>{{ org.name }}</h3>
        <div class="actions">
          <el-button
            size="medium"
            type="success"
            icon="el-icon-check"
          >
            Сохранить изменения
          </el-button>
          <el-button
            size="medium"
            type="danger"
            icon="el-icon-delete"
          >
            Удалить
          </el-button>
        </div>
      </template>
    </div>
  </page-container>
</template>

<style scoped>
    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .actions {
        display: flex;
        justify-content: space-between;
    }

    .role-card {
        padding: 16px;
        overflow: auto;
        background-color: #fdfdfd;
        border: 1px solid rgba(0,0,0, .1);
        width: 900px;
    }

    .group {
        padding: 8px;
        margin: 16px 0;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
    }

    h4 {
        margin-bottom: 8px;
    }

</style>