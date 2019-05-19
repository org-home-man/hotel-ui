<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
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
          <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:role:view" type="primary"
                     @click="findPage(null)"/>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:user:add" type="primary"
                     @click="handleAdd"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
      <el-form :inline="true" :size="size">
        <el-form-item>
          <el-button-group>
            <el-tooltip :content="$t('common.refresh')" placement="top">
              <el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>
            </el-tooltip>
            <!--<el-tooltip content="列显示" placement="top">-->
            <!--<el-button icon="fa fa-filter" @click="displayFilterColumnsDialog"></el-button>-->
            <!--</el-tooltip>-->
            <el-tooltip :content="$t('common.export')" placement="top">
              <el-button icon="fa fa-file-excel-o"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-form-item>
      </el-form>
      <!--表格显示列界面-->
      <table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"
                                  @handleFilterColumns="handleFilterColumns">
      </table-column-filter-dialog>
    </div>
    <!--表格内容栏-->
    <kt-table permsEdit="sys:user:edit" permsDelete="sys:user:delete"
              :data="pageResult" :columns="filterColumns"
              @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </kt-table>

    <!--新增编辑界面-->
      <el-dialog :title="operation?$t('action.add'):$t('action.edit')" width="840px" :visible.sync="dialogVisible"
                 :close-on-click-modal="false">
          <el-form :inline="true" :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm"
                   :size="size"
                   label-position="right">
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
                      <el-form-item  prop="phto" style="width: 100%">
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
                              <el-option v-for="item in sexs" :key="item.paraCode"
                                         :label="$t(item.paraCode)" :value="item.id">
                              </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item :label="$t('user.birthday')" prop="birthday" style="width: 100%">
                          <el-date-picker type="date" placeholder="选择出生日期" v-model="dataForm.birthday" auto-complete="off"
                                          style="width: 200px;"></el-date-picker>
                      </el-form-item>
                      <el-form-item :label="$t('user.org')" prop="deptName" style="width: 100%">
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
                              <el-option v-for="item in states" :key="item.code"
                                         :label="$t(item.code)" :value="item.id">
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
  import KtTable from "@/views/Core/KtTable"
  import KtButton from "@/views/Core/KtButton"
  import TableColumnFilterDialog from "@/views/Core/TableColumnFilterDialog"
  import {format} from "@/utils/datetime"
  import {baseUrl} from "@/utils/global"

  export default {
    components: {
      PopupTreeInput,
      KtTable,
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
              sex: '',
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
          roles: [],
          sexs:[],
          states:[{"code":"user.forbid","id":0},{"code":"user.normal","id":1}],
          fileList: [],
          files: null,
          fileId:null
      }
    },
    methods: {
      // 获取分页数据
      findPage: function (data) {
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        this.pageRequest = {...this.pageRequest,...this.filters};
        this.$api.user.findPage(this.pageRequest).then((res) => {
          this.pageResult = res;
          this.findUserRoles();
          this.findUserSex();
        }).then(data != null ? data.callback : '')
      },
      // 加载用户角色信息
      findUserRoles: function () {
        this.$api.role.findAll().then((res) => {
          // 加载角色集合
          this.roles = res
        })
      },
      //加载性别角色字典
      findUserSex:function(){
          this.$api.sysParaConfig.findByCode({"paraSubCode2":"sex"}).then((res) => {
              this.sexs = res;
          })
      },
      // 批量删除
      handleDelete: function (data) {
          console.log(data.params)
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
      },
      // 编辑
      submitForm:function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {

            this.$confirm(this.$t('action.sureSubmit'), this.$t('action.Tips'), {}).then(() => {

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
        for (let i = 0, len = params.userRoles.length; i < len; i++) {
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
            this.$refs['dataForm'].resetFields()
          } else {
            this.$message({message: this.$t('action.fail'), type: 'error'})
          }
          this.findPage(null)
        })
      }
      ,
      //取消按钮
      cancel: function (formName) {
        this.dialogVisible = false;
        this.$refs[formName].resetFields();
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
          {prop: "email", label: 'mail', minWidth: 120},
          {prop: "mobile", label: 'phone', minWidth: 100},
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
      }
    },
    mounted() {
      this.findDeptTree()
      this.initColumns()

    }
  }
</script>

<style scoped>

</style>
