<script>
import NodeTree from './Node/Tree.vue';

export default {
  components: {
    NodeTree
  },
  props: {
    treeData: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  methods: {
    handleCreate(id) {
      this.$emit('create', id);
    },
    handleRemove(id) {
      this.$emit('remove', id);
    },
    handleEdit(id) {
      this.$emit('edit', id);
    }
  }
};
</script>

<template>
  <div class="tree">
    <node-tree
      v-for="node in treeData"
      :key="node.id"
      :node="node"
      @create="handleCreate"
      @edit="handleEdit"
      @remove="handleRemove"
    />
  </div>
</template>
