<script>
export default {
  name: 'NoData'
};
</script>

<template>
  <div class="no-data-hint">
    <div>
      <div class="hint">Нет данных</div>
      <div class="placeholders">
        <div class="placeholder" />
        <div 
          class="placeholder" 
          style="width:75%"
        />
        <div 
          class="placeholder" 
          style="width:50%"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
    .no-data-hint {
        width: 100%;
        padding: 64px 16px;
        display: flex;
        align-content: center;
        justify-content: center;
    }
    
    .hint {
        font-size: 32px;
        color: rgba(153, 153, 153, .4);
        font-weight: bold;
    }

    .placeholders {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .placeholder {
        width: 100%;
        margin: 16px 0;
        background-color: rgba(153, 153, 153, .1);
        height: 20px;
    }

</style>