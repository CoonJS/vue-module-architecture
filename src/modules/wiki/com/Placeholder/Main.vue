<script>
export default {
  data() {
    return {
      items: [],
      loading: false,
      isDataLoaded: false
    };
  },
  computed: {
    hasItems() {
      return this.isDataLoaded && this.items.length !== 0;
    }
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    async loadItems() {
      this.loading = true;
      const { data: items } = await this.api.get('articlesUsingGET');
      this.items = items;
      this.loading = false;
      this.isDataLoaded = true;
    }
  }
};
</script>

<template>
  <div class="placeholder">
    <div class="header">База знаний</div>
    <i class="el-icon-document" />
    <div 
      v-if="!hasItems" 
      class="no-data-block"
    >
      <div v-if="isDataLoaded">
        У вас нет ни одной статьи или категории. Нажмите кнопку "создать" в левом нижнем углу и создайте свою первую статью или категорию.
      </div>
    </div>
  </div>
</template>

<style scoped>
    .placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fbfbfb;
    }

    i {
        font-size: 200px;
        color: rgba(0,0,0, .05);
    }

    .header {
        padding: 32px 0;
        font-size: 60px;
        color: rgba(0,0,0, .4);
    }
    .no-data-block {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: 32px 0;
        color: rgba(0,0,0, .5);
    }
</style>
