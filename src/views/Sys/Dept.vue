<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar query_room_container" style="padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.name" :placeholder="$t('dept.name')"></el-input>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:dept:view" type="primary" @click="findTreeData(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dept:add" type="primary" @click="handleAdd"/>
			</el-form-item>
		</el-form>
	</div>
	<!--表格树内容栏-->
      <div class="table_room_container">
    <el-table :data="tableTreeDdata" size="mini" style="width: 100%;" :row-class-name="tableRowClassName"
      v-loading="loading" :element-loading-text="$t('action.loading')">
      <el-table-column
        prop="id" header-align="center" align="center" width="80" :label="$t('dept.id')">
      </el-table-column>
      <table-tree-column
        prop="name" header-align="center" treeKey="id" width="150" :label="$t('dept.name')">
      </table-tree-column>
      <el-table-column
        prop="parentName" header-align="center" align="center" width="120" :label="$t('dept.preOrg')">
      </el-table-column>
      <el-table-column
        prop="orderNum" header-align="center" align="center" :label="$t('dept.order')">
      </el-table-column>
      <el-table-column
        prop="createName" header-align="center" align="center" :label="$t('dept.createName')">
      </el-table-column>
      <el-table-column
        prop="createTime" header-align="center" align="center" :label="$t('dept.createTime')">
      </el-table-column>
      <el-table-column
        fixed="right" header-align="center" align="center" width="185" :label="$t('action.operation')">
        <template slot-scope="scope">
          <kt-button icon="fa fa-edit" :label="$t('action.edit')" perms="sys:dept:edit" @click="handleEdit(scope.row)"/>
          <kt-button icon="fa fa-trash" :label="$t('action.delete')" perms="sys:dept:delete" type="danger" @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
      </div>
    <!-- 新增修改界面 -->
    <el-dialog :title="!dataForm.id ?$t('action.add'):$t('action.edit')" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submitForm()"
        label-width="100px" :size="size" style="text-align:left;">
        <el-form-item :label="$t('dept.name')" prop="name">
          <el-input v-model="dataForm.name" :placeholder="$t('dept.name')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('dept.preOrg')" prop="parentName">
            <popup-tree-input
              :data="popupTreeData" :props="popupTreeProps" :prop="dataForm.parentName==null?$t('common.topTree'):dataForm.parentName"
              :nodeKey="''+dataForm.parentId" :currentChangeHandle="handleTreeSelectChange" :placeholder="$t('dept.name')" >
            </popup-tree-input>
        </el-form-item>
        <el-form-item v-if="dataForm.type !== 2" :label="$t('dept.order')" prop="orderNum">
          <el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0" :label="$t('dept.order')"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size"  @click="dialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size"  type="primary" @click="submitForm()">{{$t('action.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import KtButton from "@/views/Core/KtButton"
import TableTreeColumn from '@/views/Core/TableTreeColumn'
import PopupTreeInput from "@/components/PopupTreeInput"
import FaIconTooltip from "@/components/FaIconTooltip"
import { format } from "@/utils/datetime"
export default {
	components:{
    PopupTreeInput,
    KtButton,
    TableTreeColumn,
    FaIconTooltip
	},
	data() {
		return {
			size: 'small',
			loading: false,
			filters: {
				name: ''
      },
      tableTreeDdata: [],
      dialogVisible: false,
      dataForm: {
        id: 0,
        name: '',
        parentId: 0,
        parentName: '',
        orderNum: 0
      },
      dataRule: {
        name: [
          { required: true, message: this.$t('action.noNull'), trigger: 'blur' }
        ],
        parentName: [
          { required: true, message: this.$t('action.noNull'), trigger: 'change' }
        ]
      },
      popupTreeData: [],
      popupTreeProps: {
				label: 'name',
				children: 'children'
			}
		}
	},
	methods: {
		// 获取数据
    findTreeData: function () {
      this.loading = true
			this.$api.dept.findDeptTree().then((res) => {
        this.tableTreeDdata = res
        this.popupTreeData = this.getParentMenuTree(res)
        this.loading = false
			})
    },
		// 获取上级机构树
    getParentMenuTree: function (tableTreeDdata) {
      let parent = {
        parentId: 0,
        name: this.$t('common.topTree'),
        children: tableTreeDdata
      }
      return [parent]
    },
		// 显示新增界面
		handleAdd: function () {
			this.dialogVisible = true
			this.dataForm = {
        id: 0,
        name: '',
        parentId: 0,
        parentName: '',
        orderNum: 0
      }
		},
		// 显示编辑界面
		handleEdit: function (row) {
      this.dialogVisible = true
      Object.assign(this.dataForm, row);
		},
    // 删除
    handleDelete (row) {
      this.$confirm(this.$t("action.do"), this.$t('action.tips'), {
				type: 'warning',
        cancelButtonText: this.$t('action.cancel'),
        confirmButtonText: this.$t('action.confirm')
      }).then(() => {
        let params = this.getDeleteIds([], row)
        this.$api.dept.batchDelete(params,{headers: {'Content-Type': 'application/json;charset=UTF-8'}}).then( res => {
          this.findTreeData()
          this.$message({message: this.$t('action.delSuccess'), type: 'success'})
        })
      })
    },
    // 获取删除的包含子机构的id列表
    getDeleteIds (ids, row) {
      ids.push({id:row.id})
      if(row.children != null) {
        for(let i=0, len=row.children.length; i<len; i++) {
          this.getDeleteIds(ids, row.children[i])
        }
      }
      return ids
    },
      // 机构树选中
    handleTreeSelectChange (data, node) {
      this.dataForm.parentId = data.id
      this.dataForm.parentName = data.name
    },
    // 表单提交
    submitForm () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
					this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {}).then(() => {
						this.dialogVisible = true
						let params = Object.assign({}, this.dataForm)
						this.$api.dept.save(params).then((res) => {
              this.dialogVisible = false
              if(res.code == 200) {
								this.$message({ message: this.$t('action.success'), type: 'success' })
                this.dialogVisible = false
                this.$refs['dataForm'].resetFields()
							} else {
								this.$message({message: this.$t('action.fail'), type: 'error'})
							}
							this.findTreeData()
						})
					})
				}
      })
    },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex % 2 !=0) {
                return 'success-row';
            }
            return '';
        },

		// 时间格式化
    dateFormat: function (row, column, cellValue, index){
      return format(row[column.property])
    },
    //取消按钮
    cancel: function(formName){
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    }

	},
	mounted() {
    this.findTreeData()
	}
}
</script>

<style scoped>
    .query_room_container{
        width: 60%;
        padding-top:10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .table_room_container{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-top: 20px
    }
</style>
