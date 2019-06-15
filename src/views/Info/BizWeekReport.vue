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
                            <kt-button :label="$t('action.search')" perms="sys:bizWeek:view" type="primary"
                                       @click="findPage(null)"/>
                            <el-button @click="clearAll('filters')">{{$t('action.clearAll')}}</el-button>
                        </el-form-item>

                    </el-col>
                </el-row>


            </el-form>
        </div>
        <!--表格内容栏-->
        <total-report-table perms="sys:bizViewsDetail:edit" @handleViewReport="handleViewReport" :data="pageResult" @findPage="findPage" >
        </total-report-table>

        <!--新增编辑界面-->
        <el-dialog :title="dataForm.reportTxt" width="70%" :visible.sync="r0002DialogVisible"
                   :close-on-click-modal="false">

            <el-button  @click="r0002ExportExcel()">{{$t('common.export')}}</el-button>
            <el-table  :data="r0002Table" highlight-current-row  v-loading="r0002TableLoading" :element-loading-text="$t('action.loading')" border
                       show-overflow-tooltip align="center" style="width:100%;margin-top: 10px" height="600px" >
                <el-table-column  prop="orderCode" header-align="center" align="center" :label="$t('order.orderCode')">
                </el-table-column>
                <el-table-column  prop="hotelName" header-align="center" align="center" :label="$t('hotel.hotelname')">
                </el-table-column>
                <el-table-column  prop="roomType" header-align="center" align="center" :label="$t('hotel.roomtype.roomtype')">
                </el-table-column>
                <el-table-column  prop="inDateStart" header-align="center" align="center" :label="$t('hotel.inDateStart')">
                </el-table-column>
                <el-table-column  prop="totalSAmount" header-align="center" align="center" :label="$t('order.totalSAmount')">
                </el-table-column>
                <el-table-column  prop="createTime" header-align="center" align="center" :label="$t('order.createTime')">
                </el-table-column>
                <el-table-column  prop="createName" header-align="center" align="center" :label="$t('order.createName')">
                </el-table-column>
                <el-table-column  prop="updateTime" header-align="center" align="center" :label="$t('order.updateTime')">
                </el-table-column>
                <el-table-column  prop="updateName" header-align="center" align="center" :label="$t('order.updateName')">
                </el-table-column>
                <el-table-column  prop="status" header-align="center" align="center" :label="$t('order.roomStatus')">
                </el-table-column>
            </el-table>
            <!--分页栏-->
            <div class="toolbar" style="padding:10px;">
                <el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"
                               :current-page="r0002Table.pageNum" :page-size="r0002Table.pageSize" :total="r0002Table.total" style="float:right;">
                </el-pagination>
            </div>

        </el-dialog>


        <!--新增编辑界面-->
        <el-dialog :title="dataForm.reportTxt" width="70%" :visible.sync="r0003DialogVisible"
                   :close-on-click-modal="false">

            <el-button  @click="r0003ExportExcel()">{{$t('common.export')}}</el-button>
            <el-table  :data="r0003Table" highlight-current-row  v-loading="r0003TableLoading" :element-loading-text="$t('action.loading')" border
                       show-overflow-tooltip align="center" style="width:100%;margin-top: 10px" height="600px" >
                <el-table-column  prop="orderCode" header-align="center" align="center" :label="$t('order.orderCode')">
                </el-table-column>
                <el-table-column  prop="hotelName" header-align="center" align="center" :label="$t('hotel.hotelname')">
                </el-table-column>
                <el-table-column  prop="roomType" header-align="center" align="center" :label="$t('hotel.roomtype.roomtype')">
                </el-table-column>
                <el-table-column  prop="inDateStart" header-align="center" align="center" :label="$t('hotel.inDateStart')">
                </el-table-column>
                <el-table-column  prop="totalSAmount" header-align="center" align="center" :label="$t('order.totalSAmount')">
                </el-table-column>
                <el-table-column  prop="createTime" header-align="center" align="center" :label="$t('order.createTime')">
                </el-table-column>
                <el-table-column  prop="createName" header-align="center" align="center" :label="$t('order.createName')">
                </el-table-column>
                <el-table-column  prop="updateTime" header-align="center" align="center" :label="$t('order.updateTime')">
                </el-table-column>
                <el-table-column  prop="updateName" header-align="center" align="center" :label="$t('order.updateName')">
                </el-table-column>
                <el-table-column  prop="status" header-align="center" align="center" :label="$t('order.roomStatus')">
                </el-table-column>
            </el-table>
            <!--分页栏-->
            <div class="toolbar" style="padding:10px;">
                <el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"
                               :current-page="r0003Table.pageNum" :page-size="r0003Table.pageSize" :total="r0003Table.total" style="float:right;">
                </el-pagination>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import TotalReportTable from "@/views/Core/TotalReportTable"
    import KtButton from "@/views/Core/KtButton"
    import {format} from "@/utils/datetime"

    export default {
        components: {
            TotalReportTable,
            KtButton
        },
        data() {
            return {
                size: 'small',
                r0002TableLoading:false,//r0002报表加载
                r0002DialogVisible:false,//周报r0002弹出框
                r0003TableLoading:false,//r0002报表加载
                r0003DialogVisible:false,//周报r0002弹出框
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
                    reportTxt: '',
                    reportMonth: '',
                    reportSeq: '',
                    reportYear:''
                },
                pageRequest: {page: 1, rows: 10},
                pageResult: {},
                // 新增编辑界面数据
                dataForm: {},
                r0002Table:[], //报表r0002统计的值
                r0003Table:[]  //报表r0003统计的值

            }
        },
        methods: {
            // 获取分页数据
            findPage: function (data) {
                if (data !== null) {
                    this.pageRequest = data.pageRequest
                }

                this.$api.report.findPage({...this.pageRequest, ...this.filters}).then((res) => {
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
                    if (reportNm == 'R0002') {
                        this.r0002DialogVisible = true
                        this.r0002TableLoading = true
                        this.dataForm.local = this.$i18n.locale=='zh_cn'?'1':'2';
                        this.$api.report.findR0002Report(this.dataForm).then((res) => {
                            this.r0002Table = res
                            this.r0002TableLoading = false;
                        })
                    }
                    if (reportNm == 'R0003') {
                        this.r0003DialogVisible = true
                        this.r0003TableLoading = true
                        this.dataForm.local = this.$i18n.locale=='zh_cn'?'1':'2';
                        this.$api.report.findR0003Report(this.dataForm).then((res) => {
                            this.r0003Table = res
                            this.r0003TableLoading = false;
                        })
                    }
                }
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
            //导出Excel
            r0002ExportExcel() {
                this.$api.report.exportR0002Report(this.dataForm,{responseType: 'blob'}).then((res) => {
                    if(res == 1) {
                        this.$message({message: '操作成功', type: 'success'})
                    } else {
                        this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                    }
                })
            },

            // 时间格式化
            dateFormat: function (row, column, cellValue, index) {
                return format(row[column.property])
            },
            clearAll: function (formName) {
                this.$refs[formName].resetFields();
            },
            // 换页刷新
            refreshPageRequest: function (pageNum) {
                this.pageRequest.page = pageNum
                this.findPage()
            }
        },
        created() {
            this.getTypeValues('ROOM_STYLE,ROOM_TYPE,HOTEL_STAR,HOTEL_TYPE,BREAK_TYPE,BED_TYPE,PREFECTURE,DISTRICT').then(res => {
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

</style>
