<script>
  import SaleCard from './Card/Sale.vue';

  export default {
    components: {
      SaleCard
    },
    beforeCreate() {
      /** @type {ArrayUtils}*/
      this.arrayUtils = this.$locator.ArrayUtils;
    },
    props: {
      sales: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      const groupedStatuses = this.arrayUtils.groupBy(this.sales, (prop) => {
        return prop.status;
      });

      return {
        groupedStatuses: groupedStatuses,
        selectedStatuses: Object.keys(groupedStatuses)
      }
    },
    computed: {
      statuses() {
        return Object.keys(this.groupedStatuses);
      },
      filteredSales() {
        return this.sales.filter(sale => {
          return this.selectedStatuses.includes(sale.status);
        })
      }
    }
  }
</script>

<template>
    <div class="feed-wrapper">
        <div class="sales-filter">
            <el-checkbox-group v-model="selectedStatuses" size="small">
                <el-checkbox-button
                    :key="status"
                    v-for="status in statuses"
                    :label="status"
                >
                    {{`${status} (${groupedStatuses[status].length})`}}
                </el-checkbox-button>
            </el-checkbox-group>
        </div>
        <div class="sale-card" v-for="sale in filteredSales" :key="sale.id">
            <sale-card :sale="sale"/>
        </div>
    </div>
</template>

<style scoped>
    .feed-wrapper {
        padding: 16px;
    }

    .sales-filter {
        margin-bottom: 16px;
    }

    .sale-card {
        margin: 8px 0;
    }

    .sale-card:first-child {
        margin-top: 0;
    }

    .sale-card:last-child {
        margin-bottom: 0;
    }
</style>