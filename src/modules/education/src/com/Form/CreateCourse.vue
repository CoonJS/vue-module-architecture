<script>
  export default {
    props: {
      data: {
        type: Object,
        default() {
          return {
            title: '',
            description: '',
            image: null
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
      data: {
        deep: true,
        handler(val) {
          this.$emit('change', val);
        }
      }
    },
    methods: {
      handleFileChange({ target }) {
        const reader = new FileReader();

        reader.onload = e => {
          this.data.image = e.target.result;
        };

        reader.readAsDataURL(target.files[0]);
      }
    }
  }
</script>

<template>
    <div class="form" v-if="data !== null">
        <div class="field">
            <div class="title">Название курса</div>
            <el-input v-model="data.title"/>
        </div>
        <div class="field">
            <div class="title">Описание курса</div>
            <el-input v-model="data.description" type="textarea" :rows="5"/>
        </div>
        <div class="field image">
            <div class="title">Изображение курса</div>
            <div class="container">
                <input
                    accept="image/*"
                    type="file"
                    @change="handleFileChange"
                />
                <img class="image-preview" v-if="data.image" :src="data.image" alt="file">
            </div>
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