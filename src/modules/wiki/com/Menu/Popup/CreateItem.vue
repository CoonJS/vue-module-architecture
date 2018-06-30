<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default() {
          return false;
        }
      },
      parentCategoryId: {
        type: Number
      },
      itemType: {
        type: String,
        default() {
          return 'CATEGORY'
        }
      }
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data() {
      return {
        isShow: this.value,
        categoryName: '',
        type: this.itemType,
        parentId: this.parentCategoryId || null,
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
        return this.categoryName.trim() === '';
      },
      modalTitle() {
        return this.type === 'ARTICLE' ? 'Создание статьи' : 'Создание категории';
      }
    },
    watch: {
      value(isShow) {
        this.isShow = isShow;

        if (this.isShow === true) {
          this.focus();
          this.loadCategories();
        }
      },
      parentCategoryId(id) {
        this.parentId = id;
      },
      itemType(val) {
        this.type = val;
      }
    },
    methods: {
      async saveCategory() {
        this.saving = true;

        try {
          await this.api.post('createdArticleUsingPOST', {}, {
            parentId: this.parentId,
            title: this.categoryName,
            type: this.type
          });
        } catch (e) {
          this.saving = false;
          throw new Error(e);
        }

        this.saving = false;

        this.parentId = null;
        this.categoryName = '';

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
      focus() {
        this.$nextTick(() => {
          this.$refs.input.$el.querySelector('input').focus();
        });
      },
      close() {
        this.$emit('input', false)
      }
    }
  };
</script>

<template>
    <el-dialog
        width="400px"
        :title="modalTitle"
        :visible.sync="isShow"
        @close="close"
    >
        <div class="field">
            <div class="title">Тип</div>
            <el-select
                v-model="type"
                size="medium"
                placeholder="Тип"
            >
                <el-option
                    v-for="type in types"
                    :key="type.key"
                    :label="type.title"
                    :value="type.key"
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
            v-model="categoryName"
            size="medium"
            placeholder="Название"
            @keydown.native.enter="saveCategory"
        />
        <div slot="footer">
            <el-button
                size="mini"
                @click="close"
            >
                Отмена
            </el-button>
            <el-button
                type="success"
                size="mini"
                :disabled="isEmptyName"
                :loading="saving"
                @click="saveCategory"
            >
                Создать
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