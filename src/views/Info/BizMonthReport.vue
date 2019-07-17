<template>
    <div class="container" style="width:99%">
        <!--工具栏-->
        <div class="toolbar query_room_container" style="padding-top:30px;padding-left:20px;">
            <el-form :inline="true" :model="filters" :size="size" ref="filters">
                <el-row>
                    <el-col :span="24">
                        <el-form-item prop="reportId">
                            <el-input v-model="filters.reportId" clearable :placeholder="$t('hotel.reportId')"></el-input>
                        </el-form-item>

                        <el-form-item prop="reportText">
                            <el-input v-model="filters.reportTxt" clearable :placeholder="$t('hotel.reportTxt')"></el-input>
                        </el-form-item>

                        <el-form-item prop="reportMonth">
                            <el-date-picker
                                v-model="filters.reportMonth"
                                type="month"
                                format="MM"
                                value-format="MM"
                                :placeholder="$t('hotel.reportMonth')">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item prop="reportSeq">
                            <el-input v-model="filters.reportSeq" clearable :placeholder="$t('hotel.reportSeq')"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <kt-button :label="$t('action.search')" perms="sys:bizMonth:view" type="primary"
                                       @click="findPage(null)"/>
                            <el-button @click="clearAll('filters')">{{$t('action.clearAll')}}</el-button>
                        </el-form-item>

                    </el-col>
                </el-row>


            </el-form>
        </div>
        <!--表格内容栏-->
        <total-report-table perms="sys:bizMonthDetail:edit" @handleViewReport="handleViewReport" :data="pageResult" @findPage="findPage" >
        </total-report-table>

        <!--新增编辑界面-->
        <el-dialog :title="dataForm.reportTxt" width="70%" :visible.sync="r0001DialogVisible"
                   :close-on-click-modal="false">
            <iframe :src="'http://localhost:8081/birt/frameset?__report=r0001_report.rptdesign&report_id='+dataForm.reportId+'&report_month='+dataForm.reportMonth+
                                '&report_txt='+dataForm.reportTxt+'&report_date1='+dataForm.reportDate1+'&report_date2='+dataForm.reportDate2+'&status='+dataForm.local+
                                '&username='+dataForm.username"
                    scrolling="auto" frameborder="0" class="frame" >
            </iframe>

            <!--<el-button  @click="r0001ExportExcel()">{{$t('common.exportExcel')}}</el-button>-->
            <!--<el-table  :data="r0001Table" highlight-current-row  v-loading="r0001TableLoading" :element-loading-text="$t('action.loading')" border-->
                       <!--show-overflow-tooltip align="center" style="width:100%;margin-top: 10px" height="850px" >-->
                <!--<el-table-column  prop="orderCode" header-align="center" align="center" :label="$t('order.orderCode')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="hotelName" header-align="center" align="center" :label="$t('hotel.hotelname')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="roomType" header-align="center" align="center" :label="$t('hotel.roomtype.roomtype')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="inDateStart" header-align="center" align="center" :label="$t('hotel.inDateStart')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="totalSAmount" header-align="center" align="center" :label="$t('order.totalSAmount')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="createTime" header-align="center" align="center" :label="$t('order.createTime')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="createName" header-align="center" align="center" :label="$t('order.createName')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="updateTime" header-align="center" align="center" :label="$t('order.updateTime')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="updateName" header-align="center" align="center" :label="$t('order.updateName')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="status" header-align="center" align="center" :label="$t('order.roomStatus')">-->
                <!--</el-table-column>-->
            <!--</el-table>-->
            <!--分页栏-->
            <!--<div class="toolbar" style="padding:10px;">-->
                <!--<el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"-->
                               <!--:current-page="r0001Table.pageNum" :page-size="r0001Table.pageSize" :total="r0001Table.total" style="float:right;">-->
                <!--</el-pagination>-->
            <!--</div>-->

        </el-dialog>


        <!--新增编辑界面-->
        <el-dialog :title="dataForm.reportTxt" width="70%" :visible.sync="r0004DialogVisible"
                   :close-on-click-modal="false">
            <div class="iframe-container">
                <iframe :src="'http://localhost:8081/birt/frameset?__report=r0004_report.rptdesign&report_id='+dataForm.reportId+'&report_month='+dataForm.reportMonth+
                                '&report_txt='+dataForm.reportTxt+'&report_date1='+dataForm.reportDate1+'&report_date2='+dataForm.reportDate2"
                        scrolling="auto" frameborder="0" class="frame" >
                </iframe>
            </div>
            <!--<el-button  @click="r0004ExportExcel()">{{$t('common.exportExcel')}}</el-button>-->
            <!--<el-table  :data="r0004Table" highlight-current-row  v-loading="r0004TableLoading" :element-loading-text="$t('action.loading')" border-->
                       <!--show-overflow-tooltip align="center" style="width:100%;margin-top: 10px" height="850px" >-->
                <!--<el-table-column  prop="deptId" header-align="center" align="center" :label="$t('user.org')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="orderNum" header-align="center" align="center" :label="$t('order.orderNum')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="roomNum" header-align="center" align="center" :label="$t('order.roomNum')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="totalSellAmt" header-align="center" align="center" :label="$t('order.totalSellAmt')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="totalSettlementAmt" header-align="center" align="center" :label="$t('order.totalSettlementAmt')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="pendingAmt" header-align="center" align="center" :label="$t('order.pendingAmt')">-->
                <!--</el-table-column>-->
            <!--</el-table>-->
            <!--分页栏-->
            <!--<div class="toolbar" style="padding:10px;">-->
            <!--<el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"-->
            <!--:current-page="r0001Table.pageNum" :page-size="r0001Table.pageSize" :total="r0001Table.total" style="float:right;">-->
            <!--</el-pagination>-->
            <!--</div>-->

        </el-dialog>

        <!--新增编辑界面-->
        <el-dialog :title="dataForm.reportTxt" width="70%" :visible.sync="r0005DialogVisible"
                   :close-on-click-modal="false">
            <!--<el-button  @click="r0005ExportExcel()">{{$t('common.exportExcel')}}</el-button>-->
            <!--<el-table  :data="r0005Table" highlight-current-row  v-loading="r0005TableLoading" :element-loading-text="$t('action.loading')" border-->
                       <!--show-overflow-tooltip align="center" style="width:100%;margin-top: 10px" height="850px" >-->
                <!--<el-table-column  prop="hotelName" header-align="center" align="center" :label="$t('hotel.hotelname')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="orderNum" header-align="center" align="center" :label="$t('order.orderNum')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="roomNum" header-align="center" align="center" :label="$t('order.roomNum')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="totalSellAmt" header-align="center" align="center" :label="$t('order.totalSellAmt')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="totalSettlementAmt" header-align="center" align="center" :label="$t('order.totalSettlementAmt')">-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="pendingAmt" header-align="center" align="center" :label="$t('order.pendingAmt')">-->
                <!--</el-table-column>-->
            <!--</el-table>-->
            <!--分页栏-->
            <!--<div class="toolbar" style="padding:10px;">-->
            <!--<el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"-->
            <!--:current-page="r0001Table.pageNum" :page-size="r0001Table.pageSize" :total="r0001Table.total" style="float:right;">-->
            <!--</el-pagination>-->
            <!--</div>-->

        </el-dialog>

        <!--新增编辑界面-->
        <el-dialog :title="dataForm.reportTxt" width="70%" :visible.sync="r0006DialogVisible"
                   :close-on-click-modal="false">

            <iframe :src="'http://localhost:8081/birt/frameset?__report=r0006_report.rptdesign&report_id='+dataForm.reportId+'&report_month='+dataForm.reportMonth+
                                '&report_txt='+dataForm.reportTxt+'&report_date1='+dataForm.reportDate1+'&report_date2='+dataForm.reportDate2+'&status='+dataForm.local"
                    scrolling="auto" frameborder="0" class="frame" >
            </iframe>
            <!--<el-button  @click="r0005ExportExcel()">{{$t('common.exportExcel')}}</el-button>-->
            <!--<el-table  :data="r0005Table" highlight-current-row  v-loading="r0005TableLoading" :element-loading-text="$t('action.loading')" border-->
            <!--show-overflow-tooltip align="center" style="width:100%;margin-top: 10px" height="850px" >-->
            <!--<el-table-column  prop="hotelName" header-align="center" align="center" :label="$t('hotel.hotelname')">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="orderNum" header-align="center" align="center" :label="$t('order.orderNum')">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="roomNum" header-align="center" align="center" :label="$t('order.roomNum')">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="totalSellAmt" header-align="center" align="center" :label="$t('order.totalSellAmt')">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="totalSettlementAmt" header-align="center" align="center" :label="$t('order.totalSettlementAmt')">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="pendingAmt" header-align="center" align="center" :label="$t('order.pendingAmt')">-->
            <!--</el-table-column>-->
            <!--</el-table>-->
            <!--分页栏-->
            <!--<div class="toolbar" style="padding:10px;">-->
            <!--<el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"-->
            <!--:current-page="r0001Table.pageNum" :page-size="r0001Table.pageSize" :total="r0001Table.total" style="float:right;">-->
            <!--</el-pagination>-->
            <!--</div>-->

        </el-dialog>

        <el-dialog :title="dataForm.reportTxt" width="70%" :visible.sync="r0008DialogVisible"
                   :close-on-click-modal="false">

            <iframe :src="'http://localhost:8081/birt/frameset?__report=r0008_report.rptdesign&report_id='+dataForm.reportId+'&report_month='+dataForm.reportMonth+
                                '&report_txt='+dataForm.reportTxt+'&report_date1='+dataForm.reportDate1+'&report_date2='+dataForm.reportDate2+'&status='+dataForm.local"
                    scrolling="auto" frameborder="0" class="frame" >
            </iframe>
            <!--<el-button  @click="r0005ExportExcel()">{{$t('common.exportExcel')}}</el-button>-->
            <!--<el-table  :data="r0005Table" highlight-current-row  v-loading="r0005TableLoading" :element-loading-text="$t('action.loading')" border-->
            <!--show-overflow-tooltip align="center" style="width:100%;margin-top: 10px" height="850px" >-->
            <!--<el-table-column  prop="hotelName" header-align="center" align="center" :label="$t('hotel.hotelname')">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="orderNum" header-align="center" align="center" :label="$t('order.orderNum')">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="roomNum" header-align="center" align="center" :label="$t('order.roomNum')">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="totalSellAmt" header-align="center" align="center" :label="$t('order.totalSellAmt')">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="totalSettlementAmt" header-align="center" align="center" :label="$t('order.totalSettlementAmt')">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="pendingAmt" header-align="center" align="center" :label="$t('order.pendingAmt')">-->
            <!--</el-table-column>-->
            <!--</el-table>-->
            <!--分页栏-->
            <!--<div class="toolbar" style="padding:10px;">-->
            <!--<el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"-->
            <!--:current-page="r0001Table.pageNum" :page-size="r0001Table.pageSize" :total="r0001Table.total" style="float:right;">-->
            <!--</el-pagination>-->
            <!--</div>-->

        </el-dialog>

    </div>
