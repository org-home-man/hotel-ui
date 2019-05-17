<template>
    <div class="page-container">
	<!--工具栏-->
      <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
          <el-form :inline="true" :model="filters" :size="size">
              <el-form-item>
                  <el-input v-model="filters.orderCode" placeholder="订单号"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-input v-model="filters.roomStatus" placeholder="订单状态"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-date-picker
                      v-model="filters.createTimes"
                      type="daterange"
                      :range-separator="$t('hotel.dateSep')"
                      value-format="yyyyMMdd"
                      :start-placeholder="$t('hotel.creatTime')"
                      :end-placeholder="$t('hotel.creatTime')">
                  </el-date-picker>
              </el-form-item>
              <el-form-item>
                  <el-date-picker
                      v-model="filters.confirmTimes"
                      type="daterange"
                      :range-separator="$t('hotel.dateSep')"
                      value-format="yyyyMMdd"
                      :start-placeholder="$t('hotel.lastCrtTime')"
                      :end-placeholder="$t('hotel.lastCrtTime')">
                  </el-date-picker>
              </el-form-item>
              <el-form-item>
                  <el-input v-model="filters.hotelName" placeholder="酒店名称"></el-input>
              </el-form-item>
              <el-form-item>
                  <kt-button :label="$t('action.search')" perms="sys:bizPuchs:view" type="primary" @click="findPage(null)"/>
              </el-form-item>
          </el-form>
      </div>
	<!--表格内容栏-->
	<kt-table permsEdit="sys:bizPuchs:edit" permsDelete="sys:bizPuchs:delete"
		:data="pageResult" :columns="columns"
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</kt-table>
	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="订单号" prop="orderCode"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.orderCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="客房编号" prop="roomCode"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.roomCode" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="入住日期" prop="inDate"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.inDate" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="退房日期" prop="outDate"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.outDate" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="代表者姓名" prop="pName"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.pName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="护照号" prop="passport"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.passport" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="出生年月" prop="birth"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.birth" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" prop="phone"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.phone" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="联系人邮件" prop="emailAddress"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.emailAddress" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="成人人数" prop="aNum"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.aNum" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="儿童数" prop="bNum"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.bNum" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="幼儿数" prop="cNum"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.cNum" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="房间数" prop="roomNum"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.roomNum" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="币种" prop="currency"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.currency" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="销售总价" prop="totalSAmount"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.totalSAmount" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.remark" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="订单状态" prop="status"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.status" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="创建人员" prop="creatBy"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.creatBy" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="创建时间" prop="creatTime"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.creatTime" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="更新时间" prop="lastUpdateBy"  v-if="dataForm.isPrimaryKey">
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
                orderCode: '',
                roomStatus: '',
                createTimes: '',
                confirmTimes:'',
                hotelName:''
            },
			columns: [
				{prop:"orderCode", label:"订单号", minWidth:60},
                {prop:"hotelName", label:"酒店名称", minWidth:60},
				{prop:"roomCode", label:"客房编号", minWidth:60},
				{prop:"inDate", label:"入住日期", minWidth:60},
				{prop:"outDate", label:"退房日期", minWidth:60},
				{prop:"pName", label:"代表者姓名", minWidth:60},
                {prop:"confirmTime", label:"确认时间", minWidth:60},
                {prop:"status", label:"订单状态", minWidth:60},
				/*{prop:"passport", label:"护照号", minWidth:100},
				{prop:"birth", label:"出生年月", minWidth:100},
				{prop:"phone", label:"联系电话", minWidth:100},
				{prop:"emailAddress", label:"联系人邮件", minWidth:100},
				{prop:"aNum", label:"成人人数", minWidth:100},
				{prop:"bNum", label:"儿童数", minWidth:100},
				{prop:"cNum", label:"幼儿数", minWidth:100},
				{prop:"roomNum", label:"房间数", minWidth:100},
				{prop:"currency", label:"币种", minWidth:100},
				{prop:"totalSAmount", label:"销售总价", minWidth:100},
				{prop:"remark", label:"备注", minWidth:100},
				{prop:"creatBy", label:"创建人员", minWidth:100},
				{prop:"creatTime", label:"创建时间", minWidth:100},
				{prop:"lastUpdateBy", label:"更新时间", minWidth:100},
				{prop:"lastUpdateTime", label:"更新时间", minWidth:100},*/
			],
			pageRequest: { page: 1, rows: 8 },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {},
			// 新增编辑界面数据
			dataForm: {
				orderCode: null,
				roomCode: null,
				inDate: null,
				outDate: null,
				pName: null,
				passport: null,
				birth: null,
				phone: null,
				emailAddress: null,
				aNum: null,
				bNum: null,
				cNum: null,
				roomNum: null,
				currency: null,
				totalSAmount: null,
				remark: null,
				status: null,
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
            if (data !== null) {
                this.pageRequest = data.pageRequest
            }
            if(this.filters.confirmTimes.length > 0){
                this.filters.confirmTimeStart = this.filters.confirmTimes[0];
                this.filters.confirmTimeEnd = this.filters.confirmTimes[1];
            }
            if(this.filters.createTimes.length > 0){
                console.log(this.filters.createTimes)
                this.filters.createTimeStart = this.filters.createTimes[0];
                this.filters.createTimeEnd = this.filters.createTimes[1];
            }
            this.pageRequest = {...this.pageRequest, ...this.filters};
            this.$api.bizPuchs.findPage(this.pageRequest).then((res) => {
                this.pageResult = res
            }).then(data != null ? data.callback : '')
        },
        // 批量删除
        handleDelete: function (data) {
            this.$api.bizPuchs.batchDelete(data.params).then(data != null ? data.callback : '')
        },
        // 显示新增界面
        handleAdd: function () {
            this.editDialogVisible = true
            this.operation = true
            this.dataForm = {
                orderCode: null,
                roomCode: null,
                inDate: null,
                outDate: null,
                pName: null,
                passport: null,
                birth: null,
                phone: null,
                emailAddress: null,
                aNum: null,
                bNum: null,
                cNum: null,
                roomNum: null,
                currency: null,
                totalSAmount: null,
                remark: null,
                status: null,
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
                        this.$api.bizPuchs.save(params).then((res) => {
                            if (res.code == 200) {
                                this.$message({message: '操作成功', type: 'success'})
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
        dateFormat: function (row, column, cellValue, index) {
            return format(row[column.property])
        }
    },
    mounted() {
    }
}
</script>

<style scoped>

</style>
