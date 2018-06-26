<script>
  import NodeTree from './Node/Tree.vue';

  export default {
    props: {
      treeData: Array
    },
    components: {
      NodeTree
    }
  };
</script>

<template>
    <div class="tree">
        <node-tree v-for="node in treeData" :node="node" :key="node.id"/>
    </div>
</template>

<style scoped>

</style>