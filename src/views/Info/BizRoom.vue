<template>
  <div class="container" style="width:99%;margin-top:-25px;">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:30px;padding-left:20px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.roomCode" :placeholder="$t('hotel.roomcode')"></el-input>
			</el-form-item>
      <el-form-item>
        <el-input v-model="filters.hotelName" :placeholder="$t('hotel.hotelname')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.roomType" :placeholder="$t('hotel.roomtype.roomtype')">
          <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.roomStyle" :placeholder="$t('hotel.roomstyle.roomstyle')">
          <el-option v-for="rs in paraConfig.roomstyle" :key="rs.paraCode" :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.bedType" :placeholder="$t('hotel.bedtype.bedtype')">
          <el-option v-for="bt in paraConfig.bedtype" :key="bt.paraCode" :label="$t('hotel.'+ bt.paraCode)" :value="bt.paraValue1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.breakType" :placeholder="$t('hotel.breaktype.breaktype')">
          <el-option v-for="bk in paraConfig.breaktype" :key="bk.paraCode" :label="$t('hotel.'+ bk.paraCode)" :value="bk.paraValue1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.roomStock" :placeholder="$t('hotel.roomstock')"></el-input>
      </el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.search')" perms="sys:bizRoom:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.add')" perms="sys:bizRoom:add" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
	<room-table permsEdit="sys:bizRoom:edit" permsDelete="sys:bizRoom:delete"
		:data="pageResult"
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</room-table>

	<!--新增编辑界面-->
	<el-dialog :title="operation?$t('action.add'):$t('action.edit')" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size" :inline="true" label-position="left">
			<!--<el-form-item label="客房编号" prop="roomCode"  v-if="dataForm.isPrimaryKey">-->
				<!--<el-input v-model="dataForm.roomCode" auto-complete="off"></el-input>-->
			<!--</el-form-item>-->

      <el-form-item :label="$t('hotel.hotelname')" prop="hotelCode"  auto-complete="off" >
        <el-select v-model="dataForm.hotelCode" >
          <el-option v-for=" hotelName in hotelNames" :key="hotelName.hotelCode" :label="language.lge=='zh_cn'?hotelName.hotelCname:hotelName.hotelEname" :value="hotelName.hotelCode"></el-option>
        </el-select>
      </el-form-item>

			<el-form-item :label="$t('hotel.roomtype.roomtype')" prop="roomType" auto-complete="off" >
        <el-select v-model="dataForm.roomType" >
          <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
        </el-select>
			</el-form-item>

			<el-form-item :label="$t('hotel.roomstyle.roomstyle')" prop="roomStyle" auto-complete="off" >
        <el-select v-model="dataForm.roomStyle" >
          <el-option v-for="rs in paraConfig.roomstyle" :key="rs.paraCode" :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>
        </el-select>
			</el-form-item>

			<el-form-item :label="$t('hotel.bedtype.bedtype')" prop="bedType" auto-complete="off">
        <el-select v-model="dataForm.bedType" >
          <el-option v-for="bt in paraConfig.bedtype" :key="bt.paraCode" :label="$t('hotel.'+ bt.paraCode)" :value="bt.paraValue1"></el-option>
        </el-select>
			</el-form-item>
			<el-form-item :label="$t('hotel.breaktype.breaktype')" prop="breakType" auto-complete="off">
        <el-select v-model="dataForm.breakType" >
          <el-option v-for="bk in paraConfig.breaktype" :key="bk.paraCode" :label="$t('hotel.'+ bk.paraCode)" :value="bk.paraValue1"></el-option>
        </el-select>
			</el-form-item>
			<el-form-item :label="$t('hotel.roomarea')" prop="roomArea" auto-complete="off">
				<el-input v-model="dataForm.roomArea" ></el-input>
			</el-form-item>
			<el-form-item :label="$t('hotel.introc')" prop="introC" auto-complete="off">
				<el-input v-model="dataForm.introC" ></el-input>
			</el-form-item>
			<el-form-item :label="$t('hotel.introe')" prop="introE"  auto-complete="off">
				<el-input v-model="dataForm.introE"></el-input>
			</el-form-item>

			<el-form-item :label="$t('hotel.roomstock')" prop="roomStock"  auto-complete="off">
				<el-input v-model="dataForm.roomStock" ></el-input>
			</el-form-item>
			<el-form-item :label="$t('hotel.recommended')" prop="recommended" auto-complete="off" >
        <el-select v-model="dataForm.recommended" >
          <el-option v-for="rm in paraConfig.breaktype" :key="rm.paraCode" :label="$t('hotel.'+ rm.paraCode)" :value="rm.paraValue1"></el-option>
        </el-select>
			</el-form-item>

      <!--<el-form-item>-->
        <!--<el-checkbox v-model="" label="备选项1" border></el-checkbox>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
        <!--<el-checkbox v-model="" label="备选项1" border></el-checkbox>-->
      <!--</el-form-item>-->

      <el-form-item :label="$t('hotel.photo')" prop="photo" auto-complete="off">
        <el-input v-model="dataForm.photo" ></el-input>
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
import RoomTable from "@/views/Core/RoomTable"
import KtButton from "@/views/Core/KtButton"
import { format } from "@/utils/datetime"
export default {
	components:{
      RoomTable,
			KtButton
	},
	data() {
		return {

			size: 'small',
			filters: {
        roomCode: '',
        hotelName:'',
        roomType:'',
        roomStyle:'',
        bedType:''
			},
			columns: [

			],
			pageRequest: { pageNum: 1, pageSize: 8 },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
        roomCode: [
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
			},
      hotelNames:[],
      paraConfig:[],
      sysPara:{},
      bizHotl:[],
      language:{}

		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {roomCode: {name:'roomCode', value:this.filters.roomCode}}
			this.$api.bizRoom.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
		  alert(data);
		  console.log("data",data);
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
		  alert(params);
		  console.log("param",params);
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
  },
    findHotlnmSelect : function() {
		  this.bizHotl={};
		  let params = Object.assign({}, this.bizHotl);
      this.$api.bizHotl.findAllData(params).then((res) => {
        this.hotelNames = res.data
      })
    },
    findDataSelect : function () {
		  this.sysPara={paraSubCode1:'bizroom'}
      let params = Object.assign({}, this.sysPara);
      this.$api.sysParaConfig.findKeyValue(params).then((res) => {
        this.paraConfig = res.data
        console.log(this.paraConfig);
      })
    },
    localLanguageLoad:function () {
      this.language={lge:this.$i18n.locale}
    }
	},
	mounted() {
    this.findDataSelect()
    this.findHotlnmSelect()
    this.localLanguageLoad()
	}
}
</script>

<style scoped>

</style>
