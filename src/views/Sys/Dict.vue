<template>
    <div class="page-container">
        <!--工具栏-->
        <div class="toolbar" >

        </div>
<!--        表格内容栏-->

<!--        新增编辑界面-->
        <el-row style="float:left;width: 100%">
            <el-col :span="9" >
                <el-form :inline="true" :model="params" :size="size">
                    <el-form-item>
                        <el-input v-model="params.name" placeholder="名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:dict:view" type="primary"
                                   @click="findPage(null)"/>
                    </el-form-item>
                    <el-form-item>
                        <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary"
                                   @click="handleAdd"/>
                    </el-form-item>
                </el-form>
                <kt-table permsEdit="sys:dict:edit" permsDelete="sys:dict:delete"
                          :data="pageResult" :columns="columns1" :showBatchDelete="false"
                          @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
                </kt-table>
            </el-col>
            <el-col :span="14":offset="1">
                <el-form :inline="true" :model="params" :size="size">
                    <el-form-item>
                        <el-input v-model="params.name" placeholder="名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:dict:view" type="primary"
                                   @click="findPage(null)"/>
                    </el-form-item>
                    <el-form-item>
                        <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary"
                                   @click="handleAdd"/>
                    </el-form-item>
                </el-form>
                <kt-table permsEdit="sys:dict:edit" permsDelete="sys:dict:delete"
                          :data="pageResult" :columns="columns" :showBatchDelete="false"
                          @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
                </kt-table>
            </el-col>
        </el-row>
        <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible"
                   :close-on-click-modal="false">
            <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                <el-form-item label="ID" prop="id" v-show="false">
                    <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="label">
                    <el-input v-model="dataForm.label" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="值" prop="value">
                    <el-input v-model="dataForm.value" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-input v-model="dataForm.type" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="dataForm.sort" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input v-model="dataForm.remarks" auto-complete="off" type="textarea"></el-input>
                </el-form-item>
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
                columns1: [
                    {prop: this.chinese?'cnName':'enName', label: "name", minWidth: 100},
                    {prop: 'code', label: "code", minWidth: 100}
                ],
                columns: [
                    // {prop: "id", label: "ID", minWidth: 50},
                    {prop: this.chinese?'cnName':'enName', label: "name", minWidth: 100},
                    {prop: 'code', label: "code", minWidth: 100},
                    {prop: this.chinese?'cnRemark':'enRemark', label: "remark", minWidth: 100},
                    // {prop: "sort", label: "排序", minWidth: 80},
                    {prop: "sort", label: "sequence", minWidth: 120}
                    // {prop:"lastUpdateBy", label:"更新人", minWidth:100},
                    // {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
                ],
                pageRequest: {page: 1, rows: 10},
                pageResult: {},
                operation: false, // true:新增, false:编辑
                editDialogVisible: false, // 新增编辑界面是否显示
                editLoading: false,
                dataFormRules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ]
                },
                // 新增编辑界面数据
                dataForm: {
                    id: 0,
                    label: '',
                    value: '',
                    type: '',
                    sort: 0,
                    description: '',
                    remarks: ''
                }
            }
        },
        methods: {
            // 获取分页数据
            findPage: function (data) {
                if (data !== null) {
                    this.pageRequest = data.pageRequest
                }
                this.$api.dict.findPage({...this.params,...this.pageRequest}).then((res) => {
                    this.pageResult = res
                }).then(data != null ? data.callback : '')
            },
            // 批量删除
            handleDelete: function (data) {
                this.$api.dict.batchDelete(data.params).then(data != null ? data.callback : '')
            },
            // 显示新增界面
            handleAdd: function () {
                this.editDialogVisible = true
                this.operation = true
                this.dataForm = {
                    id: 0,
                    label: '',
                    value: '',
                    type: '',
                    sort: 0,
                    description: 'desc',
                    remarks: 'remark'
                }
            },
            // 显示编辑界面
            handleEdit: function (params) {
                this.editDialogVisible = true
                this.operation = false
                this.dataForm = Object.assign({}, params.row)
            },
            // 编辑
            submitForm: function () {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true
                            let params = Object.assign({}, this.dataForm)
                            this.$api.dict.save(params).then((res) => {
                                if (res.code == 200) {
                                    this.$message({message: '操作成功', type: 'success'})
                                } else {
                                    this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                                }
                                this.editLoading = false
                                this.$refs['dataForm'].resetFields()
                                this.editDialogVisible = false
                                this.findPage(null)
                            })
                        })
                    }
                })
            },
            localLanguage(){
                this.chinese = this.$i18n.locale=='zb-cn'?true:false;
            },
            // 时间格式化
            dateFormat: function (row, column, cellValue, index) {
                return format(row[column.property])
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
.cc-box-left{
    background-color: #3a8ee6;
    width: 100px;
    height: 100px;
    float: left;
}
</style>
