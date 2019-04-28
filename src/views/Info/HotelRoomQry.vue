<template>
  <div class="container" style="width:99%;margin-top:-25px;">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:30px;padding-left:20px;">
		<el-form :inline="true" :model="filters" :size="size">
      <el-form-item>
        <el-select v-model="filters.provinceCode" :placeholder="$t('hotel.provinceCode.provinceCode')">
          <el-option v-for="rt in paraConfig.provinceCode" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.cityCode" :placeholder="$t('hotel.cityCode.cityCode')">
          <el-option v-for="rt in paraConfig.cityCode" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.inDateStart" :placeholder="$t('hotel.inDateStart')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.outDateEnd" :placeholder="$t('hotel.outDateEnd')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.roomNum" :placeholder="$t('hotel.roomNum')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.adultNum" :placeholder="$t('hotel.adultNum')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.childrenNum" :placeholder="$t('hotel.childrenNum')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="filters.inventory" :placeholder="$t('hotel.inventory')"></el-input>
      </el-form-item>

          <el-row>
            <el-col :span="4">
              <el-form-item>
                <el-select v-model="filters.hotelLevel" :placeholder="$t('hotel.hotelLevel.hotelLevel')">
                  <el-option v-for="rt in paraConfig.hotelLevel" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-select v-model="filters.hotelType" :placeholder="$t('hotel.hotelType.hotelType')">
                  <el-option v-for="rt in paraConfig.hotelType" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item >
                <el-select v-model="filters.roomType"  :placeholder="$t('hotel.roomtype.roomtype')">
                  <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="filters.roomStyle" :placeholder="$t('hotel.roomstyle.roomstyle')">
                  <el-option v-for="rs in paraConfig.roomstyle" :key="rs.paraCode" :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="filters.bedType" :placeholder="$t('hotel.bedtype.bedtype')">
                  <el-option v-for="bt in paraConfig.bedtype" :key="bt.paraCode" :label="$t('hotel.'+ bt.paraCode)" :value="bt.paraValue1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="filters.breakType" :placeholder="$t('hotel.breaktype.breaktype')">
                  <el-option v-for="bk in paraConfig.breaktype" :key="bk.paraCode" :label="$t('hotel.'+ bk.paraCode)" :value="bk.paraValue1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item>
                <el-input v-model="filters.roomArea"  :placeholder="$t('hotel.roomarea')+'(m2)'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="3">
              <el-form-item>
                <el-form-item>
                  <el-input v-model="filters.roomPrice"  :placeholder="$t('hotel.roomPrice')"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item>
                <el-input v-model="filters.hotelname"  :placeholder="$t('hotel.hotelname')"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!--<br>-->
          <h3 style="text-align: left">常用信息:</h3>
          <el-row>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswify')" v-model="filters.iswify" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isfront')" v-model="filters.isfront" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbarrifr')" v-model="filters.isbarrifr" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="left">

              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbalcony')" v-model="filters.isbalcony" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iskitchen')" v-model="filters.iskitchen" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswindow')" v-model="filters.iswindow" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isheat')" v-model="filters.isheat" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isicebox')" v-model="filters.isicebox" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isiron')" v-model="filters.isiron" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isnosmk')" v-model="filters.isnosmk" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islandscape')" v-model="filters.islandscape" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishighrise')" v-model="filters.ishighrise" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ispark')" v-model="filters.ispark" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isgym')" v-model="filters.isgym" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isswmp')" v-model="filters.isswmp" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbeach')" v-model="filters.isbeach" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishotsp')" v-model="filters.ishotsp" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ischildct')" v-model="filters.ischildct" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isroomserv')" v-model="filters.isroomserv" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isknead')" v-model="filters.isknead" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islounge')" v-model="filters.islounge" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.issuper')" v-model="filters.issuper" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbus')" v-model="filters.isbus" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.istrafic')" v-model="filters.istrafic" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isrestau')" v-model="filters.isrestau" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

			<el-form-item>
				<kt-button :label="$t('action.search')" perms="sys:bizRoom:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<!--<el-form-item>-->
				<!--<kt-button :label="$t('action.detileSearch')" perms="sys:bizRoom:add" type="primary" @click="handleDetileSearch" />-->
			<!--</el-form-item>-->
		</el-form>
	</div>
	<!--表格内容栏-->
	<room-table permsEdit="sys:bizRoom:edit" permsDelete="sys:bizRoom:delete"
		:data="pageResult"
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete" >
    <!--@findPage="page" @handleEdit="handleEdit" @handleDelete="handleDelete" >-->
    </room-table>

  </div>
</template>

<script>
  import Cookies from "js-cookie";
  import RoomTable from "@/views/Core/hotelRoomTable"
  import KtInput from "@/views/Core/KtInput"
  import KtCheckbox from "@/views/Core/KtCheckbox"
  import KtButton from "@/views/Core/KtButton"
  import { baseUrl } from '@/utils/global';
  import { format } from "@/utils/datetime"

