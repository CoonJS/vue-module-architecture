<script>
  import PageContainer from '../../com/Container/Page.vue';

  export default {
    components: {
      PageContainer
    },
    data () {
      return {

      }
    }
  }
</script>

<template>
    <page-container>
        <div slot="header">
            <el-date-picker
                type="date"
                placeholder="От"
            />
            <el-date-picker
                type="date"
                placeholder="До"
            />
        </div>
        <div class="dashboards">
            <div class="row">
                <el-card class="box-card">
                    <div slot="header">
                        <span>Dashboard 1</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header">
                        <span>Dashboard 2</span>
                    </div>
                </el-card>
            </div>
            <div class="row">
                <el-card class="box-card">
                    <div slot="header">
                        <span>Dashboard 3</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header">
                        <span>Dashboard 4</span>
                    </div>
                </el-card>
            </div>
        </div>
    </page-container>
</template>

<style scoped>
    .dashboards {

    }

    .box-card {
        width: 50%;
        margin-right: 12px;
        height: 400px;
    }

    .box-card:last-child {
        margin-right: 0;
    }

    .row {
      display: flex;
      margin-bottom: 12px;
    }

    .row:last-child {
        margin-bottom: 0;
    }
</style>