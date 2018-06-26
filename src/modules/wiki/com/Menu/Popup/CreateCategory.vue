<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default() {
          return false;
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
        saving: false
      };
    },
    computed: {
      isEmptyName() {
        return this.categoryName.trim() === '';
      }
    },
    watch: {
      value(isShow) {
        this.isShow = isShow;
      }
    },
    methods: {
      async saveCategory() {
        this.saving = true;

        try {
          await this.api.post('createdArticleUsingPOST', {}, {
            parentId: null,
            title: this.categoryName,
            type: 'CATEGORY'
          });
        } catch (e) {
          this.saving = false;
          throw new Error(e);
        }

        this.saving = false;
        this.$emit('save');
        this.close();
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
        title="Создание категории"
        :visible.sync="isShow"
        @close="close"
    >
        <div class="title">Название</div>
        <el-input
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
</style>