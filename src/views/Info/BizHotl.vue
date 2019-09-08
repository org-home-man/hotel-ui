<template>
    <div class="container" style="width:99%">
        <!--工具栏-->
        <div class="toolbar query_room_container" style="padding-top:30px;padding-left:20px;">
            <el-form :inline="true" :model="filters" :size="size">
                <el-row>
                    <el-col :span="24" align="left">
                        <el-form-item>
                            <el-input v-model="filters.hotelCode" clearable :placeholder="$t('hotel.hotelCode')"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-select v-model="filters.provinceCode" clearable filterable
                                       :placeholder="$t('hotel.provinceCode.provinceCode')">
                                <el-option v-for="rt in provinceCode" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-select v-model="filters.cityCode" clearable filterable
                                       :placeholder="$t('hotel.cityCode.cityCode')">
                                <el-option v-for="rt in cityCode" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-input v-model="filters.hotelname" clearable :placeholder="$t('hotel.hotelname')"
                                      style="width:300px;"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-select v-model="filters.hotelType" clearable :placeholder="$t('hotel.hotelType.hotelType')">
                                <el-option v-for="rt in hotelType" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-select v-model="filters.hotelLevel" clearable :placeholder="$t('hotel.hotelLevel.hotelLevel')">
                                <el-option v-for="hs in hotelStar" :key="hs.code"
                                           :label="hs.name" :value="hs.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <kt-button :label="$t('action.search')" perms="sys:bizHotl:view" type="primary"
                                       @click="findPage(null)"/>
                        </el-form-item>
                        <el-form-item>
                            <kt-button :label="$t('action.add')" perms="sys:bizHotl:add" type="primary" @click="handleAdd"/>
                        </el-form-item>
                    </el-col>
                </el-row>


            </el-form>
        </div>
        <!--表格内容栏-->
        <hotle-table permsEdit="sys:bizHotl:edit" permsDelete="sys:bizHotl:delete"
                     :data="pageResult"
                     @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete"
                     :paraConfig="paraConfig">
        </hotle-table>

        <!--新增编辑界面-->
        <div class="hotelDialog">
        <el-dialog :title="operation?$t('action.add'):$t('action.edit')" width="800px" :visible.sync="editDialogVisible"
                   :close-on-click-modal="false">
            <el-form :model="dataForm" label-width="150px" :rules="dataFormRules" ref="dataForm" :size="size"
                     :inline="true" label-position="top">
                <!--<el-form-item label="酒店编号" prop="hotelCode"   v-if="dataForm.isPrimaryKey">-->
                <!--<el-input v-model="dataForm.hotelCode" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <el-row>

                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.countryCode.countryCode')" prop="countryCode" auto-complete="off">
                            <el-select v-model="dataForm.countryCode" :placeholder="$t('action.select')">
                                <el-option :label="$t('hotel.countryCode.countryCodeValue')" value="JPN"></el-option>
                                <!--<el-option v-for=" hotelName in hotelNames" :key="hotelName.hotelCode" :label="language.lge=='zh_cn'?hotelName.hotelCname:hotelName.hotelEname" :value="hotelName.hotelCode"></el-option>-->
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" align="left">
                        <el-form-item prop="provinceCode" :label="$t('hotel.provinceCode.provinceCode')">
                            <el-select v-model="dataForm.provinceCode" :placeholder="$t('action.select')">
                                <el-option v-for="rt in provinceCode" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" align="left">
                        <el-form-item prop="cityCode" :label="$t('hotel.cityCode.cityCode')">
                            <el-select v-model="dataForm.cityCode"  :placeholder="$t('action.select')">
                                <el-option v-for="rt in cityCode" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.hotelType.hotelType')" prop="hotelType" auto-complete="off">
                            <el-select v-model="dataForm.hotelType" :placeholder="$t('action.select')">
                                <el-option v-for="rt in hotelType" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.hotelLevel.hotelLevel')" prop="hotelLevel" auto-complete="off">
                            <el-select v-model="dataForm.hotelLevel" :placeholder="$t('action.select')">
                                <el-option v-for="rt in hotelStar" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.hotelWeb')" prop="hotelWeb">
                            <el-input v-model="dataForm.hotelWeb" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.hotelCname')" prop="hotelCname">
                            <el-input v-model="dataForm.hotelCname" auto-complete="off" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.hotelEname')" prop="hotelEname">
                            <el-input v-model="dataForm.hotelEname" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.hotelAddr')" prop="hotelAddr">
                            <el-input v-model="dataForm.hotelAddr" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.hotelPhone')" prop="hotelPhone">
                            <el-input v-model="dataForm.hotelPhone" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.hotelFax')" prop="hotelFax">
                            <el-input v-model="dataForm.hotelFax" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.scheduledays')" prop="scheduledays" auto-complete="off">
                            <el-input v-model.number="dataForm.scheduledays"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.favorableprice')" prop="favorableprice" auto-complete="off">
                            <el-input v-model="dataForm.favorableprice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" align="left">
                        <el-form-item :label="$t('hotel.evenlive')" prop="evenlive" auto-complete="off">
                            <el-input v-model.number="dataForm.evenlive"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" align="left">
                        <el-form-item :label="$t('hotel.present')" prop="present" auto-complete="off">
                            <el-input style="width: 640px;" v-model="dataForm.present" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
                <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">
                    {{$t('action.submit')}}
                </el-button>
            </div>
        </el-dialog>
        </div>
    </div>
