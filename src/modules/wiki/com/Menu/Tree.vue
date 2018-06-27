<script>
  import NodeTree from './Node/Tree.vue';

  export default {
    props: {
      treeData: Array
    },
    components: {
      NodeTree
    },
    methods: {
      handleCreate() {

      }
    }
  };
</script>

<template>
    <div class="tree">
        <node-tree v-for="node in treeData" :node="node" :key="node.id" @create="handleCreate"/>
    </div>
</template>
