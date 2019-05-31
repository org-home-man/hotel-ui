<template>
    <div id="main-container" class="main-container"
         :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
        <!-- 标签页 -->
        <div class="tab-container">
            <el-tabs class="tabs" :class="$store.state.app.collapse?'position-collapse-left':'position-left'"
                     v-model="mainTabsActiveName" type="card"
                     @tab-click="selectedTabHandle" @tab-remove="removeTabHandle">
                <el-dropdown class="tabs-tools" :show-timeout="0" trigger="hover">
                    <div style="font-size:20px;width:50px;"><i class="el-icon-arrow-down"></i></div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="tabsCloseCurrentHandle">{{$t('common.tabsCloseCurrentHandle')}}</el-dropdown-item>
                        <el-dropdown-item @click.native="tabsCloseOtherHandle">{{$t('common.tabsCloseOtherHandle')}}</el-dropdown-item>
                        <el-dropdown-item @click.native="tabsCloseAllHandle">{{$t('common.tabsCloseAllHandle')}}</el-dropdown-item>
                        <el-dropdown-item @click.native="tabsRefreshCurrentHandle">{{$t('common.tabsRefreshCurrentHandle')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-tab-pane v-for="item in mainTabs"
                             :key="item.name" :label="generateTitle(item.title)" :closable="item.closable" :name="item.name">
                    <span slot="title"><i :class="item.icon"></i> {{generateTitle(item.title)}} </span>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 主内容区域 -->
        <div class="main-content">
            <keep-alive>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import {generateTitle} from '@/utils/i18n'
    import {baseUrl} from "@/utils/global"

    export default {
        data() {
            return {
                webSocket : null,
                lockReconnect: false,
                reconnectData:null,
                timeoutObj:null,
                timeout:4 * 60 * 1000, //1分钟
                message:{
                    type:null,
                    token:null,
                    message:null
                }
            }
        },
        computed: {
            mainTabs: {
                get() {
                    return this.$store.state.tab.mainTabs
                },
                set(val) {
                    this.$store.commit('updateMainTabs', val)
                }
            },
            mainTabsActiveName: {
                get() {
                    return this.$store.state.tab.mainTabsActiveName
                },
                set(val) {
                    this.$store.commit('updateMainTabsActiveName', val)
                }
            }
        },
        methods: {
            generateTitle,
            // tabs, 选中tab
            selectedTabHandle(tab) {
                tab = this.mainTabs.filter(item => item.name === tab.name)
                if (tab.length >= 1) {
                    this.$router.push({name: tab[0].name})
                }
            },
            // tabs, 删除tab
            removeTabHandle(tabName) {
                this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
                if (this.mainTabs.length >= 1) {
                    // 当前选中tab被删除
                    if (tabName === this.mainTabsActiveName) {
                        this.$router.push({name: this.mainTabs[this.mainTabs.length - 1].name}, () => {
                            this.mainTabsActiveName = this.$route.name
                        })
                    }
                } else {
                    this.$router.push("/info/hotelRoomQry")
                }
            },
            // tabs, 关闭当前
            tabsCloseCurrentHandle() {
                this.removeTabHandle(this.mainTabsActiveName)
            },
            // tabs, 关闭其它
            tabsCloseOtherHandle() {
                this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
            },
            // tabs, 关闭全部
            tabsCloseAllHandle() {
                this.mainTabs = []
                this.$router.push("/info/hotelRoomQry")
            },
            // tabs, 刷新当前
            tabsRefreshCurrentHandle() {
                var tempTabName = this.mainTabsActiveName
                this.removeTabHandle(tempTabName)
                this.$nextTick(() => {
                    this.$router.push({name: tempTabName})
                })
            },
            initWebSocket(){
                console.log('启动中')
                let wsUrl = (baseUrl+"/websocket/20").replace("http","ws");
                this.websock = new WebSocket(wsUrl);
                this.websock.onopen = this.webSocketOnOpen;          //连接成功
                this.websock.onmessage = this.webSocketOnMessage;    //广播成功
                this.websock.onerror = this.webSocketOnError;        //连接断开，失败
                this.websock.onclose = this.webSocketClose;          //连接关闭
            },             //初始化weosocket
            webSocketOnOpen(){
                console.log('连接成功' + new Date().getTime());
                this.message.type = 101;
                this.message.token = sessionStorage.getItem('sessionId');
                this.webSocketSend(this.message)
                this.heatBeat();
            },           //连接成功
            webSocketOnError(){
                console.log('连接失败')
                this.reconnect();
            },          //连接失败
            webSocketClose(){
                console.log('断开连接');
                this.webSocketSend(this.message)
                this.reconnect();
            },            //各种问题导致的 连接关闭
            webSocketOnMessage(data){
                this.heatBeat();      //收到消息会刷新心跳检测，如果一直收到消息，就推迟心跳发送
                this.$notify({
                    title:'有新订单啦~!',
                    message:data.data,
                    duration:0,
                    position: 'bottom-right'
                })
            },    //数据接收
            webSocketSend(data){
                this.websock.send(JSON.stringify(data));
            },         //数据发送
            reconnect(){
                if(this.lockReconnect){       //这里很关键，因为连接失败之后之后会相继触发 连接关闭，不然会连接上两个 WebSocket
                    return
                }
                this.lockReconnect = true;
                this.reconnectData && clearTimeout(this.reconnectData);
                this.reconnectData = setTimeout(()=>{
                    this.initWebSocket();
                    this.lockReconnect = false;
                },5000)
            },
            heatBeat(){
                this.timeoutObj && clearTimeout(this.timeoutObj);
                this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
                this.timeoutObj = setTimeout(()=>{
                    this.webSocketSend({type:'心跳检测'})   //根据后台要求发送
                    this.serverTimeoutObj = setTimeout(()=> {
                        this.websock.close();       //如果  5秒之后我们没有收到 后台返回的心跳检测数据 断开socket，断开后会启动重连机制
                    }, 5000);
                }, this.timeout)
            },               //心跳检测
        },
        created() {
            this.initWebSocket();
        },
        destroyed() {
            this.lockReconnect = true;
            this.websock.close()                   //离开路由之后断开websocket连接
            clearTimeout(this.reconnectData);      //离开清除 timeout
            clearTimeout(this.timeoutObj);         //离开清除 timeout
            clearTimeout(this.serverTimeoutObj);   //离开清除 timeout
        }
    }
</script>

<style scoped lang="scss">
    .main-container {
        padding: 0 5px 5px;
        position: absolute;
        top: 60px;
        left: 1px;
        right: 1px;
        bottom: 0px;
        // background: rgba(56, 5, 114, 0.5);
        .tabs {
            position: fixed;
            top: 60px;
            right: 50px;
            padding-left: 0px;
            padding-right: 2px;
            z-index: 1020;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            background: rgb(255, 253, 255);
            border-color: rgba(200, 206, 206, 0.5);
            // border-left-width: 1px;
            // border-left-style: solid;
            border-bottom-width: 1px;
            border-bottom-style: solid;
        }

        .tabs-tools {
            position: fixed;
            top: 60px;
            right: 0;
            z-index: 1020;
            height: 40px;
            // padding: 0 10px;
            font-size: 14px;
            line-height: 40px;
            cursor: pointer;
            border-color: rgba(200, 206, 206, 0.5);
            border-left-width: 1px;
            border-left-style: solid;
            border-bottom-width: 1px;
            border-bottom-style: solid;
            background: rgba(255, 255, 255, 1);
        }

        .tabs-tools:hover {
            background: rgba(200, 206, 206, 1);
        }

        .main-content {
            position: absolute;
            top: 45px;
            left: 5px;
            right: 5px;
            bottom: 5px;
            padding: 5px;
            // background: rgba(209, 212, 212, 0.5);
        }
    }

    .position-left {
        left: 200px;
    }

    .position-collapse-left {
        left: 65px;
    }
</style>
