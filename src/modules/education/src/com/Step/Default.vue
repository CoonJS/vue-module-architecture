<script>
  export default {
    props: {
      number: {
        type: Number
      },
      active: {
        type: Boolean,
        default() {
          return false;
        }
      },
      title: {
        type: String,
        default() {
          return '';
        }
      },
      content: {
        type: String,
        default() {
          return null;
        }
      }
    }
  }
</script>

<template>
    <div
        class="step"
        :class="{active}"
        @click="$emit('click', number)"
    >

        <el-tooltip content="Удалить" placement="top">
            <div class="close-icon" @click.stop.prevent="$emit('remove', number)">
                <i class="el-icon-circle-close-outline"/>
            </div>
        </el-tooltip>
        <div class="count">{{number}}</div>
        <div v-html="title" class="title">
            {{title}}
        </div>
        <div v-html="content" class="content"/>
    </div>
</template>

<style lang="less" scoped>
    .step {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 160px;
        min-width: 160px;
        min-height: 100px;
        background: #fff;
        height: 100px;
        margin: 8px 0;
        border: 2px solid rgba(0, 0, 0, 0.2);

        .title {
            font-size: 12px;
        }

        &.active, &:hover {
            border: 2px solid #03A9F4;
        }

        .close-icon {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 20px;
            color: rgba(0, 0, 0, 0.2);

            &:hover {
                color: rgba(0, 0, 0, 0.3);
            }
        }

        .count {
            position: absolute;
            top: -2px;
            left: -16px;
            color: rgba(0, 0, 0, 0.2);
        }
    }

    .content {
        overflow: auto;
        height: 100%;
        width: 100%;
        transform: scale(0.5);
    }
</style>