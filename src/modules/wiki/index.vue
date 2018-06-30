<script>
  import { VueEditor } from 'vue2-editor';

  import LeftMenu from './com/Menu/Left.vue';

  export default {
    components: {
      VueEditor,
      LeftMenu
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    data () {
      return {
        model: '',
        article: null,
        isLoading: false,
        isEditMode: false,
        isArticleLoading: false,
        isShowScrollButton: false
      }
    },
    computed: {
      hasArticle() {
        return this.article !== null;
      }
    },
    methods: {
      async loadArticle(id) {
        this.isArticleLoading = true;
        const { data: article } = await this.api.get('articleUsingGET', { id });
        this.article = article;
        this.model = article.text;
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
      },
      async deleteArticle() {
        const id = this.article.id;

        this.isLoading = true;
        await this.api.delete('deleteArticleUsingDELETE', { id });
        this.isLoading = false;

        this.article = null;

        this.clearData();
      },
      handleSelect(id) {
        this.disableEditMode();
        this.loadArticle(id);
      },
      handleDelete() {
        this.showConfirmMessage().then(() => {
          this.deleteArticle();
        })
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
  }
</script>

<template>
    <page-container fluid flex-content>
        <div class="wiki-page">
            <div class="left">
                <left-menu @select="handleSelect"/>
            </div>
            <div id="content" class="content" v-loading.body="isArticleLoading" @scroll="handleScroll">
                <div v-if="hasArticle">
                    <div class="header">
                        <h3>{{article.title}}</h3>
                        <div>
                            <el-button v-if="isEditMode" :loading="isLoading" type="success" size="mini" @click="saveArticle">Сохранить</el-button>
                            <el-button v-if="isEditMode" size="mini" @click="disableEditMode">Отмена</el-button>
                            <el-button v-else type="primary" size="mini" icon="el-icon-edit" circle @click="enableEditMode"/>
                            <el-button v-if="!isEditMode" size="mini" :loading="isLoading" circle type="danger" icon="el-icon-delete" @click="handleDelete"/>
                        </div>
                    </div>

                    <div class="article-content">
                        <vue-editor v-if="isEditMode" v-model="model"/>
                        <div v-else v-html="article.text"></div>
                        <div v-if="isShowScrollButton" class="scroll-to-top">
                            <el-button type="primary" icon="el-icon-arrow-up" circle @click="scrollToTop"/>
                        </div>
                    </div>
                </div>
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

    .quillWrapper {
        height: 600px;
    }
</style>