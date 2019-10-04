<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar query_room_container" style="padding-top:10px;padding-left:15px; background: #daf6fa;">
        <el-row>
            <el-col :span="24" align="left">
                <el-form :inline="true" :model="filters" :size="size">
                    <el-form-item>
                        <el-input v-model="filters.name" :placeholder="$t('user.name')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:log:view" type="primary" @click="findPage(null)"/>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

	</div>
	<!--表格内容栏-->
	<kt-table
    :data="pageResult" :columns="columns" :showOperation="showOperation" @findPage="findPage">
	</kt-table>
  </div>
</template>

<script>
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import { format } from "@/utils/datetime"
export default {
	components: {
		KtTable,
		KtButton
	},
	data() {
		return {
			size: 'small',
			filters: {
				name: ''
			},
			columns: [
				{prop:"id", label:"id", minWidth:60},
				{prop:"userName", label:"name", minWidth:100},
				// {prop:"operation", label:"操作", minWidth:120},
				{prop:"operation", label:"operation", minWidth:120},
				{prop:"method", label:"method", minWidth:180},
				{prop:"params", label:"params", minWidth:220},
				{prop:"ip", label:"IP", minWidth:120},
				// {prop:"time", label:"time", minWidth:80},
				{prop:"createName", label:"createBy", minWidth:100},
				{prop:"createTime", label:"createTime", minWidth:120}
				// {prop:"lastUpdateBy", label:"更新人", minWidth:100},
				// {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
			],
			pageRequest: { page: 1, rows: 10 },
      pageResult: {},
      showOperation:false
		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
            this.pageRequest = { page: 1, rows: 10 };
            console.log("pageRequest",this.pageRequest);
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.name = this.filters.name;
			this.$api.log.findPage(this.pageRequest).then((res) => {
				this.pageResult = res
			}).then(data!=null?data.callback:'')
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
    .query_room_container{
        padding-top:10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
</style>
