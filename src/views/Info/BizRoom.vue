<template>
  <div class="container" style="width:99%;margin-top:-25px;">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.label" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.search')" perms="sys:bizRoom:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.add')" perms="info:bizRoom:add" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table permsEdit="sys:bizRoom:edit" permsDelete="sys:bizRoom:delete"
		:data="pageResult" :columns="columns" 
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</kt-table>
	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="客房编号" prop="roomCode"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.roomCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="酒店编码" prop="hotelCode"  >
				<el-input v-model="dataForm.hotelCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="房间类型" prop="roomType" >
				<el-input v-model="dataForm.roomType" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="房间样式" prop="roomStyle"  >
				<el-input v-model="dataForm.roomStyle" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="床铺类型" prop="bedType" >
				<el-input v-model="dataForm.bedType" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="餐食条件" prop="breakType" >
				<el-input v-model="dataForm.breakType" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="客房面积" prop="roomArea" >
				<el-input v-model="dataForm.roomArea" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="中文文字介绍" prop="introC" >
				<el-input v-model="dataForm.introC" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="英文文字介绍" prop="introE" >
				<el-input v-model="dataForm.introE" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="宣传照片" prop="photo" >
				<el-input v-model="dataForm.photo" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="默认库存数" prop="roomStock"  >
				<el-input v-model="dataForm.roomStock" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="是否本期推荐" prop="recommended"  >
				<el-input v-model="dataForm.recommended" auto-complete="off"></el-input>
			</el-form-item>
			<!--<el-form-item label="创建人员" prop="creatBy"  v-if="dataForm.isPrimaryKey">-->
				<!--<el-input v-model="dataForm.creatBy" auto-complete="off"></el-input>-->
			<!--</el-form-item>-->
			<!--<el-form-item label="创建时间" prop="creatTime"  v-if="dataForm.isPrimaryKey">-->
				<!--<el-input v-model="dataForm.creatTime" auto-complete="off"></el-input>-->
			<!--</el-form-item>-->
			<!--<el-form-item label="更新时间" prop="lastUpdateBy"  v-if="dataForm.isPrimaryKey">-->
				<!--<el-input v-model="dataForm.lastUpdateBy" auto-complete="off"></el-input>-->
			<!--</el-form-item>-->
			<!--<el-form-item label="更新时间" prop="lastUpdateTime"  v-if="dataForm.isPrimaryKey">-->
				<!--<el-input v-model="dataForm.lastUpdateTime" auto-complete="off"></el-input>-->
			<!--</el-form-item>-->
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
				{prop:"roomCode", label:"客房编号", minWidth:100},
				{prop:"hotelCode", label:"酒店编码", minWidth:100},
				{prop:"roomType", label:"房间类型", minWidth:100},
				{prop:"roomStyle", label:"房间样式", minWidth:100},
				{prop:"bedType", label:"床铺类型", minWidth:100},
				{prop:"breakType", label:"餐食条件", minWidth:100},
				{prop:"roomArea", label:"客房面积", minWidth:100},
				{prop:"introC", label:"中文文字介绍", minWidth:100},
				{prop:"introE", label:"英文文字介绍", minWidth:100},
				{prop:"photo", label:"宣传照片", minWidth:100},
				{prop:"roomStock", label:"默认库存数", minWidth:100},
				{prop:"recommended", label:"是否本期推荐", minWidth:100},
				{prop:"creatBy", label:"创建人员", minWidth:100},
				{prop:"creatTime", label:"创建时间", minWidth:100},
				{prop:"lastUpdateBy", label:"更新时间", minWidth:100},
				{prop:"lastUpdateTime", label:"更新时间", minWidth:100},
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
				roomCode: null,
				hotelCode: null,
				roomType: null,
				roomStyle: null,
				bedType: null,
				breakType: null,
				roomArea: null,
				introC: null,
				introE: null,
				photo: null,
				roomStock: null,
				recommended: null,
				creatBy: null,
				creatTime: null,
				lastUpdateBy: null,
				lastUpdateTime: null,
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
			this.$api.bizRoom.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
			this.$api.bizRoom.batchDelete(data.params).then(data!=null?data.callback:'')
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				roomCode: null,
				hotelCode: null,
				roomType: null,
				roomStyle: null,
				bedType: null,
				breakType: null,
				roomArea: null,
				introC: null,
				introE: null,
				photo: null,
				roomStock: null,
				recommended: null,
				creatBy: null,
				creatTime: null,
				lastUpdateBy: null,
				lastUpdateTime: null,
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
						this.$api.bizRoom.save(params).then((res) => {
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