export default {
	components:{
    RoomTable,
    KtButton,
    KtCheckbox,
    KtInput
	},
	data() {
		return {
		  baseUrl:baseUrl,
      priceBoolean:true,
      stockBoolean:true,
      disableHotelName:false,
      dataurl:'/bizRoom/uploadFile',
			size: 'small',
			filters: {
        hotelName:'',
        inventory:'',
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
        roomPrice: null,
        hotelname: null,
        inDateStart:null,
        outDateEnd:null,
        roomNum:null,
        adultNum:null,
        childrenNum:null
			},
			columns: [

			],
			// pageRequest: { pageNum: 1, pageSize: 10 },
      pageRequest: { page: 1, rows:10  },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
      editPriceDialogVisible: false, // 编辑牌价界面是否显示
      editStockDialogVisible: false, // 编辑库存界面是否显示
			editLoading: false,
      editPriceLoading:false,
      editStockLoading:false,
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
        roomPrice: null,
         hotelname: null,
        inDateStart:null,
        outDateEnd:null,
        roomNum:null,
        adultNum:null,
        childrenNum:null
			},
      hotelNames:[],
      paraConfig:[],
      sysPara:{},
      bizHotl:[],
      language:{},
      headersInfo:{},
      fileList:[],
		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {
        hotelName:{name:'hotelName',value:this.filters.hotelName},
        inventory:{name:'inventory',value:this.filters.inventory},
        roomCode:{name:'roomCode',value:this.filters.roomCode},
        hotelCode:{name:'hotelCode',value:this.filters.hotelCode},
        roomType:{name:'roomType',value:this.filters.roomType},
        roomStyle:{name:'roomStyle',value:this.filters.roomStyle},
        bedType:{name:'bedType',value:this.filters.bedType},
        breakType:{name:'breakType',value:this.filters.breakType},
        roomArea:{name:'roomArea',value:this.filters.roomArea},
        introC:{name:'introC',value:this.filters.introC},
        introE:{name:'introE',value:this.filters.introE},
        photo:{name:'photo',value:this.filters.photo},
        roomStock:{name:'roomStock',value:this.filters.roomStock},
        recommended:{name:'recommended',value:this.filters.recommended},
        iswify:{name:'iswify',value:this.filters.iswify},
        isfront:{name:'isfront',value:this.filters.isfront},
        isbarrifr:{name:'isbarrifr',value:this.filters.isbarrifr},
        isbalcony:{name:'isbalcony',value:this.filters.isbalcony},
        iskitchen:{name:'iskitchen',value:this.filters.iskitchen},
        iswindow:{name:'iswindow',value:this.filters.iswindow},
        isheat:{name:'isheat',value:this.filters.isheat},
        isicebox:{name:'isicebox',value:this.filters.isicebox},
        isiron:{name:'isiron',value:this.filters.isiron},
        isnosmk:{name:'isnosmk',value:this.filters.isnosmk},
        islandscape:{name:'islandscape',value:this.filters.islandscape},
        ishighrise:{name:'ishighrise',value:this.filters.ishighrise},
        ispark:{name:'ispark',value:this.filters.ispark},
        isgym:{name:'isgym',value:this.filters.isgym},
        isswmp:{name:'isswmp',value:this.filters.isswmp},
        isbeach:{name:'isbeach',value:this.filters.isbeach},
        ishotsp:{name:'ishotsp',value:this.filters.ishotsp},
        ischildct:{name:'ischildct',value:this.filters.ischildct},
        isroomserv:{name:'isroomserv',value:this.filters.isroomserv},
        isknead:{name:'isknead',value:this.filters.isknead},
        islounge:{name:'islounge',value:this.filters.islounge},
        issuper:{name:'issuper',value:this.filters.issuper},
        isbus:{name:'isbus',value:this.filters.isbus},
        istrafic:{name:'istrafic',value:this.filters.istrafic},
        isrestau:{name:'isrestau',value:this.filters.isrestau},
        roomPrice:{name:'roomPrice',value:this.filters.roomPrice},
        hotelname:{name:'hotelname',value:this.filters.hotelname},
        inDateStart:{name:'inDateStart',value:this.filters.inDateStart},
        outDateEnd:{name:'outDateEnd',value:this.filters.outDateEnd},
        roomNum:{name:'roomNum',value:this.filters.roomNum},
        adultNum:{name:'adultNum',value:this.filters.adultNum},
        childrenNum:{name:'childrenNum',value:this.filters.childrenNum},
      }
			this.$api.hotelRoom.findPage(this.pageRequest).then((res) => {
			  this.pageRequest={}
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
			this.$api.bizRoom.batchDelete(data.params).then(data!=null?data.callback:'')
		},
		// 显示新增界面
    handleDetileSearch: function () {
      this.disableHotelName = false
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


    //绑定token
    handleFileMethod() {
      let token = Cookies.get('token');
      this.headersInfo = {
        token: token
      }
    },
		// 编辑
		submitForm: function () {

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

    findHotelRoomDataSelect : function () {
      this.sysPara={}
      let params = Object.assign({}, this.sysPara);
      this.$api.sysParaConfig.findKeyValueHotelRoom(params).then((res) => {
        this.paraConfig = res.data
        console.log(this.paraConfig);
      })
    },

    localLanguageLoad:function () {
      this.language={lge:this.$i18n.locale}
    },
    changeValue:function (val) {//和checkbox双向绑定
      this.dataForm.recommended=val;
    },
    changInputValue:function (val) {//和input组件双向绑定
		  this.priceForm.tprice=val;

    }
	},
	mounted() {
 //   this.findDataSelect()
    this.findHotlnmSelect()
    this.localLanguageLoad()
    this.handleFileMethod()
    this.findHotelRoomDataSelect()
	}
}
</script>

<style scoped>

</style>
