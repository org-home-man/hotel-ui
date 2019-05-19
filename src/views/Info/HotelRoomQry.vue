<template>
    <div class="container" style="width:99%;margin-top:-25px;margin-bottom: 50px;">
        <!--工具栏-->
        <div class="header" style="padding-top:30px;padding-left:20px;">
            <el-form :inline="true" ref="filters" :model="filters" :size="size">
                <el-row>
                    <el-col :span="50" align="left">
                        <el-form-item prop="provinceCode">
                            <el-select v-model="filters.provinceCode" :placeholder="$t('hotel.provinceCode.provinceCode')">
                                <el-option v-for="rt in paraConfig.provinceCode" :key="rt.paraCode"
                                           :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="cityCode">
                            <el-select v-model="filters.cityCode" :placeholder="$t('hotel.cityCode.cityCode')">
                                <el-option v-for="rt in paraConfig.cityCode" :key="rt.paraCode"
                                           :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="commonDate">
                            <el-date-picker
                                v-model="filters.commonDate"
                                type="daterange"
                                :clearable="false"
                                value-format="yyyyMMdd"
                                :start-placeholder="$t('hotel.inDateStart')"
                                :end-placeholder="$t('hotel.outDateEnd')"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="50" align="left">
                        <el-form-item prop="roomNum" :label="$t('hotel.roomNum')">
                            <el-input-number v-model="filters.roomNum" :placeholder="$t('hotel.roomNum')" :min="1"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="50" align="left">
                        <el-form-item prop="adultNum" :label="$t('hotel.adultNum')">
                            <el-input-number v-model="filters.adultNum" :placeholder="$t('hotel.adultNum')" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item prop="childrenNum" :label="$t('hotel.childrenNum')">
                            <el-input-number v-model="filters.childrenNum" :placeholder="$t('hotel.childrenNum')" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                    <el-col :span="12" align="left">
                        <el-form-item prop="hotelType" :label="$t('hotel.hotelType.hotelType')">
                            <el-select v-model="filters.hotelType" :placeholder="$t('hotel.hotelType.hotelType')">
                                <el-option v-for="rt in paraConfig.hotelType" :key="rt.paraCode"
                                           :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="roomType" :label="$t('hotel.roomtype.roomtype')">
                            <el-select v-model="filters.roomType" :placeholder="$t('hotel.roomtype.roomtype')">
                                <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode"
                                           :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" align="left">
                        <el-form-item prop="roomStyle" :label="$t('hotel.roomstyle.roomstyle')">
                            <el-select v-model="filters.roomStyle" :placeholder="$t('hotel.roomstyle.roomstyle')">
                                <el-option v-for="rs in paraConfig.roomstyle" :key="rs.paraCode"
                                           :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="bedType" :label="$t('hotel.bedtype.bedtype')">
                            <el-select v-model="filters.bedType" :placeholder="$t('hotel.bedtype.bedtype')">
                                <el-option v-for="bt in paraConfig.bedtype" :key="bt.paraCode"
                                           :label="$t('hotel.'+ bt.paraCode)" :value="bt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" align="left">
                        <el-form-item prop="breakType" :label="$t('hotel.breaktype.breaktype')">
                            <el-select v-model="filters.breakType" :placeholder="$t('hotel.breaktype.breaktype')">
                                <el-option v-for="bk in paraConfig.breaktype" :key="bk.paraCode"
                                           :label="$t('hotel.'+ bk.paraCode)" :value="bk.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="roomArea" :label="$t('hotel.roomarea')+'(m2)'">
                            <el-input v-model="filters.roomArea" :placeholder="$t('hotel.roomarea')+'(m2)'"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="24" align="left">
                        <el-form-item prop="hotelLevel">
                            <el-select v-model="filters.hotelLevel" :placeholder="$t('hotel.hotelLevel.hotelLevel')">
                                <el-option v-for="rt in paraConfig.hotelLevel" :key="rt.paraCode"
                                           :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="hotelCode" >
                            <el-input v-model="filters.hotelCode" :placeholder="$t('hotel.hotelname')"></el-input>
                        </el-form-item>
                        <el-form-item prop="lowRoomPrice" :label="$t('hotel.lowRoomPrice')">
                            <el-input-number v-model="filters.lowRoomPrice" :placeholder="$t('hotel.lowRoomPrice')" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item prop="highRoomPrice" :label="$t('hotel.highRoomPrice')">
                            <el-input-number v-model="filters.highRoomPrice" :placeholder="$t('hotel.highRoomPrice')" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>

                </el-row>

                <!--<br>-->
                <h3 style="text-align: left">{{$t('hotel.information')}}</h3>
                <el-row>
                    <el-col :span="60" align="left">
                        <el-form-item prop="iswify">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswify')"
                                         v-model="filters.iswify" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isfront">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isfront')"
                                         v-model="filters.isfront" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isbarrifr">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbarrifr')"
                                         v-model="filters.isbarrifr" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isbalcony">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbalcony')"
                                         v-model="filters.isbalcony" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="iskitchen">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iskitchen')"
                                         v-model="filters.iskitchen" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="iswindow">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswindow')"
                                         v-model="filters.iswindow" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="50" align="left">
                        <el-form-item prop="isheat">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isheat')"
                                         v-model="filters.isheat" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isicebox">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isicebox')"
                                         v-model="filters.isicebox" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isiron">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isiron')"
                                         v-model="filters.isiron" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isnosmk">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isnosmk')"
                                         v-model="filters.isnosmk" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="islandscape">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islandscape')"
                                         v-model="filters.islandscape" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="ishighrise">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishighrise')"
                                         v-model="filters.ishighrise" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="50" align="left">
                        <el-form-item prop="ispark">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ispark')"
                                         v-model="filters.ispark" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isgym">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isgym')"
                                         v-model="filters.isgym" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isswmp">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isswmp')"
                                         v-model="filters.isswmp" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isbeach">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbeach')"
                                         v-model="filters.isbeach" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="ishotsp">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishotsp')"
                                         v-model="filters.ishotsp" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="ischildct">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ischildct')"
                                         v-model="filters.ischildct" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="50" align="left">
                        <el-form-item prop="isroomserv">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isroomserv')"
                                         v-model="filters.isroomserv" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isknead">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isknead')"
                                         v-model="filters.isknead" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="islounge">
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islounge')"
                                         v-model="filters.islounge" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col align="left">
                        <el-form-item prop="issuper">
                            <el-checkbox style="width: 395px" true-label="1" false-label="2" :label="$t('hotel.issuper')"
                                         v-model="filters.issuper" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isbus">
                            <el-checkbox style="width: 395px" true-label="1" false-label="2" :label="$t('hotel.isbus')"
                                         v-model="filters.isbus" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col align="left">
                        <el-form-item prop="istrafic">
                            <el-checkbox style="width: 395px" true-label="1" false-label="2" :label="$t('hotel.istrafic')"
                                         v-model="filters.istrafic" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isrestau">
                            <el-checkbox style="width: 395px" true-label="1" false-label="2" :label="$t('hotel.isrestau')"
                                         v-model="filters.isrestau" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <kt-button :label="$t('action.search')" style="width: 200px" perms="sys:bizRoom:view" type="primary"
                               @click="findPage(null)"/>
                    <el-button style="width: 200px" type="info" @click="clearAll('filters')">{{$t('action.clearAll')}}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--表格内容栏-->
        <template>
            <div style="height: auto">
                <!--表格栏-->
                <el-table :data="this.pageResult.rows" ref="table" :highlight-current-row="highlightCurrentRow" @row-click="selectRow"
                           v-loading="loading" :element-loading-text="$t('action.loading')"
                          :border="border" :stripe="stripe"
                          :show-overflow-tooltip="showOverflowTooltip" size="mini" :align="align"
                          style="width:100%;">
                    <el-table-column :label="$t('action.operation')" width="55">
                        <template slot-scope="scope">
                            <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column width="100" prop="hotelCode" header-align="center" align="center" :label="$t('hotel.hotelCode')">
                    </el-table-column>
                    <el-table-column width="120" prop="provinceCode" header-align="center" align="center"
                                     :label="$t('hotel.provinceCode.provinceCode')">
                        <template slot-scope="scope">
                            <el-tag>{{$t('hotel.'+scope.row.provinceCodeKey)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column width="120" prop="cityCode" header-align="center" align="center"
                                     :label="$t('hotel.cityCode.cityCode')">
                        <template slot-scope="scope">
                            <el-tag>{{$t('hotel.'+scope.row.cityCodeKey)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" :prop="language.lge=='zh_cn'?'hotelCname':'hotelEname'" header-align="center"
                                     align="center" :label="$t('hotel.hotelname')">
                    </el-table-column>
                    <el-table-column prop="hotelType" header-align="center" align="center"
                                     :label="$t('hotel.hotelType.hotelType')">
                        <template slot-scope="scope">
                            <el-table-column>{{$t('hotel.'+scope.row.hotelTypeKey)}}</el-table-column>
                        </template>
                    </el-table-column>

                    <el-table-column prop="roomTypeKey" header-align="center" align="center"
                                     :label="$t('hotel.roomtype.roomtype')">
                        <template slot-scope="scope">
                            <el-tag>{{$t('hotel.'+scope.row.roomTypeKey)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bedTypeKey" header-align="center" align="center"
                                     :label="$t('hotel.bedtype.bedtype')">
                        <template slot-scope="scope">
                            <el-tag>{{$t('hotel.'+scope.row.bedTypeKey)}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="breakType" header-align="center" align="center"
                                     :label="$t('hotel.breaktype.breaktype')">
                        <template slot-scope="scope">
                            <el-tag>{{$t('hotel.'+scope.row.breakTypeKey)}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column width="80" prop="sPrice" header-align="center" align="center" :label="$t('table.sSprice')"/>

                </el-table>
                <!--分页栏-->
                <div class="toolbar" style="padding:10px;">
                    <kt-button icon="fa fa-edit" type="danger" :label="$t('hotel.reservatRoom')" style="float:left;padding: 10px 20px" perms="sys:bizRoom:reservatRoom" size="mini"
                               :disabled="this.radio===''" @click="handleBookRoom(currentRow)" />
                    <el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"
                                   :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="this.pageResult.total"
                                   style="float:right;">
                    </el-pagination>
                </div>
            </div>
        </template>

        <!--新增订单界面-->
        <el-dialog :title="$t('hotel.reservatRoom')" width="90%" style="margin-top: -70px" :visible.sync="editDialogVisible"
                   :close-on-click-modal="false">
            <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
                     :inline="true" label-position="left">
                <el-row >
                    <el-col :span="18" align="left">
                        <el-form-item  prop="provinceCode"  >
                            <el-select v-model="dataForm.provinceCode" disabled>
                                <el-option v-for="rt in paraConfig.provinceCode" :key="rt.paraCode"
                                           :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  prop="cityCode"  >
                            <el-select v-model="dataForm.cityCode" disabled>
                                <el-option v-for="rt in paraConfig.cityCode" :key="rt.paraCode"
                                           :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="commonDate">
                            <el-date-picker disabled
                                v-model="filters.commonDate"
                                :clearable="false"
                                type="daterange"
                                value-format="yyyyMMdd"
                                :start-placeholder="$t('hotel.inDateStart')"
                                :end-placeholder="$t('hotel.outDateEnd')"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="roomNight" >
                            <el-input style="width: 50px" v-model="dataForm.roomNight" :placeholder="$t('hotel.roomNight')"></el-input>
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
                                <el-option v-for=" hotelName in hotelNames" :key="hotelName.hotelCode"
                                           :label="language.lge=='zh_cn'?hotelName.hotelCname:hotelName.hotelEname"
                                           :value="hotelName.hotelCode"></el-option>
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
                                <el-option v-for="rs in paraConfig.roomtype" :key="rs.paraCode"
                                           :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="adultNum" :label="$t('hotel.adultNum')">
                            <el-input-number v-model="dataForm.adultNum" :placeholder="$t('hotel.adultNum')" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item prop="childrenNum" :label="$t('hotel.childrenNum')">
                            <el-input-number v-model="dataForm.childrenNum" :placeholder="$t('hotel.childrenNum')" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" align="right" >
                        <el-form-item :label="$t('hotel.inventory')">
                            <el-input-number v-model="dataForm.inventory" disabled
                                      :placeholder="$t('hotel.inventory')"></el-input-number>
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
                        <el-form-item label-width="120px" :label="$t('hotel.representName')" prop="pname" >
                            <el-input v-model="dataForm.pname"></el-input>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.passportNo')" prop="passport" >
                            <el-input v-model="dataForm.passport"></el-input>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.birthday')" prop="birth" >
                            <el-date-picker
                                v-model="dataForm.birth"
                                type="date"
                                value-format="yyyy-MM-dd"
                                style="width: 190px"
                                :placeholder="$t('hotel.birthday')">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.contactPhone')" prop="phone">
                            <el-input v-model="dataForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label-width="120px" :label="$t('hotel.contactEmail')" prop="emailAddress">
                            <el-input v-model="dataForm.emailAddress"></el-input>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.adultNum1')" prop="adultNum1">
                            <el-input-number v-model="dataForm.anum" :min="0" ></el-input-number>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.children612')" prop="children612">
                            <el-input-number v-model="dataForm.bnum" :min="0" ></el-input-number>
                        </el-form-item>
                        <el-form-item label-width="120px" :label="$t('hotel.children46')" prop="children46" >
                            <el-input-number v-model="dataForm.cnum" :min="0" ></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label-width="120px" :label="$t('hotel.children04')" prop="children04" >
                            <el-input-number v-model="dataForm.children04" :min="0" ></el-input-number>
                        </el-form-item>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">
                    {{$t('action.makeAppointment')}}
                </el-button>
                <el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.returnHome')}}
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import RoomTable from "@/views/Core/HotelRoomTable"
    import KtInput from "@/views/Core/KtInput"
    import KtCheckbox from "@/views/Core/KtCheckbox"
    import KtButton from "@/views/Core/KtButton"
    import {baseUrl} from '@/utils/global'
    import {format,formatDate} from "@/utils/datetime"

    const invoice_start = new Date();
    const invoice_end = new Date();
    invoice_end.setTime(invoice_start.getTime() + 3600 * 1000 * 24 * 5)
    export default {
        components: {
            RoomTable,
            KtButton,
            KtCheckbox,
            KtInput
        },
        props: {
            columns: Array, // 表格列配置
            data: Object, // 表格分页数据
            align: {  // 文本对齐方式
                type: String,
                default: 'center'
            },
            maxHeight: {  // 表格最大高度
                type: Number,
                default: 820
            },
            showOperation: {  // 是否显示操作组件
                type: Boolean,
                default: true
            },
            border: {  // 是否显示边框
                type: Boolean,
                default: false
            },
            stripe: {  // 是否显示斑马线
                type: Boolean,
                default: true
            },
            highlightCurrentRow: {  // // 是否高亮当前行
                type: Boolean,
                default: true
            },
            showOverflowTooltip: {  // 是否单行显示
                type: Boolean,
                default: true
            },
            showBatchDelete: {  // 是否显示操作组件
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                able:false,
                loading: false,  // tab加载标识
                baseUrl: baseUrl,
                priceBoolean: true,
                stockBoolean: true,
                radio:'',
                disableHotelName: false,
                dataurl: '/bizRoom/uploadFile',
                size: 'small',
                nowDate:new Date(),
                filters: {
                    provinceCode: '',
                    hotelName: '',
                    inventory: '',
                    roomCode: null,
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
                    roomNum: 1,
                    adultNum: null,
                    childrenNum: null,
                    sPrice: null
                },
                pageRequest: {page: 1, rows: 10},
                pageResult: {},
                operation: false, // true:新增, false:编辑
                editDialogVisible: false, // 新增编辑界面是否显示
                editPriceDialogVisible: false, // 编辑牌价界面是否显示
                editLoading: false,
                editPriceLoading: false,
                dataFormRules: {
                    hotelCode: [
                        {required: true, message: this.$t('action.pHotelName'), trigger: 'blur'}
                    ],
                    roomType: [
                        {required: true, message: this.$t('action.pRoomType'), trigger: 'blur'}
                    ],
                    roomStyle: [
                        {required: true, message: this.$t('action.pRoomStyle'), trigger: 'blur'}
                    ],
                    bedType: [
                        {required: true, message: this.$t('action.pBedType'), trigger: 'blur'}
                    ],
                    breakType: [
                        {required: true, message: this.$t('action.pBreakType'), trigger: 'blur'}
                    ],
                    pname: [
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
                    roomCode: null,
                    inventory: 50,
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
                    roomPrice: null,
                    hotelname: null,
                    inDateStart: null,
                    outDateEnd: null,
                    roomNum: null,
                    adultNum: null,
                    childrenNum: null,
                    lastCrtTime: null,
                    pname: null,
                    passport: null,
                    birth: null,
                    contactPhone: null,
                    emailAddress: null,
                    anum: null,
                    bnum: null,
                    cnum: null,
                    children04: null,
                    totalSAmount: null,
                    remark: null,
                    sPrice:null,
                    roomNight: null
                },
                hotelNames: [],
                paraConfig: [],
                sysPara: {},
                bizHotl: [],
                language: {},
                headersInfo: {},
                fileList: [],
                pickerOptions:{
                    disabledDate : (time) => {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                pickerOptions2:{
                    disabledDate : (time) =>{

                        if(this.filters.commonDate && this.filters.commonDate.length>0){
                            let beginDateVal = this.filters.commonDate[0];
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
            findPage: function () {
                this.loading = true;
                if(this.filters.commonDate.length>0){
                    this.filters.inDateStart = this.filters.commonDate[0];
                    this.filters.outDateEnd = this.filters.commonDate[1];
                }
                this.$api.hotelRoom.findPage({...this.pageRequest,...this.filters}).then((res) => {
                    this.pageResult = res;
                    this.loading = false;
                    this.radio = '';
                })
            },
            selectRow: function(row){
                this.currentRow = row;
                this.radio = this.pageResult.rows.indexOf(row);
            },
            getCurrentRow: function(row){
                this.currentRow = row;
                // this.$emit('handleBookRoom', row)
            },
            // 显示预订界面
            handleBookRoom: function (row) {
                // this.$refs['dataForm'].resetFields();
                this.disableHotelName = true;
                this.editDialogVisible = true;
                this.operation = false;
                this.dataForm = Object.assign(row,
                    {'adultNum':this.filters.adultNum,
                    'childrenNum':this.filters.childrenNum,
                    'roomNum':this.filters.roomNum,
                    'inDateStart':this.filters.inDateStart,
                    'outDateEnd':this.filters.outDateEnd
                    }
                    );
                console.log(this.dataForm)
            },
            // 编辑
            submitForm: function () {

                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {}).then(() => {
                            this.editLoading = true
                            let params = Object.assign({}, this.dataForm)
                            this.$api.hotelRoom.save(params).then((res) => {
                                if(res.code == 200) {
                                    this.$message({ message: this.$t('action.success'), type: 'success' })
                                } else {
                                    this.$message({message: this.$t('action.fail') , type: 'error'})
                                }
                                this.editLoading = false
                                this.$refs['dataForm'].resetFields()
                                this.editDialogVisible = false
                                this.disableHotelName = false
                                this.findPage(null)
                            })
                        }).finally(() =>{
                            this.editLoading = false
                            this.editDialogVisible = false
                            this.disableHotelName = false
                        })
                    } else {
                        this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
                    }
                })
            },
            // 时间格式化
            dateFormat: function (row, column, cellValue, index) {
                return format(row[column.property])
            },
            findHotlnmSelect: function () {
                this.bizHotl = {};
                let params = Object.assign({}, this.bizHotl);
                this.$api.bizHotl.findAllData(params).then((res) => {
                    this.hotelNames = res
                })
            },
            findHotelRoomDataSelect: function () {
                this.sysPara = {}
                let params = Object.assign({}, this.sysPara);
                this.$api.sysParaConfig.findKeyValueHotelRoom(params).then((res) => {
                    this.paraConfig = res
                    console.log(this.paraConfig);
                })
            },

            localLanguageLoad: function () {
                this.language = {lge: this.$i18n.locale}
                this.able = this.language.lge=='zh_cn'?true:false
            },
            changeValue: function (val) {//和checkbox双向绑定
                this.dataForm.recommended = val;
            },
            changInputValue: function (val) {//和input组件双向绑定
                this.priceForm.tprice = val;

            },
            clearAll: function (formName) {
                this.$refs[formName].resetFields();
            },
            // 换页刷新
            refreshPageRequest: function (pageNum) {
                // this.pageRequest.pageNum = pageNum
                this.pageRequest.page = pageNum

                this.findPage()
            }
        },
        watch:{
            'dataForm.roomNum'(newVal,oldVal){
                this.dataForm.totalSAmount = this.dataForm.roomNum==null?0:this.dataForm.roomNum * this.dataForm.sPrice;
            },
            'dataForm.sPrice'(newVal,oldVal){
                this.dataForm.totalSAmount = this.dataForm.roomNum==null?0:this.dataForm.roomNum * this.dataForm.sPrice;
            }
        },
        mounted() {
            //   this.findDataSelect()
            this.findHotlnmSelect()
            this.localLanguageLoad()
            // this.handleFileMethod()
            this.findHotelRoomDataSelect()
            this.findPage();
        }
    }
</script>

<style scoped>
.el-checkbox {
    width: 190px;
}
thead .el-table-column--selection .cell {
    display: none;
}
.el-form-item__content{
    width: 100%;
}
</style>
