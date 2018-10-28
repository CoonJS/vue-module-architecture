<script>
export default {
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      }
    },
    item: {
      type: Object,
      default () {
        return {};
      }
    },
    itemType: {
      type: String,
      default() {
        return 'CATEGORY';
      }
    },
    editMode: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      isShow: this.value,
      itemName: '',
      type: this.itemType,
      parentId: this.item ? this.item.parentId : null,
      saving: false,
      loading: false,
      categories: [],
      types: [
        {
          title: 'Статья',
          key: 'ARTICLE'
        },
        {
          title: 'Категория',
          key: 'CATEGORY'
        }
      ]
    };
  },
  computed: {
    isEmptyName() {
      return this.itemName.trim() === '';
    },
    modalTitle() {
      if (this.editMode) {
        return this.type === 'ARTICLE' ? 'Редактирование статьи' : 'Редактирование категории';
      }

      return this.type === 'ARTICLE' ? 'Создание статьи' : 'Создание категории';
    }
  },
  watch: {
    value(isShow) {
      this.isShow = isShow;

      if (this.isShow === true) {
        this.focus();
        this.loadCategories();
        this.initData();
      }

      if (this.isShow === false) {
        this.clearData();
      }
    },
    parentCategoryId(id) {
      this.parentId = id;
    },
    itemType(val) {
      this.type = val;
    }
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  methods: {
    async saveCategory() {
      this.saving = true;

      try {
        const { data: article } = await this.api.post('createdArticleUsingPOST', {}, {
          parentId: this.parentId,
          title: this.itemName,
          type: this.type
        });

        const isArticle = article.type === 'ARTICLE';

        if (isArticle) {
          this.redirectToArticle(article.id);
        }


      } catch (e) {
        this.saving = false;
        throw new Error(e);
      }

      this.saving = false;

      this.parentId = null;
      this.itemName = '';

      this.$emit('save');
      this.close();

    },
    async editCategory() {
      const id = this.item.id;
      this.saving = true;

      try {
        await this.api.put('updatedArticleUsingPUT', { id }, {
          type: this.type,
          title: this.itemName,
          parentId: this.parentId
        });
      } catch (e) {
        this.saving = false;
        throw new Error(e);
      }

      this.saving = false;

      this.parentId = null;
      this.itemName = '';

      this.$emit('save');
      this.close();
    },
    async loadCategories() {
      this.loading = true;
      const { data: items } = await this.api.get('articlesUsingGET');
      const emptyCategory = { id: null, title: 'Нет родительской категории' };

      this.categories = [ emptyCategory, ...items.filter(item => item.type === 'CATEGORY')];

      this.loading = false;
    },
    redirectToArticle(id) {
      this.$router.push(`/wiki/${id}`);
    },
    handleKeydownEnter() {
      this.editMode ? this.editCategory() : this.saveCategory();
    },
    clearData() {
      this.parentId = null;
      this.itemName = '';
    },
    initData() {
      const item = this.item;
      const hasItem = !!item;

      if (!hasItem) {
        return;
      }

      this.parentId = this.editMode ? item.parentId : item.id;
      this.itemName = this.editMode ? item.title : '';
      this.type = item.type;
    },
    focus() {
      this.$nextTick(() => {
        this.$refs.input.$el.querySelector('input').focus();
      });
    },
    close() {
      this.$emit('input', false);
    }
  }
};
</script>

<template>
  <el-dialog
    :title="modalTitle"
    :visible.sync="isShow"
    width="400px"
    @close="close"
  >
    <div class="field">
      <div class="title">Тип</div>
      <el-select
        v-model="type"
        :disabled="editMode"
        size="medium"
        placeholder="Тип"
      >
        <el-option
          v-for="typeElement in types"
          :key="typeElement.key"
          :label="typeElement.title"
          :value="typeElement.key"
        />
      </el-select>
    </div>
    <div class="field">
      <div class="title">Родительская категория</div>
      <el-select
        v-model="parentId"
        :loading="loading"
        size="medium"
        placeholder="Родительская категория"
      >
        <el-option
          v-for="category in categories"
          :key="category.id"
          :label="category.title"
          :value="category.id"
        />
      </el-select>
    </div>
    <div class="title">Название</div>
    <el-input
      ref="input"
      v-model="itemName"
      size="medium"
      placeholder="Название"
      @keydown.native.enter="handleKeydownEnter"
    />
    <div slot="footer">
      <el-button
        size="mini"
        @click="close"
      >
        Отмена
      </el-button>
      <el-button
        v-if="editMode"
        :disabled="isEmptyName"
        :loading="saving"
        type="success"
        size="mini"
        @click="editCategory"
      >
        Редактировать
      </el-button>
      <el-button
        v-else
        :disabled="isEmptyName"
        :loading="saving"
        type="success"
        size="mini"
        @click="saveCategory"
      >
        Сохранить
      </el-button>
    </div>
  </el-dialog>
</template>

<style scoped>
    .title {
        font-size: 12px;
        margin-bottom: 8px;
    }

    .el-select {
        width: 100%;
    }

    .field {
        margin-bottom: 16px;
    }

    .field:last-child {
        margin-bottom: 0;
    }
</style>