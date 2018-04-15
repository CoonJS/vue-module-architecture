<script>
  import PageContainer from '../../com/Container/Page.vue';

  export default {
    components: {
      PageContainer
    },
    data () {
      return {
        searchQuery: ''

      }
    }
  }
</script>

<template>
    <page-container>
        <div slot="header" class="header">
            <div>
                <h3>Интеграции</h3>
            </div>
            <div>
                <el-input placeholder="Поиск" v-model="searchQuery">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
        </div>
    </page-container>
</template>

<style scoped>
    .header {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
    }

    .el-input {
        width: 260px;
    }
</style>