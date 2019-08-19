<template>
    <!--修改密码-->
    <el-dialog :title="$t('common.userMng')" width="70%" :visible.sync="passwordupVisible" :close-on-click-modal="false" :modal=false>
        <el-form :model="passForm" status-icon :rules="passFormRules" ref="passForm" label-width="100px" class="demo-ruleForm">
            <!--<el-form-item :label="$t('user.oldPass')" prop="oldPass">-->
                <!--<el-input type="password" v-model="passForm.oldPass" auto-complete="off"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('user.pass')" prop="pass">-->
                <!--<el-input type="password" v-model="passForm.pass" auto-complete="off"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('user.checkPass')" prop="checkPass">-->
                <!--<el-input type="password" v-model="passForm.checkPass" auto-complete="off"></el-input>-->
            <!--</el-form-item>-->

            <div style="width: 70%;display: flex">
                <div style="width: 70%;">
                    <el-form-item :label="$t('user.realName')" prop="realName" style="width: 100%">
                        <el-input v-model="passForm.realName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.mobile')" prop="mobile" style="width: 100%">
                        <el-input v-model="passForm.mobile" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.email')" prop="email" style="width: 100%">
                        <el-input v-model="passForm.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.phone')" prop="phone" style="width: 100%">
                        <el-input v-model="passForm.phone" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.region')" prop="region" style="width: 100%">
                        <el-input v-model="passForm.region" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.address')" prop="address" style="width: 100%">
                        <el-input v-model="passForm.address" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.net')" prop="net" style="width: 100%">
                        <el-input v-model="passForm.net" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('user.remark')" prop="remark" style="width: 100%">
                        <el-input v-model="passForm.remark" type="textarea" resize="unset" auto-complete="off" :rows="5" style="width: 600px;"></el-input>
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

                    <el-form-item :label="$t('user.sex')" prop="sex" style="width: 100%">
                        <el-select v-model="passForm.sex" :placeholder="$t('action.select')"
                                   style="width: 200px;">
                            <el-option v-for="item in paraConfig.SEX" :key="item.code"
                                       :label="item.name" :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('user.birthday')" prop="birthday" style="width: 100%">
                        <el-date-picker type="date" :placeholder="$t('action.pBirthday')" v-model="passForm.birthday" auto-complete="off"
                                        style="width: 200px;"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="ID" prop="id" v-if="false" style="width: 40%">
                        <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>

                </div>
            </div>


            <el-form-item>
                <!--<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>-->
                <el-button size="small"  @click="cancelPassword">{{$t('action.cancel')}}</el-button>
                <el-button size="small" @click="resetForm('passForm')">{{$t('action.reset')}}</el-button>
                <el-button size="small" :loading="passSubmitLoading" type="primary" @click="passwdUpdate">{{$t('action.submit')}}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>



</template>

<script>
    export default {
        name: "Passwordup",
        props:{
            user: {
                type: Object
            },
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
                    birthday: '',
                    email: '',
                    mobile: '',
                    status: '',
                    path: null,
                    phone: '',
                    address: '',
                    region: '',
                    net: '',
                    remark: '',
                    userRoles: []
                },
                paraConfig:{},
                dataForm: {
                    id: 0,
                    name: '',
                    realName: '',
                    sex: null,
                    password: '',
                    deptId: '',
                    birthday: '',
                    email: '',
                    mobile: '',
                    status: '',
                    path: null,
                    phone: '',
                    address: '',
                    region: '',
                    net: '',
                    remark: '',
                    userRoles: []
                },

                passFormRules:{
                    oldPass:[
                        {required:true,message:this.$t('action.pPassword'),trigger:blur}
                    ],
                    pass:[
                        {validator:validatePass,trigger:blur}
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
                    console.log(valid)
                    if (valid) {
                        this.passSubmitLoading = true;
                        this.passForm.username = sessionStorage.getItem("user")
                        let params = Object.assign({}, this.passForm)
                        this.$api.user.updateUserInfor(params).then((res) => {
                            if (res.code == 200) {
                                this.$message({message: this.$t('action.success'), type: 'success'})
                            } else {
                                this.$message({message: this.$t('action.fail'), type: 'error'})
                            }
                            this.$refs['passForm'].resetFields()
                            this.passwordupVisible = false
                        }).finally(
                            this.passSubmitLoading = false
                        )
                    } else {
                        this.$message({message: this.$t('action.pInputInfo'), type: 'error'})
                    }
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
            }
        },
        watch:{
            passwordupVisible : function(newVal,oldVal) {
                this.$emit("changeUserupVisible",newVal);
            },
            userVisible:function (newVal,oldVal) {
                this.passwordupVisible = newVal;
            }
        },
        created() {
            this.getTypeValues("SEX,STATUS").then((res)=>{//加载性别
                this.paraConfig = res
            });
        }
    }



</script>

<style scoped>

</style>
