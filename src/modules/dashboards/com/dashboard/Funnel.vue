<script>
  export default {
    name: "FunnelDashboard",
    props: {
      items: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      summary() {
        return this.items.reduce((prev, item) => {
          return prev + item.count;
        }, 0)
      }
    },
    methods: {
      calcWidth(value) {
        return `${Math.pow(100 * (value/this.summary), 1.5)}%`;
      },
      getRandomColor(idx) {
        const colorArray = [
          '#2a3a4d',
          '#ea7c3b',
          '#0eb0fd',
          '#85ce61',
          '#c0c4cc',
          '#6493cc',
          '#0438a0',
          '#d24b4b'
        ];

        return colorArray[idx] || colorArray[0];
      }
    }
  }
</script>

<template>
    <div class="funnel">
        <transition-group name="list" tag="div" style="flex:1">
            <div
                v-for="(item, idx) in items"
                class="funnel-item-wrap"
                :key="item.statusName"
                :style="{
                    height: `${100/items.length}%`
                }"
            >
                <div
                    class="funnel-item"
                    :style="{
                        backgroundColor: item.color || getRandomColor(idx),
                        width: calcWidth(item.count),
                    }"
                >
                    <span class="count">{{item.count}}</span>
                </div>
                <div class="name">
                    {{item.statusName}}
                </div>
            </div>
        </transition-group>
    </div>
</template>

<style scoped>
    .funnel {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }

    .funnel-item-wrap {
        display: flex;
        align-items: center;
    }

    .funnel-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        border-radius: 3px;
        box-shadow: 2px 0 2px rgba(0, 0, 0, .6);
        height: 100%;
    }

    .name {
        margin-left: 8px;
    }

    .count {
        color: rgba(0, 0, 0, .8);
    }

    .list-enter-active, .list-leave-active {
        transition: all .3s ease-in-out;
    }
    .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
        transform: translateY(-10px);
    }
</style>