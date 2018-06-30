<script>
  import Tree from './Tree.vue';
  import CreateItemPopup from './Popup/CreateItem.vue';

  export default {
    components: {
      Tree,
      CreateItemPopup
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
      async removeItem(id) {
        try {
          await this.api.delete('deleteArticleUsingDELETE', { id }, {});
        } catch (e) {
          throw new Error(e);
        }

        this.loadMenuItems();
      },
      handleRemoveItem(id) {
        this.showConfirmMessage().then(() => {
          this.removeItem(id);
        })
      },
      handleCreate(id) {

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
        return this.$confirm('Вы действительно хотите удалить элемент?',
          'Подтверждение удаления',
          {
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
            type: 'Danger'
          });
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
                @select="handleSelect"
            >
                <div v-show="loading" class="loader">
                    <i class="el-icon-loading"></i>
                </div>

                <tree
                    v-show="!loading"
                    :tree-data="tree"
                    @remove="handleRemoveItem"
                    @create="handleCreate"
                />
            </el-menu>
        </div>
        <div class="create-category">
            <el-button @click="showCreateCategoryModal" type="success" size="mini">Создать</el-button>
        </div>

        <create-item-popup
            v-model="isShowModal"
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
        background-color: #545c64;
        display: flex;
        justify-content: center;
    }
</style>