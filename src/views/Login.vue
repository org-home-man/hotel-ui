<template xmlns:v-popover="">
    <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <div class="tool-bar">

            <!-- 主题切换 -->
            <theme-picker style="float:right;" class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange" v-show="false" ></theme-picker>
            <!-- 语言切换 -->
            <!--<el-menu class="el-menu-demo" :background-color="themeColor" :text-color="themeColor" :active-text-color="themeColor" mode="horizontal" style="position: relative;">-->
            <!--<el-menu-item index="1" v-popover:popover-lang style="position: absolute;right:5px;">-->
            <!--&lt;!&ndash; 语言切换 &ndash;&gt;-->
            <!--<li style="color:#fff;" class="fa fa-language fa-lg"></li>-->
            <!--<el-popover ref="popover-lang" placement="bottom-start" trigger="click" v-model="langVisible">-->
            <!--<div class="lang-item" @click="changeLanguage('zh_cn')">简体中文</div>-->
            <!--<div class="lang-item" @click="changeLanguage('en_us')">English</div>-->
            <!--</el-popover>-->
            <!--</el-menu-item>-->
            <!--</el-menu>-->
            <el-dropdown @command="changeLanguage" style="float:right">
      <span class="el-dropdown-link">
        <li style="color:#14889A;" class="fa fa-language fa-lg"></li><i class="el-icon-arrow-down el-icon--right"></i>
      </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="zh_cn">简体中文</el-dropdown-item>
                    <el-dropdown-item command="en_us">English</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--<lang-selector class="lang-selector"></lang-selector>-->
        </div>

        <h2 class="title" style="padding-left:22px;">{{$t('common.title')}}</h2>
        <el-form-item prop="account">
            <el-input type="text" v-model="loginForm.account" auto-complete="off"
                      :placeholder="$t('common.username')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off"
                      :placeholder="$t('common.passwd')"></el-input>
        </el-form-item>
        <el-form-item>
            <el-col :span="12">
                <el-form-item prop="captcha">
                    <el-input type="test" v-model="loginForm.captcha" auto-complete="off"
                              :placeholder="$t('common.validmsg')"
                              style="width: 100%;">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="1">&nbsp;</el-col>
            <el-col :span="11">
                <el-form-item>
                    <img style="width: 100%;" class="pointer" :src="loginForm.src" @click="refreshCaptcha">
                </el-form-item>
            </el-col>
        </el-form-item>
        <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:48%;" @click.native.prevent="reset">{{$t('common.reset')}}
            </el-button>
            <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">
                {{$t('common.login')}}
            </el-button>
        </el-form-item>
        <el-form-item style="text-align: left;color: orangered">
            <label>*{{$t('common.explain')}}</label>
        </el-form-item>
    </el-form>

</template>

<script>
    import {mapState} from 'vuex'
    import {baseUrl} from '../utils/global'
    import {setToken,setUser} from "@/utils/token"
    import {setAgreeZh,setAgreeEn} from "@/utils/agree"
    import ThemePicker from "@/components/ThemePicker"
    import LangSelector from "@/components/LangSelector"

    export default {
        name: 'Login',
        components: {
            ThemePicker,
            LangSelector
        },
        data() {
            return {
                webSocket:null,
                loading: false,
                loginForm: {
                    account: '',
                    password: '',
                    captcha: '',
                    src: ''
                },
                fieldRules: {
                    account: [
                        {required: true, message: this.$t('action.pRealName'), trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: this.$t('action.pPassword'), trigger: 'blur'}
                    ]
                    // ,
                    // captcha: [
                    //   { required: true, message: '请输入验证码', trigger: 'blur' }
                    // ]
                },
                checked: true,
                langVisible: false
            }
        },
        methods: {
            login() {
                this.loading = true
                let userInfo = {
                    account: this.loginForm.account,
                    password: this.loginForm.password,
                    captcha: this.loginForm.captcha
                }
                this.$api.login.login(this.loginForm).then((res) => {

                    // sessionStorage.setItem('sessionId',res.token); // 放置token到Cookie
                    // sessionStorage.setItem('user', userInfo.account);// userInfo保存用户到本地会话
                    setToken(res.token);
                    setUser(userInfo.account);
                    this.$store.commit('menuRouteLoaded', false); // 要求重新加载导航菜单
                    this.$api.bizAgreement.findPage({}).then((rs) => { // 查询协议内容
                        console.log("rs",rs[0]);
                        if (rs != null && rs != "") {
                            for (var i = 0 ; i<rs.length;i++) {
                                if (rs[i].lanType == '01') {
                                    setAgreeZh(rs[i].remark);
                                }
                                if (rs[i].lanType == '02') {
                                    setAgreeEn(rs[i].remark);
                                }
                            }
                        }
                    })

                    this.$router.push('/info/hotelRoomQry'); // 登录成功，跳转到主页
                    this.loading = false;
                },() =>{
                    this.loading = false;
                })
            },
            refreshCaptcha: function () {
                this.loginForm.src = this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
            },
            reset() {
                this.$refs.loginForm.resetFields()
            },
            // 切换主题
            onThemeChange: function (themeColor) {
                this.$store.commit('setThemeColor', themeColor)
            },
            // 语言切换
            changeLanguage: function (lang) {
                this.$refs.loginForm.resetFields();
                lang === '' ? 'zh_cn' : lang
                sessionStorage.setItem("locale",lang);
                this.$i18n.locale = lang;
                this.$router.go(0);
            }

        },
        mounted() {
            this.refreshCaptcha()
        },
        computed: {
            ...mapState({
                themeColor: state => state.app.themeColor
            })
        }
    }
</script>

<style lang="scss" scoped>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 100px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        .title {
            margin: 0px auto 30px auto;
            text-align: center;
            color: #505458;
        }

        .remember {
            margin: 0px 0px 35px 0px;
        }

    }

    .lang-item {
        font-size: 12px;
        padding-left: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
        cursor: pointer;
    }

    .lang-item:hover {
        font-size: 12px;
        background: #b0d6ce4d;
    }
</style>
