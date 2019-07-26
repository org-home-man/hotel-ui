<template>
  <div class="table_room_container" style="height: auto">
    <!--表格栏-->
    <el-table :data="data.rows" :highlight-current-row="highlightCurrentRow" @selection-change="selectionChange" :row-class-name="tableRowClassName"
          @current-change="handleCurrentChange" v-loading="loading" :element-loading-text="$t('action.loading')" :border="border"
          :show-overflow-tooltip="showOverflowTooltip" :align="align" style="width:100%;" @row-click="expandChange" ref="refTable" :empty-text="$t('action.noData')">

        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline  class="demo-table-expand">
                    <el-form-item>
                        <kt-button icon="fa fa-success" v-show="props.row.status == 1" :label="$t('action.confirm')" :perms="permsConfirm" size="medium" type="primary" @click="confirm(props.row)"></kt-button>
                        <kt-button icon="fa fa-success" v-show="props.row.status == 5" :label="$t('order.accounts')" :perms="permsConfirm" size="medium" type="primary" @click="accountsConfirm(props.row)"></kt-button>
                        <kt-button icon="fa fa-success" v-show="props.row.status == 2 || props.row.status == 5 || props.row.status == 6" :label="$t('common.exportExcel')" :perms="permsConfirm" size="medium" type="primary" @click="exportExcel(props.row)"></kt-button>
                        <kt-button icon="fa fa-success" v-show="props.row.status == 2 || props.row.status == 5 || props.row.status == 6" :label="$t('common.exportExcelManager')" :perms="excelManagerConfirm" size="medium" type="primary" @click="exportManagerExcel(props.row)"></kt-button>
                    </el-form-item>
                </el-form>

                <el-form label-position="left" inline  class="demo-table-expand">
                    <el-form-item :label="$t('hotel.passportNo')" style="width: 24%">
                        <span>{{ props.row.passport }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('hotel.birthday')" style="width: 24%">
                        <span>{{ props.row.birth }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('hotel.contactPhone')" style="width: 24%">
                        <span>{{ props.row.phone }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('hotel.sRoomPrice')" style="width: 24%">
                        <span>{{ props.row.totalSAmount }}</span>
                    </el-form-item>

                </el-form>
                <el-form label-position="left" inline  class="demo-table-expand">
                    <el-form-item :label="$t('hotel.roomNum')" style="width: 24%">
                        <span>{{ props.row.roomNum }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('hotel.adultNum')" style="width: 24%">
                        <span>{{ props.row.adultNum }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('hotel.childrenNum')" style="width: 24%">
                        <span>{{ props.row.childNum }}</span>
                    </el-form-item>
                    <!--<el-form-item label="幼儿数" style="width: 24%">-->
                        <!--<span>{{ props.row.cNum }}</span>-->
                    <!--</el-form-item>-->
                </el-form>
                <el-form label-position="left" inline  class="demo-table-expand">
                    <el-form-item :label="$t('hotel.roomtype.roomtype')" style="width: 24%">
                        <span>{{resolveRoomTypeName(roomType,props.row.roomType)}}</span>
                    </el-form-item>
                    <el-form-item :label="$t('hotel.roomstyle.roomstyle')" style="width: 24%">
                        <span>{{resolveRoomTypeName(roomStyle,props.row.roomStyle)}}</span>
                    </el-form-item>
                    <el-form-item :label="$t('hotel.bedtype.bedtype')" style="width: 24%">
                        <span>{{resolveRoomTypeName(bedType,props.row.bedType)}}</span>
                    </el-form-item>
                    <el-form-item :label="$t('hotel.breaktype.breaktype')" style="width: 24%">
                        <span>{{resolveRoomTypeName(breakType,props.row.breakType)}}</span>
                    </el-form-item>
                </el-form>
                <el-form label-position="left" inline  class="demo-table-expand">
                    <el-form-item :label="$t('hotel.reMark')" style="width: 100%">
                        <span>{{ props.row.remark }}</span>
                    </el-form-item>
                </el-form>
                <el-row >
                    <el-col :span="24" align="left">
                        <el-tag type="success" v-show="props.row.iswify==1">{{$t('hotel.iswify')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isfront==1">{{$t('hotel.isfront')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isbarrifr==1">{{$t('hotel.isbarrifr')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isbalcony==1">{{$t('hotel.isbalcony')}}</el-tag>
                        <el-tag type="success" v-show="props.row.iskitchen==1">{{$t('hotel.iskitchen')}}</el-tag>
                        <el-tag type="success" v-show="props.row.iswindow==1">{{$t('hotel.iswindow')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isheat==1">{{$t('hotel.isheat')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isicebox==1">{{$t('hotel.isicebox')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isiron==1">{{$t('hotel.isiron')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isnosmk==1">{{$t('hotel.isnosmk')}}</el-tag>
                        <el-tag type="success" v-show="props.row.islandscape==1">{{$t('hotel.islandscape')}}</el-tag>
                        <el-tag type="success" v-show="props.row.ishighrise==1">{{$t('hotel.ishighrise')}}</el-tag>
                        <el-tag type="success" v-show="props.row.ispark==1">{{$t('hotel.ispark')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isgym==1">{{$t('hotel.isgym')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isswmp==1">{{$t('hotel.isswmp')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isbeach==1">{{$t('hotel.isbeach')}}</el-tag>
                        <el-tag type="success" v-show="props.row.ishotsp==1">{{$t('hotel.ishotsp')}}</el-tag>
                        <el-tag type="success" v-show="props.row.ischildct==1">{{$t('hotel.ischildct')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isroomserv==1">{{$t('hotel.isroomserv')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isknead==1">{{$t('hotel.isknead')}}</el-tag>
                        <el-tag type="success" v-show="props.row.islounge==1">{{$t('hotel.islounge')}}</el-tag>
                        <el-tag type="success" v-show="props.row.issuper==1">{{$t('hotel.issuper')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isbus==1">{{$t('hotel.isbus')}}</el-tag>
                        <el-tag type="success" v-show="props.row.istrafic==1">{{$t('hotel.istrafic')}}</el-tag>
                        <el-tag type="success" v-show="props.row.isrestau==1">{{$t('hotel.isrestau')}}</el-tag>
                    </el-col>
                </el-row>

            </template>
        </el-table-column>

        <el-table-column prop="orderCode" :label="$t('order.orderCode')" width="150px">
        </el-table-column>
        <el-table-column width="160px" :show-overflow-tooltip="true" :prop="language.lge=='zh_cn'?'hotelCname':'hotelEname'" header-align="center" align="center" :label="$t('hotel.hotelname')">
        </el-table-column>
        <el-table-column v-for="column in columns" header-align="center" align="center"
                         :prop="column.prop" :label="$t(column.label)" :width="column.width" :key="column.prop"
                         :sortable="column.sortable==null?true:column.sortable" >
        </el-table-column>
        <el-table-column width="150px" prop="status" :label="$t('order.roomStatus')">
            <template slot-scope="scope">
                <el-tag>{{resolveRoomTypeName(roomStatus,scope.row.status)}}</el-tag>
            </template>
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
      excelManagerConfirm:String, //管理员报表导出
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
            selections: [],  // 列表选中列
            hotelType: [], //酒店类型
            hotelStar:[], //酒店星级
            roomStyle:[], //房间样式
            roomType:[], //房间类型
            breakType: [], //餐饮条件
            bedType: [], //床铺类型
            roomStatus:[],
            language:{}
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
            if (row.status != "1" && row.status != "2")
            {
                this.$message({message: this.$t('action.canotCancel'), type: 'error'})
                return
            }
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
                    this.findPage()
                    this.loading = false;
                }
                this.$emit('handleConfirm', {params: row, callback: callback})
            }).catch(() => {
                // this.loading = false
            }).finally(()=>{
                this.loading = false
            })
        },

        exportExcel:function (row) {

            this.$emit('exportExcel', {params: row})

        },

        exportManagerExcel:function (row) {

            this.$emit('exportManagerExcel', {params: row})

        },

        accountsConfirm:function (row) {

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
            this.findPage()
            this.loading = false;
        }
        this.$emit('accountsConfirm', {params: row, callback: callback})
    }).catch(() => {
        // this.loading = false
    }).finally(()=>{
        this.loading = false
    })
},
        tableRowClassName({row, rowIndex}) {
            if (rowIndex % 2 !=0) {
                return 'success-row';
            }
            return '';
        },
        localLanguageLoad:function () {
            this.language={lge:this.$i18n.locale}
        },
    },
    mounted() {
        this.refreshPageRequest(1)
        this.localLanguageLoad()
    },
    created(){
        this.getTypeValues('ROOM_STYLE,ROOM_TYPE,HOTEL_STAR,HOTEL_TYPE,BREAK_TYPE,BED_TYPE,ROOM_STATUS').then( res =>{
            this.roomStyle = res.ROOM_STYLE;
            this.roomType = res.ROOM_TYPE;
            this.hotelStar = res.HOTEL_STAR;
            this.hotelType = res.HOTEL_TYPE;
            this.breakType = res.BREAK_TYPE;
            this.bedType = res.BED_TYPE;
            this.roomStatus = res.ROOM_STATUS;
        })
    }
}
</script>

<style scoped>
    .table_room_container{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-top: 20px
    }
</style>
