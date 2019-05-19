<template>
  <div style="height: auto">
    <!--表格栏-->
    <el-table :data="data.rows" :highlight-current-row="highlightCurrentRow" @selection-change="selectionChange"
          @current-change="handleCurrentChange" v-loading="loading" :element-loading-text="$t('action.loading')" :border="border" :stripe="stripe"
          :show-overflow-tooltip="showOverflowTooltip" :size="size" :align="align" style="width:100%;" @row-click="expandChange" ref="refTable">

        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline  class="demo-table-expand">
                    <el-form-item label="护照号" style="width: 24%">
                        <span>{{ props.row.passport }}</span>
                    </el-form-item>
                    <el-form-item label="出生年月" style="width: 24%">
                        <span>{{ props.row.birth }}</span>
                    </el-form-item>
                    <el-form-item label="联系电话" style="width: 24%">
                        <span>{{ props.row.phone }}</span>
                    </el-form-item>
                </el-form>
                <el-form label-position="left" inline  class="demo-table-expand">
                    <el-form-item label="房间数" style="width: 24%">
                        <span>{{ props.row.roomNum }}</span>
                    </el-form-item>
                    <el-form-item label="成人人数" style="width: 24%">
                        <span>{{ props.row.aNum }}</span>
                    </el-form-item>
                    <el-form-item label="儿童数" style="width: 24%">
                        <span>{{ props.row.bNum }}</span>
                    </el-form-item>
                    <el-form-item label="幼儿数" style="width: 24%">
                        <span>{{ props.row.cNum }}</span>
                    </el-form-item>
                </el-form>
                <el-form label-position="left" inline  class="demo-table-expand">
                    <el-form-item label="房间类型" style="width: 24%">
                        <span>{{ props.row.roomType }}</span>
                    </el-form-item>
                    <el-form-item label="房间样式" style="width: 24%">
                        <span>{{ props.row.roomStyle }}</span>
                    </el-form-item>
                    <el-form-item label="床铺类型" style="width: 24%">
                        <span>{{ props.row.bedType }}</span>
                    </el-form-item>
                    <el-form-item label="餐食条件" style="width: 24%">
                        <span>{{ props.row.breakType }}</span>
                    </el-form-item>
                </el-form>
                <el-form label-position="left" inline  class="demo-table-expand">
                    <el-form-item label="房间类型" style="width: 24%">
                        <span>{{ props.row.roomType }}</span>
                    </el-form-item>
                    <el-form-item label="房间样式" style="width: 24%">
                        <span>{{ props.row.roomStyle }}</span>
                    </el-form-item>
                    <el-form-item label="床铺类型" style="width: 24%">
                        <span>{{ props.row.bedType }}</span>
                    </el-form-item>
                    <el-form-item label="餐食条件" style="width: 24%">
                        <span>{{ props.row.breakType }}</span>
                    </el-form-item>
                </el-form>
                <el-form label-position="left" inline  class="demo-table-expand">
                    <el-form-item>
                        <el-checkbox v-show="props.row.iswify==1" disabled fill="#409EFF" text-color="#ffffff"
                                     true-label="1" false-label="2" :label="$t('hotel.iswify')"
                                     v-model="props.row.iswify" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isfront==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isfront')"
                                     v-model="props.row.isfront" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isbarrifr==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isbarrifr')"
                                     v-model="props.row.isbarrifr" border></el-checkbox>
                    </el-form-item>

                    <el-form-item>
                        <el-checkbox v-show="props.row.isbalcony==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isbalcony')"
                                     v-model="props.row.isbalcony" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.iskitchen==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.iskitchen')"
                                     v-model="props.row.iskitchen" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.iswindow==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.iswindow')"
                                     v-model="props.row.iswindow" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isheat==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isheat')"
                                     v-model="props.row.isheat" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isicebox==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isicebox')"
                                     v-model="props.row.isicebox" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isiron==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isiron')"
                                     v-model="props.row.isiron" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isnosmk==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isnosmk')"
                                     v-model="props.row.isnosmk" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.islandscape==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.islandscape')"
                                     v-model="props.row.islandscape" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.ishighrise==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.ishighrise')"
                                     v-model="props.row.ishighrise" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.ispark==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.ispark')"
                                     v-model="props.row.ispark" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isgym==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isgym')"
                                     v-model="props.row.isgym" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isswmp==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isswmp')"
                                     v-model="props.row.isswmp" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isbeach==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isbeach')"
                                     v-model="props.row.isbeach" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.ishotsp==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.ishotsp')"
                                     v-model="props.row.ishotsp" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.ischildct==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.ischildct')"
                                     v-model="props.row.ischildct" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isroomserv==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isroomserv')"
                                     v-model="props.row.isroomserv" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isknead==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isknead')"
                                     v-model="props.row.isknead" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.islounge==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.islounge')"
                                     v-model="props.row.islounge" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.issuper==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.issuper')"
                                     v-model="props.row.issuper" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isbus==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isbus')"
                                     v-model="props.row.isbus" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.istrafic==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.istrafic')"
                                     v-model="props.row.istrafic" border></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-show="props.row.isrestau==1" disabled true-label="1" false-label="2"
                                     :label="$t('hotel.isrestau')"
                                     v-model="props.row.isrestau" border></el-checkbox>
                    </el-form-item>
                </el-form>
                <el-form label-position="left" inline  class="demo-table-expand">
                    <el-form-item label="备注" style="width: 60%">
                        <span>{{ props.row.remark }}</span>
                    </el-form-item>
                    <el-form-item>
                        <kt-button icon="fa fa-success" v-show="props.row.status == 1" :label="$t('action.confirm')" :perms="permsConfirm" size="medium" type="primary" @click="confirm(props.row)"></kt-button>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column v-for="column in columns" header-align="center" align="center"
                         :prop="column.prop" :label="$t(column.label)" :width="column.width" :key="column.prop"
                         :sortable="column.sortable==null?true:column.sortable">
        </el-table-column>
        <el-table-column :label="$t('action.operation')" width="185" fixed="right" v-if="showOperation" header-align="center" align="center">
            <template slot-scope="scope">
                <kt-button icon="fa fa-edit" :label="$t('action.edit')" :perms="permsEdit" :size="size" @click="handleEdit(scope.$index, scope.row)" />
                <kt-button icon="fa fa-trash" :label="$t('action.cancel')" :perms="permsCancel" :size="size" type="danger" @click="handleCancel(scope.$index, scope.row)" />
            </template>
        </el-table-column>
    </el-table>
    <div class="toolbar" style="padding:10px;">
      <el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"
        :current-page="pageRequest.page" :page-size="pageRequest.rows" :total="data.total" style="float:right;">
      </el-pagination>
    </div>
  </div>
