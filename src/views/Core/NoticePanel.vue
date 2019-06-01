<template>
    <div class="notice-panel">
        <div class="header">您有 {{socketMessage.length}} 条通知</div>
        <div class="notice-content">
            <div v-for="item in socketMessage" :key="item.id" class="notice-item">
        <span class="notice-icon">
          <li class="fa fa-edit"></li>
        </span>
                <span class="notice-cotent">
          {{ item.message }}
        </span>
            </div>
        </div>
        <div class="notice-footer">查看所有通知</div>
    </div>
</template>

<script>
    export default {
        name: 'NoticePanel',

        data() {
            return {
                socketMessage:[]
            }
        },
        methods: {
            handleClick: function () {
                // 按钮操作处理函数
                this.$emit('click', {})
            },
            findSocketMessage: function () {
                this.$api.socketMess.findAll().then(res => {
                    this.socketMessage = res;
                })
            }
        },
        created(){
            this.findSocketMessage();
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .notice-panel {
        font-size: 15px;
        width: 250px;
        margin: -12px;
    }

    .header {
        padding-left: 10px;
        font-size: 14px;
        padding-top: 6px;
        padding-bottom: 6px;
    }

    .notice-content {
        font-size: 15px;
    }

    .notice-item {
        border-color: rgba(180, 190, 190, 0.8);
        border-top-width: 1px;
        border-top-style: solid;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .notice-item:hover {
        cursor: pointer;
        background: #b1a6a61e;
    }

    .notice-icon {
        padding-left: 10px;
        padding-right: 5px;
    }

    .notice-footer {
        font-size: 14px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-color: rgba(180, 190, 190, 0.8);
        border-top-width: 1px;
        border-top-style: solid;
    }

    .notice-footer:hover {
        cursor: pointer;
        background: #b1a6a61e
    }
</style>
