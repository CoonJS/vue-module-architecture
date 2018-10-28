<script>
export default {
  name: 'MenuItemAction'
};
</script>

<template>
  <div
    class="menu-item"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<style scoped>
    .menu-item {
        cursor: pointer;
        padding: 16px;
        align-items: center;
        color: #fff;
        font-size: 12px;
    }

    .menu-item:hover {
        background-color: #214367a3;
    }
</style>