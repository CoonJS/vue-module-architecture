<script>
import Tree from './Tree.vue';
import CreateItemPopup from './Popup/CreateItem.vue';

export default {
  components: {
    Tree,
    CreateItemPopup
  },
  data () {
    return {
      tree: null,
      items: [],
      loading: false,
      currentItem: null,
      isEditMode: false,
      isShowModal: false,
      access: {
        canCreate: this.api.hasAccess('ADD_WIKI')
      }
    };
  },
  watch: {
    isShowModal(val) {
      if (val === false) {
        this.currentItem = null;
        this.isEditMode = false;
      }
    }
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
  methods: {
    async loadMenuItems() {
      this.loading = true;
      const { data: items } = await this.api.get('articlesUsingGET');
      this.items = items;

      const tree = this.array.createTree(items);
      this.tree = this.array.treeSort(tree, this.compareItems);
      this.loading = false;
    },
    async removeItem(id) {
      try {
        await this.api.delete('deleteArticleUsingDELETE', { id }, {});
      } catch (e) {
        throw new Error(e);
      }

      this.loadMenuItems();
    },
    compareItems(a,b) {
      if (a.type === 'CATEGORY' && b.type === 'ARTICLE') {
        return -1;
      }

      if (a.type === 'ARTICLE' && b.type === 'CATEGORY') {
        return 1;
      }

      return 0;
    },
    handleCreate(id) {
      this.currentItem = this.items.find(item => item.id === id);
      this.showCreateCategoryModal();
    },
    handleEdit(id) {
      this.currentItem = this.items.find(item => item.id === id);
      this.isEditMode = true;
      this.showCreateCategoryModal();
    },
    handleRemoveItem(id) {
      this.showConfirmMessage().then(() => {
        this.removeItem(id);
      });
    },
    handleSave() {
      this.loadMenuItems();
    },
    handleSelect(id) {
      this.$emit('select', id);
    },
    showCreateCategoryModal() {
      this.isShowModal = true;
    },
    showConfirmMessage() {
      return this.$confirm('Вы действительно хотите удалить категорию?',
        'Подтверждение удаления',
        {
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
          type: 'Danger'
        });
    }
  }
};
</script>
<template>
  <div class="menu-wrapper">
    <div class="menu-container">
      <el-menu
        router
        class="menu"
        background-color="#2a3a4d"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <div 
          v-show="loading" 
          class="loader"
        >
          <i class="el-icon-loading" />
        </div>

        <tree
          v-show="!loading"
          :tree-data="tree"
          @create="handleCreate"
          @edit="handleEdit"
          @remove="handleRemoveItem"
        />
      </el-menu>
    </div>
    <div 
      v-if="access.canCreate" 
      class="create-category"
    >
      <el-button
        size="mini"
        type="success"
        @click="showCreateCategoryModal"
      >
        Создать
      </el-button>
    </div>

    <create-item-popup
      v-model="isShowModal"
      :item="currentItem"
      :edit-mode="isEditMode"
      @save="handleSave"
    />
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
        background-color: #2a3a4d;
        display: flex;
        justify-content: center;
    }
</style>