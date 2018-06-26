<script>
  export default {
    name: 'node',
    props: {
      node: Object
    }
  };
</script>

<template>
    <el-submenu v-if="node.children && node.children.length" :index="String(node.id)">
        <template slot="title">{{node.title}}</template>
        <node v-for="child in node.children" :node="child" :key="child.id"/>
    </el-submenu>
    <el-menu-item v-else-if="node.type === 'ARTICLE'" :index="String(node.id)">
        <span>{{ node.title }}</span>
        <i class="el-icon-tickets"></i>
    </el-menu-item>
    <el-submenu v-else :index="String(node.id)">
        <template slot="title">{{ node.title }}</template>
    </el-submenu>
</template>

<style scoped>
    i.el-icon-tickets {
        font-size: 12px;
    }

    span {
        font-style: italic;
        font-size: 12px;
    }
</style>