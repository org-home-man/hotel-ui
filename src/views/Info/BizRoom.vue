<template>
  <div class="container" style="width:99%;margin-top:-25px;">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:30px;padding-left:20px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.hotelCode" :placeholder="$t('hotel.hotelCode')"></el-input>
			</el-form-item>
      <el-form-item>
        <el-input v-model="filters.hotelName" :placeholder="$t('hotel.hotelname')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.roomType" :placeholder="$t('hotel.roomtype.roomtype')">
          <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item>-->
        <!--<el-select v-model="filters.roomStyle" :placeholder="$t('hotel.roomstyle.roomstyle')">-->
          <!--<el-option v-for="rs in paraConfig.roomstyle" :key="rs.paraCode" :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>-->

        <!--</el-select>-->
      <!--</el-form-item>-->
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
	<el-dialog :title="operation?$t('action.add'):$t('action.edit')" width="50%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size" :inline="true" label-position="left">
			<!--<el-form-item label="客房编号" prop="roomCode"  v-if="dataForm.isPrimaryKey">-->
				<!--<el-input v-model="dataForm.roomCode" auto-complete="off"></el-input>-->
			<!--</el-form-item>-->
      <el-row>
        <el-col :span="12">
          <el-form-item  :label="$t('hotel.hotelname')" prop="hotelCode"  auto-complete="off" >
            <el-select v-model="dataForm.hotelCode" :disabled="disableHotelName">
              <el-option v-for=" hotelName in hotelNames" :key="hotelName.hotelCode" :label="language.lge=='zh_cn'?hotelName.hotelCname:hotelName.hotelEname" :value="hotelName.hotelCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('hotel.roomtype.roomtype')" prop="roomType" auto-complete="off" >
          <el-select v-model="dataForm.roomType" >
            <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('hotel.roomstyle.roomstyle')" prop="roomStyle" auto-complete="off" >
            <el-select v-model="dataForm.roomStyle" >
              <el-option v-for="rs in paraConfig.roomstyle" :key="rs.paraCode" :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('hotel.bedtype.bedtype')" prop="bedType" auto-complete="off">
            <el-select v-model="dataForm.bedType" >
              <el-option v-for="bt in paraConfig.bedtype" :key="bt.paraCode" :label="$t('hotel.'+ bt.paraCode)" :value="bt.paraValue1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('hotel.breaktype.breaktype')" prop="breakType" auto-complete="off">
            <el-select v-model="dataForm.breakType" >
              <el-option v-for="bk in paraConfig.breaktype" :key="bk.paraCode" :label="$t('hotel.'+ bk.paraCode)" :value="bk.paraValue1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('hotel.roomarea')+'(m2)'" prop="roomArea" auto-complete="off">
            <el-input v-model="dataForm.roomArea" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" >
          <el-form-item :label="$t('hotel.introc')" prop="introC"  auto-complete="off">
            <el-input v-model="dataForm.introC" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('hotel.introe')" prop="introE"  auto-complete="off">
            <el-input v-model="dataForm.introE" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('hotel.roomstock')" prop="roomStock"  auto-complete="off">
            <el-input v-model="dataForm.roomStock" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('hotel.recommended.recommended')" prop="recommended" auto-complete="off" >
            <el-select v-model="dataForm.recommended" >
              <el-option v-for="rm in paraConfig.recommended" :key="rm.paraCode" :label="$t('hotel.'+ rm.paraCode)" :value="rm.paraValue1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <br>
      <h3 style="text-align: left">常用信息:</h3>
      <el-row>
        <el-col :span="12" align="left">
            <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswify')" v-model="dataForm.iswify" border></el-checkbox>
            </el-form-item>
            <el-form-item>
               <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isfront')" v-model="dataForm.isfront" border></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbarrifr')" v-model="dataForm.isbarrifr" border></el-checkbox>
            </el-form-item>
        </el-col>
        <el-col :span="12" align="left">

          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbalcony')" v-model="dataForm.isbalcony" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iskitchen')" v-model="dataForm.iskitchen" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswindow')" v-model="dataForm.iswindow" border></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isheat')" v-model="dataForm.isheat" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isicebox')" v-model="dataForm.isicebox" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isiron')" v-model="dataForm.isiron" border></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isnosmk')" v-model="dataForm.isnosmk" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islandscape')" v-model="dataForm.islandscape" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishighrise')" v-model="dataForm.ishighrise" border></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ispark')" v-model="dataForm.ispark" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isgym')" v-model="dataForm.isgym" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isswmp')" v-model="dataForm.isswmp" border></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbeach')" v-model="dataForm.isbeach" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishotsp')" v-model="dataForm.ishotsp" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ischildct')" v-model="dataForm.ischildct" border></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isroomserv')" v-model="dataForm.isroomserv" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isknead')" v-model="dataForm.isknead" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islounge')" v-model="dataForm.islounge" border></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.issuper')" v-model="dataForm.issuper" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbus')" v-model="dataForm.isbus" border></el-checkbox>
          </el-form-item>

        </el-col>
      </el-row>

      <el-row>
        <el-col align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.istrafic')" v-model="dataForm.istrafic" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isrestau')" v-model="dataForm.isrestau" border></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item :label="$t('hotel.photo')" prop="photo" auto-complete="off">
            <el-upload
              ref="upload"
              :action="baseUrl+dataurl"
              list-type="picture-card"
              with-credentials="true"
              :headers="headersInfo"
              :on-error="handlerror"
              :on-success="handlesuccess"
              :file-list="dataForm.fileList"
              :auto-upload="false">
              <i class="el-icon-plus"></i>
            </el-upload>

          </el-form-item>
        </el-col>
      </el-row>

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
  import Cookies from "js-cookie";
  import RoomTable from "@/views/Core/RoomTable"
  import KtButton from "@/views/Core/KtButton"
  import { baseUrl } from '@/utils/global';
  import { format } from "@/utils/datetime"

