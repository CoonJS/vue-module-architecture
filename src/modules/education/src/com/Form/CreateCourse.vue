<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          title: '',
          description: '',
          imageFileId: null,
        };
      }
    }
  },
  data() {
    return {
      model: this.data
    };
  },
  watch: {
    model: {
      deep: true,
      handler(val) {
        this.$emit('change', val);
      }
    },
    data: {
      deep: true,
      handler(val) {
        this.model = val;
      }
    }
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  methods: {
    handleUpload({ id }) {
      this.model = {...this.model, imageFileId: id };
    }
  }
};
</script>

<template>
  <div 
    v-if="data !== null" 
    class="form"
  >
    <div class="field image">
      <div class="title">Изображение</div>
      <avatar-uploader
        :file-id="model.imageFileId"
        @upload="handleUpload"
      />
    </div>
    <div class="field">
      <div class="title">Название курса</div>
      <el-input v-model="model.title" />
    </div>
    <div class="field">
      <div class="title">Описание курса</div>
      <el-input 
        v-model="model.description" 
        :rows="5" 
        type="textarea"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
    .form {
        width: 100%;
        padding: 16px;

        .field {
            margin-top: 16px;

            &:first-child {
                margin-top: 0;
            }

            &.image {
                width: 230px;
            }

            .title {
                margin-bottom: 8px;
                font-size: 12px;
            }
        }
    }

    .image-preview {
        width: 200px;
        height: 200px;
        margin-top: 16px;
        border: 2px dashed #eee;
    }
</style>
