<template>
    <div class="main-content" style="width: 100%;height: 100%">
        <el-form :model="dataForm" label-width="180px" :rules="dataFormRules" ref="dataForm" :size="size"
                 :inline="true" v-loading="loading">
            <el-row>

                <el-col :span="24" v-show="roomPhoto && roomPhoto.length>0">
                   <el-carousel style="margin-top: 20px" :interval="4000" type="card" height="200px">
                       <el-carousel-item v-for="ph in roomPhoto" :key="ph">
                           <el-image style="width:400px;height:200px" :src="photoUrl+ ph">
                               <div slot="error" class="el-image__error">
                                   <h1 class="el-icon-picture-outline"></h1>
                               </div>
                           </el-image>
                       </el-carousel-item>
                   </el-carousel>
               </el-col>

            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-row style="width: 100%;text-align: left;display: flex;margin: 0 auto;">
                        <el-col :span="6" style="padding-top:10px;border-right: 1px solid #e6e6e6;border-bottom: 1px solid #e6e6e6;text-align: center;">
                            <label style="font-size: 16px;color: #212121;">{{$t('order.baseInfo')}}</label>
                        </el-col>
                        <el-col :span="18" style="border-bottom: 1px solid #e6e6e6;">
                            <ul class="hotel-base">
                                <li>
                                    <label>{{$t('order.localArea')}}</label>
                                    <input hidden v-model="dataForm.provinceCode"/>
                                    <span>{{resolveRoomTypeName(provinceCode,dataForm.provinceCode)}}</span>
                                    <span>{{resolveRoomTypeName(cityCode,dataForm.cityCode)}}</span>
                                </li>
                                <li style="padding-top: 4px">
                                    <label>{{$t('order.departureTime')}}</label>
                                    <el-form-item prop="commonDate" style="margin-bottom: 0;vertical-align: middle;width: 100px">
                                        <el-date-picker
                                            v-model="commonDate"
                                            type="daterange"
                                            :clearable="false"
                                            value-format="yyyyMMdd"
                                            :start-placeholder="$t('hotel.inDateStart')"
                                            :end-placeholder="$t('hotel.outDateEnd')"
                                            :picker-options="pickerOptions"
                                            @blur="dateChangeCanculate">
                                        </el-date-picker>
                                    </el-form-item>
                                </li>
                                <li style="padding-top: 4px">
                                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('order.night')}}</label>
                                    <el-form-item label-width="60px" prop="roomNight" style="margin-bottom: 6px;margin-right: 0;">
                                        <input v-model="filters.roomNight" hidden></input>
                                        <el-tag>{{filters.roomNight}}</el-tag>
                                    </el-form-item>
                                </li>
                                <li style="padding-top: 4px">
                                    <label>{{$t('order.priceDetail')}}</label>
                                    <el-popover
                                        placement="right"
                                        width="300px"
                                        trigger="click">
                                        <el-table :data="gridData" height="300px">
                                            <el-table-column width="150" property="priceDate" :label="$t('order.date')"></el-table-column>
                                            <el-table-column width="100" property="sroomPrice" :label="$t('hotel.sRoomPrice')"></el-table-column>
                                        </el-table>
                                        <el-button slot="reference">{{$t('order.detail')}}</el-button>
                                    </el-popover>
                                </li>
                                <li style="display: flex">
                                    <label>{{$t('order.peopleNum')}}</label>
                                    <div style="width: 200px;">
                                        <el-form-item label-width="70px" :label="$t('hotel.adultNum')" prop="adultNum" style="margin-bottom: 6px;margin-right: 0;">
                                            <el-input-number  v-model="dataForm.adultNum" controls-position="right" style="width: 120px"  :min="0" ></el-input-number>
                                        </el-form-item>

                                        <el-form-item label-width="70px" :label="$t('hotel.childrenNum')" prop="childNum"  style="margin-bottom: 6px;margin-right: 0;">
                                            <el-input-number v-model="dataForm.childNum" controls-position="right" style="width: 120px"  :min="0" ></el-input-number>
                                        </el-form-item>
                                    </div>
                                </li>
                            </ul>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%;text-align: left;display: flex;margin: 0 auto;">
                        <el-col :span="6" style="padding-top:10px;border-right: 1px solid #e6e6e6;border-bottom: 1px solid #e6e6e6;text-align: center;">
                            <label style="font-size: 16px;color: #212121;">{{$t('order.hotelInfo')}}</label>
                        </el-col>
                        <el-col :span="18" style="border-bottom: 1px solid #e6e6e6;">
                            <ul class="hotel-base">
                                <li>
                                    <label>{{$t('hotel.hotelAddr')}}</label>
                                    <input hidden v-model="dataForm.hotelAddr"/>
                                    <span>{{dataForm.hotelAddr}}</span>
                                </li>
                                <li>
                                    <label>{{$t('hotel.hotelPhone')}}</label>
                                    <input hidden v-model="dataForm.hotelPhone"/>
                                    <span>{{dataForm.hotelPhone}}</span>
                                </li>
                                <li>
                                    <label>{{$t('order.hotelWWW')}}</label>
                                    <input hidden v-model="dataForm.hotelWeb"/>
                                    <span>{{dataForm.hotelWeb}}</span>
                                </li>
                                <li>
                                    <label>{{$t('order.roomPrice')}}</label>
                                    <input hidden v-model="dataForm.sRoomPrice"/>
                                    <span>{{dataForm.sRoomPrice}}</span>
                                </li>
                                <li>
                                    <label>{{$t('hotel.inventory')}}</label>
                                    <input hidden v-model="dataForm.inventory"/>
                                    <span>{{dataForm.inventory}}</span>
                                </li>
                                <li>
                                    <label>{{able?$t('hotel.introc'):$t('hotel.introe')}}</label>
                                    <input hidden v-model="dataForm.introC"/>
                                    <input hidden v-model="dataForm.introE"/>
                                    <span>{{able?dataForm.introC:dataForm.introE}}</span>
                                </li>

                                <li>
                                    <label>{{$t('hotel.scheduledays')}}</label>
                                    <input hidden v-model="dataForm.scheduledays"/>
                                    <span>{{dataForm.scheduledays}}</span>
                                </li>
                                <li>
                                    <label>{{$t('hotel.favorableprice')}}</label>
                                    <input hidden v-model="dataForm.favorableprice"/>
                                    <span>{{dataForm.favorableprice}}</span>
                                </li>
                                <li>
                                    <label>{{$t('hotel.evenlive')}}</label>
                                    <input hidden v-model="dataForm.evenlive"/>
                                    <span>{{dataForm.evenlive}}</span>
                                </li>
                                <li>
                                    <label>{{$t('hotel.present')}}</label>
                                    <input hidden v-model="dataForm.present"/>
                                    <span>{{dataForm.present}}</span>
                                </li>

                            </ul>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%;text-align: left;display: flex;margin: 0 auto;">
                        <el-col :span="6" style="padding-top:10px;border-right: 1px solid #e6e6e6;border-bottom: 1px solid #e6e6e6;text-align: center;">
                            <label style="font-size: 16px;color: #212121;">{{$t('order.roomInfo')}}</label>
                        </el-col>
                        <el-col :span="18" style="border-bottom: 1px solid #e6e6e6;">
                            <ul class="hotel-base">
                                <li>
                                    <label>{{$t('hotel.roomtype.roomtype')}}</label>
                                    <input hidden v-model="dataForm.roomType"/>
                                    <span>{{resolveRoomTypeName(roomType,dataForm.roomType)}}</span>
                                </li>
                                <li>
                                    <label>{{$t('hotel.roomstyle.roomstyle')}}</label>
                                    <input hidden v-model="dataForm.roomStyle"/>
                                    <span>{{resolveRoomTypeName(roomStyle,dataForm.roomStyle)}}</span>
                                </li>
                                <li>
                                    <label>{{$t('hotel.bedtype.bedtype')}}</label>
                                    <input hidden v-model="dataForm.bedType"/>
                                    <span>{{resolveRoomTypeName(bedType,dataForm.bedType)}}</span>
                                </li>
                                <li>
                                    <label>{{$t('hotel.breaktype.breaktype')}}</label>
                                    <input hidden v-model="dataForm.breakType"/>
                                    <span>{{resolveRoomTypeName(breakType,dataForm.breakType)}}</span>
                                </li>
                            </ul>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%;text-align: left;display: flex;margin: 0 auto;">
                        <el-col :span="6" style="padding-top:10px;border-right: 1px solid #e6e6e6;border-bottom: 1px solid #e6e6e6;text-align: center;">
                            <label style="font-size: 16px;color: #212121;">{{$t('hotel.information')}}</label>
                        </el-col>
                        <el-col :span="18" style="border-bottom: 1px solid #e6e6e6;padding: 0 10px;">
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.iswify==1">{{$t('hotel.iswify')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isfront==1">{{$t('hotel.isfront')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isbarrifr==1">{{$t('hotel.isbarrifr')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isbalcony==1">{{$t('hotel.isbalcony')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.iskitchen==1">{{$t('hotel.iskitchen')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.iswindow==1">{{$t('hotel.iswindow')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isheat==1">{{$t('hotel.isheat')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isicebox==1">{{$t('hotel.isicebox')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isiron==1">{{$t('hotel.isiron')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isnosmk==1">{{$t('hotel.isnosmk')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.islandscape==1">{{$t('hotel.islandscape')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.ishighrise==1">{{$t('hotel.ishighrise')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.ispark==1">{{$t('hotel.ispark')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isgym==1">{{$t('hotel.isgym')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isswmp==1">{{$t('hotel.isswmp')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isbeach==1">{{$t('hotel.isbeach')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.ishotsp==1">{{$t('hotel.ishotsp')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.ischildct==1">{{$t('hotel.ischildct')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isroomserv==1">{{$t('hotel.isroomserv')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isknead==1">{{$t('hotel.isknead')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.islounge==1">{{$t('hotel.islounge')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.issuper==1">{{$t('hotel.issuper')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isbus==1">{{$t('hotel.isbus')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.istrafic==1">{{$t('hotel.istrafic')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isrestau==1">{{$t('hotel.isrestau')}}</el-tag>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                    <el-row style="width: 100%;text-align: left;display: flex;margin: 0 auto;">
                        <el-col :span="6" style="padding-top:10px;border-right: 1px solid #e6e6e6;text-align: center;">
                        </el-col>
                        <el-col :span="18" align="center">
                            <el-form-item label-width="180px" :label="$t('hotel.representName')" prop="pName" >
                                <el-input v-model="dataForm.pName"></el-input>
                            </el-form-item>
                            <el-form-item label-width="180px" :label="$t('hotel.passportNo')" prop="passport" >
                                <el-input v-model="dataForm.passport"></el-input>
                            </el-form-item>
                            <el-form-item label-width="180px" :label="$t('hotel.contactEmail')" prop="emailAddress">
                                <el-input v-model="dataForm.emailAddress"></el-input>
                            </el-form-item>
                            <el-form-item label-width="180px" :label="$t('hotel.contactPhone')" prop="phone">
                                <el-input v-model="dataForm.phone"></el-input>
                            </el-form-item>
                            <el-form-item label-width="180px" :label="$t('hotel.lastCrtTime')" prop="lastCrtTime" >
                                <el-date-picker
                                    v-model="dataForm.lastCrtTime"
                                    align="right"
                                    type="date"
                                    value-format="yyyyMMdd"
                                    :placeholder="$t('hotel.lastCrtTime')"
                                    :picker-options="pickerOptions2" style="width: 200px"
                                    readonly>
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label-width="180px" :label="$t('hotel.birthday')" prop="birth" >
                                <el-date-picker
                                    v-model="dataForm.birth"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    :placeholder="$t('hotel.birthday')"  style="width: 200px" >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label-width="180px" :label="$t('hotel.children612')" prop="children612">
                                <el-input-number v-model="dataForm.children612" controls-position="right" style="width: 200px"  :min="0" ></el-input-number>
                            </el-form-item>
                            <el-form-item label-width="180px" :label="$t('hotel.children46')" prop="children46" >
                                <el-input-number v-model="dataForm.children46" controls-position="right" style="width: 200px"  :min="0" ></el-input-number>
                            </el-form-item>
                            <el-form-item label-width="180px" :label="$t('hotel.children04')" prop="children4" >
                                <el-input-number v-model="dataForm.children4" controls-position="right" style="width: 200px"  :min="0" ></el-input-number>
                            </el-form-item>
                            <el-form-item :label="$t('hotel.roomNum')" label-width="180px" prop="roomNum" >
                                <el-input-number v-model="dataForm.roomNum" controls-position="right" style="width: 200px" :max="dataForm.inventory" ></el-input-number>
                            </el-form-item>
                            <el-form-item label-width="180px" :label="$t('hotel.reMark')" prop="reMark">
                                <el-input type="textarea" style="width: 200px;letter-spacing: 1px" :rows="4" resize="none" v-model="dataForm.remark"></el-input>
                            </el-form-item>
                            <el-form-item  :label="$t('hotel.totalPrice')" label-width="180px" prop="totalPrice">
                                <span  style="width: 200px;display: inline-block;text-align: left;color: #bd0b38;font-size: 18px;font-weight: bold;">{{dataForm.totalSAmount}}</span>
                            </el-form-item>

                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="form-footer" align="center">
            <el-button icon="el-icon-s-order" type="primary" @click.native="submitForm" :loading="editLoading">
                {{$t('action.makeAppointment')}}
            </el-button>
            <el-button  @click.native="returnHome">{{$t('action.returnHome')}}
            </el-button>
        </div>
    </div>
</template>

<script>
    import {baseUrl} from '@/utils/global'
    import {parseStrToDate,formatDate} from "@/utils/datetime"

    export default {
        name: "BizHotelOrder",
        data() {
            return {
                loading:false,
                editLoading:false,
                able:false,
                size: 'small',
                gridData:[],
                commonDate:[],
                photoUrl: baseUrl + '/document/preview/',
                pageRequest: {page: 1, rows: 10},
                roomPhoto:[],
                hotelType: [], //酒店类型
                hotelStar:[], //酒店星级
                roomStyle:[], //房间样式
                roomType:[], //房间类型
                breakType: [], //餐饮条件
                bedType: [], //床铺类型
                provinceCode: [], //地区编码
                cityCode: [], //城市编码
                advanceDays:null,//用于获取预定房间的日期与当前日期的天数
                language: {},
                filters: {
                    hotelType:null,
                    roomCode: null,
                    photo: null,
                    inDateStart: null,
                    outDateEnd: null
                },
                dataForm: {
                    roomCode: null,
                    inventory: 0,
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
                    roomPrice: null,
                    inDateStart: null,
                    outDateEnd: null,
                    roomNum: 0,
                    adultNum: 0,
                    childNum: 0,
                    lastCrtTime: null,
                    pName: null,
                    passport: null,
                    birth: null,
                    contactPhone: null,
                    emailAddress: null,
                    children612: 0,
                    children416: 0,
                    children4: 0,
                    totalSAmount: null,
                    totalTAmount: null,
                    remark: null,
                    sRoomPrice: null,
                    endPrice:null,
                    roomNight:null
                },
                dataFormRules: {
                    adultNum: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    childNum: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    pName: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    passport: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    lastCrtTime: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    emailAddress: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ]

                },
                pickerOptions:{
                    disabledDate : (time) => {
                        var nowDate = new Date();
                        var day = 7;
                        if(nowDate.getHours()>18 || (nowDate.getHours()==18 && nowDate.getMinutes() >= 30)){
                            day = 8;
                        }
                        return time.getTime() < Date.now() - 8.64e7 +  3600 * 1000 * 24 * day;
                    }
                },
                pickerOptions2:{
                    disabledDate : (time) =>{
                        if(this.commonDate && this.commonDate.length>0){
                            let beginDateVal = this.commonDate[0];
                            let startDate = new Date(beginDateVal.substr(0,4),beginDateVal.substr(4,2)-1,beginDateVal.substr(6,2))
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > startDate.getTime()
                        }

                        return time.getTime() > Date.now()
                    }
                }
            }
        },
        methods:{
            // 获取分页数据
            findPage: function () {
                this.loading = true;
                if(this.commonDate.length>0){
                    this.filters.inDateStart = this.commonDate[0];
                    this.filters.outDateEnd = this.commonDate[1];
                }
                if (!this.$route.query.recommondCode) {
                    this.$message({ message: this.$t('action.noHaveRoomInfo'), type: 'warn' })
                    this.tabsCloseCurrentHandle();
                }
                this.filters.roomCode = this.$route.query.recommondCode
                this.$api.bizRoom.findPage({...this.pageRequest,...this.filters}).then((res) => {
                    console.log("resPage",res)
                    this.dataForm = Object.assign(this.dataForm,res.rows[0]);

                    //查询图片
                    if(res.rows[0].photo){
                        this.$api.user.showFile({'relationId':res.rows[0].photo}).then((res) =>{
                            this.roomPhoto = res;
                        })
                    }
                    this.loading = false;
                },() =>{
                    this.loading = false;
                })
            },
            submitForm: function () {
                if (this.commonDate.length <1) {
                    this.$message({message: this.$t('action.pInOutDate') , type: 'error'})
                    return;
                }
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {
                            type: 'warning',
                            cancelButtonText: this.$t('action.cancel'),
                            confirmButtonText: this.$t('action.confirm')
                        }).then(() => {
                            this.editLoading = true
                            let params = Object.assign({}, this.dataForm,
                                {'inDateStart':this.filters.inDateStart,
                                'outDateEnd':this.filters.outDateEnd})
                            this.$api.hotelRoom.save(params).then((res) => {
                                if(res.code == 200) {
                                    this.$message({ message: this.$t('action.success'), type: 'success' })
                                } else {
                                    this.$message({message: this.$t('action.fail') , type: 'error'})
                                }
                                this.editLoading = false
                                this.$refs['dataForm'].resetFields()
                                this.tabsCloseCurrentHandle();
                            })
                        }).finally(() =>{
                            this.editLoading = false
                        })
                    } else {
                        this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
                    }
                })
            },
            localLanguageLoad: function () {
                this.language = {lge: this.$i18n.locale}
                this.able = this.language.lge=='zh_cn'?true:false
            },
            // tabs, 删除tab
            removeTabHandle(tabName) {
                this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
                if (this.mainTabs.length >= 1) {
                    // 当前选中tab被删除
                    if (tabName === this.mainTabsActiveName) {
                        this.$router.push({name: this.mainTabs[this.mainTabs.length - 1].name}, () => {
                            this.mainTabsActiveName = this.$route.name
                        })
                    }
                } else {
                    this.$router.push("/info/hotelRoomQry")
                }
            },
            // tabs, 关闭当前
            tabsCloseCurrentHandle() {
                this.removeTabHandle(this.mainTabsActiveName)
            },
            dateChangeCanculate: function() {
                if(this.commonDate.length>0){
                    this.filters.inDateStart = this.commonDate[0];
                    this.filters.outDateEnd = this.commonDate[1];
                } else {
                    this.$message({ message: this.$t('action.pInOutDate'), type: 'warn' })
                    return
                }
                this.filters.roomCode = this.$route.query.recommondCode
                this.$api.hotelRoom.findPage({...this.pageRequest,...this.filters}).then((res) => {
                    console.log("hotelRoom",res)
                    this.dataForm = Object.assign(this.dataForm,res.rows[0]);
                    if(res.rows[0] == null|| res.rows[0] == "") {
                        this.$message({ message: this.$t('action.invIsOutException'), type: 'warn' })
                    } else {
                        this.dataForm.sRoomPrice = res.rows[0].sPrice
                    }
                    //查询明细牌价
                    this.$api.bizPuchs.findByDate({...this.pageRequest,...this.filters}).then((res) => {
                        console.log("bizPuchs",res)
                        this.gridData = res;
                    },() =>{
                    })
                },() =>{

                })


            },
            returnHome:function() {
                this.mainTabs = this.mainTabs.filter(item => item.name !== this.mainTabsActiveName)
                if (this.mainTabs.length >= 1) {
                    // 当前选中tab被删除
                    if (this.mainTabsActiveName === this.mainTabsActiveName) {
                        this.$router.push({name: this.mainTabs[this.mainTabs.length - 1].name}, () => {
                            this.mainTabsActiveName = this.$route.name
                        })
                    }
                }
                this.$router.push("/info/hotelRoomQry")

            }
        },
        created(){
            this.getTypeValues('ROOM_STYLE,ROOM_TYPE,HOTEL_STAR,HOTEL_TYPE,BREAK_TYPE,BED_TYPE,PREFECTURE,DISTRICT').then( res =>{
                // console.log(res)
                this.roomStyle = res.ROOM_STYLE;
                this.roomType = res.ROOM_TYPE;
                this.hotelStar = res.HOTEL_STAR;
                this.hotelType = res.HOTEL_TYPE;
                this.breakType = res.BREAK_TYPE;
                this.bedType = res.BED_TYPE;
                this.provinceCode = res.PREFECTURE;
                this.cityCode = res.DISTRICT;
            })
        },
        mounted() {
            this.localLanguageLoad();
            this.findPage();
        },
        computed: {
            mainTabs: {
                get() {
                    return this.$store.state.tab.mainTabs
                },
                set(val) {
                    this.$store.commit('updateMainTabs', val)
                }
            },
            mainTabsActiveName: {
                get() {
                    return this.$store.state.tab.mainTabsActiveName
                },
                set(val) {
                    this.$store.commit('updateMainTabsActiveName', val)
                }
            }
        },
        watch:{
            'dataForm.roomNum'(){
                var totlPrice = 0;
                if(this.gridData.length<0) {
                    return
                } else {
                    for (var i = 0 ; i<this.gridData.length ; i++) {
                        totlPrice += this.gridData[i].sroomPrice
                    }
                }

                var num = 0;
                if(this.advanceDays >= this.dataForm.scheduledays){
                    num = this.dataForm.favorableprice;
                }
                this.dataForm.totalSAmount = this.dataForm.roomNum==0?0:this.dataForm.roomNum * totlPrice-num;
            },
            'dataForm.sPrice'(){
                var totlPrice = 0;
                if(this.gridData.length<0) {
                    return
                } else {
                    for (var i = 0 ; i<this.gridData.length ; i++) {
                        totlPrice += this.gridData[i].sroomPrice
                    }
                }
                var num = 0;
                if(this.advanceDays >= this.dataForm.scheduledays){
                    num = this.dataForm.favorableprice;
                }
                this.dataForm.totalSAmount = this.dataForm.roomNum==0?0:this.dataForm.roomNum * totlPrice-num;

            },
            'dataForm.adultNum'(){
                var totlPrice = 0;
                if(this.gridData.length<0) {
                    return
                } else {
                    for (var i = 0 ; i<this.gridData.length ; i++) {
                        totlPrice += this.gridData[i].tprice
                    }
                }
                this.dataForm.totalTAmount = this.dataForm.adultNum==0?0:(this.dataForm.adultNum + this.dataForm.childNum) * totlPrice;
            },
            'dataForm.childNum'(){
                var totlPrice = 0;
                if(this.gridData.length<0) {
                    return
                } else {
                    for (var i = 0 ; i<this.gridData.length ; i++) {
                        totlPrice += this.gridData[i].tprice
                    }
                }
                this.dataForm.totalTAmount = this.dataForm.adultNum==0?0:(this.dataForm.adultNum + this.dataForm.childNum) * totlPrice;
            },
            commonDate(n,o){
                var startDate = n[0].substr(0,4) + "/" + n[0].substr(4,2) +"/" +n[0].substr(6,2) ;
                var endDate = n[1].substr(0,4) + "/" + n[1].substr(4,2) +"/" +n[1].substr(6,2) ;
                var oDate1, oDate2,nowDate, iDays ,aDays;
                oDate1 = Date.parse(startDate);
                oDate2 = Date.parse(endDate);
                nowDate = new Date();
                iDays = parseInt(Math.abs(oDate1 -oDate2)/1000/60/60/24); //把相差的毫秒数转换为天数
                aDays = parseInt(Math.abs(nowDate -oDate1)/1000/60/60/24);
                this.filters.roomNight = iDays;
                this.advanceDays = aDays;

                var lastCrt = new Date(oDate1 - 3600 * 1000 * 24 * 7);
                this.dataForm.lastCrtTime = formatDate(lastCrt,'yyyyMMdd');

                var totlPrice = 0;
                var tPrice = 0
                if(this.gridData.length<0) {
                    return
                } else {
                    for (var i = 0 ; i<this.gridData.length ; i++) {
                        totlPrice += this.gridData[i].sroomPrice;
                        tPrice += this.gridData[i].tprice
                    }
                }
                var num = 0;
                if(this.advanceDays >= this.dataForm.scheduledays){
                    num = this.dataForm.favorableprice;
                }
                this.dataForm.totalSAmount = this.dataForm.roomNum==0?0:this.dataForm.roomNum * totlPrice-num;

                this.dataForm.totalTAmount = this.dataForm.roomNum==0?0:(this.dataForm.adultNum + this.dataForm.childNum) * tPrice;
            }
        },
        destroyed() {
            this.dataForm = {};
        }

    }

</script>

<style scoped>
    .main-content {
        margin-top: 10px;
        padding-top: 10px;
    }
    .form-footer {
        margin-top: 20px;
        margin-bottom: 50px;
    }
    .hotel-base{
        margin: 0;
        padding: 0;
        color: #212121;
    }
    .hotel-base>li{
        padding: 10px 20px;
        list-style: none;
        font-size: 14px;
    }
    .hotel-base>li>label {
        width: 120px;
        display: inline-block;
    }
</style>
