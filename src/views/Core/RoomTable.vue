<template>
  <div class="table_room_container" style="min-width: 1300px;">
    <!--表格栏-->
    <el-table  :data="data.rows" :highlight-current-row="highlightCurrentRow" @selection-change="selectionChange" :row-class-name="tableRowClassName"
          @current-change="handleCurrentChange" v-loading="loading" :element-loading-text="$t('action.loading')" :border="border"
          :show-overflow-tooltip="showOverflowTooltip" :align="align" style="width:100%;" :height="maxHeight">
      <el-table-column type="selection" width="40" v-if="showBatchDelete & showOperation"></el-table-column>
      <!--<el-table-column v-for="column in columns" header-align="center" align="center"-->
        <!--:prop="column.prop" :label="$t('table.'+column.label)" :width="column.width" :min-width="column.minWidth"-->
        <!--:fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"-->
        <!--:sortable="column.sortable==null?true:column.sortable">-->
      <!--</el-table-column>-->
      <el-table-column width="120px" prop="hotelCode" header-align="center" align="center" :label="$t('hotel.hotelCode')">
      </el-table-column>
        <el-table-column width="170px" :show-overflow-tooltip="true" prop="roomCode" header-align="center" align="center" :label="$t('hotel.roomcode')">
        </el-table-column>
      <el-table-column width="250px" :show-overflow-tooltip="true" :prop="language.lge=='zh_cn'?'hotelCname':'hotelEname'" header-align="center" align="center" :label="$t('hotel.hotelname')">
      </el-table-column>
        <el-table-column width="80px" prop="provinceCode" header-align="center" align="center" :label="$t('hotel.provinceCode.provinceCode')">
            <template slot-scope="scope">
                <el-tag>{{resolveRoomTypeName(paraConfig.PREFECTURE,scope.row.provinceCode)}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column width="100px" prop="cityCode" header-align="center" align="center" :label="$t('hotel.cityCode.cityCode')">
            <template slot-scope="scope">
                <el-tag>{{resolveRoomTypeName(paraConfig.DISTRICT,scope.row.cityCode)}}</el-tag>
            </template>
        </el-table-column>
      <el-table-column width="150px" prop="roomType" header-align="center" align="center" :label="$t('hotel.roomtype.roomtype')">
        <template slot-scope="scope">
          <el-tag>{{resolveRoomTypeName(paraConfig.ROOM_TYPE,scope.row.roomType)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="80px" prop="bedType" header-align="center" align="center" :label="$t('hotel.bedtype.bedtype')">
        <template slot-scope="scope">
          <el-tag>{{resolveRoomTypeName(paraConfig.BED_TYPE,scope.row.bedType)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="100px" prop="inventory" header-align="center" align="center" :label="$t('hotel.roomstock')">
      </el-table-column>
      <el-table-column width="80px" prop="sRoomPrice" header-align="center" align="center" :label="$t('table.sSprice')">
      </el-table-column>
      <el-table-column :label="$t('action.operation')" width="255" fixed="right" v-if="showOperation" header-align="center" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-col>
              <kt-button icon="fa fa-edit" style="width: 100px" :label="$t('action.edit')" :perms="permsEdit" :size="size" @click="handleEdit(scope.$index, scope.row)" />
              <kt-button icon="fa fa-trash" style="width: 100px" :label="$t('action.delete')" :perms="permsDelete" :size="size" type="danger" @click="handleDelete(scope.$index, scope.row)" />
            </el-col>
            <el-col style="padding-top: 5px">
              <kt-button icon="fa fa-edit" style="width: 100px" :label="$t('action.editPrice')" :perms="permsPriceEdit" :size="size" @click="handlePriceEdit(scope.$index, scope.row)" />
              <kt-button icon="fa fa-edit" style="width: 100px" :label="$t('action.editStock')" :perms="permsStockEdit" :size="size" @click="handleStockEdit(scope.$index, scope.row)" />
            </el-col>
          </el-row>

        </template>
      </el-table-column>

    </el-table>
    <!--分页栏-->
    <div class="toolbar" style="padding:10px;">
      <kt-button :label="$t('action.batchDelete')" :perms="permsDelete" :size="size" type="danger" @click="handleBatchDelete()"
        :disabled="this.selections.length===0" style="float:left;" v-if="showBatchDelete & showOperation"/>
      <el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"
        :current-page="data.pageNum" :page-size="data.pageSize" :total="data.total" style="float:right;">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import KtButton from "@/views/Core/KtButton"
export default {
  name: 'RoomTable',
  components:{
			KtButton
	},
  props: {
    columns: Array, // 表格列配置
    data: Object, // 表格分页数据
    permsEdit: String,  // 编辑权限标识
    permsDelete: String,  // 删除权限标识
    permsPriceEdit:String, //编辑权限标识
    permsStockEdit:String, //库存编辑权限标识
      paraConfig:Object,
    size: { // 尺寸样式
      type: String,
      default: 'mini'
    },
    align: {  // 文本对齐方式
      type: String,
      default: 'left'
    },
    maxHeight: {  // 表格最大高度
      type: Number,
      default: 420
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
      language:{},
      show : false
    }
  },
  methods: {
    // 分页查询
    findPage: function () {
        this.loading = true
        let callback = res => {
          this.loading = false
        }
      this.$emit('findPage', {pageRequest:this.pageRequest, callback:callback})
    },
    // 选择切换
    selectionChange: function (selections) {
      this.selections = selections
      this.$emit('selectionChange', {selections:selections})
    },
    // 选择切换
    handleCurrentChange: function (val) {
      this.$emit('handleCurrentChange', {val:val})
    },
    // 换页刷新
		refreshPageRequest: function (pageNum) {
      this.pageRequest.page = pageNum
      this.findPage()
    },
    // 编辑
		handleEdit: function (index, row) {
      this.$emit('handleEdit', {index:index, row:row})
		},
    // 编辑牌价
    handlePriceEdit: function (index, row) {
      this.$emit('handlePriceEdit', {index:index, row:row})
    },
    // 编辑牌价
    handleStockEdit: function (index, row) {
      this.$emit('handleStockEdit', {index:index, row:row})
    },
    // 删除
		handleDelete: function (index, row) {
      console.log("row",row);
			this.delete(row.roomCode);
		},
		// 批量删除
		handleBatchDelete: function () {
			let ids = this.selections.map(item => item.roomCode).toString()
			this.delete(ids)
		},
		// 删除操作
		delete: function (ids) {
			this.$confirm(this.$t('action.do'), this.$t('action.tips'), {
				type: 'warning',
                confirmButtonText: this.$t('action.confirm'),
                cancelButtonText: this.$t('action.cancel')

			}).then(() => {
				let params = []
				let idArray = (ids+'').split(',')
				for(var i=0; i<idArray.length; i++) {
					params.push({'roomCode':idArray[i]})
        }
        this.loading = true
        let callback = res => {
          if(res.code == 200) {
            this.$message({message: this.$t('action.success'), type: 'success'})
            this.findPage()
          } else {
            this.$message({message: this.$t('action.fail') + res.msg, type: 'error'})
          }
          this.loading = false
        }
        this.$emit('handleDelete', {params:params, callback:callback})
			}).catch(() => {

			}).finally(()=>{
			    this.loading = false
            })
		},
    localLanguageLoad:function () {
      this.language={lge:this.$i18n.locale}
    },
      tableRowClassName({row, rowIndex}) {
          if (rowIndex % 2 !=0) {
              return 'success-row';
          }
          return '';
      }
  },
  mounted() {
    this.refreshPageRequest(1)
    this.localLanguageLoad()
  }
}
</script>

<style scoped>
    .table_room_container{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-top: 20px
    }


</style>
