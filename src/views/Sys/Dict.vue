<template>
    <div class="page-container">
<!--        新增列表界面-->
        <div style="float:left;width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            <el-row >
                <el-col :span="9" >
                    <el-row>
                        <el-col :span="24" align="right" class="dict-but-tools">
                            <el-form :inline="true" :model="params" :size="size">
                                <el-form-item>
                                    <el-input v-model="params.name" :placeholder="$t('table.name')" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:dict:view" type="primary"
                                               @click="findPage()"/>
                                </el-form-item>
                                <el-form-item>
                                    <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary"
                                               @click="handleAdd"/>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="24">
                            <kt-table permsEdit="sys:dict:edit" permsDelete="sys:dict:delete"
                                      :data="dictData" :columns="dictColumns" :showBatchDelete="false"
                                      @findPage="findPage" @handleRowClick="handleRowClick" @handleEdit="handleEdit" @handleDelete="handleDelete">
                            </kt-table>
                        </el-col>
                    </el-row>

                </el-col>
                <el-col :span="14":offset="1">
                    <el-row>
                        <el-col :span="24" align="right" class="dict-but-tools">
                            <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAddChild"/>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
<!--                            <kt-table permsEdit="sys:dict:edit" permsDelete="sys:dict:delete"-->
<!--                                      :data="childDictData" :columns="childDictColumns" :showBatchDelete="false"-->
<!--                                      @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">-->
<!--                            </kt-table>-->
                            <div>
                                <!--表格栏-->
                                <el-table :data="childDictData.rows" :highlight-current-row="true"
                                          :empty-text="$t('action.noData')" v-loading="loading"
                                          :element-loading-text="$t('action.loading')" :border="false" :stripe="true"
                                          :show-overflow-tooltip="true" :size="size" align="left" style="width:100%;">
                                    <el-table-column v-for="column in childDictColumns" header-align="center" align="center"
                                                     :prop="column.prop" :label="$t('table.'+column.label)" :width="column.width"
                                                     :min-width="column.minWidth"
                                                     :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
                                                     :sortable="column.sortable==null?true:column.sortable">
                                    </el-table-column>
                                    <el-table-column :label="$t('action.operation')" width="185" fixed="right" v-if="true"
                                                     header-align="center" align="center">
                                        <template slot-scope="scope">
                                            <kt-button icon="fa fa-edit" :label="$t('action.edit')" perms="sys:dict:edit" :size="size"
                                                       @click="handleEdit(scope.row)"/>
                                            <kt-button icon="fa fa-trash" :label="$t('action.delete')" perms="sys:dict:delete" :size="size"
                                                       type="danger" @click="deleteChild(scope.row)"/>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <!--分页栏-->
                                <div class="toolbar" style="padding:10px;">
                                    <el-pagination layout="prev, pager, next"
                                                   :current-page="pageRequest.page" :page-size="pageRequest.rows"
                                                   :total="childDictData.total==null?0:childDictData.total" style="float:right;">
                                    </el-pagination>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <!-- 父类新增 -->
        <el-dialog :title="operation?$t('action.add'):$t('action.edit')" width="40%" :visible.sync="editDialogVisible">
            <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                <el-form-item prop="id" v-show="false">
                    <el-input v-model="dataForm.id"></el-input>
                </el-form-item>
                <el-form-item prop="type" v-show="false">
                    <el-input v-model="dataForm.type"></el-input>
                </el-form-item>
                <el-form-item prop="type" v-show="false">
                    <el-input v-model="dataForm.parentId" ></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('dict.cnName')" prop="cnName">
                            <el-input v-model="dataForm.cnName" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('dict.enName')" prop="enName">
                            <el-input v-model="dataForm.enName" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('dict.code')" prop="code">
                            <el-input v-model="dataForm.code" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('dict.sequence')" prop="sort">
                            <el-input-number v-model="dataForm.sort" ></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('dict.cnRemark')" prop="cnRemark">
                            <el-input v-model="dataForm.cnRemark" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('dict.enRemark')" prop="enRemark">
                            <el-input v-model="dataForm.enRemark" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
                <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">
                    {{$t('action.submit')}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import KtTable from "@/views/Core/KtTable"
    import KtButton from "@/views/Core/KtButton"
    import {format} from "@/utils/datetime"

    export default {
        components: {
            KtTable,
            KtButton
        },
        data() {
            return {
                chinese: null,
                size: 'small',
                params: {
                    name: ''
                },
                loading:false,
                pageRequest: {page: 1, rows: 10},
                dictData: {},
                childDictData: {},
                operation: false, // true:新增, false:编辑
                editDialogVisible: false, // 新增编辑界面是否显示
                editLoading: false,
                dictSelectRow: null,
                isMain: true, //是否是主菜单添加
                dataFormRules: {
                    cnName: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    enName: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ]
                },
                // 新增编辑界面数据
                dataForm: {
                    id: null,
                    cnName: null,
                    enName: null,
                    code: null,
                    type: null,
                    sort: 0,
                    parentId: null,
                    cnRemark: null,
                    enRemark: null
                }
            }
        },
        methods: {
            // 获取分页数据
            findPage: function (data) {
                if (data !== null && data !== undefined) {
                    this.pageRequest = data.pageRequest
                }
                this.params.type = "1";
                this.$api.dict.findPage({...this.params,...this.pageRequest}).then((res) => {
                    this.dictData = res;
                    this.dictSelectRow = null;
                }).then(data != null ? data.callback : '')
            },
            findChildPage: function () {
                if(this.dictSelectRow){
                    this.$api.dict.findPage({'parentId':this.dictSelectRow.id}).then((res) =>{
                        this.childDictData = res;
                    });
                }else{
                    this.$message.warning({message: this.$t('action.selectRow')});
                }
            },
            // 批量删除
            handleDelete: function (data) {
                this.$api.dict.batchDelete(data.params,{headers:{'Content-Type': 'application/json;charset=UTF-8'}}).then(data != null ? data.callback : '')
            },
            deleteChild: function(row){
                this.$confirm(this.$t('action.do'), this.$t('action.tips'), {
                    type: 'warning',
                    cancelButtonText: this.$t('action.cancel'),
                    confirmButtonText: this.$t('action.confirm')
                }).then(() => {
                    this.$api.dict.del({'id':row.id}).then((res) =>{
                        if (res.code == 200) {
                            this.$message({message: this.$t('action.success'), type: 'success'})
                            this.findChildPage()
                        } else {
                            this.$message({message: this.$t('action.fail'), type: 'error'})
                        }
                    })
                })
            },
            // 点击当前数据行
            handleRowClick: function(row){
                this.dictSelectRow = row;
                this.findChildPage();
            },
            // 父类新增界面
            handleAdd: function () {
                this.editDialogVisible = true;
                this.operation = true;
                this.isMain = true;
                this.dataForm = {
                    id: null,
                    cnName: null,
                    enName: null,
                    code: null,
                    type: "1",
                    sort: 0,
                    parentId: null,
                    cnRemark: null,
                    enRemark: null
                }
            },
            // 子类新增界面
            handleAddChild: function () {
                this.isMain = false;
                if(!this.dictSelectRow){
                    this.$message.warning({message: this.$t('action.selectRow')});
                    return;
                }
                this.editDialogVisible = true;
                this.operation = true;
                if(this.$refs['dataForm']){
                    this.$refs['dataForm'].resetFields();
                };
                this.dataForm.type = "2";
                this.dataForm.parentId = this.dictSelectRow.id;

            },
            // 显示编辑界面
            handleEdit: function (params) {
                this.editDialogVisible = true;
                this.operation = false;
                this.dataForm = Object.assign({}, params.row||params)
            },
            // 编辑
            submitForm: function () {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.$confirm( this.$t('action.sureSubmit'), this.$t('action.tips'), {}).then(() => {
                            this.editLoading = true;
                            this.loading = true;
                            let params = Object.assign({}, this.dataForm)
                            this.$api.dict.save(params).then((res) => {
                                if (res.code == 200) {
                                    this.$message({message: this.$t('action.success'), type: 'success'})
                                } else {
                                    this.$message({message: this.$t('action.fail'), type: 'error'})
                                }
                                this.editLoading = false;
                                this.loading = false;
                                this.$refs['dataForm'].resetFields()
                                this.editDialogVisible = false;
                                if(this.isMain){
                                    this.findPage(null)
                                }else{
                                    this.findChildPage();
                                }
                            },(err) =>{
                                //错误处理
                                this.editLoading = false;
                                this.loading = false;
                            })
                        })
                    }
                })
            },
            localLanguage(){
                this.chinese = this.$i18n.locale ==='zh_cn'?true:false;
            },
            // 时间格式化
            dateFormat: function (row, column, cellValue, index) {
                return format(row[column.property])
            }
        },
        computed:{
            dictColumns:function () {
                return [
                    {prop: this.chinese?'cnName':'enName', label: "name", minWidth: 100},
                    {prop: 'code', label: "code", minWidth: 100}
                ];
            } ,
            childDictColumns:function () {
                return[
                    {prop: this.chinese?'cnName':'enName', label: "name", minWidth: 100},
                    {prop: 'code', label: "code", minWidth: 100},
                    {prop: this.chinese?'cnRemark':'enRemark', label: "remark", minWidth: 100},
                    {prop: "sort", label: "sequence", minWidth: 120}
                ];
            }
        },
        watch: {
            dictSelectRow:function (n, o) {
                if(null==n){
                    this.childDictData = {};
                }
            }
        },
        created(){
            this.localLanguage();
        },
        mounted() {

        }
    }
</script>

<style scoped>
.dict-but-tools{
    height: 50px;
    margin-top: 10px;
    right: 20px;
}
</style>
