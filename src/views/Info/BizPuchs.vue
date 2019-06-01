<template>
    <div class="page-container">
        <!--工具栏-->
        <div class="toolbar query_room_container" style="padding-top:10px;padding-left:15px;">
            <el-form :inline="true" :model="filters" :size="size" align="left">
                <el-form-item @mouseleave.native="serch_result_user = false">
                    <el-input v-model="filters.createName" @input="inputUserFunc" :placeholder="$t('user.name')"></el-input>

                    <div class="serch_result" v-show="serch_result_user" style="position: absolute; z-index: 100;width: 100%;box-sizing: border-box; background: #fff; list-style: none; border: 1px solid #DCDFE6; border-top: 0;">
                        <li v-for="item in user_result" class="serch-list" @click="filters.createName = item.name">
                            {{ item.name }}
                        </li>
                    </div>
                </el-form-item>
                <el-form-item @mouseleave.native="serch_result_hotel = false">
                    <el-input v-model="filters.hotelName" @input="inputHotelFunc" :placeholder="$t('hotel.hotelname')"></el-input>
                    <div class="serch_result" v-show="serch_result_hotel" style="position: absolute; z-index: 100;width: 100%;box-sizing: border-box; background: #fff; list-style: none; border: 1px solid #DCDFE6; border-top: 0;">
                        <li v-for="item in hotel_result" class="serch-list" @click="hotelClick(item)">
                            {{ $i18n.locale === "zh_cn"?item.hotelCname:item.hotelEname }}
                        </li>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.orderCode" :placeholder="$t('order.orderCode')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="filters.roomStatus" clearable :placeholder="$t('order.roomStatus')"
                               style="width: 200px;">
                        <el-option v-for="item in states" :key="item.paraCode"
                                   :label="$t(item.paraCode)" :value="item.paraValue1">
                        </el-option>
                    </el-select>
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
                    <kt-button :label="$t('action.search')" perms="sys:bizPuchs:view" type="primary"
                               @click="findPage(null)"/>
                </el-form-item>
            </el-form>
        </div>
        <!--表格内容栏-->
        <kt-table permsEdit="sys:bizPuchs:edit" permsCancel="sys:bizPuchs:cancel"  permsConfirm="sys:bizPuchs:confirm"
                  :data="pageResult" :columns="columns"
                  @findPage="findPage" @handleEdit="handleEdit" @handleCancel="handleCancel"  @handleConfirm="handleConfirm">
        </kt-table>

        <!--新增编辑界面-->
        <el-dialog :title="operation?$t('action.add'):$t('action.edit')" width="70%"  style="margin-top: -120px" :visible.sync="editDialogVisible" :close-on-click-modal="false">

            <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
                     :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item>
                                <el-image style="width:100%;height:200px" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                    <!--<el-col :span="24" v-show="roomPhoto && roomPhoto.length>0">
                       <el-carousel style="margin-top: 20px" :interval="4000" type="card" height="200px">
                           <el-carousel-item v-for="ph in roomPhoto" :key="ph">
                               <el-image style="width:400px;height:200px" :src="photoUrl+ ph">
                                   <div slot="error" class="el-image__error">
                                       <h1 class="el-icon-picture-outline"></h1>
                                   </div>
                               </el-image>
                           </el-carousel-item>
                       </el-carousel>
                   </el-col>-->

                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-row style="width: 100%;text-align: left;display: flex;margin: 0 auto;">
                            <el-col :span="6" style="padding-top:10px;border-right: 1px solid #e6e6e6;border-bottom: 1px solid #e6e6e6;text-align: center;">
                                <label style="font-size: 16px;color: #212121;">基本信息</label>
                            </el-col>
                            <el-col :span="18" style="border-bottom: 1px solid #e6e6e6;">
                                <ul class="hotel-base">
                                    <li>
                                        <label>所在区域</label>
                                        <input hidden v-model="dataForm.provinceCode"/>
                                        <span>{{resolveRoomTypeName(provinceCode,dataForm.provinceCode)}}</span>
                                        <span>{{resolveRoomTypeName(cityCode,dataForm.cityCode)}}</span>
                                    </li>
                                    <li>
                                        <label>入离时间</label>
                                        <input hidden v-model="dataForm.inDate"/>
                                        <input hidden v-model="dataForm.outDate"/>
                                        <span>{{dataForm.inDateStart}}  至  {{dataForm.outDateEnd}} 共 {{dataForm.roomNight}} 晚</span>
                                    </li>
                                    <li style="display: flex">
                                        <label>入住人数</label>
                                        <div style="width: 200px;">
                                            <span>{{$t('hotel.adultNum')}}  {{dataForm.adultNum}}    {{$t('hotel.childrenNum')}}  {{dataForm.childrenNum}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                        <el-row style="width: 100%;text-align: left;display: flex;margin: 0 auto;">
                            <el-col :span="6" style="padding-top:10px;border-right: 1px solid #e6e6e6;border-bottom: 1px solid #e6e6e6;text-align: center;">
                                <label style="font-size: 16px;color: #212121;">酒店信息</label>
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
                                        <label>酒店网站</label>
                                        <input hidden v-model="dataForm.hotelWeb"/>
                                        <span>{{dataForm.hotelWeb}}</span>
                                    </li>
                                    <li>
                                        <label>房间费用</label>
                                        <input hidden v-model="dataForm.sPrice"/>
                                        <span>{{dataForm.sPrice}}</span>
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
                                </ul>
                            </el-col>
                        </el-row>
                        <el-row style="width: 100%;text-align: left;display: flex;margin: 0 auto;">
                            <el-col :span="6" style="padding-top:10px;border-right: 1px solid #e6e6e6;border-bottom: 1px solid #e6e6e6;text-align: center;">
                                <label style="font-size: 16px;color: #212121;">房间信息</label>
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
                                <el-form-item label-width="120px" :label="$t('hotel.lastCrtTime')" prop="pName" >
                                    <el-date-picker
                                        v-model="dataForm.lastCrtTime"
                                        align="right"
                                        type="date"
                                        :placeholder="$t('hotel.lastCrtTime')"
                                        :picker-options="pickerOptions2" style="width: 200px">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label-width="120px" :label="$t('hotel.birthday')" prop="birth" >
                                    <el-date-picker
                                        v-model="dataForm.birth"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        :placeholder="$t('hotel.birthday')"  style="width: 200px" >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label-width="120px" :label="$t('hotel.children612')" prop="children612">
                                    <el-input-number v-model="dataForm.children612" controls-position="right" style="width: 200px"  :min="0" ></el-input-number>
                                </el-form-item>
                                <el-form-item label-width="120px" :label="$t('hotel.children46')" prop="children46" >
                                    <el-input-number v-model="dataForm.children46" controls-position="right" style="width: 200px"  :min="0" ></el-input-number>
                                </el-form-item>
                                <el-form-item label-width="120px" :label="$t('hotel.children04')" prop="children4" >
                                    <el-input-number v-model="dataForm.children4" controls-position="right" style="width: 200px"  :min="0" ></el-input-number>
                                </el-form-item>
                                <el-form-item :label="$t('hotel.roomNum')" label-width="120px" prop="roomNum" >
                                    <el-input-number v-model="dataForm.roomNum" controls-position="right" style="width: 200px" :min="1" :max="dataForm.inventory" ></el-input-number>
                                </el-form-item>
                                <el-form-item label-width="120px" :label="$t('hotel.reMark')" prop="reMark">
                                    <el-input type="textarea" style="width: 200px;letter-spacing: 1px" :rows="4" resize="none" v-model="dataForm.remark"></el-input>
                                </el-form-item>
                                <el-form-item  :label="$t('hotel.totalPrice')" label-width="120px" prop="totalPrice">
                                    <span  style="width: 200px;display: inline-block;text-align: left;color: #bd0b38;font-size: 18px;font-weight: bold;">{{dataForm.totalSAmount}}</span>
                                </el-form-item>

                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
                <el-button :size="size" type="primary" @click.native="submitConfirmForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<style>
    .serch-list{
        padding: 4px 10px;
    }
    .serch-list:hover{
        background: #DCDFE6;
        cursor: pointer;
    }
</style>
<script>
    import KtTable from "@/views/Core/BizTable"
    import KtButton from "@/views/Core/KtButton"
    import {format,formatDate} from "@/utils/datetime"
    export default {
        components:{
            KtTable,
            KtButton
        },
        data() {
            return {
                able:false,
                size: 'small',
                serch_result_user:false,
                serch_result_hotel:false,
                filters: {
                    createName:'',
                    orderCode: '',
                    roomStatus: '',
                    createTimes: '',
                    confirmTimes:'',
                    hotelName:''
                },
                user_result:[],
                hotel_result:[],
                columns: [
                    {prop:"orderCode", label:"订单号", minWidth:60},
                    {prop:"hotelCname", label:"酒店名称", minWidth:60},
                    {prop:"roomCode", label:"客房编号", minWidth:60},
                    {prop:"inDateStart", label:"入住日期", minWidth:60},
                    {prop:"outDateEnd", label:"退房日期", minWidth:60},
                    {prop:"pName", label:"代表者姓名", minWidth:60},
                    {prop:"lastCrtTime", label:"确认时间", minWidth:60}
                ],
                pageRequest: { page: 1, rows: 8 },
                pageResult: {},

                operation: false, // true:新增, false:编辑
                editDialogVisible: false, // 新增编辑界面是否显示
                editLoading: false,
                provinceCode: [], //地区编码
                cityCode: [], //城市编码
                commonDate:[],
                roomPhoto:[],
                hotelType: [], //酒店类型
                hotelStar:[], //酒店星级
                roomStyle:[], //房间样式
                roomType:[], //房间类型
                breakType: [], //餐饮条件
                bedType: [], //床铺类型
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
                    provinceCode: '',
                    cityCode:'',
                    hotelName: '',
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
                    iswify: null,
                    isfront: null,
                    isbarrifr: null,
                    isbalcony: null,
                    iskitchen: null,
                    iswindow: null,
                    isheat: null,
                    isicebox: null,
                    isiron: null,
                    isnosmk: null,
                    islandscape: null,
                    ishighrise: null,
                    ispark: null,
                    isgym: null,
                    isswmp: null,
                    isbeach: null,
                    ishotsp: null,
                    ischildct: null,
                    isroomserv: null,
                    isknead: null,
                    islounge: null,
                    issuper: null,
                    isbus: null,
                    istrafic: null,
                    isrestau: null,
                    lowRoomPrice: null,
                    highRoomPrice: 1000,
                    hotelname: null,
                    inDateStart: null,
                    outDateEnd: null,
                    adultNum: null,
                    childrenNum: null,
                    sPrice: null
                },
                paraConfig: [],
                pickerOptions:{
                    disabledDate : (time) => {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                states:[],
                pickerOptions2:{
                    disabledDate : (time) =>{
                        if(this.commonDate && this.commonDate.length>0){
                            let beginDateVal = this.commonDate[0];
                            let startDate = new Date(beginDateVal.substr(0,4),beginDateVal.substr(4,2)-1,beginDateVal.substr(6,2))
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > startDate.getTime()
                        }

                        return time.getTime() > Date.now()
                    }
                },
            }
        },
        methods: {
            // 获取分页数据
            findPage: function (data) {
                if (data !== null) {
                    this.pageRequest = data.pageRequest
                }
                if(this.filters.confirmTimes != null && this.filters.confirmTimes.length > 0){
                    this.filters.confirmTimeStart = this.filters.confirmTimes[0];
                    this.filters.confirmTimeEnd = this.filters.confirmTimes[1];
                }else{
                    this.filters.confirmTimeStart = null;
                    this.filters.confirmTimeEnd = null;
                }
                if(this.filters.createTimes != null && this.filters.createTimes.length > 0){
                    this.filters.createTimeStart = this.filters.createTimes[0];
                    this.filters.createTimeEnd = this.filters.createTimes[1];
                }else{
                    this.filters.createTimeStart = null;
                    this.filters.createTimeEnd = null;
                }
                this.pageRequest = {...this.pageRequest, ...this.filters};
                this.$api.bizPuchs.findPage(this.pageRequest).then((res) => {
                    this.pageResult = res
                }).then(data != null ? data.callback : '')
            },
            // 批量删除
            handleCancel: function (data) {
                this.$api.bizPuchs.batchCancel(data.params).then(data != null ? data.callback : '')
            },
            // 显示编辑界面
            handleEdit: function (params) {
                this.editDialogVisible = true
                this.operation = false
                console.log(params.index)
                this.dataForm = Object.assign({}, params.index)
            },
            // 编辑
            submitConfirmForm: function () {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true
                            let params = Object.assign({}, this.dataForm)
                            this.$api.bizPuchs.update(params).then((res) => {
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
                        },() =>{
                            this.editLoading = false
                            this.editDialogVisible = false
                            this.findPage(null)
                        })
                    }
                })
            },
            handleConfirm:function (data) {
                this.$api.bizPuchs.confirm(data.params).then(data != null ? data.callback : '')
            },
            //加载状态数据字典
            findStatus:function(){
                this.$api.sysParaConfig.findByCode({"paraSubCode2":"puchsState"}).then((res) => {
                    this.states = res;
                })
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
            inputUserFunc(){
                if(this.filters.createName.length>0){
                    this.$api.user.findLikeByName({name:this.filters.createName}).then((res) =>{
                        if(res != null) {
                            this.user_result = res;
                            this.serch_result_user = true;
                        }
                    });
                }else{
                    this.serch_result_user = false
                }
            },
            inputHotelFunc(){
                if(this.filters.hotelName.length>0){
                    this.$api.hotelRoom.findLikeByName({name:this.filters.hotelName}).then((res) =>{
                        if(res != null && res.length > 0){
                            this.hotel_result = res;
                            this.serch_result_hotel = true;
                        }
                    });
                }else{
                    this.serch_result_hotel = false
                }
            },
            hotelClick:function (row) {
                if(this.$i18n.locale === "zh_cn"){
                    this.filters.hotelName = row.hotelCname
                }else{
                    this.filters.hotelName = row.hotelEname
                }

            }
        },
        mounted() {
            this.findStatus();
            this.created();
        }
    }
</script>

<style scoped>
    .hotel-base{
        margin: 0;
        padding: 0;
        color: #212121;
    }
    .hotel-base>li{
        padding: 10px 20px;
        list-style: none;
    }
    .hotel-base>li>label{
        width: 80px;
        display: inline-block;
    }
</style>
