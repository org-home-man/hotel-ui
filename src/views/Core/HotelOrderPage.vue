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
                                        <el-form-item label-width="180px" :label="$t('hotel.adultNum')" prop="adultNum" style="margin-bottom: 6px;margin-right: 0;">
                                            <el-input-number  v-model="dataForm.adultNum" controls-position="right" style="width: 120px"  :min="0" ></el-input-number>
                                        </el-form-item>

                                        <el-form-item label-width="180px" :label="$t('hotel.childrenNum')" prop="childNum"  style="margin-bottom: 6px;margin-right: 0;">
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
                                    <span>{{'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}}</span>
                                    <label>{{$t('hotel.favorableprice')}}</label>
                                    <input hidden v-model="dataForm.favorableprice"/>
                                    <span>{{dataForm.favorableprice}}</span>
                                </li>
                                <li>

                                </li>
                                <li>
                                    <label>{{$t('hotel.evenlive')}}</label>
                                    <input hidden v-model="dataForm.evenlive"/>
                                    <span>{{dataForm.evenlive==0?"":dataForm.evenlive}}</span>

                                    <span>{{'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}}</span>

                                    <label>{{$t('hotel.present')}}</label>
                                    <input hidden v-model="dataForm.present"/>
                                    <span>{{dataForm.present}}</span>

                                </li>
                                <!--<li>-->
                                    <!--<label>{{$t('hotel.present')}}</label>-->
                                    <!--<input hidden v-model="dataForm.present"/>-->
                                    <!--<span>{{dataForm.present}}</span>-->
                                <!--</li>-->
                                <li>
                                    <label>{{$t('hotel.SpecialMatters')}}</label>
                                    <input hidden v-model="dataForm.specialMatters"/>
                                    <span>{{dataForm.specialMatters}}</span>
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
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isSeaviewRoom==1">{{$t('hotel.isSeaviewRoom')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isMountainViewRoom==1">{{$t('hotel.isMountainViewRoom')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isCityViewRoom==1">{{$t('hotel.isCityViewRoom')}}</el-tag>
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
                                <el-input-number v-model="dataForm.roomNum" controls-position="right" style="width: 200px" :max="dataForm.inventory" :min="0"></el-input-number>
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
            <el-button icon="el-icon-s-order" type="primary" @click.native="submitFormBefore" :loading="editLoading">
                {{$t('action.makeAppointment')}}
            </el-button>
            <el-button  @click.native="tabsCloseCurrentHandle">{{$t('action.returnHome')}}
            </el-button>
        </div>

        <el-dialog width="50%"  :title="$t('order.orderAgree')" :visible.sync="agreementDialog"  append-to-body>
            <div align="center">
                <h3>《协议内容如下》：</h3>
                <p>
                    1.酒店...
                </p>
                <el-checkbox v-model="agreeValue">同意该协议</el-checkbox>
            </div>

            <div slot="footer" class="form-footer" align="center">
                <el-button icon="el-icon-s-order" type="primary" @click.native="submitForm" :loading="editLoading" :disabled="agreeButton">
                    {{$t('action.makeAppointment')}}
                </el-button>
                <el-button  @click.native="closeAgreeDialog">{{$t('action.cancel')}}
                </el-button>
            </div>

        </el-dialog>


    </div>
</template>

<script>
    import {baseUrl} from '@/utils/global'
    import {parseStrToDate,formatDate} from "@/utils/datetime"

    export default {
        name: "HotelOrderPage",
        props:{
            roomCd:String,
            frameDate:Array
        },
        data() {
            return {
                loading:false,
                editLoading:false,
                agreementDialog:false,
                agreeValue:false,
                agreeButton:true,
                able:false,
                size: 'small',
                gridData:[],
                commonDate:[],
                photoUrl: baseUrl + '/document/preview/',
                roomId:null,
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
                systemDays:[],//系统参数 天数
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
                    children46: 0,
                    children4: 0,
                    totalSAmount: null,
                    totalTAmount: null,
                    remark: null,
                    sRoomPrice: null,
                    endPrice:null,
                    specialMatters:null,
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
                        if(nowDate.getHours()>17 || (nowDate.getHours()==17 && nowDate.getMinutes() >= 30)){
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
                this.dataForm= {
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
                        children46: 0,
                        children4: 0,
                        totalSAmount: null,
                        totalTAmount: null,
                        remark: null,
                        sRoomPrice: null,
                        endPrice:null,
                        specialMatters:null,
                        roomNight:null
                }
                // console.log(this.frameDate+this.roomCd)
                this.commonDate = this.frameDate;
                this.loading = true;

                this.initData(); //初始化客房编号字段
                //如果roomId为空，说明需要关闭当前页面
                if (!this.roomId) {
                    this.filters.roomCode = this.$route.query.recommondCode
                } else {
                    this.filters.roomCode = this.roomId;
                }
                //调用查询
                this.dateChangeCanculate();

            },
            submitForm: function () {
                if (!this.agreeValue) {
                    this.$message({ message: this.$t('action.agreement'), type: 'warn' })
                    return;
                }
                this.editLoading = true
                this.loading = true
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
                    this.loading = false
                    this.agreementDialog = false;
                    this.agreeValue = false;
                    this.$refs['dataForm'].resetFields()
                    this.tabsCloseCurrentHandle();

                }).catch(() => {
                    this.loading = false
                    this.editLoading = false
                    this.agreementDialog = false;
                    this.agreeValue = false;
                })

            },
            submitFormBefore:function () {
                if (!this.validFunction()) {
                    return;
                }
                this.$refs.dataForm.validate((valid) => {
                        if (valid) {
                            //弹出框提示用户需要同意协议
                            this.agreementDialog = true;
                        } else {
                            this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
                        }
                })
            },
            closeAgreeDialog: function() {
                this.agreeValue = false;
                this.agreementDialog = false;
            },
            localLanguageLoad: function () {
                this.language = {lge: this.$i18n.locale}
                this.able = this.language.lge=='zh_cn'?true:false
            },
            // tabs, 删除tab
            removeTabHandle(tabName) {
                if(this.$route.query.recommondCode) {
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
                } else {
                    this.commonDate = this.frameDate
                    console.log(this.$refs.dataForm);
                    if(this.$refs.dataForm){
                        this.$refs.dataForm.resetFields();
                    }
                    this.$emit('editDialog')
                }
            },
            // tabs, 关闭当前
            tabsCloseCurrentHandle() {
                this.removeTabHandle(this.mainTabsActiveName)
            },
            dateChangeCanculate: function() {
                console.log("+++++++",this.commonDate)
                if(this.commonDate.length>1){
                    this.filters.inDateStart = this.commonDate[0];
                    this.filters.outDateEnd = this.commonDate[1];
                } else {
                    this.$message({ message: this.$t('action.invIsOutException'), type: 'warn' })
                    return
                }
                this.dataForm.roomNum = 0;
                this.$api.hotelRoom.findPage({...this.pageRequest,...this.filters}).then((res) => {
                    console.log("hotelRoom",res)
                    this.dataForm = Object.assign(this.dataForm,res.rows[0]);
                    if(res.rows[0] == null|| res.rows[0] == "") {
                        this.$message({ message: this.$t('action.pInvPriceErr'), type: 'warn' })
                    } else {
                        this.dataForm.sRoomPrice = res.rows[0].sPrice
                    }
                    if (res.rows[0].photo != null && res.rows[0].photo!='') {
                        if(res.rows[0].photo){
                            this.$api.user.showFile({'relationId':res.rows[0].photo}).then((res) =>{
                                this.roomPhoto = res;
                            })
                        }
                    }
                    //查询明细牌价
                    this.$api.bizPuchs.findByDate({...this.pageRequest,...this.filters}).then((res) => {
                        console.log("bizPuchs",res)
                        this.gridData = res;
                        this.loading = false;
                    },() =>{
                        this.loading = false;
                    })

                    if (this.commonDate.length>1) {
                        var n = this.commonDate;
                        var startDate = n[0].substr(0,4) + "/" + n[0].substr(4,2) +"/" +n[0].substr(6,2) ;
                        var oDate1 = Date.parse(startDate);
                        var lastCrt = new Date(oDate1 - 3600 * 1000 * 24 * 7);
                        this.dataForm.lastCrtTime = formatDate(lastCrt,'yyyyMMdd');
                    }
                },() =>{
                })


            },
            initData:function() {
                if (!this.roomCd) {
                    if (!this.$route.query.recommondCode) {
                        this.$message({ message: this.$t('action.noHaveRoomInfo'), type: 'warn' })
                        this.tabsCloseCurrentHandle();
                        return;
                    }
                }
                if (this.roomCd) {
                    this.roomId = this.roomCd;
                    return;
                }
                if (this.$route.query.recommondCode) {
                    this.roomId = this.$route.query.recommondCode
                    return;
                }

            },
            validFunction:function () {
                if (this.commonDate.length <1) {
                    this.$message({message: this.$t('action.pInOutDate') , type: 'error'})
                    return false;
                }
                if (this.dataForm.roomNum < 1 ) {
                    this.$message({message: this.$t('action.roomNumErr') , type: 'error'})
                    return false;
                }
                if (this.gridData.length != this.filters.roomNight) {
                    this.$message({message: this.$t('action.priceErr') , type: 'error'})
                    return false;
                }
                if (this.dataForm.totalTAmount =='' || this.dataForm.totalTAmount == null) {
                    this.$message({message: this.$t('action.operErr') , type: 'error'})
                    return false;
                }

                /*
                入住日算起，倒退七天前的那一天18:30分开始，将无法预约入住日的酒店客
                 */
                var date = new Date();
                var y = date.getFullYear();
                var m = date.getMonth() +1;
                var d = date.getDate();
                var t = y+"-"+m+"-"+d+" "+"17:30:00";
                var tDate = new Date(Date.parse(t.replace(/-/g, "/")))
                var inDateStart = this.commonDate[0];
                inDateStart = inDateStart.substring(0,4)+"-"+inDateStart.substring(4,6)+"-"+inDateStart.substring(6)+ " "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
                var dateStart = new Date(Date.parse(inDateStart.replace(/-/g, "/")))
                if ( date>=tDate ) {
                    var i = this.systemDays[0].code
                    date.setDate(date.getDate()+ parseInt(i))
                }else {
                    var i = this.systemDays[0].code -1
                    date.setDate(date.getDate()+ parseInt(i))
                }
                if (dateStart<date) {
                    this.$message({message: this.$t('action.OverSevenAfterExcetpion') , type: 'warn'})
                    return false;
                }
                return true
            }
        },
        created(){
            this.getTypeValues('SYSTEM_DAYS,ROOM_STYLE,ROOM_TYPE,HOTEL_STAR,HOTEL_TYPE,BREAK_TYPE,BED_TYPE,PREFECTURE,DISTRICT').then( res =>{
                this.roomStyle = res.ROOM_STYLE;
                this.roomType = res.ROOM_TYPE;
                this.hotelStar = res.HOTEL_STAR;
                this.hotelType = res.HOTEL_TYPE;
                this.breakType = res.BREAK_TYPE;
                this.bedType = res.BED_TYPE;
                this.provinceCode = res.PREFECTURE;
                this.cityCode = res.DISTRICT;
                this.systemDays = res.SYSTEM_DAYS;
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
                    num = this.dataForm.favorableprice * this.filters.roomNight*this.dataForm.roomNum;
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
                    num = this.dataForm.favorableprice*this.filters.roomNight*this.dataForm.roomNum;
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
                this.dataForm.totalTAmount = this.dataForm.adultNum==0?0:(this.dataForm.adultNum + this.dataForm.children612+this.dataForm.children46) * totlPrice;
            },
            agreeValue(n,o) {
                if (n) {
                    this.agreeButton = false
                } else {
                    this.agreeButton=true
                }
            },
            'dataForm.children612'(){
                var totlPrice = 0;
                if(this.gridData.length<0) {
                    return
                } else {
                    for (var i = 0 ; i<this.gridData.length ; i++) {
                        totlPrice += this.gridData[i].tprice
                    }
                }
                this.dataForm.totalTAmount = this.dataForm.adultNum==0?0:(this.dataForm.adultNum + this.dataForm.children612+this.dataForm.children46) * totlPrice;
            },
            'dataForm.children46'(){
                var totlPrice = 0;
                if(this.gridData.length<0) {
                    return
                } else {
                    for (var i = 0 ; i<this.gridData.length ; i++) {
                        totlPrice += this.gridData[i].tprice
                    }
                }
                this.dataForm.totalTAmount = this.dataForm.adultNum==0?0:(this.dataForm.adultNum + this.dataForm.children612+this.dataForm.children46) * totlPrice;
            },
            commonDate(n,o){
                if (this.commonDate.length > 1) {
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
                        num = this.dataForm.favorableprice * iDays*this.dataForm.roomNum;
                    }
                    this.dataForm.totalSAmount = this.dataForm.roomNum==0?0:this.dataForm.roomNum * totlPrice-num;

                    this.dataForm.totalTAmount = this.dataForm.roomNum==0?0:(this.dataForm.adultNum + this.dataForm.children612+this.dataForm.children46) * tPrice;
                }

            },
            roomCd(n,o) {
                if (n) {
                    this.findPage()
                }

            }
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
