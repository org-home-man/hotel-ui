<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar query_room_container" style="padding-top:10px;padding-left:15px; background: #daf6fa;">
      <el-form :inline="true" :model="filters" :size="size">
          <el-row>
              <el-col :span="24" align="left">
                  <el-form-item>
                      <el-input v-model="filters.name" :placeholder="$t('user.name')"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-input v-model="filters.id" :placeholder="$t('user.id')"></el-input>
                  </el-form-item>
                  <!-- <el-form-item>
                    <el-select v-model="filters.userRoles" multiple :placeholder="$t('user.role')" style="width: 100%;">
                      <el-option v-for="item in roles" :key="item.id" :label="item.remark" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                 <el-form-item>
                    <el-input v-model="filters.region" :placeholder="$t('user.region')"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="filters.org" :placeholder="$t('user.org')"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="filters.status" :placeholder="$t('user.status')"></el-input>
                  </el-form-item>-->
                  <el-form-item>
                      <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:user:view" type="primary"
                                 @click="findPage(null)"/>
                  </el-form-item>
                  <el-form-item>
                      <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:user:add" type="primary"
                                 @click="handleAdd"/>
                  </el-form-item>
              </el-col>
          </el-row>
      </el-form>
    </div>
    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
      <!--<el-form :inline="true" :size="size">-->
        <!--<el-form-item>-->
          <!--<el-button-group>-->
            <!--<el-tooltip :content="$t('common.refresh')" placement="top">-->
              <!--<el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>-->
            <!--</el-tooltip>-->
            <!--&lt;!&ndash;<el-tooltip content="列显示" placement="top">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button icon="fa fa-filter" @click="displayFilterColumnsDialog"></el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-tooltip>&ndash;&gt;-->
            <!--<el-tooltip :content="$t('common.export')" placement="top">-->
              <!--<el-button icon="fa fa-file-excel-o"></el-button>-->
            <!--</el-tooltip>-->
          <!--</el-button-group>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--表格显示列界面-->
      <table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"
                                  @handleFilterColumns="handleFilterColumns">
      </table-column-filter-dialog>
    </div>
    <!--表格内容栏-->
    <user-table permsEdit="sys:user:edit" permsDelete="sys:user:delete"
              :data="pageResult" :paraConfig="paraConfig"
              @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete" @changeStatus="changeStatus">
    </user-table>

    <!--新增编辑界面-->
      <el-dialog :title="operation?$t('action.add'):$t('action.edit')" width="900px" :visible.sync="dialogVisible"
                 :close-on-click-modal="false">
          <el-form :inline="true" :model="dataForm" label-width="190px" :rules="dataFormRules" ref="dataForm"
                   :size="size"
                   label-position="right" align="left">
              <div style="width: 100%;display: flex">
                  <div style="width: 50%;">
                      <el-form-item :label="$t('user.name')" prop="name" style="width: 100%;display: block;">
                          <el-input v-model="dataForm.name" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('user.password')" prop="password" style="width: 100%;display: block;">
                          <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('user.realName')" prop="realName" style="width: 100%">
                          <el-input v-model="dataForm.realName" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('user.mobile')" prop="mobile" style="width: 100%">
                          <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
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
                      <el-form-item :label="$t('user.sex')" prop="sex" style="width: 100%">
                          <el-select v-model="dataForm.sex" :placeholder="$t('action.select')"
                                     style="width: 200px;">
                              <el-option v-for="item in paraConfig.SEX" :key="item.code"
                                         :label="item.name" :value="item.code">
                              </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item :label="$t('user.birthday')" prop="birthday" style="width: 100%">
                          <el-date-picker type="date" :placeholder="$t('action.pBirthday')" v-model="dataForm.birthday" auto-complete="off"
                                          style="width: 200px;"></el-date-picker>
                      </el-form-item>
                      <el-form-item :label="$t('user.org')" prop="deptId" style="width: 100%">
                          <el-select v-model="dataForm.deptId" :placeholder="$t('action.select')"
                                     style="width: 200px;">
                              <el-option v-for="item in deptData" :key="item.id"
                                         :label="item.name" :value="item.id">
                              </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item :label="$t('user.role')" prop="userRoles" style="width: 100%">
                          <el-select v-model="dataForm.userRoles" multiple :placeholder="$t('action.select')"
                                     style="width: 200px;">
                              <el-option v-for="item in roles" :key="item.id"
                                         :label="item.remark" :value="item.id">
                              </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item :label="$t('user.status')" prop="sex" style="width: 100%">
                          <el-select v-model="dataForm.status" :placeholder="$t('action.select')"
                                     style="width: 200px;">
                              <el-option v-for="item in paraConfig.STATUS" :key="item.code"
                                         :label="$t(item.name)" :value="item.code">
                              </el-option>
                          </el-select>
                      </el-form-item>
                  </div>
                  <div style="width: 50%;">
                      <el-form-item :label="$t('user.email')" prop="email" style="width: 100%">
                          <el-input v-model="dataForm.email" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('user.phone')" prop="phone" style="width: 100%">
                          <el-input v-model="dataForm.phone" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('user.region')" prop="region" style="width: 100%">
                          <el-input v-model="dataForm.region" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('user.address')" prop="address" style="width: 100%">
                          <el-input v-model="dataForm.address" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('user.net')" prop="net" style="width: 100%">
                          <el-input v-model="dataForm.net" auto-complete="off"></el-input>
                      </el-form-item>
                  </div>
              </div>
              <div style="width: 100%;">
                  <el-form-item :label="$t('user.remark')" prop="remark" style="width: 100%">
                      <el-input v-model="dataForm.remark" type="textarea" resize="unset" auto-complete="off" :rows="5" style="width: 600px;"></el-input>
                  </el-form-item>
              </div>

              <el-form-item label="ID" prop="id" v-if="false" style="width: 40%">
                  <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button :size="size" @click.native="cancel('dataForm')">{{$t('action.cancel')}}</el-button>
              <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">
                  {{$t('action.submit')}}
              </el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
  import PopupTreeInput from "@/components/PopupTreeInput"
  import UserTable from "@/views/Core/UserTable"
  import KtButton from "@/views/Core/KtButton"
  import TableColumnFilterDialog from "@/views/Core/TableColumnFilterDialog"
  import {format} from "@/utils/datetime"
  import {baseUrl} from "@/utils/global"

  export default {
    components: {
      PopupTreeInput,
        UserTable,
      KtButton,
      TableColumnFilterDialog
    },
    data() {
      return {
        baseUrl:baseUrl,
        size: 'small',
        filters: {
          id:"",
          name: '',
          userRoles:[],
          region:'',
          org:'',
          status:''
        },
        columns: [],
        filterColumns: [],
        pageRequest: {
          page: 1,
          rows: 10
        },
        pageResult: {},

        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        editLoading: false,
        dataFormRules: {
            name: [
                {required: true, message: this.$t('action.pName'), trigger: 'blur'},
                /*{validator:isUserName,message:this.$t('action.pUsername'), trigger: 'blur'}*/
            ],
            realName: [
                {required: true, message: this.$t('action.pRealName'), trigger: 'blur'},
                /*{validator:isUserName,message:this.$t('action.pUsername'), trigger: 'blur'}*/
            ],
            sex: [
                {required: true, message: this.$t('action.pSex'), trigger: 'blur'},
                /*{validator:isUserName,message:this.$t('action.pUsername'), trigger: 'blur'}*/
            ],
            password:[
                {required: true, message: this.$t('action.pPassword'), trigger: 'blur'},
                { type: 'string', min: 6, message: this.$t('action.pPasswordLength'), trigger: 'blur' },

            ],
            email:[
                {required: true, message: this.$t('action.pEmail'), trigger: 'blur'}
            ],
            birthday:[
                {required: true, message: this.$t('action.pBirthday'), trigger: 'blur'}
            ],
            mobile:[
                {required: true, message: this.$t('action.pMobile'), trigger: 'blur'}
            ],
            deptId:[
                {required: true, message: this.$t('action.pDeptId'), trigger: 'blur'}
            ],
            phone:[
                {required: true, message: this.$t('action.pPhone'), trigger: 'blur'}
            ],
            region:[
                {required: true, message: this.$t('action.pRegion'), trigger: 'blur'}
            ],
            address:[
                {required: true, message: this.$t('action.pAddress'), trigger: 'blur'}
            ],
            net:[
                {required: true, message: this.$t('action.pNet'), trigger: 'blur'}
            ],
            remark:[
                {required: true, message: this.$t('action.pRemark'), trigger: 'blur'}
            ],
            userRoles:[
                {required: true, message: this.$t('action.pUserRoles'), trigger: 'blur'}
            ]
        },
        // 新增编辑界面数据
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
          deptData: [],
          deptTreeProps: {
              label: 'name',
              children: 'children'
          },
          roles:[],
          paraConfig:{},
          fileList: [],
          files: null,
          fileId:[]
      }
    },
    methods: {
      // 获取分页数据
      findPage: function (data) {
          this.pageRequest = { page: 1, rows: 10 };
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        this.pageRequest = {...this.pageRequest,...this.filters};
        this.$api.user.findPage(this.pageRequest).then((res) => {
          this.pageResult = res;
        }).then(data != null ? data.callback : '')
      },


      // 批量删除
      handleDelete: function (data) {
        this.$api.user.batchDelete(data.params,{headers:{'Content-Type': 'application/json;charset=UTF-8'}}).then(data != null ? data.callback : '')
      },
      // 显示新增界面
      handleAdd: function () {
        this.dialogVisible = true
        this.operation = true
          this.dataForm = {
              id: 0,
              name: '',
              realName: '',
              sex:'',
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
          };
          this.fileList = [];
      },
      // 显示编辑界面
      handleEdit: function (params) {
        this.operation = false;
        this.dataForm = Object.assign({}, params.row);
        let userRoles = [];
        for (let i = 0, len = params.row.userRoles.length; i < len; i++) {
            if(params.row.userRoles[i].roleId == 1){
                return this.$message({message:this.$t('action.noEdit'), type: 'error' })
            }
          userRoles.push(params.row.userRoles[i].roleId)
        }
        this.dataForm.userRoles = userRoles;
        if(this.dataForm.path != null){
            this.$api.user.showFile({relationId:this.dataForm.path}).then((res) => {
                let arr = new Array();
                arr.push({url:this.baseUrl+"/document/preview/"+res});
                this.fileList = arr;
                this.fileId = res;
            })
        }
        this.dialogVisible = true;
        this.dataForm.status = (String)(this.dataForm.status)
      },
      // 编辑
      submitForm:function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {

            this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {
                type: 'warning',
                cancelButtonText: this.$t('action.cancel'),
                confirmButtonText: this.$t('action.confirm')
            }).then(() => {

              if (this.files != null) {
                let formDate = new FormData();
                formDate.append("files", this.files.raw);

                this.$api.user.upload(formDate,{headers:{'Content-Type': 'multipart/form-data'}}).then((res) => {
                  this.editLoading = false;
                  if (res == null) {
                    this.$message({message: this.$t('action.fail'), type: 'error'});
                  }
                  this.$api.user.deleteRealFiles({ids:this.fileId[0]});
                  this.dataForm.path = res;
                  this.sumbit()
                })
              } else {
                this.sumbit()
              }
            })

          }
        })
      },
      sumbit:function () {
        let params = Object.assign({}, this.dataForm)
        this.editLoading = true
        let userRoles = []
        for (let i = 0  ; i < params.userRoles.length; i++) {
          let userRole = {
            userId: params.id,
            roleId: params.userRoles[i]
          }
          userRoles.push(userRole)
        }
        params.userRoles = userRoles;
        this.$api.user.save(params,{headers:{'Content-Type': 'application/json;charset=UTF-8'}}).then((res) => {
          this.editLoading = false;
          if (res.code == 200) {
            this.$message({message: this.$t('action.success'), type: 'success'})
            this.dialogVisible = false;
            this.$refs['dataForm'].resetFields();
            this.files = null;
            this.fileList = [];
              this.fileId=[];
          } else {
            this.$message({message: this.$t('action.fail'), type: 'error'})
          }
          this.findPage(null)
        }).catch(() => {
            this.editLoading = false
        })
      }
      ,
      //取消按钮
      cancel: function (formName) {
        this.dialogVisible = false;
        this.$refs['dataForm'].resetFields();
        this.files = null;
          this.fileList = [];
          this.fileId=[];
      },
      // 获取部门列表
      findDeptTree: function () {
        this.$api.dept.findDeptTree().then((res) => {
          this.deptData = res
        })
      },
      // 时间格式化
      dateFormat: function (row, column, cellValue, index) {
        return format(row[column.property])
      },
      // 处理表格列过滤显示
      displayFilterColumnsDialog: function () {
        this.$refs.tableColumnFilterDialog.setDialogVisible(true)
      },
      // 处理表格列过滤显示
      handleFilterColumns: function (data) {
        this.filterColumns = data.filterColumns
        this.$refs.tableColumnFilterDialog.setDialogVisible(true)
      },
      // 处理表格列过滤显示
      initColumns: function () {
        this.columns = [
          {prop: "id", label: "id", minWidth: 50},
          {prop: "name", label: 'username', minWidth: 100},
          {prop: "deptName", label: 'org', minWidth: 120},
          {prop: "roleNames", label: 'role', minWidth: 100},
          // {prop: "email", label: 'mail', minWidth: 120},
          // {prop: "mobile", label: 'phone', minWidth: 100},
          {prop: "status", label: 'state', minWidth: 70},
        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columns));
      },
      beforeUpload:function (file) {
        this.files = file;
        return false;
      },
      onExceed(files, fileList) {
        this.$message({
          type: 'info',
          message: '最多只能上传一个图片',
          duration: 6000
        });
      },
        //改变用户状态
        changeStatus(row) {

            this.$confirm(this.$t('action.sureChangeStatus'), this.$t('action.tips'), {
                type: 'warning',
                cancelButtonText: this.$t('action.cancel'),
                confirmButtonText: this.$t('action.confirm')}).then(() => {
                let params = Object.assign({}, row.row)
                if (params.status == 1) {
                    params.status = 0
                } else {
                    params.status = 1
                }
                this.$api.user.save(params,{headers:{'Content-Type': 'application/json;charset=UTF-8'}}).then((res) => {
                    this.editLoading = false;
                    if (res.code == 200) {
                        this.$message({message: this.$t('action.success'), type: 'success'})
                    } else {
                        this.$message({message: this.$t('action.fail'), type: 'error'})
                    }
                    this.findPage(null);
                })

            })
        }
    },
      created() {
          this.getTypeValues("SEX,STATUS").then((res)=>{//加载性别
              this.paraConfig = res
          });
          this.$api.role.findAll().then((res) => {// 加载用户角色信息
              // 加载角色集合
              this.roles = res
          });
      },
    mounted() {
      this.findDeptTree()
      this.initColumns()

    }
  }
</script>

<style scoped>
    .query_room_container{
        padding-top:10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
</style>
