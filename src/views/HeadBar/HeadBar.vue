<template>
    <div class="headbar" :style="{'background':themeColor}"
         :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
        <!-- 导航收缩 -->
        <span class="hamburg">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff" :active-text-color="themeColor"
               mode="horizontal">
        <el-menu-item index="1" @click="onCollapse"><hamburger :isActive="collapse"></hamburger></el-menu-item>
      </el-menu>
    </span>
        <!-- 导航菜单 -->
        <span class="navbar">
        <el-menu class="el-menu-demo"
                 :background-color="themeColor" text-color="#fff" active-text-color="#303133" mode="horizontal"
                 @select="selectNavBar()">
            <el-submenu index="2">
                <template slot="title">{{$t('common.recommondHouse')}}</template>
                <el-menu-item index="2-1" @click="$router.push({path:'/info/BizHotelOrder',query:{recommondCode:recommondHouse}})">{{$t('common.recommondHouse')}}  </el-menu-item>
                <el-menu-item index="2-2" @click="$router.push({path:'/info/BizHotelOrder',query:{recommondCode:lowPriceHouse}})">{{$t("common.lowPriceHouse")}}</el-menu-item>
                <el-menu-item index="2-3" @click="$router.push({path:'/info/BizHotelOrder',query:{recommondCode: maxCountHouse}})">{{$t("common.maxCountHouse")}}</el-menu-item>
            <!--<el-menu-item index="4" @click="openWindow('https://www.cnblogs.com/xifengxiaoma/')">{{$t("common.blog")}}</el-menu-item>-->
            </el-submenu>
        </el-menu>
        </span>
        <!-- 工具栏 -->
        <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" :text-color="themeColor"
               :active-text-color="themeColor" mode="horizontal">
        <!--<el-menu-item index="1">-->
          <!--&lt;!&ndash; 主题切换 &ndash;&gt;-->
          <theme-picker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"
                        v-show="false"></theme-picker>
          <!--</el-menu-item>-->
          <!--        <el-menu-item index="2" v-popover:popover-lang>-->
          <!--          &lt;!&ndash; 语言切换 &ndash;&gt;-->
          <!--          <li style="color:#fff;" class="fa fa-language fa-lg"></li>-->
          <!--          <el-popover ref="popover-lang" placement="bottom-start" trigger="click" v-model="langVisible">-->
          <!--            <div class="lang-item" @click="changeLanguage('zh_cn')">简体中文</div>-->
          <!--            <div class="lang-item" @click="changeLanguage('en_us')">English</div>-->
          <!--          </el-popover>-->
          <!--        </el-menu-item>-->
          <!--          <el-menu-item index="3" v-popover:popover-message>-->
          <!--          &lt;!&ndash; 我的私信 &ndash;&gt;-->
          <!--          <el-badge :value="5" :max="99" class="badge" type="success">-->
          <!--          <li style="color:#fff;" class="fa fa-envelope-o fa-lg"></li>-->
          <!--          </el-badge>-->
          <!--          <el-popover ref="popover-message" placement="bottom-end" trigger="click">-->
          <!--          <message-panel></message-panel>-->
          <!--          </el-popover>-->
          <!--          </el-menu-item>-->
