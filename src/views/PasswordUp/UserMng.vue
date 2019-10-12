<template>
    <!--修改密码-->
    <el-dialog :title="$t('common.userMng')" width="900px" :visible.sync="passwordupVisible" :close-on-click-modal="false" :modal=false>
        <!--<el-form :model="data" status-icon :rules="passFormRules" ref="passForm" label-width="190px" class="demo-ruleForm">-->
            <el-form :inline="true" :model="data" label-width="190px" ref="passForm" label-position="right" align="left">
            <!--<el-form-item :label="$t('user.oldPass')" prop="oldPass">-->
                <!--<el-input type="password" v-model="data.oldPass" auto-complete="off"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('user.pass')" prop="pass">-->
                <!--<el-input type="password" v-model="passForm.pass" auto-complete="off"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('user.checkPass')" prop="checkPass">-->
                <!--<el-input type="password" v-model="passForm.checkPass" auto-complete="off"></el-input>-->
            <!--</el-form-item>-->

            <div style="width: 100%;display: flex">
                <div style="width: 50%;">
                    <el-form-item :label="$t('user.name')"  prop="name" style="width: 100%;display: block;">
                        <el-input v-model="data.name" :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.password')" prop="password" style="width: 100%;display: block;">
                        <el-input v-model="data.password" type="password" auto-complete="off" disabled></el-input>
                    </el-form-item>

                    <!--<el-form-item :label="$t('user.role')" prop="userRoles">-->
                        <!--<el-select v-model="data.userRoles" :disabled="true" :placeholder="$t('action.select')"-->
                                   <!--style="width: 205px;">-->
                            <!--<el-option v-for="item in roles" :key="item.id"-->
                                       <!--:label="item.remark" :value="item.id">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->

                    <!--<el-form-item :label="$t('user.status')" prop="status" style="width: 100%">-->
                        <!--<el-select v-model="data.status"  :disabled="true" :placeholder="$t('action.select')"-->
                                   <!--style="width: 205px;">-->
                            <!--<el-option v-for="item in paraConfig.STATUS" :key="item.code"-->
                                       <!--:label="$t(item.name)" :value="item.code">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item :label="$t('user.phone')" prop="phone" style="width: 100%">
                        <el-input v-model="data.phone" auto-complete="off"></el-input>
                    </el-form-item>
                </div>
                <div style="width: 50%;">
                    <el-form-item  prop="phto" style="width: 100%;text-align: center;">
                        <el-upload action="string" :limit="1" :on-exceed="onExceed" :file-list="fileList"
                                   :on-change="beforeUpload" :auto-upload="false" list-type="picture-card">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog>
                            <img width="100%" src="">
                        </el-dialog>
                    </el-form-item>
                </div>
            </div>

            <div style="width: 100%;display: flex">
                <div style="width: 50%;">
                    <el-form-item :label="$t('user.realName')" prop="realName" style="width: 100%">
                        <el-input v-model="data.realName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.region')" prop="region" style="width: 100%">
                        <el-input v-model="data.region" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.email')" prop="email" style="width: 100%">
                        <el-input v-model="data.email" auto-complete="off"></el-input>
                    </el-form-item>
                </div>
                <div style="width: 50%;">
                    <el-form-item :label="$t('user.org')" prop="deptId" style="width: 100%">
                        <el-select v-model="data.deptId"  :disabled="true"  :placeholder="$t('action.select')"
                                   style="width: 205px;">
                            <el-option v-for="item in deptData" :key="item.id"
                                       :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>



                    <!--<el-form-item :label="$t('user.address')" prop="address" style="width: 100%">-->
                    <!--<el-input v-model="dataForm.address" auto-complete="off"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item :label="$t('user.net')" prop="net" style="width: 100%">
                        <el-input v-model="data.net" auto-complete="off"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div style="width: 100%;">
                <el-form-item :label="$t('user.remark')" prop="remark" style="width: 100%">
                    <el-input v-model="data.remark" type="textarea" resize="unset" auto-complete="off" :rows="5" style="width: 600px;"></el-input>
                </el-form-item>
            </div>

            <el-form-item label="ID" prop="id" v-if="false" style="width: 40%">
                <el-input v-model="data.id" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small"  @click="cancelPassword">{{$t('action.cancel')}}</el-button>
            <el-button size="small" @click="resetForm('passForm')">{{$t('action.reset')}}</el-button>
            <el-button size="small" :loading="passSubmitLoading" type="primary" @click="passwdUpdate">{{$t('action.submit')}}</el-button>
        </div>
    </el-dialog>



</template>

