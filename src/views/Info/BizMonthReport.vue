<template>
    <div class="container" style="width:99%">
        <!--工具栏-->
        <div class="toolbar query_room_container" style="padding-top:30px;padding-left:20px;">
            <el-form :inline="true" :model="filters" :size="size">
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <el-input v-model="filters.reportId" clearable :placeholder="$t('hotel.reportId')"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <<el-input v-model="filters.reportText" clearable :placeholder="$t('hotel.reportText')"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-select v-model="filters.reportMonth" clearable filterable
                                       :placeholder="$t('hotel.cityCode.cityCode')">
                                <el-option v-for="rt in cityCode" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <<el-select v-model="filters.reportReq" clearable filterable
                                        :placeholder="$t('hotel.cityCode.cityCode')">
                            <el-option v-for="rt in cityCode" :key="rt.code"
                                       :label="rt.name" :value="rt.code"></el-option>
                        </el-select>
                        </el-form-item>

                        <el-form-item>
                            <kt-button :label="$t('action.search')" perms="sys:bizWeek:view" type="primary"
                                       @click="findPage(null)"/>
                        </el-form-item>


                    </el-col>
                </el-row>


            </el-form>
        </div>
        <!--表格内容栏-->
        <total-report-table perms="sys:bizViewsDetail:edit"
                     :data="pageResult" @findPage="findPage" :paraConfig="paraConfig">
        </total-report-table>

        <!--新增编辑界面-->

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

                }
            }
        },
        methods: {
            // 获取分页数据
            findPage: function (data) {
                if (data !== null) {
                    this.pageRequest = data.pageRequest
                }

                this.$api.bizHotl.findPage({...this.pageRequest, ...this.filters}).then((res) => {
                    this.pageResult = res
                }).then(data != null ? data.callback : '')
            },
            // 显示编辑界面
            handleEdit: function (params) {

                this.dataForm = Object.assign({}, params.row)
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
            // 时间格式化
            dateFormat: function (row, column, cellValue, index) {
                return format(row[column.property])
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

</style>
