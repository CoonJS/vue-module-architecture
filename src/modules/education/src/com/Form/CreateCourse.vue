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
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
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
      }
    },
    methods: {
      handleUpload({ id }) {
        this.model = {...this.model, imageFileId: id };
      }
    }
  }
</script>

<template>
    <div class="form" v-if="data !== null">
        <div class="field image">
            <div class="title">Изображение</div>
            <avatar-uploader @upload="handleUpload"/>
        </div>
        <div class="field">
            <div class="title">Название курса</div>
            <el-input v-model="model.title"/>
        </div>
        <div class="field">
            <div class="title">Описание курса</div>
            <el-input v-model="model.description" type="textarea" :rows="5"/>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .form {
        width: 50%;
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