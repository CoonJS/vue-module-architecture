<template>
    <div class="funnel">
        <transition-group name="list" tag="div">
            <div class="funnel-item-wrap" v-for="(item,idx) in items" :key="idx">
                <div
                    class="funnel-item"
                    :style="{
                        backgroundColor: item.color || getRandomColor(idx),
                        width: calcWidth(item.count)
                    }"
                    v-show="idx === idx"
                >
                    <span class="count">{{item.count}}</span>
                </div>
                <div class="name">
                    {{item.name}}
                </div>
            </div>
        </transition-group>
    </div>
</template>

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
        return `${100 * (value/this.summary)}%`;
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

<style scoped>
    .funnel {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
    }

    .funnel-item-wrap {
        display: flex;
        align-items: center;
    }

    .funnel-item {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        border-radius: 3px;
        box-shadow: 2px 0 2px rgba(0, 0, 0, .6);
    }

    .name {
        margin-left: 8px;
    }

    .count {
        color: #fff;
    }

    .list-enter-active, .list-leave-active {
        transition: all .3s ease-in-out;
    }
    .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
        transform: translateY(-10px);
    }
</style>