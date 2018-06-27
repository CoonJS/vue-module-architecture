<script>
  import NodeTree from './Node/Tree.vue';

  export default {
    props: {
      treeData: Array
    },
    components: {
      NodeTree
    },
    beforeCreate() {

    },
    methods: {
      handleCreate() {

      },
      handleRemove(id) {
        this.$emit('remove', id);
      }
    }
  };
</script>

<template>
    <div class="tree">
        <node-tree v-for="node in treeData" :node="node" :key="node.id" @create="handleCreate" @remove="handleRemove"/>
    </div>
</template>