<script>
    export default {
        name: "UserMng",
        props:{
            user: {
                type: Object
            },
            data:Object,
            userVisible:Boolean
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('action.pPassword')));
                } else {
                    if (this.passForm.checkPass !== '') {
                        this.$refs.passForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('action.pPassword2')));
                } else if (value !== this.passForm.pass) {
                    callback(new Error(this.$t('action.pCheckPass')));
                } else {
                    callback();
                }
            };
            return {
                passSubmitLoading:false,
                passwordupVisible:this.userVisible,
                fileList: [],
                files: null,
                fileId:[],
                filters: {
                    id:"",
                    name: '',
                    userRoles:[],
                    region:'',
                    org:'',
                    status:''
                },
                passForm:{
                    oldPass:null,
                    pass:null,
                    checkPass:null,
                    username:null,
                    id: 0,
                    name: '',
                    realName: '',
                    sex: null,
                    password: '',
                    deptId: '',
                    userRoles:[],
                    birthday: null,
                    email: '',
                    mobile: '',
                    status: null,
                    path: null,
                    phone: '',
                    address: '',
                    region: '',
                    net: '',
                    remark: ''
                },
                paraConfig:{},
                deptData: [],
                roles:[],
                userRoles:[],
                passFormRules:{
                    oldPass:[
                        {required:true,message:this.$t('action.pPassword'),trigger:blur}
                    ],
                    pass:[
                        {validator:validatePass,trigger:blur}
                    ],
                    userRoles:[
                        {required: true, message: this.$t('action.pUserRoles'), trigger: 'blur'}
                    ],
                    checkPass:[
                        {validator:validatePass2,trigger:blur}
                    ]
                }

            }
        },
        methods:{
            passwdUpdate:function () {
                this.$refs.passForm.validate((valid) => {
                    if (valid) {
                        this.passSubmitLoading = true;
                        this.passForm = Object.assign({}, this.data);
                        if (this.files != null) {
                            let formDate = new FormData();
                            formDate.append("files", this.files.raw);

                            this.$api.user.upload(formDate,{headers:{'Content-Type': 'multipart/form-data'}}).then((res) => {
                                this.editLoading = false;
                                if (res == null) {
                                    this.$message({message: this.$t('action.fail'), type: 'error'});
                                }
                                this.$api.user.deleteRealFiles({ids:this.fileId[0]});
                                this.passForm.path = res;
                                this.sumbit()
                            })
                        } else {
                            this.passForm.path = null;
                            this.sumbit()
                        }


                    } else {
                        this.$message({message: this.$t('action.pInputInfo'), type: 'error'})
                    }
                })
            },
            sumbit:function(){
                let params = Object.assign({}, this.passForm);
                // this.$api.user.updateUserInfor(params,{headers:{'Content-Type': 'application/json;charset=UTF-8'}}).then((res) => {
                this.$api.user.updateUserInfor(params,{headers:{'Content-Type': 'application/json;charset=UTF-8'}}).then((res) => {
                if (res.code == 200) {
                        this.$message({message: this.$t('action.success'), type: 'success'})
                    } else {
                        this.$message({message: this.$t('action.fail'), type: 'error'})
                    }
                    this.$refs['passForm'].resetFields()
                    this.passwordupVisible = false
                    this.$emit('updatePersonUserInfo')
                }).finally(
                    this.passSubmitLoading = false
                )
            },
            findDeptTree: function () {
                this.$api.dept.findDeptTree().then((res) => {
                    this.deptData = res
                })
            },
            resetForm:function () {
                this.$refs['passForm'].resetFields();
                this.passSubmitLoading = false;
            },
            cancelPassword:function () {
                this.$refs['passForm'].resetFields()
                this.passwordupVisible = false;
                this.passSubmitLoading = false;
            },
            onExceed(files, fileList) {
                this.$message({
                    type: 'info',
                    message: '最多只能上传一个图片',
                    duration: 6000
                });
            },
            beforeUpload:function (file) {
                this.files = file;
                return false;
            },
        },
        watch:{
            passwordupVisible : function(newVal,oldVal) {
                //加载图片
                if (this.data.path !=null && this.data.path != '') {
                    let arr = new Array();
                    arr.push({url:this.data.path});
                    this.fileList = arr;
                }

                this.$emit("changeUserupVisible",newVal);
            },
            userVisible:function (newVal,oldVal) {
                this.passwordupVisible = newVal;
            }
        },

        created() {
            this.findDeptTree()
            this.getTypeValues("SEX,STATUS").then((res)=>{//加载性别
                this.paraConfig = res
            });
            this.$api.role.findAll().then((res) => {// 加载用户角色信息
                // 加载角色集合
                this.roles = res
            });
        }
    }



</script>

<style scoped>

</style>
