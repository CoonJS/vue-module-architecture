<script>
  import SaleCard from './Card/Sale.vue';

  export default {
    components: {
      SaleCard
    },
    props: {
      sales: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<template>
    <div class="feed-wrapper">
        <div class="sale-card" v-for="sale in sales" :key="sale.id">
            <sale-card :sale="sale"/>
        </div>
    </div>
</template>

<style scoped>
    .feed-wrapper {
        padding: 16px;
    }

    .sale-card {
        margin: 8px 0;
    }
</style>