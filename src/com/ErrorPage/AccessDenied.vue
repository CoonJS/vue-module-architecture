<script>
export default {
  name: 'AccessDenied'
};
</script>

<template>
  <div class="error">
    <div class="title">У вас нет прав для просмотра этой страницы</div>
    <div class="subtitle">Обратитесь к администратору проекта для выдачи прав</div>
  </div>
</template>

<style scoped>
    .error {
        padding-top: 72px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .title {
        font-size: 44px;
        font-weight: bold;
        color: rgba(0,0,0,.2);
    }

    .subtitle {
        margin-top: 16px;
        font-size: 24px;
        color: rgba(0,0,0,.3);
    }
</style>