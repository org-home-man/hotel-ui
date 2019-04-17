<template>
  <div class="container" style="width:99%;margin-top:-25px;">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.label" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.search')" perms="sys:hotelArea:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.add')" perms="sys:hotelArea:add" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table permsEdit="sys:hotelArea:edit" permsDelete="sys:hotelArea:delete"
		:data="pageResult" :columns="columns" 
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</kt-table>
	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="地区级别" prop="areaLvl"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.areaLvl" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="地区码" prop="areaCode"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.areaCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="地区码key" prop="codeKey"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.codeKey" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="地区中文名称" prop="areaCname"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.areaCname" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="地区英文名称" prop="areaEname"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.areaEname" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="备注信息" prop="remark"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.remark" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="创建人员" prop="creatBy"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.creatBy" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="创建时间" prop="creatTime"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.creatTime" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import { format } from "@/utils/datetime"
export default {
	components:{
			KtTable,
			KtButton
	},
	data() {
		return {
			size: 'small',
			filters: {
				label: ''
			},
			columns: [
				{prop:"areaLvl", label:"地区级别", minWidth:100},
				{prop:"areaCode", label:"地区码", minWidth:100},
				{prop:"codeKey", label:"地区码key", minWidth:100},
				{prop:"areaCname", label:"地区中文名称", minWidth:100},
				{prop:"areaEname", label:"地区英文名称", minWidth:100},
				{prop:"remark", label:"备注信息", minWidth:100},
				{prop:"creatBy", label:"创建人员", minWidth:100},
				{prop:"creatTime", label:"创建时间", minWidth:100},
			],
			pageRequest: { pageNum: 1, pageSize: 8 },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				label: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				areaLvl: null,
				areaCode: null,
				codeKey: null,
				areaCname: null,
				areaEname: null,
				remark: null,
				creatBy: null,
				creatTime: null,
			}
		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {label: {name:'label', value:this.filters.label}}
			this.$api.hotelArea.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
			this.$api.hotelArea.batchDelete(data.params).then(data!=null?data.callback:'')
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				areaLvl: null,
				areaCode: null,
				codeKey: null,
				areaCname: null,
				areaEname: null,
				remark: null,
				creatBy: null,
				creatTime: null,
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
						this.$api.hotelArea.save(params).then((res) => {
							if(res.code == 200) {
								this.$message({ message: '操作成功', type: 'success' })
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
		// 时间格式化
      	dateFormat: function (row, column, cellValue, index){
          	return format(row[column.property])
      	}
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>