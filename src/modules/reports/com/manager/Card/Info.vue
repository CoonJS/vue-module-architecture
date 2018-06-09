<script>
  export default {
    props: {
      manager: {
        type: Object,
        default() {
          return {};
        }
      }
    }
  }
</script>

<template>
    <div>
        <div class="common">
            <div class="field">
                <span class="title">Имя:</span>
                <span>{{manager.firstName}}</span>
            </div>
            <div class="field">
                <span class="title">Фамилия:</span>
                <span>{{manager.lastName}}</span>
            </div>
            <div class="field">
                <span class="title">Телефон:</span>
                <span>+7 (984) 434 43 43</span>
            </div>
            <div class="field">
                <span class="title">Email:</span>
                <span>user@email.com</span>
            </div>
        </div>
        <div class="content">
            <!--<div class="progress">-->
                <!--<el-progress :percentage="70" status="success" :text-inside="true" :stroke-width="24"/>-->
            <!--</div>-->
        </div>
    </div>
</template>

<style scoped>
    .common {
        padding: 12px;
        background-color: #096ba7;
        border-bottom: 1px solid #eee;
    }

    .field {
        color: #fff;
        padding: 4px 0;
        font-size: 14px;
    }

    .content {
        padding: 12px;
    }

    .progress {
        padding: 8px 0;
    }
</style>