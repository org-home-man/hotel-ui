<template>
    <div class="page-container">
        <!--工具栏-->
        <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
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
        <el-dialog :title="operation?'新增':'编辑'" width="80%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
            <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm"  :size="size":inline="true" label-position="left" >
                <el-row >
                    <el-col :span="18" align="left">
                        <el-form-item  prop="provinceCode" auto-complete="off" >
                            <el-select v-model="dataForm.provinceCode" disabled>
                                <el-option v-for="rt in paraConfig.provinceCode" :key="rt.paraCode"
                                           :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  prop="cityCode" auto-complete="off" >
                            <el-select v-model="dataForm.cityCode" disabled>
                                <el-option v-for="rt in paraConfig.cityCode" :key="rt.paraCode"
                                           :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="commonDate">
                            <el-date-picker disabled
                                            v-model="filters.commonDate"
                                            type="daterange"
                                            :range-separator="$t('hotel.dateSep')"
                                            value-format="yyyyMMdd"
                                            :start-placeholder="$t('hotel.inDateStart')"
                                            :end-placeholder="$t('hotel.outDateEnd')"
                                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item >
                            <el-input style="width: 50px" v-model="dataForm.roomNight" :placeholder="$t('hotel.roomNight')"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="6" align="right">
                        <el-form-item label-width="100px" :label="$t('hotel.sPrice')">
                            <el-input  v-model="dataForm.sPrice" disabled ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18" align="left">
                        <el-form-item  prop="hotelCode" >
                            <!--<el-select v-model="dataForm.hotelCode" disabled >
                                <el-option v-for=" hotelName in hotelNames" :key="hotelName.hotelCode"
                                           :label="language.lge=='zh_cn'?hotelName.hotelCname:hotelName.hotelEname"
                                           :value="hotelName.hotelCode"></el-option>
                            </el-select>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" align="right">
                        <el-form-item label-width="100px" style="margin-left: 20px" :label="$t('hotel.lastCrtTime')">
                            <el-date-picker
                                style="width: 188px"
                                v-model="dataForm.lastCrtTime"
                                align="right"
                                type="date"
                                :placeholder="$t('hotel.lastCrtTime')">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row >
                    <el-col :span="18" align="left">
                        <el-form-item>
                            <el-select v-model="dataForm.roomType" disabled
                                       :placeholder="$t('hotel.roomtype.roomtype')">
                                <el-option v-for="rs in paraConfig.roomtype" :key="rs.paraCode"
                                           :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.adultNum')">
                            <el-input v-model="dataForm.adultNum" :placeholder="$t('hotel.adultNum')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.childrenNum')">
                            <el-input v-model="dataForm.childNum" :placeholder="$t('hotel.childrenNum')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" align="right" >
                        <el-form-item :label="$t('hotel.inventory')">
                            <el-input v-model="dataForm.inventory" disabled
                                      :placeholder="$t('hotel.inventory')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="18" align="left">
                        <el-form-item :label="$t('hotel.hotelAddr')" prop="hotelAddr">
                            <el-input style="width: 500px" v-model="dataForm.hotelAddr" :disabled="true" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.hotelPhone')" prop="hotelPhone">
                            <el-input  v-model="dataForm.hotelPhone" :disabled="true" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" align="right">
                        <el-form-item  prop="hotelWeb">
                            <el-input style="width: 297px" v-model="dataForm.hotelWeb" :disabled="true" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--酒店简介 -->
                <el-row>
                    <el-col :span="24">
                        <el-input v-show="able"  type="textarea" style="width: 90%" v-model="dataForm.introC" :autosize="{ minRows: 5, maxRows: 20}" resize="none" readonly ></el-input>
                        <el-input v-show="!able" :label="$t('hotel.introe')" type="textarea" style="width: 90%" v-model="dataForm.introE"  resize="none"  readonly autosize></el-input>

                    </el-col>
                </el-row>

                <!--常用信息 -->
                <el-row style="margin: 30px 0px">
                    <el-col :span="24">
                        <el-collapse>
                            <el-collapse-item>
                                <template slot="title">
                                    <h2>{{$t('hotel.information')}}</h2>
                                </template>
                                <el-row style="margin-top: 10px">
                                    <el-col :span="24" align="center">
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.iswify==1" disabled fill="#409EFF" text-color="#ffffff" true-label="1" false-label="2" :label="$t('hotel.iswify')"
                                                         v-model="dataForm.iswify"  border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isfront==1" disabled true-label="1" false-label="2" :label="$t('hotel.isfront')"
                                                         v-model="dataForm.isfront"  border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isbarrifr==1" disabled true-label="1" false-label="2" :label="$t('hotel.isbarrifr')"
                                                         v-model="dataForm.isbarrifr"  border></el-checkbox>
                                        </el-form-item>

                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isbalcony==1" disabled true-label="1" false-label="2" :label="$t('hotel.isbalcony')"
                                                         v-model="dataForm.isbalcony" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.iskitchen==1" disabled true-label="1" false-label="2" :label="$t('hotel.iskitchen')"
                                                         v-model="dataForm.iskitchen" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.iswindow==1" disabled true-label="1" false-label="2" :label="$t('hotel.iswindow')"
                                                         v-model="dataForm.iswindow" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isheat==1" disabled true-label="1" false-label="2" :label="$t('hotel.isheat')"
                                                         v-model="dataForm.isheat" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isicebox==1" disabled true-label="1" false-label="2" :label="$t('hotel.isicebox')"
                                                         v-model="dataForm.isicebox" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isiron==1" disabled true-label="1" false-label="2" :label="$t('hotel.isiron')"
                                                         v-model="dataForm.isiron" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isnosmk==1" disabled true-label="1" false-label="2" :label="$t('hotel.isnosmk')"
                                                         v-model="dataForm.isnosmk" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.islandscape==1" disabled true-label="1" false-label="2" :label="$t('hotel.islandscape')"
                                                         v-model="dataForm.islandscape" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.ishighrise==1" disabled true-label="1" false-label="2" :label="$t('hotel.ishighrise')"
                                                         v-model="dataForm.ishighrise" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.ispark==1" disabled true-label="1" false-label="2" :label="$t('hotel.ispark')"
                                                         v-model="dataForm.ispark" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isgym==1" disabled true-label="1" false-label="2" :label="$t('hotel.isgym')"
                                                         v-model="dataForm.isgym" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isswmp==1" disabled true-label="1" false-label="2" :label="$t('hotel.isswmp')"
                                                         v-model="dataForm.isswmp" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isbeach==1" disabled true-label="1" false-label="2" :label="$t('hotel.isbeach')"
                                                         v-model="dataForm.isbeach" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.ishotsp==1" disabled true-label="1" false-label="2" :label="$t('hotel.ishotsp')"
                                                         v-model="dataForm.ishotsp" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.ischildct==1" disabled true-label="1" false-label="2" :label="$t('hotel.ischildct')"
                                                         v-model="dataForm.ischildct" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isroomserv==1" disabled true-label="1" false-label="2" :label="$t('hotel.isroomserv')"
                                                         v-model="dataForm.isroomserv" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isknead==1" disabled true-label="1" false-label="2" :label="$t('hotel.isknead')"
                                                         v-model="dataForm.isknead" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.islounge==1" disabled true-label="1" false-label="2" :label="$t('hotel.islounge')"
                                                         v-model="dataForm.islounge" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.issuper==1" disabled true-label="1" false-label="2" :label="$t('hotel.issuper')"
                                                         v-model="dataForm.issuper" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isbus==1" disabled true-label="1" false-label="2" :label="$t('hotel.isbus')"
                                                         v-model="dataForm.isbus" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.istrafic==1" disabled true-label="1" false-label="2" :label="$t('hotel.istrafic')"
                                                         v-model="dataForm.istrafic" border></el-checkbox>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox v-show="dataForm.isrestau==1" disabled true-label="1" false-label="2" :label="$t('hotel.isrestau')"
                                                         v-model="dataForm.isrestau" border></el-checkbox>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-collapse-item>
                        </el-collapse>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('hotel.representName')" prop="representName" auto-complete="off">
                            <el-input v-model="dataForm.pname"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.passportNo')" prop="passportNo" auto-complete="off">
                            <el-input v-model="dataForm.passport"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.birthday')" prop="birthday" auto-complete="off">
                            <el-input v-model="dataForm.birth"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.contactPhone')" prop="contactPhone" auto-complete="off">
                            <el-input v-model="dataForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('hotel.contactEmail')" prop="contactEmail" auto-complete="off">
                            <el-input v-model="dataForm.emailAddress"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.adultNum1')" prop="adultNum1" auto-complete="off">
                            <el-input v-model="dataForm.adultNum"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.children612')" prop="children612" auto-complete="off">
                            <el-input v-model="dataForm.bnum"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.children46')" prop="children46" auto-complete="off">
                            <el-input v-model="dataForm.cnum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('hotel.children04')" prop="children04" auto-complete="off">
                            <el-input v-model="dataForm.children04"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.roomNum')" prop="roomNum" auto-complete="off">
                            <el-input v-model="dataForm.roomNum"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.totalPrice')" prop="totalPrice" auto-complete="off">
                            <el-input v-model="dataForm.totalSAmount"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('hotel.reMark')" prop="reMark" auto-complete="off">
                            <el-input v-model="dataForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


            </el-form>
            <div slot="footer" class="dialog-footer">
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

    const invoice_start = new Date();
    const invoice_end = new Date();
    invoice_end.setTime(invoice_start.getTime() + 3600 * 1000 * 24 * 5)
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
                    hotelName: '',
                    inventory: '',
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
                    commonDate:[formatDate(invoice_start,'yyyyMMdd'),formatDate(invoice_end,'yyyyMMdd')],
                    adultNum: null,
                    childNum: null,
                    sPrice: null
                },
                paraConfig: [],
                pickerOptions:{
                    disabledDate : (time) => {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                states:[]
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
                    console.log(res)
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
                this.dataForm = Object.assign({}, params.row)
            },
            // 编辑
            submitConfirmForm: function () {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true
                            let params = Object.assign({}, this.dataForm)
                            this.$api.bizPuchs.confirm(params).then((res) => {
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
            this.findStatus()
        }
    }
</script>

<style scoped>

</style>
