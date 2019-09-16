<template>
    <div class="page-container">
        <!--工具栏-->
        <div class="toolbar query_room_container" style="padding-top:10px;padding-left:15px;">
            <el-form :inline="true" :model="filters" :size="size" align="left">
                <el-form-item @mouseleave.native="serch_result_user = false">
                    <el-input v-model="filters.createName" @input="inputUserFunc" clearable :placeholder="$t('user.name')"></el-input>

                    <div class="serch_result" v-show="serch_result_user" style="position: absolute; z-index: 100;width: 100%;box-sizing: border-box; background: #fff; list-style: none; border: 1px solid #DCDFE6; border-top: 0;">
                        <li v-for="item in user_result" class="serch-list" @click="filters.createName = item.name">
                            {{ item.name }}
                        </li>
                    </div>
                </el-form-item>
                <el-form-item @mouseleave.native="serch_result_hotel = false">
                    <el-input v-model="filters.hotelName" @input="inputHotelFunc" clearable :placeholder="$t('hotel.hotelname')"></el-input>
                    <div class="serch_result" v-show="serch_result_hotel" style="position: absolute; z-index: 100;width: 100%;box-sizing: border-box; background: #fff; list-style: none; border: 1px solid #DCDFE6; border-top: 0;">
                        <li v-for="item in hotel_result" class="serch-list" @click="hotelClick(item)">
                            {{ $i18n.locale === "zh_cn"?item.hotelCname:item.hotelEname }}
                        </li>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.orderCode" clearable :placeholder="$t('order.orderCode')"></el-input>
                </el-form-item>
                <el-form-item>
                    <!--<el-select v-model="filters.roomSthandleConfirmatus" clearable :placeholder="$t('order.roomStatus')"-->
                               <!--style="width: 200px;">-->
                        <!--<el-option v-for="item in states" :key="item.paraCode"-->
                                   <!--:label="$t(item.paraCode)" :value="item.paraValue1">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                    <el-select v-model="filters.roomStatus" clearable filterable
                               :placeholder="$t('order.roomStatus')">
                        <el-option v-for="rt in roomStatus" :key="rt.code"
                                   :label="rt.name" :value="rt.code"></el-option>
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
                        :end-placeholder="$t('hotel.lastCrtTime')" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <kt-button :label="$t('action.search')" perms="sys:bizPuchs:view" type="primary"
                               @click="findPage(null)"/>
                </el-form-item>
            </el-form>
        </div>
        <!--表格内容栏-->
        <kt-table permsEdit="sys:bizPuchs:edit" permsCancel="sys:bizPuchs:cancel"  permsConfirm="sys:bizPuchs:confirm" excelManagerConfirm="sys:excelExport:confirm"
                  excelExportBody="sys:bodyExcel:export" :data="pageResult" :columns="columns"
                  @findPage="findPage" @handleEdit="handleEdit" @handleCancel="handleCancel"  @handleConfirm="handleConfirm" @exportExcel="exportExcel"
                  @accountsConfirm="accountsConfirm" @exportManagerExcel="exportManagerExcel">
        </kt-table>

        <!--新增编辑界面-->
        <el-dialog :title="operation?$t('action.add'):$t('action.edit')" width="90%"  style="margin-top: -120px" :visible.sync="editDialogVisible" :close-on-click-modal="false">

            <el-form :model="dataForm" label-width="180px" :rules="dataFormRules" ref="dataForm" :size="size"
                     :inline="true">
                <el-row>
                    <!--<el-col :span="24">-->
                        <!--<el-carousel :interval="4000" type="card" height="200px">-->
                            <!--<el-carousel-item>-->
                                <!--<el-image style="width:100%;height:200px" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>-->
                            <!--</el-carousel-item>-->
                        <!--</el-carousel>-->
                    <!--</el-col>-->
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
                                    <li>
                                        <label>{{$t('order.departureTime')}}</label>
                                        <input hidden v-model="dataForm.inDate"/>
                                        <input hidden v-model="dataForm.outDate"/>
                                        <span>{{dataForm.inDateStart}}  {{$t('order.to')}}  {{dataForm.outDateEnd}} {{$t('order.total')}} {{filters.roomNight}} {{$t('order.night')}}</span>
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
                                            <span>{{$t('hotel.adultNum')}}  {{dataForm.adultNum}}    {{$t('hotel.childrenNum')}}  {{dataForm.childNum}}</span>
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
                                <el-form-item label-width="180px" :label="$t('hotel.lastCrtTime')" prop="pName" >
                                    <el-date-picker
                                        v-model="dataForm.lastCrtTime"
                                        align="right"
                                        type="date"
                                        :placeholder="$t('hotel.lastCrtTime')"
                                        value-format="yyyyMMdd"
                                        :picker-options="pickerOptions2" style="width: 200px" readonly>
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
                                    <el-input-number v-model="dataForm.roomNum" controls-position="right" style="width: 200px" :min="1" :max="dataForm.inventory" ></el-input-number>
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


            <div slot="footer" class="dialog-footer" align="center">
                <el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
                <el-button :size="size" type="primary" @click.native="submitConfirmForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
            </div>


        </el-dialog>


        <!--新增编辑界面-->
        <el-dialog :title="$t('sys.orderConfirmReport')" width="70%" :visible.sync="orderDialogVisible"
                   :close-on-click-modal="false">

            <iframe :src="reportUrl+'/birt/frameset?__report=order_confirm_report.rptdesign&orderCode='+reportData.orderCode+'&confirmDate='+reportData.lastCrtTime+
                                '&hotelName='+reportData.hotelName+'&hoteladdr='+reportData.hotelAddr+'&hotelPhone='+reportData.hotelPhone+'&breakType='+reportData.breaktype+
                                '&favorableprice='+reportData.favorableprice+'&present='+reportData.present+'&roomType='+reportData.roomtype+'&roomNum='+reportData.roomNum+
                                '&inDateStart='+reportData.inDateStart+'&outDateEnd='+reportData.outDateEnd+'&createTime='+reportData.createTime+'&totalSAmount='+reportData.totalSAmount+
                                '&remark='+reportData.remark+'&pName='+reportData.pName+'&phone='+reportData.phone+'&roomNight='+reportData.roomNight+'&personNum='+reportData.personNum"

                    scrolling="auto" frameborder="0" class="frame" >
            </iframe>

        </el-dialog>

        <el-dialog :title="$t('sys.hotelRequestReport')" width="70%" :visible.sync="customDialogVisible"
                   :close-on-click-modal="false">

            <iframe :src="reportUrl+'/birt/frameset?__report=cutomers_report.rptdesign&orderCode='+reportData.orderCode+'&confirmDate='+reportData.lastCrtTime+
                                '&hotelName='+reportData.hotelName+'&hoteladdr='+reportData.hotelAddr+'&hotelFax='+reportData.hotelFax+'&breakType='+reportData.breaktype+
                                '&personNum='+reportData.personNum+'&c12Num='+reportData.c12Num+'&roomType='+reportData.roomtype+'&roomNum='+reportData.roomNum+
                                '&inDateStart='+reportData.inDateStart+'&outDateEnd='+reportData.outDateEnd+'&createTime='+reportData.createTime+'&totalTAmount='+reportData.totalTAmount+
                                '&totalNum='+reportData.totalNum+'&pName='+reportData.pName+'&phone='+reportData.phone+'&roomNight='+reportData.roomNight"


                    scrolling="auto" frameborder="0" class="frame" >
            </iframe>

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
    import {reportBaseUrl} from '@/utils/global'

    export default {
        components:{
            KtTable,
            KtButton
        },
        data() {
            return {
                reportUrl:reportBaseUrl,
                able:false,
                size: 'small',
                serch_result_user:false,
                serch_result_hotel:false,
                customDialogVisible:false,
                orderDialogVisible:false,
                filters: {
                    createName:'',
                    orderCode: '',
                    roomStatus: '',
                    createTimes: '',
                    confirmTimes:'',
                    hotelName:'',
                    roomNight:''
                },
                user_result:[],
                hotel_result:[],
                columns: [
                    {prop:"roomCode", label:this.$t('hotel.roomcode'), minWidth:60,width:170},
                    {prop:"inDateStart", label:this.$t('hotel.inDateStart'), minWidth:60,width:170},
                    {prop:"outDateEnd", label:this.$t('hotel.outDateEnd'), minWidth:60,width:170},
                    {prop:"pName", label:this.$t('hotel.representName'), minWidth:60,width:190},
                    {prop:"lastCrtTime", label:this.$t('hotel.lastCrtTime'), minWidth:60 ,width:190}
                ],
                pageRequest: { page: 1, rows: 8 },
                pageResult: {},

                operation: false, // true:新增, false:编辑
                editDialogVisible: false, // 新增编辑界面是否显示
                editLoading: false,
                provinceCode: [], //地区编码
                cityCode: [], //城市编码
                roomStatus:[],// 订单状态
                commonDate:[],
                roomPhoto:[],
                hotelType: [], //酒店类型
                hotelStar:[], //酒店星级
                roomStyle:[], //房间样式
                roomType:[], //房间类型
                breakType: [], //餐饮条件
                bedType: [], //床铺类型
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
                    totalTAmount:null,
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
                    sPrice: null,
                    roomNight:null
                },
                gridData:[],
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
                reportData:{}
            }
        },
        methods: {
            // 获取分页数据
            findPage: function (data) {
                this.pageRequest = { page: 1, rows: 10 };
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
                }).then(data!=null?data.callback:'' )
            },
            // 批量删除
            handleCancel: function (data) {
                this.$api.bizPuchs.batchCancel(data.params).then(data != null ? data.callback : '')
            },
            // 显示编辑界面
            handleEdit: function (params) {
                if (params.index.status != "1")
                {
                    this.$message({message: this.$t('action.canotEdite'), type: 'error'})
                    return
                }
                this.gridData=[];
                console.log("params",params)
                this.commonDate = [params.index.inDateStart,params.index.outDateEnd]
                var prm = {page:1,rows:10,'inDateStart': params.index.inDateStart,'outDateEnd': params.index.outDateEnd,'roomCode':params.index.roomCode};
                this.$api.hotelRoom.findPage(prm).then( res =>{
                    this.editDialogVisible = true;
                    this.operation = false;
                    this.dataForm = Object.assign({}, res.rows[0]);
                    var rqm = {'inDateStart': params.index.inDateStart,'outDateEnd': params.index.outDateEnd,'roomCode':params.index.roomCode}
                    this.$api.bizPuchs.findByDate(rqm).then((resDate) => {
                        this.gridData = resDate;
                        this.dataForm = Object.assign({}, params.index,res.rows[0]);
                    },() =>{
                    })
                });



            },
            validFunction:function () {
                if (this.commonDate.length < 1) {
                    this.$message({message: this.$t('action.pInOutDate'), type: 'error'})
                    return false;
                }
                if (this.dataForm.roomNum < 1) {
                    this.$message({message: this.$t('action.roomNumErr'), type: 'error'})
                    return false;
                }
                if (this.gridData.length != this.filters.roomNight) {
                    this.$message({message: this.$t('action.priceErr'), type: 'error'})
                    return false;
                }
                if (this.dataForm.totalTAmount == '' || this.dataForm.totalTAmount == null) {
                    this.$message({message: this.$t('action.operErr'), type: 'error'})
                    return false;
                }
                return true
            },
            // 编辑
            submitConfirmForm: function () {
                if (!this.validFunction()) {
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
                            let params = Object.assign({}, this.dataForm)
                            this.$api.bizPuchs.save(params).then((res) => {
                                if (res.code == 200) {
                                    this.$message({message: this.$t('action.success'), type: 'success'})
                                } else {
                                    this.$message({message: this.$t('action.fail') , type: 'error'})
                                }
                                this.editLoading = false
                                this.$refs['dataForm'].resetFields()
                                this.editDialogVisible = false
                                this.findPage(null)
                            }).catch((res) =>{
                                this.editLoading = false
                            })
                        })
                    }
                })
            },
            //确认按钮
            handleConfirm:function (data) {
                this.$api.bizPuchs.confirm(data.params).then(data!=null?data.callback:'' )
            },
            //结算按钮
            accountsConfirm:function (data) {
                this.$api.bizPuchs.accountsConfirm(data.params).then(data!=null?data.callback:'' )
            },
            //导出excel按钮
            exportExcel:function (data) {
                var sDate =data.params.inDateStart
                var eDate = data.params.outDateEnd
                var startDate = sDate.substr(0,4) + "/" +sDate.substr(4,2) +"/" +sDate.substr(6,2) ;
                var endDate = eDate.substr(0,4) + "/" + eDate.substr(4,2) +"/" +eDate.substr(6,2) ;
                var oDate1, oDate2, iDays
                oDate1 = Date.parse(startDate);
                oDate2 = Date.parse(endDate);
                iDays = parseInt(Math.abs(oDate1 -oDate2)/1000/60/60/24); //把相差的毫秒数转换为天数
                data.params.local = this.$i18n.locale=='zh_cn'?'1':'2';
                this.reportData = data.params;
                this.reportData.roomNight = iDays;
                this.reportData.hotelName = this.$i18n.locale=='zh_cn'?this.reportData.hotelCname:this.reportData.hotelEname;
                console.log("this.breakType",this.breakType);
                this.reportData.breaktype =  this.getKeyValue(this.reportData.breakType,this.breakType);
                this.reportData.roomtype = this.getKeyValue(this.reportData.roomType,this.roomType);
                this.reportData.personNum = this.reportData.adultNum+this.reportData.childNum
                console.log("this.reportData",this.reportData);
                if (this.reportData.hotelAddr == null ||  this.reportData.hotelAddr == "") {
                    this.reportData.hotelAddr = ' ';
                }
                if (this.reportData.hotelPhone == null ||  this.reportData.hotelPhone == "") {
                    this.reportData.hotelPhone = ' ';
                }
                if (this.reportData.remark == null ||  this.reportData.remark == "") {
                    this.reportData.remark = ' ';
                }


                this.orderDialogVisible = true;
                // this.$api.bizPuchs.exportExcel(data.params,{responseType: 'blob'}).then((res) => {
                //     if(res == 1) {
                //         this.$message({message: this.$t('action.success'), type: 'success'})
                //     } else {
                //         this.$message({message: this.$t('action.fail'), type: 'error'})
                //     }
                // })
            },
            //管理员导出excel按钮
            exportManagerExcel:function (data) {
                data.params.local = this.$i18n.locale=='zh_cn'?'1':'2';
                var sDate =data.params.inDateStart
                var eDate = data.params.outDateEnd
                var startDate = sDate.substr(0,4) + "/" +sDate.substr(4,2) +"/" +sDate.substr(6,2) ;
                var endDate = eDate.substr(0,4) + "/" + eDate.substr(4,2) +"/" +eDate.substr(6,2) ;
                var oDate1, oDate2, iDays
                oDate1 = Date.parse(startDate);
                oDate2 = Date.parse(endDate);
                iDays = parseInt(Math.abs(oDate1 -oDate2)/1000/60/60/24); //把相差的毫秒数转换为天数
                data.params.local = this.$i18n.locale=='zh_cn'?'1':'2';
                this.reportData = data.params;
                this.reportData.roomNight = iDays;
                this.reportData.hotelName = this.$i18n.locale=='zh_cn'?this.reportData.hotelCname:this.reportData.hotelEname;
                console.log("this.breakType",this.breakType);
                this.reportData.breaktype =  this.getKeyValue(this.reportData.breakType,this.breakType);
                this.reportData.roomtype = this.getKeyValue(this.reportData.roomType,this.roomType);
                this.reportData.personNum = this.reportData.adultNum+this.reportData.childNum
                this.reportData.c12Num = this.reportData.children612+this.reportData.children46+this.reportData.children4
                console.log("this.reportData",this.reportData);
                if (this.reportData.hotelFax == null ||  this.reportData.hotelFax == "") {
                    this.reportData.hotelFax = ' ';
                }
                this.reportData.totalNum = this.reportData.personNum + this.reportData.c12Num;

                this.customDialogVisible = true;



                // this.$api.bizPuchs.exportManagerExcel(data.params,{responseType: 'blob'}).then((res) => {
                //     if(res == 1) {
                //         this.$message({message: this.$t('action.success'), type: 'success'})
                //     } else {
                //         this.$message({message: this.$t('action.fail'), type: 'error'})
                //     }
                // })
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

            },
            getKeyValue:function(key,arr) {
                var obj;
                for (var i = 0 ; i < arr.length ; i++) {
                    obj = arr[i];
                    if (key == obj.code) {
                        return obj.name
                    }
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
                    num = this.dataForm.favorableprice * this.filters.roomNight*this.dataForm.roomNum ;
                }
                this.dataForm.totalSAmount = this.dataForm.roomNum==null?0:this.dataForm.roomNum * totlPrice-num;
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
                    num = this.dataForm.favorableprice * this.filters.roomNight*this.dataForm.roomNum ;
                }
                this.dataForm.totalSAmount = this.dataForm.roomNum==null?0:this.dataForm.roomNum * totlPrice-num;
            },
            'dataForm.adultNum'(){
                var totlPrice = 0;
                if(this.gridData.length<=0) {
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
                if(this.gridData.length<=0) {
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
                this.dataForm.totalSAmount = this.dataForm.roomNum==null?0:this.dataForm.roomNum * totlPrice-num;

                this.dataForm.totalTAmount = this.dataForm.roomNum==null?0:(this.dataForm.adultNum + this.dataForm.childNum) * tPrice;
            }
        },
        mounted() {

        },
        created(){
            this.getTypeValues('ROOM_STYLE,ROOM_TYPE,HOTEL_STAR,HOTEL_TYPE,BREAK_TYPE,BED_TYPE,PREFECTURE,DISTRICT,ROOM_STATUS').then( res =>{
                // console.log(res)
                this.roomStyle = res.ROOM_STYLE;
                this.roomType = res.ROOM_TYPE;
                this.hotelStar = res.HOTEL_STAR;
                this.hotelType = res.HOTEL_TYPE;
                this.breakType = res.BREAK_TYPE;
                this.bedType = res.BED_TYPE;
                this.provinceCode = res.PREFECTURE;
                this.cityCode = res.DISTRICT;
                this.roomStatus = res.ROOM_STATUS;
            })
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
        display: table;
    }
    .hotel-base>li>label{
        width: 200px;
        display: inline-block;
        margin-right: 6px;
    }
    .hotel-base>li>span{
        display: table-cell;
        vertical-align: middle;
    }
    .frame {
        width: 100%;
        height: 45rem;
    }
</style>
