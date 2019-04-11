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
        <el-input v-model="filters.hotelName" :placeholder="$t('hotel.hotelname')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-select v-model="filters.hotelType" :placeholder="$t('hotel.hotelType.hotelType')">
          <el-option v-for="rt in paraConfig.hotelType" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="filters.hotelLevel" :placeholder="$t('hotel.hotelLevel.hotelLevel')">
          <el-option v-for="rt in paraConfig.hotelLevel" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
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
	<hotle-table permsEdit="sys:bizHotl:edit" permsDelete="sys:bizHotl:delete"
		:data="pageResult"
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</hotle-table>

	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
			<!--<el-form-item label="酒店编号" prop="hotelCode"   v-if="dataForm.isPrimaryKey">-->
				<!--<el-input v-model="dataForm.hotelCode" auto-complete="off"></el-input>-->
			<!--</el-form-item>-->
      <el-form-item label="hotel.hotelCode" prop="hotelCode"  v-if="dataForm.isPrimaryKey">
      <el-input v-model="dataForm.hotelCode" auto-complete="off"></el-input>
      </el-form-item>

			<el-form-item :label="$t('hotel.countryCode.countryCode')" prop="countryCode" auto-complete="off" >
        <el-select v-model="dataForm.countryCode">
          <el-option :label="$t('hotel.countryCode.countryCodeValue')" value="JPN"></el-option>
          <!--<el-option v-for=" hotelName in hotelNames" :key="hotelName.hotelCode" :label="language.lge=='zh_cn'?hotelName.hotelCname:hotelName.hotelEname" :value="hotelName.hotelCode"></el-option>-->
        </el-select>
      </el-form-item>

			<el-form-item :label="$t('hotel.provinceCode')" prop="provinceCode" >
				<el-input v-model="dataForm.provinceCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="$t('hotel.cityCode')" prop="cityCode" >
				<el-input v-model="dataForm.cityCode" auto-complete="off"></el-input>
			</el-form-item>

      <el-form-item :label="$t('hotel.hotelType.hotelType')" prop="hotelType" auto-complete="off" >
        <el-select v-model="dataForm.hotelType" >
          <el-option v-for="rt in paraConfig.hotelType" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('hotel.hotelLevel.hotelLevel')" prop="hotelLevel" auto-complete="off" >
        <el-select v-model="dataForm.hotelLevel" >
          <el-option v-for="rt in paraConfig.hotelLevel" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
        </el-select>
      </el-form-item>

			<el-form-item :label="$t('hotel.hotelCname')" prop="hotelCname">
				<el-input v-model="dataForm.hotelCname" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="$t('hotel.hotelEname')" prop="hotelEname">
				<el-input v-model="dataForm.hotelEname" auto-complete="off"></el-input>
			</el-form-item>
      <el-form-item :label="$t('hotel.hotelAddr')" prop="hotelAddr" >
        <el-input v-model="dataForm.hotelAddr" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('hotel.hotelPhone')" prop="hotelPhone" >
        <el-input v-model="dataForm.hotelPhone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('hotel.hotelFax')" prop="hotelFax">
        <el-input v-model="dataForm.hotelFax" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('hotel.hotelWeb')" prop="hotelWeb">
        <el-input v-model="dataForm.hotelWeb" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('hotel.lastUpdateBy')" prop="lastUpdateBy"  v-if="dataForm.isPrimaryKey">
        <el-input v-model="dataForm.lastUpdateBy" auto-complete="off"></el-input>
      </el-form-item>
			<el-form-item :label="$t('hotel.creatCy')" prop="creatCy" v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.creatCy" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="$t('hotel.creatTime')" prop="creatTime"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.creatTime" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="$t('hotel.lastUpdateBy')" prop="lastUpdateBy"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.lastUpdateBy" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="$t('hotel.lastUpdateTime')" prop="lastUpdateTime"  v-if="dataForm.isPrimaryKey">
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
import HotleTable from "@/views/Core/HotleTable"
import KtButton from "@/views/Core/KtButton"
import { format } from "@/utils/datetime"
export default {
	components:{
      HotleTable,
			KtButton
	},
	data() {
		return {
			size: 'small',
			filters: {
        hotelCode: '',
        hotelName:'',
        hotelType:'',
        hotelLevel:''
			},
			columns: [
				// {prop:"hotelCode", label:"酒店编号", minWidth:100},
				// {prop:"countryCode", label:"国家编码", minWidth:100},
				// {prop:"provinceCode", label:"都道府县", minWidth:100},
				// {prop:"cityCode", label:"区市町村", minWidth:100},
				// {prop:"hotelType", label:"酒店类型", minWidth:100},
				// {prop:"hotelLevel", label:"酒店星级", minWidth:100},
				// {prop:"hotelCname", label:"酒店中文名称", minWidth:100},
				// {prop:"hotelEname", label:"酒店英文名称", minWidth:100},
        // {prop:"hotelAddr", label:"酒店地址", minWidth:100},
        // {prop:"hotelPhone", label:"酒店电话", minWidth:100},
        // {prop:"hotelFax", label:"酒店传真", minWidth:100},
        // {prop:"hotelWeb", label:"酒店网址", minWidth:100},
        // {prop:"creatCy", label:"创建人员", minWidth:100},
				// {prop:"creatTime", label:"创建时间", minWidth:100},
				// {prop:"lastUpdateBy", label:"更新人员", minWidth:100},
				// {prop:"lastUpdateTime", label:"更新时间", minWidth:100},
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
        hotelAddr: null,
        hotelPhone: null,
        hotelFax: null,
        hotelWeb: null,
				creatCy: null,
				creatTime: null,
				lastUpdateBy: null,
				lastUpdateTime: null,
			},
      hotelNames:[],
      sysPara:{},
      bizHotl:[],
      paraConfig:[],
      language:{}
		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
      console.log("licy");
      console.log(data);
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {hotel_code: {name:'hotel_code', value:this.filters.hotelCode}}
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
        hotelAddr: null,
        hotelPhone: null,
        hotelFax: null,
        hotelWeb: null,
				creatCy: null,
				creatTime: null,
				lastUpdateBy: null,
				lastUpdateTime: null,
			}
      /* 获取操作员 */
      this.dataForm.creatCy = sessionStorage.getItem('user');
      /* 获取操作时间 */
      var date = new Date();
      this.dataForm.creatTime = date;
      //console.log(date);
      /* */
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
    findDataSelect : function () {
      this.sysPara={}
      let params = Object.assign({}, this.sysPara);
      this.$api.sysParaConfig.findKeyValue(params).then((res) => {
        this.paraConfig = res.data
        console.log(this.paraConfig);
      })
    },
		// 时间格式化
      	dateFormat: function (row, column, cellValue, index){
          	return format(row[column.property])
      	}
	},
	mounted() {
    this.findDataSelect()
  }
}
</script>

<style scoped>

</style>
