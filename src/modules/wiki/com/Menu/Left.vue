<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>

<template>
    <!--@open="handleOpen"-->
    <!--@close="handleClose"-->
    <el-menu
        class="menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>Раздел 1</span>
            </template>
            <el-menu-item-group title="Группа 1">
                <el-menu-item index="1-1">Статья 1-1-1</el-menu-item>
                <el-menu-item index="1-2">Статья 1-1-2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Группа 2">
                <el-menu-item index="1-3">Статья 1-2-1</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span>Раздел 2</span>
        </el-menu-item>
    </el-menu>
</template>

<style scoped>
    .menu {
        width: 320px;
    }
</style>