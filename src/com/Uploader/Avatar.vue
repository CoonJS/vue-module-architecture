<script>
export default {
  name: 'AvatarUploader',
  props: {
    fileId: {
      type: Number,
      default () {
        return null;
      }
    }
  },
  data() {
    return {
      id: null,
      imageUrl: ''
    };
  },
  computed: {
    hasFileId() {
      return this.id !== null;
    }
  },
  watch: {
    fileId: {
      immediate: true,
      handler(newFileId) {
        this.id = newFileId;
        this.imageUrl = newFileId ? this.buildFileUrlById(newFileId) : null;
      }
    }
  },
  methods: {
    handleAvatarSuccess(response, file) {
      const { id } = response;
      this.imageUrl = URL.createObjectURL(file.raw);
      this.id = id;

      this.$emit('upload', response);
    }
  }
};
</script>

<template>
  <el-upload
    :show-file-list="false"
    :multiple="false"
    :on-success="handleAvatarSuccess"
    drag
    class="avatar-uploader"
    action="/api/files"
  >
    <img 
      v-if="imageUrl" 
      :src="hasFileId ? buildFileUrlById(id) : imageUrl"
      class="avatar"
    >
    <i 
      v-else 
      class="el-icon-plus avatar-uploader-icon"
    />
  </el-upload>
</template>

<style lang="less" scoped>

    .avatar-uploader {
        width: 178px;
        height: 178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
    }
</style>
