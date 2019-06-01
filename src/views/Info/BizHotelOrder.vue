<template>
    <div>
        <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
                 :inline="true" >
            <div>
                <el-row>
                    <el-col :span="24" v-show="roomPhoto && roomPhoto.length>0">
                        <el-carousel style="margin-top: 20px" :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="ph in roomPhoto" :key="ph">
                                <el-image style="width:400px;height:200px" :src="photoUrl+ ph">
                                    <!--                                <el-image style="width:400px;height:200px" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">-->
                                    <div slot="error" class="el-image__error">
                                        <h1 class="el-icon-picture-outline"></h1>
                                    </div>
                                </el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-row >
                    <el-col :span="18" align="left">
                        <el-form-item  prop="provinceCode"  >
                            <el-select v-model="dataForm.provinceCode" disabled>
                                <el-option v-for="rt in provinceCode" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  prop="cityCode"  >
                            <el-select v-model="dataForm.cityCode" disabled>
                                <el-option v-for="rt in cityCode" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="commonDate">
                            <el-date-picker v-model="commonDate"
                                            :clearable="false"
                                            type="daterange"
                                            value-format="yyyyMMdd"
                                            :start-placeholder="$t('hotel.inDateStart')"
                                            :end-placeholder="$t('hotel.outDateEnd')"
                                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.roomNight')" label-position="top" >
                            <el-input style="width: 50px" disabled v-model="dataForm.roomNight"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="6" align="right">
                        <el-form-item prop="sPrice" label-width="100px" :label="$t('hotel.sPrice')">
                            <el-input  v-model="dataForm.sPrice" disabled ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18" align="left">
                        <el-form-item  prop="hotelCode" >
                            <el-select v-model="dataForm.hotelCode" disabled >
                                <!--                                <el-option v-for=" hotelName in hotelNames" :key="hotelName.hotelCode"-->
                                <!--                                           :label="language.lge=='zh_cn'?hotelName.hotelCname:hotelName.hotelEname"-->
                                <!--                                           :value="hotelName.hotelCode"></el-option>-->
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" align="right">
                        <el-form-item prop="lastCrtTime" label-width="100px" style="margin-left: 20px" :label="$t('hotel.lastCrtTime')">
                            <el-date-picker
                                style="width: 188px"
                                v-model="dataForm.lastCrtTime"
                                align="right"
                                type="date"
                                :placeholder="$t('hotel.lastCrtTime')"
                                :picker-options="pickerOptions2">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="18" align="left">
                        <el-form-item prop="roomType">
                            <el-select v-model="dataForm.roomType" disabled
                                       :placeholder="$t('hotel.roomtype.roomtype')">
                                <el-option v-for="rt in roomType" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="adultNum" :label="$t('hotel.adultNum')">
                            <el-input-number v-model="dataForm.adultNum" controls-position="right" :placeholder="$t('hotel.adultNum')" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item prop="childNum" :label="$t('hotel.childrenNum')">
                            <el-input-number v-model="dataForm.childNum" controls-position="right" :placeholder="$t('hotel.childrenNum')" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" align="right" >
                        <el-form-item :label="$t('hotel.inventory')">
                            <el-input-number v-model="dataForm.inventory" disabled controls-position="right" :placeholder="$t('hotel.inventory')"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="18" align="left">
                        <el-form-item :label="$t('hotel.hotelAddr')" prop="hotelAddr">
                            <el-input style="width: 500px" v-model="dataForm.hotelAddr" :disabled="true" ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.hotelPhone')" prop="hotelPhone">
                            <el-input  v-model="dataForm.hotelPhone" :disabled="true" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" align="right">
                        <el-form-item  prop="hotelWeb">
                            <el-input style="width: 297px" v-model="dataForm.hotelWeb" :disabled="true" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--酒店简介 -->
                <el-row>
                    <el-col :span="24">
                        <!--                        <el-form-item v-show="able" :label="$t('hotel.introc')" prop="introC" style="width: 90%;">-->
                        <el-input v-show="able"  type="textarea" style="width: 90%" v-model="dataForm.introC" :autosize="{ minRows: 5, maxRows: 20}" resize="none" readonly ></el-input>
                        <el-input v-show="!able" :label="$t('hotel.introe')" type="textarea" style="width: 90%" v-model="dataForm.introE"  resize="none"  readonly autosize></el-input>
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item v-show="!able" :label="$t('hotel.introe')" prop="introE">-->
                        <!--                            <el-input type="textarea" v-model="dataForm.introE"  resize="none"  readonly autosize></el-input>-->
                        <!--                        </el-form-item>-->
                    </el-col>

                </el-row>

                <!--常用信息 -->
                <el-row >
                    <el-col :span="24" align="center">
                        <h2>{{$t('hotel.information')}}</h2>
                        <el-tag type="success" v-show="dataForm.iswify==1">{{$t('hotel.iswify')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isfront==1">{{$t('hotel.isfront')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isbarrifr==1">{{$t('hotel.isbarrifr')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isbalcony==1">{{$t('hotel.isbalcony')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.iskitchen==1">{{$t('hotel.iskitchen')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.iswindow==1">{{$t('hotel.iswindow')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isheat==1">{{$t('hotel.isheat')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isicebox==1">{{$t('hotel.isicebox')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isiron==1">{{$t('hotel.isiron')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isnosmk==1">{{$t('hotel.isnosmk')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.islandscape==1">{{$t('hotel.islandscape')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.ishighrise==1">{{$t('hotel.ishighrise')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.ispark==1">{{$t('hotel.ispark')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isgym==1">{{$t('hotel.isgym')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isswmp==1">{{$t('hotel.isswmp')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isbeach==1">{{$t('hotel.isbeach')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.ishotsp==1">{{$t('hotel.ishotsp')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.ischildct==1">{{$t('hotel.ischildct')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isroomserv==1">{{$t('hotel.isroomserv')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isknead==1">{{$t('hotel.isknead')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.islounge==1">{{$t('hotel.islounge')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.issuper==1">{{$t('hotel.issuper')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isbus==1">{{$t('hotel.isbus')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.istrafic==1">{{$t('hotel.istrafic')}}</el-tag>
                        <el-tag type="success" v-show="dataForm.isrestau==1">{{$t('hotel.isrestau')}}</el-tag>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label-width="120px" :label="$t('hotel.representName')" prop="pName" >
                            <el-input v-model="dataForm.pName"></el-input>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.passportNo')" prop="passport" >
                            <el-input v-model="dataForm.passport"></el-input>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.contactEmail')" prop="emailAddress">
                            <el-input v-model="dataForm.emailAddress"></el-input>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.contactPhone')" prop="phone">
                            <el-input v-model="dataForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label-width="120px" :label="$t('hotel.birthday')" prop="birth" >
                            <el-date-picker
                                v-model="dataForm.birth"
                                type="date"
                                value-format="yyyy-MM-dd"
                                style="width: 190px"
                                :placeholder="$t('hotel.birthday')">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.children612')" prop="children612">
                            <el-input-number v-model="dataForm.children612" :min="0" ></el-input-number>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.children46')" prop="children46" >
                            <el-input-number v-model="dataForm.children46" :min="0" ></el-input-number>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.children04')" prop="children4" >
                            <el-input-number v-model="dataForm.children4" :min="0" ></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('hotel.roomNum')" prop="roomNum" >
                            <el-input-number v-model="dataForm.roomNum" :min="1" :max="dataForm.inventory" ></el-input-number>
                        </el-form-item>
                        <el-form-item  :label="$t('hotel.totalPrice')" prop="totalPrice">
                            <el-input v-model="dataForm.totalSAmount" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label-width="120px" :label="$t('hotel.reMark')" prop="reMark">
                            <el-input type="textarea" style="width: 500px" :rows="3" resize="none" v-model="dataForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "BizHotelOrder",
        data() {
            return {
                able:false,
                size: 'small',
                commonDate:[],
                roomPhoto:[],
                hotelType: [], //酒店类型
                hotelStar:[], //酒店星级
                roomStyle:[], //房间样式
                roomType:[], //房间类型
                breakType: [], //餐饮条件
                bedType: [], //床铺类型
                provinceCode: [], //地区编码
                cityCode: [], //城市编码
                language: {},
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
                    roomNum: null,
                    adultNum: null,
                    childNum: null,
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
                    remark: null,
                    sPrice: null
                },
                dataFormRules: {
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
                        return time.getTime() < Date.now() - 8.64e7
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

            localLanguageLoad: function () {
                this.language = {lge: this.$i18n.locale}
                this.able = this.language.lge=='zh_cn'?true:false
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

    }

</script>

<style scoped>

</style>
