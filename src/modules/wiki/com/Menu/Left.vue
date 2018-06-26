<script>
  import Tree from './Tree.vue';
  import CreateCategoryPopup from './Popup/CreateCategory.vue';

  export default {
    components: {
      Tree,
      CreateCategoryPopup
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
      /** @type {ArrayUtils}*/
      this.array = this.$locator.ArrayUtils;
    },
    mounted() {
      this.loadMenuItems();
    },
    data () {
      return {
        tree: null,
        loading: false,
        isShowModal: false
      };
    },
    methods: {
      async loadMenuItems() {
        this.loading = true;
        const { data: items } = await this.api.get('articlesUsingGET');
        this.tree = this.array.createTree(items);
        this.loading = false;
      },
      handleSaveCategory() {
        this.loadMenuItems();
      },
      showCreateCategoryModal() {
        this.isShowModal = true;
      }
    }
  }
</script>
<template>
    <div class="menu-wrapper">
        <div class="menu-container">
            <el-menu
                class="menu"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <div v-show="loading" class="loader">
                    <i class="el-icon-loading"></i>
                </div>
                <tree v-show="!loading" :tree-data="tree"/>
            </el-menu>
        </div>
        <div class="create-category">
            <el-button @click="showCreateCategoryModal" type="success" size="mini">Создать категорию</el-button>
        </div>

        <create-category-popup v-model="isShowModal" @save="handleSaveCategory"/>
    </div>
</template>

<style scoped>
    .menu-wrapper {
        display: flex;
        flex-direction: column;
    }

    .menu-container {
        flex: 1;
        overflow: auto;
    }

    .menu {
        flex: 1;
        height: 100%;
        width: 320px;
    }

    .loader {
        display: flex;
        justify-content: center;
        padding: 64px 0;
        color: #fff;
        font-size: 32px;
    }

    .create-category {
        padding: 16px 0;
        border-top: 1px solid #eee;
        border-right: solid 1px #e6e6e6;
        background-color: #545c64;
        display: flex;
        justify-content: center;
    }
</style>