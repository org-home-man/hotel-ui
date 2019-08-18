<template>
    <!--修改密码-->
    <el-dialog :title="$t('common.passwdUp')" width="40%" :visible.sync="passwordupVisible" :close-on-click-modal="false" :modal=false>
        <el-form :model="passForm" status-icon :rules="passFormRules" ref="passForm" label-width="100px" class="demo-ruleForm">
            <el-form-item :label="$t('user.oldPass')" prop="oldPass">
                <el-input type="password" v-model="passForm.oldPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.pass')" prop="pass">
                <el-input type="password" v-model="passForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.checkPass')" prop="checkPass">
                <el-input type="password" v-model="passForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
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
            passVisible:Boolean
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
                passwordupVisible:this.passVisible,
                passForm:{
                    oldPass:null,
                    pass:null,
                    checkPass:null,
                    username:null
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
                        this.$api.user.updatePassword(params).then((res) => {
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
                this.$emit("changePasswordupVisible",newVal);
            },
            passVisible:function (newVal,oldVal) {
                this.passwordupVisible = newVal;
            }
        }
    }
</script>

<style scoped>

</style>