export default {
	components:{
    RoomTable,
    KtButton,
	},
	data() {
		return {
		  baseUrl:baseUrl,
      disableHotelName:false,
      dataurl:'/bizRoom/uploadFile',
			size: 'small',
			filters: {
        hotelCode: '',
        hotelName:'',
        roomType:'',
        bedType:'',
        breakType:'',
        roomStock:''
			},
			columns: [

			],
			pageRequest: { pageNum: 1, pageSize: 8 },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
        hotelCode: [
					{ required: true, message: this.$t('action.pHotelName'), trigger: 'blur' }
				],
        roomType:[
          {required:true, message:this.$t('action.pRoomType'),trigger:'blur'}
        ],
        roomStyle:[
          {required:true, message:this.$t('action.pRoomStyle'),trigger:'blur'}
        ],
        bedType:[
          {required:true, message:this.$t('action.pBedType'),trigger:'blur'}
        ],
        breakType:[
          {required:true, message:this.$t('action.pBreakType'),trigger:'blur'}
        ],
        roomStock:[
          {required:true, message:this.$t('action.pRoomStock'),trigger:'blur'}
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
        iswify:null,
        isfront:null,
        isbarrifr:null,
        isbalcony:null,
        iskitchen:null,
        iswindow:null,
        isheat:null,
        isicebox:null,
        isiron:null,
        isnosmk:null,
        islandscape:null,
        ishighrise:null,
        ispark:null,
        isgym:null,
        isswmp:null,
        isbeach:null,
        ishotsp:null,
        ischildct:null,
        isroomserv:null,
        isknead:null,
        islounge:null,
        issuper:null,
        isbus:null,
        istrafic:null,
        isrestau:null,
        creatBy: null,
        creatTime: null,
        lastUpdateBy: null,
        lastUpdateTime: null,
        fileList:[]
			},
      hotelNames:[],
      paraConfig:[],
      sysPara:{},
      bizHotl:[],
      language:{},
      headersInfo:{}

		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {
			  hotelCode: {name:'hotelCode', value:this.filters.hotelCode},
        hotelName:{name:'hotelName',value:this.filters.hotelName},
        roomType:{name:'roomType',value:this.filters.roomType},
        bedType:{name:'bedType',value:this.filters.bedType},
        breakType:{name:'breakType',value:this.filters.breakType},
        roomStock:{name:'roomStock',value:this.filters.roomStock},
      }
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
        iswify:null,
        isfront:null,
        isbarrifr:null,
        isbalcony:null,
        iskitchen:null,
        iswindow:null,
        isheat:null,
        isicebox:null,
        isiron:null,
        isnosmk:null,
        islandscape:null,
        ishighrise:null,
        ispark:null,
        isgym:null,
        isswmp:null,
        isbeach:null,
        ishotsp:null,
        ischildct:null,
        isroomserv:null,
        isknead:null,
        islounge:null,
        issuper:null,
        isbus:null,
        istrafic:null,
        isrestau:null,
        creatBy: null,
        creatTime: null,
        lastUpdateBy: null,
        lastUpdateTime: null
			}
			this.dataForm.creatBy = sessionStorage.getItem("user")
		},
		// 显示编辑界面
		handleEdit: function (params) {

		  console.log("param",params);
		  this.disableHotelName = true
			this.editDialogVisible = true
			this.operation = false
      this.dataForm.lastUpdateBy = sessionStorage.getItem("user")
			this.dataForm = Object.assign({}, params.row)
		},

    //上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    //失败回调
    handlerror(err, file, fileList){
      console.log("上传失败时："+err);
    },
    //上传成功回调
    handlesuccess(res, file, fileList){
      console.log("成功回调:"+res);
    },
    //绑定token
    handleFileMethod() {
      let token = Cookies.get('token');
      this.headersInfo = {
        token: token
      }
    },
		// 编辑
		submitForm: function () {

		  // this.submitUpload();
      //
		  // return;
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {}).then(() => {
						this.editLoading = true
						let params = Object.assign({}, this.dataForm)
						this.$api.bizRoom.save(params).then((res) => {
							if(res.code == 200) {
								this.$message({ message: this.$t('action.success'), type: 'success' })
							} else {
								this.$message({message: this.$t('action.fail') , type: 'error'})
							}
							this.editLoading = false
							this.$refs['dataForm'].resetFields()
							this.editDialogVisible = false
              this.disableHotelName = false
							this.findPage(null)
						})
					})
				} else {
          this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
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
    this.handleFileMethod()
	}
}
</script>

<style scoped>

</style>
