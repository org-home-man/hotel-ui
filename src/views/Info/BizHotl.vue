<template>
  <div class="container" style="width:99%;margin-top:-25px;">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:30px;padding-left:20px;">
		<el-form :inline="true" :model="filters" :size="size">

      <el-form-item>
        <el-input v-model="filters.roomCode" :placeholder="$t('hotel.roomcode')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="filters.provinceCode" :placeholder="$t('hotel.provinceCode')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="filters.cityCode" :placeholder="$t('hotel.cityCode')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="filters.hotelname" :placeholder="$t('hotel.hotelname')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-select v-model="filters.hotelType" :placeholder="$t('hotel.hotelType.hotelType')">
          <el-option :label="$t('hotel.hotelType.hotelChis')" value="01"></el-option>
          <el-option :label="$t('hotel.hotelType.hotelJpa')" value="02"></el-option>
          <el-option :label="$t('hotel.hotelType.hotelAmra')" value="03"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.hotelLevel" :placeholder="$t('hotel.hotelLevel.hotelLevel')">
          <el-option :label="$t('hotel.hotelLevel.hotelLevel3')" value="03"></el-option>
          <el-option :label="$t('hotel.hotelLevel.hotelLevel4')" value="04"></el-option>
          <el-option :label="$t('hotel.hotelLevel.hotelLevel5')" value="05"></el-option>
        </el-select>
      </el-form-item>

			<el-form-item>
				<kt-button :label="$t('action.search')" perms="sys:bizHotl:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.add')" perms="sys:bizHotl:add" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table permsEdit="sys:bizHotl:edit" permsDelete="sys:bizHotl:delete"
		:data="pageResult" :columns="columns"
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</kt-table>

	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
			<!--<el-form-item label="酒店编号" prop="hotelCode"   v-if="dataForm.isPrimaryKey">-->
				<!--<el-input v-model="dataForm.hotelCode" auto-complete="off"></el-input>-->
			<!--</el-form-item>-->
      <el-form-item label="酒店编号" prop="hotelCode"  v-if="dataForm.isPrimaryKey">
      <el-input v-model="dataForm.hotelCode" auto-complete="off"></el-input>
      </el-form-item>
			<el-form-item label="国家编码" prop="countryCode" >
				<el-input v-model="dataForm.countryCode" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="都道府县" prop="provinceCode" >
				<el-input v-model="dataForm.provinceCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="区市町村" prop="cityCode" >
				<el-input v-model="dataForm.cityCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="酒店类型" prop="hotelType"  >
				<el-input v-model="dataForm.hotelType" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="酒店星级" prop="hotelLevel">
				<el-input v-model="dataForm.hotelLevel" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="酒店中文名称" prop="hotelCname">
				<el-input v-model="dataForm.hotelCname" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="酒店英文名称" prop="hotelEname">
				<el-input v-model="dataForm.hotelEname" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="创建人员" prop="creatCy" v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.creatCy" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="创建时间" prop="creatTime"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.creatTime" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="更新人员" prop="lastUpdateBy"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.lastUpdateBy" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="更新时间" prop="lastUpdateTime"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.lastUpdateTime" auto-complete="off"></el-input>
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
import KtTable from "@/views/Core/HotleTable"
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
				{prop:"hotelCode", label:"酒店编号", minWidth:100},
				{prop:"countryCode", label:"国家编码", minWidth:100},
				{prop:"provinceCode", label:"都道府县", minWidth:100},
				{prop:"cityCode", label:"区市町村", minWidth:100},
				{prop:"hotelType", label:"酒店类型", minWidth:100},
				{prop:"hotelLevel", label:"酒店星级", minWidth:100},
				{prop:"hotelCname", label:"酒店中文名称", minWidth:100},
				{prop:"hotelEname", label:"酒店英文名称", minWidth:100},
				{prop:"creatCy", label:"创建人员", minWidth:100},
				{prop:"creatTime", label:"创建时间", minWidth:100},
				{prop:"lastUpdateBy", label:"更新人员", minWidth:100},
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
				hotelCode: null,
				countryCode: null,
				provinceCode: null,
				cityCode: null,
				hotelType: null,
				hotelLevel: null,
				hotelCname: null,
				hotelEname: null,
				creatCy: null,
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
			this.$api.bizHotl.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
			this.$api.bizHotl.batchDelete(data.params).then(data!=null?data.callback:'')
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				hotelCode: null,
				countryCode: null,
				provinceCode: null,
				cityCode: null,
				hotelType: null,
				hotelLevel: null,
				hotelCname: null,
				hotelEname: null,
				creatCy: null,
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
						this.$api.bizHotl.save(params).then((res) => {
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