</template>

<script>
    import TotalReportTable from "@/views/Core/TotalReportTable"
    import KtButton from "@/views/Core/KtButton"
    import {format} from "@/utils/datetime"
    import {getUser} from "../../utils/token";

    export default {
        components: {
            TotalReportTable,
            KtButton
        },
        data() {
            return {
                size: 'small',
                r0001TableLoading:false,//r0001报表加载
                r0001DialogVisible:false,//月报r0001弹出框
                r0004TableLoading:false,//r0004报表加载
                r0004DialogVisible:false,//月报r0004弹出框
                r0005TableLoading:false,//r0005报表加载
                r0005DialogVisible:false,//月报r0005弹出框
                r0006DialogVisible:false, //月报r0006弹出框
                r0008DialogVisible:false,//月报r0008弹出框
                hotelType: [], //酒店类型
                hotelStar: [], //酒店星级
                roomStyle: [], //房间样式
                roomType: [], //房间类型
                breakType: [], //餐饮条件
                bedType: [], //床铺类型
                provinceCode: [], //地区编码
                cityCode: [], //城市编码
                filters: {
                    reportId: '',
                    reportText: '',
                    reportMonth: '',
                    reportSeq: ''
                },
                columns: [],
                pageRequest: {page: 1, rows: 10},
                pageResult: {},
                // 新增编辑界面数据
                dataForm: {

                },
                r0001Table:[], //统计报表返回值
                r0004Table:[], //
                r0005Table:[]
            }
        },
        methods: {
            // 获取分页数据
            findPage: function (data) {
                if (data !== null) {
                    this.pageRequest = data.pageRequest
                }

                this.$api.report.findMonthPage({...this.pageRequest, ...this.filters}).then((res) => {
                    this.pageResult = res
                }).then(data != null ? data.callback : '')
            },
            // 显示编辑界面
            handleViewReport: function (params) {
                this.dataForm = {};
                this.dataForm = Object.assign({}, params.row)
                var reportId = this.dataForm.reportId;
                console.log(reportId);
                if (reportId != '') {
                    var reportNm = reportId.substring(4)
                    if (reportNm == 'R0001') {
                        this.dataForm.local = this.$i18n.locale=='zh_cn'?'1':'2';
                        var strTime = reportId.substring(0,4)+"-"+this.dataForm.reportMonth;
                        this.getCurrentMonthFirst(strTime);
                        this.getCurrentMonthLast(strTime);
                        this.dataForm.reportTxt = strTime+" "+this.dataForm.reportTxt
                        this.dataForm.username = getUser();
                        this.r0001DialogVisible = true

                    }
                    if (reportNm == 'R0004') {
                        this.dataForm.local = this.$i18n.locale=='zh_cn'?'1':'2';
                        this.getCurrentMonthFirst(strTime);
                        this.getCurrentMonthLast(strTime);
                        this.r0004DialogVisible = true
                        // this.$api.report.findR0004Report(this.dataForm).then((res) => {
                        //     this.r0004Table = res
                        //     this.r0004TableLoading = false;
                        // })
                    }

                    if (reportNm == 'R0005') {
                        this.r0005DialogVisible = true
                        this.r0005TableLoading = true
                        this.dataForm.local = this.$i18n.locale=='zh_cn'?'1':'2';
                        this.$api.report.findR0005Report(this.dataForm).then((res) => {
                            this.r0005Table = res
                            this.r0005TableLoading = false;
                        })
                    }

                    if (reportNm == 'R0006') {
                        this.dataForm.local = this.$i18n.locale=='zh_cn'?'1':'2';
                        var strTime = reportId.substring(0,4)+"-"+this.dataForm.reportMonth;
                        this.getCurrentMonthFirst(strTime);
                        this.getCurrentMonthLast(strTime);
                        this.dataForm.reportTxt = strTime+" "+this.dataForm.reportTxt
                        this.r0006DialogVisible = true

                    }

                    if (reportNm == 'R0008') {
                        this.dataForm.local = this.$i18n.locale=='zh_cn'?'1':'2';
                        var strTime = reportId.substring(0,4)+"-"+this.dataForm.reportMonth;
                        this.getCurrentMonthFirst(strTime);
                        this.getCurrentMonthLast(strTime);
                        this.dataForm.reportTxt = strTime+" "+this.dataForm.reportTxt
                        this.r0008DialogVisible = true

                    }


                }
            },
            r0001ExportExcel:function() {
                this.$api.report.exportR0001Report(this.dataForm,{responseType: 'blob'}).then((res) => {
                    if(res == 1) {
                        this.$message({message: this.$t('action.success'), type: 'success'})
                    } else {
                        this.$message({message: this.$t('action.fail'), type: 'error'})
                    }
                })
            },
            r0004ExportExcel:function() {
                this.$api.report.exportR0004Report(this.dataForm,{responseType: 'blob'}).then((res) => {
                    if(res == 1) {
                        this.$message({message: this.$t('action.success'), type: 'success'})
                    } else {
                        this.$message({message: this.$t('action.fail'), type: 'error'})
                    }
                })
            },
            r0005ExportExcel:function() {
                this.$api.report.exportR0005Report(this.dataForm,{responseType: 'blob'}).then((res) => {
                    if(res == 1) {
                        this.$message({message: this.$t('action.success'), type: 'success'})
                    } else {
                        this.$message({message: this.$t('action.fail'), type: 'error'})
                    }
                })
            },
            // 编辑
            submitForm: function () {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {}).then(() => {

                        })
                    }
                })
            },
            getCurrentMonthFirst:function(str) {
                var strTime =  str+"-01";
                var date = new Date(Date.parse(strTime.replace(/-/g, "/")));
                date.setDate(1);
                var month = parseInt(date.getMonth()+1);
                var day = date.getDate();
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                this.dataForm.reportDate1 = date.getFullYear() + '-' + month + '-' + day;
            },
            getCurrentMonthLast:function(str) {
                var strTime =  str+"-01";
                var date = new Date(Date.parse(strTime.replace(/-/g, "/")));
                var currentMonth=date.getMonth();
                var nextMonth=++currentMonth;
                var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
                var oneDay=1000*60*60*24;
                var lastTime = new Date(nextMonthFirstDay-oneDay);
                var month = parseInt(lastTime.getMonth()+1);
                var day = lastTime.getDate();
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                this.dataForm.reportDate2 = date.getFullYear() + '-' + month + '-' + day ;
            }
        },
        created() {
            this.getTypeValues('ROOM_STYLE,ROOM_TYPE,HOTEL_STAR,HOTEL_TYPE,BREAK_TYPE,BED_TYPE,PREFECTURE,DISTRICT').then(res => {
                this.paraConfig = res;
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

        }
    }
</script>

<style scoped>
    .el-input {
        width: 180px;
    }

    .el-select {
        width: 180px;
    }

    .query_room_container {
        padding-top: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .frame {
        width: 100%;
        height: 800px;
    }

</style>
