<template>
    <div class="table_room_container">
        <!--表格栏-->
        <el-table :data="data.rows" :highlight-current-row="highlightCurrentRow" @selection-change="selectionChange"
                  :empty-text="$t('action.noData')"
                  @current-change="handleCurrentChange" @row-click="handleRowClick" v-loading="loading"
                  :element-loading-text="$t('action.loading')" :border="border" :row-class-name="tableRowClassName"
                  :show-overflow-tooltip="showOverflowTooltip" :align="align" style="width:100%;">
            <el-table-column type="selection" width="40" v-if="showBatchDelete & showOperation"></el-table-column>

            <el-table-column prop="id" header-align="center" align="center" :label="$t('table.id')">
            </el-table-column>
            <el-table-column prop="name" header-align="center" align="center" :label="$t('table.username')">
            </el-table-column>
            <el-table-column prop="deptName" header-align="center" align="center" :label="$t('table.org')">
            </el-table-column>
            <el-table-column prop="roleNames" header-align="center" align="center" :label="$t('table.role')">
            </el-table-column>
            <!--<el-table-column prop="email" header-align="center" align="center" :label="$t('table.mail')">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="mobile" header-align="center" align="center" :label="$t('table.phone')">-->
            <!--</el-table-column>-->
            <el-table-column prop="status" header-align="center" align="center" :label="$t('table.state')">
                <template slot-scope="scope">
                    <el-tag>{{resolveRoomTypeName(paraConfig.STATUS,(String)(scope.row.status))}}</el-tag><br>
                    <el-switch
                        v-model="scope.row.status==1?true:false"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="changeStatus(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column :label="$t('action.operation')" width="185" fixed="right" v-if="showOperation"
                             header-align="center" align="center">
                <template slot-scope="scope">
                    <kt-button icon="fa fa-edit" :label="$t('action.edit')" :perms="permsEdit" :size="size"
                               @click="handleEdit(scope.$index, scope.row)"/>
                    <kt-button icon="fa fa-trash" :label="$t('action.delete')" :perms="permsDelete" :size="size"
                               type="danger" @click="handleDelete(scope.$index, scope.row)"/>

                </template>
            </el-table-column>
        </el-table>
        <!--分页栏-->
        <div class="toolbar" style="padding:10px;">
            <kt-button :label="$t('action.batchDelete')" :perms="permsDelete" :size="size" type="danger"
                       @click="handleBatchDelete()"
                       disabled style="float:left;"
                       v-if="showBatchDelete & showOperation"/>
            <el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"
                           :current-page="pageRequest.page" :page-size="pageRequest.rows"
                           :total="data.total==null?0:data.total" style="float:right;">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import KtButton from "@/views/Core/KtButton"
    import {getUser} from "@/utils/token"
    export default {
        name: 'KtTable',
        components: {
            KtButton
        },
        props: {
            columns: Array, // 表格列配置
            data: Object, // 表格分页数据
            permsEdit: String,  // 编辑权限标识
            permsDelete: String,  // 删除权限标识
            paraConfig:Object,
            status:{
                type:Boolean,
                default : false
            },
            size: { // 尺寸样式
                type: String,
                default: 'mini'
            },
            align: {  // 文本对齐方式
                type: String,
                default: 'left'
            },
            maxHeight: {  // 表格最大高度
                type: Number
            },
            showOperation: {  // 是否显示操作组件
                type: Boolean,
                default: true
            },
            border: {  // 是否显示边框
                type: Boolean,
                default: false
            },
            stripe: {  // 是否显示斑马线
                type: Boolean,
                default: true
            },
            highlightCurrentRow: {  // // 是否高亮当前行
                type: Boolean,
                default: true
            },
            showOverflowTooltip: {  // 是否单行显示
                type: Boolean,
                default: true
            },
            showBatchDelete: {  // 是否显示操作组件
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                // 分页信息
                pageRequest: {
                    page: 1,
                    rows: 10
                },
                loading: false,  // 加载标识
                selections: []  // 列表选中列
            }
        },
        methods: {
            // 分页查询
            findPage: function () {
                this.loading = true
                let callback = () => {
                    this.loading = false
                }
                this.$emit('findPage', {pageRequest: this.pageRequest, callback: callback})
            },
            // 选择切换
            selectionChange: function (selections) {
                this.selections = selections
                this.$emit('selectionChange', {selections: selections})
            },
            // 选择切换
            handleCurrentChange: function (val) {
                this.$emit('handleCurrentChange', {val: val})
            },
            // 点击当前行
            handleRowClick: function (row) {
                this.$emit('handleRowClick', row)
            },
            // 换页刷新
            refreshPageRequest: function (page) {
                this.pageRequest.page = page
                this.findPage()
            },
            // 编辑
            handleEdit: function (index, row) {
                if (!this.valifunction(row)) {
                    this.$message({message: this.$t('action.operSelfErr'), type: 'warn'})
                    return;
                }
                this.$emit('handleEdit', {index: index, row: row})
            },
            // 删除
            handleDelete: function (index, row) {
                if (!this.valifunction(row)) {
                    this.$message({message: this.$t('action.operSelfErr'), type: 'warn'})
                    return;
                }
                this.delete(row.id)
            },
            // 批量删除
            handleBatchDelete: function () {
                let names = this.selections.map(item => item.name).toString()
                if (names.indexOf(getUser()) != -1) {
                    this.$message({message: this.$t('action.operSelfErr'), type: 'warn'})
                    return
                }
                let ids = this.selections.map(item => item.id).toString()
                this.delete(ids)
            },
            // 删除操作
            delete: function (ids) {
                this.$confirm(this.$t('action.do'), this.$t('action.tips'), {
                    type: 'warning',
                    cancelButtonText: this.$t('action.cancel'),
                    confirmButtonText: this.$t('action.confirm')
                }).then(() => {
                    let params = []
                    let idArray = (ids + '').split(',')
                    for (var i = 0; i < idArray.length; i++) {
                        params.push({'id': idArray[i]})
                    }
                    this.loading = true
                    let callback = res => {
                        if (res.code == 200) {
                            this.$message({message: this.$t('action.success'), type: 'success'})
                            this.findPage()
                        } else {
                            this.$message({message: this.$t('action.fail') + res.msg, type: 'error'})
                        }
                        this.loading = false
                    }
                    this.$emit('handleDelete', {params: params, callback: callback})
                }).catch(() => {
                    this.loading = false
                })
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 !=0) {
                    return 'success-row';
                }
                return '';
            },
            changeStatus(row) {

                if (!this.valifunction(row)) {
                    this.$message({message: this.$t('action.operSelfErr'), type: 'warn'})
                    return;
                }
                this.$emit('changeStatus', {row: row})
            },
            valifunction:function (row) {
                if (getUser() != 'admin') {
                    for (var i = 0 ; i< row.userRoles.length;i++) {
                        var userRole = row.userRoles[i]
                        if (userRole.roleId == 13) {
                            return false;
                        }
                    }
                }
                return true

            }

        },
        mounted() {
            this.refreshPageRequest(1)
        }
    }
</script>

<style scoped>
    .table_room_container{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-top: 20px
    }
</style>