</template>
<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        min-width: 100px;
        color: #99a9bf;
    }
    .demo-table-expand {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>

<script>
import KtButton from "@/views/Core/KtButton"
export default {
  name: 'KtTable',
  components:{
			KtButton
	},
  props: {
    columns: Array, // 表格列配置
    data: Object, // 表格分页数据
    permsEdit: String,  // 编辑权限标识
    permsCancel: String,  // 删除权限标识
    permsConfirm: String,  // 确认权限标识
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
        expandChange(row,index,e){
            this.$refs.refTable.toggleRowExpansion(row)
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
        // 换页刷新
        refreshPageRequest: function (page) {
            this.pageRequest.page = page
            this.findPage()
        },
        // 编辑
        handleEdit: function (e,index, row) {
            this.$emit('handleEdit', {index: index, row: row})
        },
        // 删除
        handleCancel: function (index, row) {
            this.cancel(row)
        },
        // 删除操作
        cancel: function (row) {
            this.$confirm(this.$t('action.do'), this.$t('action.tips'), {
                type: 'warning',
                cancelButtonText: this.$t('action.cancel'),
                confirmButtonText: this.$t('action.confirm')
            }).then(() => {
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
                this.$emit('handleCancel', {params: row, callback: callback})
            }).catch(() => {
            })
        },
        confirm:function (row) {
            this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {
                type: 'warning',
                cancelButtonText: this.$t('action.cancel'),
                confirmButtonText: this.$t('action.confirm')
            }).then(() => {
                this.loading = true;
                let callback = res =>{
                    if(res.code == 200){
                        this.$message({message: this.$t('action.success'), type: 'success'})
                    } else {
                        this.$message({message: this.$t('action.fail') + res.msg, type: 'error'})
                    }
                    this.loading = false;
                }
                this.$emit('handleConfirm', {params: row, callback: callback})
            })
        }
    },
    mounted() {
        this.refreshPageRequest(1)
    }
}
</script>

<style scoped>

</style>
