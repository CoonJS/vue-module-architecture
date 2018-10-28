<script>
import { VueEditor } from 'vue2-editor';

import LeftMenu from '../com/Menu/Left.vue';
import MainPlaceholder from '../com/Placeholder/Main.vue';

export default {
  components: {
    VueEditor,
    LeftMenu,
    MainPlaceholder
  },
  data () {
    return {
      model: '',
      article: null,
      isLoading: false,
      isEditMode: false,
      isArticleLoading: false,
      isShowScrollButton: false,
      access: {
        canView: this.api.hasAccess('VIEW_WIKI'),
        canEdit: this.api.hasAccess('EDIT_WIKI'),
        canRemove: this.api.hasAccess('REMOVE_WIKI'),
      }
    };
  },
  computed: {
    hasArticle() {
      return this.article !== null;
    }
  },
  watch: {
    '$route': {
      handler() {
        this.$nextTick(() => {
          this.loadArticle();
        });
      }
    }
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  mounted() {
    this.loadArticle();
  },
  methods: {
    async loadArticle() {
      const articleId = this.$route.params.id;
      const hasArticleID = articleId !== undefined;

      if (this.isArticleLoading === true) {
        return;
      }

      if (!hasArticleID) {
        this.article = null;
        this.model = '';
        return;
      }

      this.isArticleLoading = true;
      try {
        const { data: article } = await this.api.get('articleUsingGET', { id: articleId });
        this.article = article;
        this.model = article.text;
      } catch (e) {
        this.isArticleLoading = false;
        this.$router.push('/wiki');
      }

      this.isArticleLoading = false;
    },
    async saveArticle() {
      this.isLoading = true;
      const id = this.article.id;
      await this.api.put('updatedArticleUsingPUT', { id }, {
        title: this.article.title,
        text: this.model,
        order: this.article.order,
        parentId: this.article.parentId
      });

      this.isLoading = false;

      this.clearData();
      this.disableEditMode();
      this.loadArticle(id);
      this.reloadMenu();
    },
    async deleteArticle() {
      const id = this.article.id;

      this.isLoading = true;
      await this.api.delete('deleteArticleUsingDELETE', { id });
      this.isLoading = false;

      this.article = null;

      this.clearData();
      this.reloadMenu();
      this.$router.push('/wiki');
    },
    reloadMenu() {
      this.$refs.menu.loadMenuItems();
    },
    handleSelect() {
      this.disableEditMode();
    },
    handleDelete() {
      this.showConfirmMessage().then(() => {
        this.deleteArticle();
      });
    },
    clearData() {
      this.model = '';
    },
    enableEditMode() {
      this.isEditMode = true;
    },
    disableEditMode() {
      this.isEditMode = false;
    },
    showConfirmMessage() {
      return this.$confirm('Вы действительно хотите удалить статью?',
        'Подтверждение удаления',
        {
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
          type: 'Danger'
        });
    },
    scrollToTop() {
      document.querySelector('#content').scrollTo(0, 0);
    },
    handleScroll(event) {
      this.isShowScrollButton = event.target.scrollTop > 500;
    }
  }
};
</script>

<template>
  <page-container
    fluid
    flex-content
  >
    <div class="wiki-page">
      <div class="left">
        <left-menu 
          ref="menu" 
          @select="handleSelect"
        />
      </div>
      <div
        id="content"
        v-loading.body="isArticleLoading"
        class="content"
        @scroll="handleScroll"
      >
        <div v-if="hasArticle">
          <div class="header">
            <el-input
              v-if="isEditMode"
              v-model="article.title"
              size="mini"
              @keydown.native.enter="saveArticle"
            />
            <h3 v-else>{{ article.title }}</h3>
            <div>
              <template v-if="isEditMode">
                <el-button
                  :loading="isLoading"
                  type="success"
                  size="mini"
                  @click="saveArticle"
                >
                  Сохранить
                </el-button>
                <el-button
                  size="mini"
                  @click="disableEditMode"
                >
                  Отмена
                </el-button>
              </template>

              <template v-else>
                <el-tooltip 
                  v-if="access.canEdit" 
                  effect="dark" 
                  content="Редактировать" 
                  placement="left"
                >
                  <el-button
                    circle
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    @click="enableEditMode"
                  />
                </el-tooltip>
                <el-tooltip 
                  v-if="access.canRemove" 
                  effect="dark" 
                  content="Удалить" 
                  placement="left"
                >
                  <el-button
                    :loading="isLoading"
                    circle
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete"
                  />
                </el-tooltip>
              </template>
            </div>
          </div>

          <div class="article-content">
            <vue-editor 
              v-if="isEditMode" 
              v-model="model"
            />
            <div v-else>
              {{ article.text }}
            </div>
            <div 
              v-if="isShowScrollButton" 
              class="scroll-to-top"
            >
              <el-tooltip 
                effect="dark" 
                content="Наверх" 
                placement="top"
              >
                <el-button 
                  type="primary" 
                  icon="el-icon-arrow-up" 
                  circle 
                  @click="scrollToTop"
                />
              </el-tooltip>
            </div>
          </div>
        </div>
        <main-placeholder v-else />
      </div>
    </div>
  </page-container>
</template>

<style scoped>
    .wiki-page {
        display: flex;
        flex: 1;
    }

    .left {
        display: flex;
        width: 320px;
    }

    .content {
        display: flex;
        flex: 1;
        background-color: #fbfbfb;
        flex-direction: column;
        width: 100%;
        overflow-y: auto;
    }

    .article-content {
        position: relative;
        margin-left: 16px;
        padding: 16px;
    }

    .header {
        padding: 16px;
        display: flex;
        background-color: #fbfbfb;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        border-bottom: 1px solid #eee;

    }

    .scroll-to-top {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

    .el-input {
        width: 320px;
    }

    .quillWrapper {
        height: 600px;
    }
</style>