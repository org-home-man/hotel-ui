<template>
  <div class="page-container" style="margin-bottom: 50px">
	<!--工具栏-->
	<div class="toolbar query_room_container" style="padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="pageRequest" :size="size">
            <el-form-item>
                <el-input v-model="pageRequest.name" :placeholder="$t('table.name')"></el-input>
            </el-form-item>
            <el-form-item>
                <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:role:view" type="primary" @click="findPage(null)"/>
            </el-form-item>
            <el-form-item>
                <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:role:add" type="primary" @click="handleAdd" />
            </el-form-item>
		</el-form>
	</div>
      <div class="table_room_container">
      <!--表格树内容栏-->
      <el-table :data="pageResult.rows" style="width: 100%;" :row-class-name="tableRowClassName" highlight-current-row :empty-text="$t('action.noData')"
                v-loading="loading" :element-loading-text="$t('action.loading')" @current-change="handleRoleSelectChange">
          <el-table-column
              prop="id" header-align="center" align="center" width="80" :label="$t('table.id')">
          </el-table-column>
          <table-tree-column
              prop="name" header-align="center" treeKey="id" width="150" :label="$t('table.name')">
          </table-tree-column>
          <el-table-column
              prop="roleIdKey" header-align="center" align="center" width="120" :label="$t('table.roleId.roleId')">
              <template slot-scope="scope">
                  <el-tag>{{resolveRoomTypeName(options,scope.row.isManager)}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
              prop="remark" header-align="center" align="center" :label="$t('table.remark')">
          </el-table-column>
          <el-table-column
              prop="createName" header-align="center" align="center" :label="$t('table.createBy')">
          </el-table-column>
          <el-table-column
              prop="createTime" header-align="center" align="center" :label="$t('table.createTime')">
          </el-table-column>
          <el-table-column
              fixed="right" header-align="center" align="center" width="185" :label="$t('action.operation')">
              <template slot-scope="scope">
                  <kt-button icon="fa fa-edit" :label="$t('action.edit')" perms="sys:dept:edit" @click="handleEdit(scope.row)"/>
                  <kt-button icon="fa fa-trash" :label="$t('action.delete')" perms="sys:dept:delete" type="danger" @click="handleDelete(scope.row)"/>
              </template>
          </el-table-column>
          <el-table-column
              prop="roleId" header-align="center" align="center" v-if="show">
          </el-table-column>
      </el-table>
      </div>
	<!-- </el-col> -->
	<!--新增编辑界面-->
	<el-dialog :title="operation?$t('action.add'):$t('action.edit')" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
            <el-form-item :label="$t('table.id')" prop="id" v-if="false">
                <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.name')" prop="name">
                <el-input v-model="dataForm.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.remark') " prop="remark">
                <el-input v-model="dataForm.remark" auto-complete="off" type="textarea"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.roleId.roleId')" prop="isManager" align="left">
                <el-select v-model="dataForm.isManager" auto-complete="off">
                    <el-option v-for="bk in this.options" :key="bk.code" :label="bk.name" :value="bk.code"></el-option>
                </el-select>
            </el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="cancelForm">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
	<!--角色菜单，表格树内容栏-->
	<div class="menu-container" :v-if="true">
		<div class="menu-header">
			<span><B>{{$t('action.roleMenu')}}</B></span>
		</div>
		<el-tree :data="menuData" size="mini" show-checkbox node-key="id" :props="defaultProps"
			style="width: 100%;pading-top:20px;" ref="menuTree" :render-content="renderContent"
			v-loading="menuLoading" element-loading-text="$t('action.loading')" :check-strictly="true"
			@check-change="handleMenuCheckChange">
		</el-tree>
		<div style="float:left;padding-left:24px;padding-top:12px;padding-bottom:4px;">
			<el-checkbox v-model="checkAll" @change="handleCheckAll" :disabled="this.selectRole.id == null"><b>{{$t('common.selectAll')}}</b></el-checkbox>
		</div>
		<div style="float:right;padding-right:15px;padding-top:4px;padding-bottom:4px;">
			<kt-button :label="$t('action.reset')" perms="sys:role:edit" type="primary" @click="resetSelection" 
				:disabled="this.selectRole.id == null"/>
			<kt-button :label="$t('action.submit')" perms="sys:role:edit" type="primary" @click="submitAuthForm" 
				:disabled="this.selectRole.id == null" :loading="authLoading"/>
		</div>
	</div>
  </div>
</template>

<script>
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import TableTreeColumn from '@/views/Core/TableTreeColumn'
import { format } from "@/utils/datetime"
export default {
	components:{
		KtTable,
		KtButton,
		TableTreeColumn
	},
	data() {
		return {
			size: 'small',
            loading:false,
            show:false,
			columns: [
                {prop:"id", label:"id", minWidth:50},
                {prop:"name", label:"name", minWidth:120},
                {prop:"roleId", label:"roleId.roleId", minWidth:120},
                {prop:"remark", label:"remark", minWidth:120},
                {prop:"createName", label:"createBy", minWidth:120},
                {prop:"createTime", label:"createTime", minWidth:120, formatter:this.dateFormat}
                // {prop:"lastUpdateBy", label:"更新人", minWidth:100},
				// {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
			],
            options:[],
            pageRequest: {
                name: '',
                page: 1,
                rows: 10
            },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			dialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				name: [
					{ required: true, message: this.$t('action.pRoleName'), trigger: 'blur' }
				],
                roleId:[
                    {required:true,message:this.$t('action.incompleteInfo'),trigger:'blur'}
                ]
			},
			// 新增编辑界面数据
			dataForm: {
				id: 0,
				name: '',
				remark: '',
                isManager:''
			},
			selectRole: {},
			menuData: [],
			menuSelections: [],
			menuLoading: false,
			authLoading: false,
			checkAll: false,
			currentRoleMenus: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			}
		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
            this.pageRequest = { page: 1, rows: 10 };
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.loading = true;
			this.$api.role.findPage(this.pageRequest).then((res) => {
				this.pageResult = res
                this.loading = false;
				this.findTreeData()
			}).then(data!=null?data.callback:'')
		},
        // 删除
        handleDelete (row) {
            this.$confirm(this.$t("action.do"), this.$t('action.tips'), {
                type: 'warning',
                cancelButtonText: this.$t('action.cancel'),
                confirmButtonText: this.$t('action.confirm')
            }).then(() => {
                let params = this.getDeleteIds([], row)
                this.$api.role.batchDelete(params,{headers: {'Content-Type': 'application/json;charset=UTF-8'}}).then( res => {
                    this.findPage(null)
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
		// 显示新增界面
		handleAdd: function () {
			this.dialogVisible = true
			this.operation = true
			this.dataForm = {
				id: 0,
				name: '',
				remark: ''
			}
		},
        cancelForm:function() {
            this.dialogVisible = false;
            this.editLoading = false;
        },
		// 显示编辑界面
		handleEdit: function (params) {
			this.dialogVisible = true
			this.operation = false
			this.dataForm = Object.assign({}, params)
		},
		// 编辑
		submitForm: function () {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {}).then(() => {
						this.editLoading = true
						let params = Object.assign({}, this.dataForm)
                        if(this.operation){
                            this.$api.role.save(params).then((res) => {
                                this.editLoading = false
                                if(res.code == 200) {
                                    this.$message({ message: this.$t('action.success'), type: 'success' })
                                    this.dialogVisible = false
                                    this.$refs['dataForm'].resetFields()
                                } else {
                                    this.$message({message: this.$t('action.fail') , type: 'error'})
                                }
                                this.findPage(null)
                            })
                        }else{
                            this.$api.role.update(params).then((res) => {
                                this.editLoading = false
                                if(res.code == 200) {
                                    this.$message({ message: this.$t('action.success'), type: 'success' })
                                    this.dialogVisible = false
                                    this.$refs['dataForm'].resetFields()
                                } else {
                                    this.$message({message: this.$t('action.fail') , type: 'error'})
                                }
                                this.findPage(null)
                            })
                        }

					})
				}
			})
		},
		// 获取数据
		findTreeData: function () {
			this.menuLoading = true
			this.$api.menuTree.findMenuTree().then((res) => {
				this.menuData = res
				this.menuLoading = false
			})
		},
		// 角色选择改变监听
		handleRoleSelectChange(val) {
			if(val == null ) {
				return
			}
			this.selectRole = val
			this.$api.role.findRoleMenus({roleId:val.id}).then((res) => {
				this.currentRoleMenus = res
				this.$refs.menuTree.setCheckedNodes(res)
			})
		},
		// 树节点选择监听
		handleMenuCheckChange(data, check, subCheck) {
			if(check) {
				// 节点选中时同步选中父节点
				let parentId = data.parentId
				this.$refs.menuTree.setChecked(parentId, true, false)
			} else {
				// 节点取消选中时同步取消选中子节点
				if(data.children != null) {
					data.children.forEach(element => {
						this.$refs.menuTree.setChecked(element.id, false, false)
					});
				}
			}
		},
		// 重置选择
		resetSelection() {
			this.checkAll = false
			this.$refs.menuTree.setCheckedNodes(this.currentRoleMenus)
		},
		// 全选操作
		handleCheckAll() {
			if(this.checkAll) {
				let allMenus = []
				this.checkAllMenu(this.menuData, allMenus)
				this.$refs.menuTree.setCheckedNodes(allMenus)
			} else {
				this.$refs.menuTree.setCheckedNodes([])
			}
		},
		// 递归全选
		checkAllMenu(menuData, allMenus) {
			menuData.forEach(menu => {
				allMenus.push(menu)
				if(menu.children) {
					this.checkAllMenu(menu.children, allMenus)
				}
			});
		},
        tableRowClassName({row, rowIndex}) {
            if (rowIndex % 2 !=0) {
                return 'success-row';
            }
            return '';
        },
		// 角色菜单授权提交
		submitAuthForm() {
			let roleId = this.selectRole.id
			if('admin' == this.selectRole.name) {
				this.$message({message: this.$t('action.pModifyMenu'), type: 'error'})
				return
			}
			this.authLoading = true
			let checkedNodes = this.$refs.menuTree.getCheckedNodes(false, true)
			let roleMenus = new Array();
			for(let i=0, len=checkedNodes.length; i<len; i++) {
				let roleMenu = { roleId:roleId, menuId:checkedNodes[i].id }
				roleMenus.push(roleMenu)
			}
			this.$api.role.saveRoleMenus(roleMenus,{headers:{'Content-Type': 'application/json;charset=UTF-8'}}).then((res) => {
				if(res.code == 200) {
					this.$message({ message:this.$t('action.success'), type: 'success' })
				} else {
					this.$message({message:this.$t('action.fail'), type: 'error'})
				}

			}).finally(() => {this.authLoading = false})
		},
		renderContent(h, { node, data, store }) {
			return (
			<div class="column-container">
				<span style="text-algin:center;margin-right:80px;">{data.name}</span>
				<span style="text-algin:center;margin-right:80px;">
					<el-tag type={data.type === 0?'':data.type === 1?'success':'info'} size="small">
						{data.type === 0?this.$t('action.content'):data.type === 1?this.$t('action.tree'):this.$t('action.button')}
					</el-tag>
				</span>
				<span style="text-algin:center;margin-right:80px;"> <i class={data.icon}></i></span>
				<span style="text-algin:center;margin-right:80px;">{data.parentName?data.parentName:this.$t('common.topTree')}</span>
				<span style="text-algin:center;margin-right:80px;">{data.url?data.url:'\t'}</span>
			</div>);
      	},
		// 时间格式化
      	dateFormat: function (row, column, cellValue, index){
          	return format(row[column.property])
      	}
		
	},
    created(){
	    this.getTypeValue('ROLE_TYPE').then( res =>{
	        this.options = res;
        })
    },
	mounted() {
	    this.findPage(null);
	}
}
</script>
<style scoped>
.menu-container {
	margin-top: 10px;
}
.menu-header {
    margin-top: 20px;
	padding-left: 8px;
	padding-bottom: 5px;
	text-align: left;
	font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	color: rgb(20, 89, 121);
	
}
.el-tree {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.table_room_container{
     box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
     margin-top: 20px
 }
.query_room_container{
    padding-top:10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>
