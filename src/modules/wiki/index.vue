<script>
  import LeftMenu from './com/Menu/Left.vue';

  export default {
    components: {
      LeftMenu
    },
    data () {
      return {

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
</style>