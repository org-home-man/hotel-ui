<template>
  <div style="height: auto">
    <!--表格栏-->
    <el-table :data="data.rows" :highlight-current-row="highlightCurrentRow" @selection-change="selectionChange"
          @current-change="handleCurrentChange" v-loading="loading" :element-loading-text="$t('action.loading')" :border="border" :stripe="stripe"
          :show-overflow-tooltip="showOverflowTooltip" :size="size" :align="align" style="width:100%;" >
      <el-table-column type="selection" width="40" v-if="showBatchDelete & showOperation"></el-table-column>
      <!--<el-table-column v-for="column in columns" header-align="center" align="center"-->
        <!--:prop="column.prop" :label="$t('table.'+column.label)" :width="column.width" :min-width="column.minWidth"-->
        <!--:fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"-->
        <!--:sortable="column.sortable==null?true:column.sortable">-->
      <!--</el-table-column>-->
      <el-table-column prop="hotelCode" header-align="center" align="center" :label="$t('hotel.hotelCode')">
      </el-table-column>
      <el-table-column :prop="language.lge=='zh_cn'?'hotelCname':'hotelEname'" header-align="center" align="center" :label="$t('hotel.hotelname')">
      </el-table-column>
        <el-table-column :prop="language.lge=='zh_cn'?'provinceCname':'provinceEname'" header-align="center" align="center" :label="$t('hotel.provinceCode.provinceCode')">
        </el-table-column>
        <el-table-column :prop="language.lge=='zh_cn'?'cityCname':'cityEname'" header-align="center" align="center" :label="$t('hotel.cityCode.cityCode')">
        </el-table-column>
      <el-table-column prop="roomTypeKey" header-align="center" align="center" :label="$t('hotel.roomtype.roomtype')">
        <template slot-scope="scope">
          <el-tag>{{$t('hotel.'+scope.row.roomTypeKey)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="bedTypeKey" header-align="center" align="center" :label="$t('hotel.bedtype.bedtype')">
        <template slot-scope="scope">
          <el-tag>{{$t('hotel.'+scope.row.bedTypeKey)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="inventory" header-align="center" align="center" :label="$t('hotel.roomstock')">
      </el-table-column>
      <el-table-column prop="sRoomPrice" header-align="center" align="center" :label="$t('table.sSprice')">
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


      <el-table-column prop="hotelCode" header-align="center" align="center" v-if="show">
      </el-table-column>
        <el-table-column prop="provinceCode" header-align="center" align="center" v-if="show">
        </el-table-column>
        <el-table-column prop="cityCode" header-align="center" align="center" v-if="show">
        </el-table-column>
      <el-table-column prop="roomType" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="bedType" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="roomStyle" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="breakType" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="roomArea" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="introC" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="introE" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="photo" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="room_stock" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="recommended" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="iswify" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isfront" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isbarrifr" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isbalcony" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="iskitchen" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="iswindow" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isheat" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isicebox" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isiron" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isnosmk" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="islandscape" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="ishighrise" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="ispark" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isgym" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isswmp" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isbeach" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="ishotsp" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="ischildct" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isroomserv" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isknead" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="islounge" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="issuper" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isbus" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="istrafic" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="isrestau" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="autoClose" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="tprice" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="sprice" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="scheduledays" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="favorableprice" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="evenlive" header-align="center" align="center" v-if="show">
      </el-table-column>
      <el-table-column prop="present" header-align="center" align="center" v-if="show">
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
        cancelButtonText: this.$t('action.cancel'),
        confirmButtonText: this.$t('action.confirm')
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
    }
  },
  mounted() {
    this.refreshPageRequest(1)
    this.localLanguageLoad()
  }
}
</script>

<style scoped>

</style>
