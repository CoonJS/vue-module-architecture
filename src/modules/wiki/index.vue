<script>
  import { VueEditor } from 'vue2-editor';

  import LeftMenu from './com/Menu/Left.vue';

  export default {
    components: {
      VueEditor,
      LeftMenu
    },
    data () {
      return {
        model: ''
      }
    }
  }
</script>

<template>
    <page-container fluid flex-content>
        <div class="wiki-page">
            <div class="left">
                <left-menu/>
            </div>
            <div class="content">
                <h1>Модуль Wiki</h1>
                <div class="editor">
                    <vue-editor v-model="model"/>
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
        padding: 16px;
        width: 100%;
        overflow-y: auto;
    }

    .editor {
        margin-top: 16px;
    }

    .quillWrapper {
        height: 600px;
    }
</style>