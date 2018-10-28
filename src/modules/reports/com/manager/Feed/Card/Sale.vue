<script>

export default {
  props: {
    sale: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    creationDate() {
      const date = this.sale.createdMoment;
      return this.dateTime.format(date);
    },
    closeDate() {
      const date = this.sale.closedMoment;
      return this.dateTime.format(date);
    }
  },
  created() {
    /** @type {DateTime}*/
    this.dateTime = this.$locator.DateTime;
  },
};
</script>

<template>
  <el-card>
    <div 
      slot="header" 
      class="header"
    >
      <div>
        <span class="title">{{ sale.name }}</span>
        <el-tag type="info">{{ sale.sum }}&nbsp;руб.</el-tag>
        <el-tag 
          v-if="sale.closedMoment" 
          type="success"
        >
          Закрыта
        </el-tag>
      </div>
      <div>
        <el-button 
          :type="sale.closedMoment ? 'success' : 'info'" 
          size="mini"
        >
          {{ sale.status }}
        </el-button>
      </div>
    </div>
    <div class="body">
      <div>
        <span class="info">Дата создания:</span>
        <span class="info">{{ creationDate }}</span>
      </div>
      <div 
        v-if="sale.closedMoment" 
        class="close-date"
      >
        <span class="info">Дата закрытия:</span>
        <span class="info">{{ closeDate }}</span>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        margin-right: 8px;
        font-weight: bold;
        font-size: 14px;
    }

    .info {
        color: rgba(0,0,0, .7);
        font-size: 12px;
    }

    .body {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .close-date {
        font-weight: bold;
    }
</style>