<template>
  <div class="table_room_container" style="min-width: 1300px;">
    <!--表格栏-->
    <el-table  :data="data.rows" :highlight-current-row="highlightCurrentRow" @selection-change="selectionChange" :row-class-name="tableRowClassName"
          @current-change="handleCurrentChange" v-loading="loading" :element-loading-text="$t('action.loading')" :border="border"
          :show-overflow-tooltip="showOverflowTooltip" :align="align" style="width:100%;" >
      <el-table-column type="selection" v-if="showBatchDelete & showOperation"></el-table-column>
      <el-table-column  prop="reportId" header-align="center" align="center" :label="$t('hotel.reportId')">
      </el-table-column>
        <el-table-column  :show-overflow-tooltip="true" prop="reportTxt" header-align="center" align="center" :label="$t('hotel.reportTxt')">
        </el-table-column>
        <el-table-column  prop="reportMonth" header-align="center" align="center" :label="$t('hotel.reportMonth')">
        </el-table-column>
        <el-table-column  prop="reportSeq" header-align="center" align="center" :label="$t('hotel.reportSeq')">
        </el-table-column>

      <el-table-column :label="$t('action.operation')" width="255" fixed="right" v-if="showOperation" header-align="center" align="center">
        <template slot-scope="scope">
              <kt-button icon="fa fa-edit" style="width: 100px" :label="$t('hotel.viewReport')" :perms="perms" :size="size" @click="handleViewReport(scope.$index, scope.row)" />
        </template>
      </el-table-column>

    </el-table>
    <!--分页栏-->
    <div class="toolbar" style="padding:10px;">
      <el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"
        :current-page="data.pageNum" :page-size="data.pageSize" :total="data.total" style="float:right;">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import KtButton from "@/views/Core/KtButton"
export default {
  name: 'TotalReportTable',
  components:{
			KtButton
	},
  props: {
    columns: Array, // 表格列配置
    data: Object, // 表格分页数据
    perms: String,  // 编辑权限标识
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
      handleViewReport: function (index, row) {
        console.log("row",)
      this.$emit('handleViewReport', {index:index, row:row})
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
  }
}
</script>

<style scoped>
    .table_room_container{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-top: 20px
    }


</style>