</template>

<script>
    import HotleTable from "@/views/Core/HotleTable"
    import KtButton from "@/views/Core/KtButton"
    import {format} from "@/utils/datetime"

    export default {
        components: {
            HotleTable,
            KtButton
        },
        data() {
            var checkLength2 = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    if (value.length > 200) {
                        callback(new Error(this.$t('action.pLengthValue2')));
                    }
                    callback();
                }
            };
            var checkNumber = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    if (!Number.isInteger(value)) {
                        callback(new Error(this.$t('action.pNum')));
                    }
                    callback();
                }
            };
            var checkDoubleNumber = (rule, value, callback) => {
                var regNumber = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
                if (!value) {
                    callback();
                } else {
                    if (!regNumber.test(value)) {
                        callback(new Error(this.$t('action.pDoubleNum')));
                    }
                    callback();
                }
            };
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
                language: {},
                filters: {
                    hotelCode: '',
                    provinceCode: '',
                    cityCode: '',
                    hotelname: '',
                    hotelType: '',
                    hotelStar: '',
                    hotelLevel: ''
                },
                columns: [],
                pageRequest: {page: 1, rows: 10},
                pageResult: {},

                operation: false, // true:新增, false:编辑
                editDialogVisible: false, // 新增编辑界面是否显示
                editLoading: false,
                dataFormRules: {
                    label: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    // scheduledays: [
                    //     {required: true, message: this.$t('action.pScheduledays'), trigger: 'blur'},
                    //     {validator: checkNumber}
                    // ],
                    // evenlive: [
                    //     {required: true, message: this.$t('action.pEvenlive'), trigger: 'blur'},
                    //     {validator: checkNumber}
                    // ],
                    // favorableprice: [
                    //     {required: true, message: this.$t('action.pFavorableprice'), trigger: 'blur'},
                    //     {validator: checkDoubleNumber}
                    // ],
                    // present: [
                    //     {required: true, message: this.$t('action.present'), trigger: 'blur'},
                    //     {validator: checkLength2}
                    // ]
                },
                // 新增编辑界面数据
                dataForm: {
                    hotelCode: null,
                    countryCode: null,
                    provinceCode: null,
                    cityCode: null,
                    hotelType: null,
                    hotelLevel: null,
                    scheduledays: null,
                    favorableprice: null,
                    evenlive: null,
                    present: null,
                    hotelCname: null,
                    hotelEname: null,
                    hotelAddr: null,
                    hotelPhone: null,
                    hotelFax: null,
                    hotelWeb: null,
                    creatCy: null,
                    creatTime: null,
                    lastUpdateBy: null,
                    lastUpdateTime: null,

                },
                hotelNames: [],
                sysPara: {},
                sysPara1: {},
                bizHotl: [],
                hotelArea: [],
                paraConfig: {},
                areaConfig: [],
                language: {}
            }
        },
        methods: {
            // 获取分页数据
            findPage: function (data) {
                this.pageRequest = { page: 1, rows: 10 };
                if (data !== null) {
                    this.pageRequest = data.pageRequest
                }

                this.$api.bizHotl.findPage({...this.pageRequest, ...this.filters}).then((res) => {
                    this.pageResult = res
                }).then(data != null ? data.callback : '')
            },
            // 批量删除
            handleDelete: function (data) {
                this.$api.bizHotl.batchDelete(data.params, {headers: {'Content-Type': 'application/json;charset=UTF-8'}}).then(data != null ? data.callback : '')
            },
            // 显示新增界面
            handleAdd: function () {
                this.editDialogVisible = true
                this.operation = true
                this.dataForm = {
                    hotelCode: null,
                    countryCode: null,
                    provinceCode: null,
                    cityCode: null,
                    hotelType: null,
                    hotelLevel: null,
                    hotelStar: null,
                    hotelCname: null,
                    hotelEname: null,
                    scheduledays: null,
                    favorableprice: null,
                    evenlive: null,
                    present: null,
                    hotelAddr: null,
                    hotelPhone: null,
                    hotelFax: null,
                    hotelWeb: null,
                    creatCy: null,
                    creatTime: null,
                    lastUpdateBy: null,
                    lastUpdateTime: null,
                }
                /* 获取操作员 */
                this.dataForm.creatCy = sessionStorage.getItem('user');
                /* 获取操作时间 */
                var date = new Date();
                this.dataForm.creatTime = date;
                //console.log(date);
                /* */
            },
            // 显示编辑界面
            handleEdit: function (params) {
                this.editDialogVisible = true
                this.operation = false
                this.dataForm.lastUpdateBy = sessionStorage.getItem("user")

                /* 获取操作时间 */
                var date = new Date();
                this.dataForm.lastUpdateTime = date;
                this.dataForm = Object.assign({}, params.row)
            },
            // 编辑
            submitForm: function () {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {
                            type: 'warning',
                            cancelButtonText: this.$t('action.cancel'),
                            confirmButtonText: this.$t('action.confirm')
                        }).then(() => {
                            this.editLoading = true
                            let params = Object.assign({}, this.dataForm)
                            this.$api.bizHotl.save(params).then((res) => {
                                if (res.code == 200) {
                                    this.$message({message: this.$t('action.success'), type: 'success'})
                                } else {
                                    this.$message({message: this.$t('action.fail') + res.msg, type: 'error'})
                                }
                                this.editLoading = false
                                this.$refs['dataForm'].resetFields()
                                this.editDialogVisible = false
                                this.findPage(null)
                            })
                        }).finally(() => {
                            this.editLoading = false
                            this.editDialogVisible = false
                        })
                    }
                })
            },
            findDataSelect: function () {
                //this.sysPara={}
                console.log("lganguage " + this.$i18n.locale);
                this.sysPara = {language: this.$i18n.locale}
                let params = Object.assign({}, this.sysPara);
                this.$api.sysParaConfig.findKeyValueHotel(params).then((res) => {
                    this.paraConfig = res
                    console.log(this.paraConfig);
                })
            },
            localLanguageLoad: function () {
                this.language = {lge: this.$i18n.locale}
            },

            findAreaPage: function () {
                this.sysPara1 = {}
                let params = Object.assign({}, this.sysPara1);
                this.$api.hotelArea.findAreaPage(params).then((res) => {
                    this.AreaConfig = res
                    console.log(this.areaConfig);
                })
            },
            // 时间格式化
            dateFormat: function (row, column, cellValue, index) {
                return format(row[column.property])
            }
        },
        created() {
            this.getTypeValues('ROOM_STYLE,ROOM_TYPE,HOTEL_STAR,HOTEL_TYPE,BREAK_TYPE,BED_TYPE,PREFECTURE,DISTRICT').then(res => {
                // console.log(res)
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
            // this.findDataSelect()
            this.localLanguageLoad()
            // this.findAreaPage()
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
