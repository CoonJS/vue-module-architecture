<script>
const imagePlaceholder = require('../../img/placeholder.png');

export default {
  name: 'ModuleCard',
  props: {
    title: {
      type: String,
      default() {
        return '';
      }
    },
    img: {
      type: String,
      default() {
        return imagePlaceholder;
      }
    },
    status: {
      type: String,
      default () {
        return null;
      }
    },
    active: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    hasStatus() {
      return this.status !== undefined;
    }
  }

};
</script>

<template>
  <div class="module-card">
    <div class="card-body">
      <img 
        :src="img" 
        :alt="title" 
        width="150px" 
        height="150px"
      >
    </div>
    <div class="status">
      <div>
        <h5>{{ title }}</h5>
      </div>
      <div>
        <el-button
          v-if="status === 'FAILED'"
          :disabled="!active"
          circle
          type="danger"
          icon="el-icon-warning"
        />
        <el-button
          v-if="status === 'SYNCING'"
          :disabled="!active"
          circle
          type="primary"
          icon="el-icon-loading"
        />
        <el-button
          v-if="status === 'SYNCED'"
          :disabled="!active"
          circle
          type="success"
          icon="el-icon-success"
        />
        <el-button
          v-if="!hasStatus"
          circle
          icon="el-icon-zoom-in"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

    .module-card {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 150px;
        margin: 8px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    }

    .card-body {
        width: 150px;
        height: 150px;
    }

    .status {
        padding: 12px 16px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>