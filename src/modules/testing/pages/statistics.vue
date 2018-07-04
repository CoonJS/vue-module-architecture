<script>
  export default {
    created() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    mounted() {
      this.loadResults()
    },
    data () {
      return {
        results: [],
        loading: false
      }
    },
    methods: {
      async loadResults() {
        this.loading = true;
        const { data: results } = await this.api.get('resultsUsingGET');
        this.results = results;
        this.loading = false;
      }
    }
  }
</script>

<template>
    <page-container>
        <div slot="header" class="header">
            <h3>Статистика</h3>
        </div>
    </page-container>
</template>

<style scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>