<!--          <el-menu-item index="4" v-popover:popover-notice>-->
<!--          &lt;!&ndash; 系统通知 &ndash;&gt;-->
<!--          <el-badge :value="noReadCount" :max="99" class="badge" type="success">-->
<!--                <li style="color:#fff;" class="fa fa-bell-o fa-lg"></li>-->
<!--          </el-badge>-->
<!--          <el-popover ref="popover-notice" placement="bottom-end" trigger="click">-->
<!--                <notice-panel></notice-panel>-->
<!--          </el-popover>-->
<!--          </el-menu-item>-->
        <el-menu-item index="5" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info"><img :src="user.path"/>{{user.name}}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {baseUrl} from "@/utils/global"
    import Hamburger from "@/components/Hamburger"
    import ThemePicker from "@/components/ThemePicker"
    import LangSelector from "@/components/LangSelector"
    import Action from "@/components/Toolbar/Action"
    // import NoticePanel from "@/views/Core/NoticePanel"
    // import MessagePanel from "@/views/Core/MessagePanel"
    import PersonalPanel from "@/views/Core/PersonalPanel"

    export default {
        components: {
            Hamburger,
            ThemePicker,
            LangSelector,
            Action,
            // NoticePanel,
            // MessagePanel,
            PersonalPanel
        },
        data() {
            return {
                user: {
                    name: "",
                    path: "",
                    role: "",
                    createTime: "注册时间：2018-12-20 "
                },
                params: {
                    name: ''
                },
                langVisible: false,
                noReadCount: 0,
                recommondHouse:null,
                lowPriceHouse:null,
                maxCountHouse:null

            }
        },
        methods: {
            openWindow(url) {
                window.open(url)
            },
            selectNavBar(key, keyPath) {
                console.log(key, keyPath)
            },
            // 折叠导航栏
            onCollapse: function () {
                this.$store.commit('onCollapse')
            },
            // 切换主题
            onThemeChange: function (themeColor) {
                this.$store.commit('setThemeColor', themeColor)
            },
            // 加载用户角色信息
            findUserRoles: function () {
                let user = sessionStorage.getItem("user");
                this.params.name = user;
                this.$api.user.findByName(this.params).then((rs) => {
                    // 获取用户头像
                    this.$api.user.showFile({'relationId': rs.path}).then((res) => {
                        if (res instanceof Array && res.length > 0) {
                            var imageId = res[0];
                            rs.path = baseUrl + "/document/preview/" + imageId;
                        } else {
                            rs.path = ""
                        }
                    }).then(() => {
                        // 加载角色集合
                        this.user = rs;
                    });
                })
            },
            findNoReadCount: function () {
                this.$api.socketMess.findAll().then( res =>{
                    for (let i in res) {
                        let tp = res[i];
                        let mes;
                        if("1" == tp){
                            mes = this.$t('action.messOrder');
                        }else if("2" == tp){
                            mes = this.$t('action.messDay');
                        }else if("3" == tp){
                            mes = this.$t('action.messWeek');
                        }else if("4" == tp){
                            mes = this.$t('action.messMonth');
                        }else if("5" == tp){
                            mes = this.$t('action.messOther');
                        }else{
                            mes = this.$t('action.messOther');
                        }
                        this.$notify.info({
                            title: this.$t('action.messTitle'),
                            message:mes,
                            duration:0,
                            position: 'bottom-right'
                        })
                    }
                })
            },
            findRecommendRoom:function () {
                this.$api.hotelRoom.findCustroomInfo().then( res =>{
                    if (res) {
                        for (var i = 0 ; i<res.length;i++) {
                            if ("01" === res[i].custroomType) {
                                this.lowPriceHouse = res[i].roomCode
                            } else if ("02" === res[i].custroomType) {
                                this.maxCountHouse = res[i].roomCode
                            } else if ("03" === res[i].custroomType) {
                                this.recommondHouse = res[i].roomCode

                            }
                        }
                        console.log("recommondHouse",this.recommondHouse)
                    }
                })
            }
        },
        mounted() {
            this.sysName = "Hotel"
            this.findUserRoles();
            this.findNoReadCount();
            this.findRecommendRoom();
        },
        computed: {
            ...mapState({
                themeColor: state => state.app.themeColor,
                collapse: state => state.app.collapse
            })
        }
    }
</script>

<style scoped lang="scss">
    .headbar {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1030;
        height: 60px;
        line-height: 60px;
        border-color: rgba(180, 190, 190, 0.8);
        border-left-width: 1px;
        border-left-style: solid;
    }

    .hamburg, .navbar {
        float: left;
    }

    .toolbar {
        float: right;
    }

    .lang-item {
        font-size: 16px;
        padding-left: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
        cursor: pointer;
    }

    .lang-item:hover {
        font-size: 18px;
        background: #b0d6ce4d;
    }

    .user-info {
        font-size: 20px;
        color: #fff;
        cursor: pointer;

        img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            margin: 10px 0px 10px 10px;
            float: right;
        }
    }

    .badge {
        line-height: 18px;
    }

    .position-left {
        left: 240px;
    }

    .position-collapse-left {
        left: 65px;
    }
</style>
