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
                                :range-separator="$t('hotel.dateSep')"
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
                        <el-form-item prop="roomNum">
                            <el-input v-model="filters.roomNum" :placeholder="$t('hotel.roomNum')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="50" align="left">
                        <el-form-item prop="adultNum">
                            <el-input v-model="filters.adultNum" :placeholder="$t('hotel.adultNum')"></el-input>
                        </el-form-item>
                        <el-form-item prop="childrenNum">
                            <el-input v-model="filters.childrenNum" :placeholder="$t('hotel.childrenNum')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                    <el-col :span="12" align="left">
                        <el-form-item prop="hotelType">
                            <el-select v-model="filters.hotelType" :placeholder="$t('hotel.hotelType.hotelType')">
                                <el-option v-for="rt in paraConfig.hotelType" :key="rt.paraCode"
                                           :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="roomType">
                            <el-select v-model="filters.roomType" :placeholder="$t('hotel.roomtype.roomtype')">
                                <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode"
                                           :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" align="left">
                        <el-form-item prop="roomStyle">
                            <el-select v-model="filters.roomStyle" :placeholder="$t('hotel.roomstyle.roomstyle')">
                                <el-option v-for="rs in paraConfig.roomstyle" :key="rs.paraCode"
                                           :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="bedType">
                            <el-select v-model="filters.bedType" :placeholder="$t('hotel.bedtype.bedtype')">
                                <el-option v-for="bt in paraConfig.bedtype" :key="bt.paraCode"
                                           :label="$t('hotel.'+ bt.paraCode)" :value="bt.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" align="left">
                        <el-form-item prop="breakType">
                            <el-select v-model="filters.breakType" :placeholder="$t('hotel.breaktype.breaktype')">
                                <el-option v-for="bk in paraConfig.breaktype" :key="bk.paraCode"
                                           :label="$t('hotel.'+ bk.paraCode)" :value="bk.paraValue1"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="roomArea">
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
                        <el-form-item prop="hotelCode" auto-complete="off">
                            <el-input v-model="filters.hotelCode" :placeholder="$t('hotel.hotelname')"></el-input>
                        </el-form-item>
                        <el-form-item prop="lowRoomPrice">
                            <el-input v-model="filters.lowRoomPrice" :placeholder="$t('hotel.lowRoomPrice')" @keyup.native="proving"></el-input>
                        </el-form-item>
                        <el-form-item prop="highRoomPrice">
                            <el-input v-model="filters.highRoomPrice" :placeholder="$t('hotel.highRoomPrice')"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

                <!--<br>-->
                <h3 style="text-align: left">常用信息:</h3>
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
                            <el-checkbox style="width: 400px" true-label="1" false-label="2" :label="$t('hotel.issuper')"
                                         v-model="filters.issuper" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isbus">
                            <el-checkbox style="width: 400px" true-label="1" false-label="2" :label="$t('hotel.isbus')"
                                         v-model="filters.isbus" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col align="left">
                        <el-form-item prop="istrafic">
                            <el-checkbox style="width: 400px" true-label="1" false-label="2" :label="$t('hotel.istrafic')"
                                         v-model="filters.istrafic" border></el-checkbox>
                        </el-form-item>
                        <el-form-item prop="isrestau">
                            <el-checkbox style="width: 400px" true-label="1" false-label="2" :label="$t('hotel.isrestau')"
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
<!--        <room-table permsReservatRoom="sys:bizRoom:reservatRoom"-->
<!--                    :data="this.pageResult"-->
<!--                    @findPage="findPage" @handleBookRoom="handleBookRoom">-->
<!--        </room-table>-->
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
                    <el-table-column width="120" prop="hotelType" header-align="center" align="center"
                                     :label="$t('hotel.hotelType.hotelType')">
                        <template slot-scope="scope">
                            <el-table-column>{{$t('hotel.'+scope.row.hotelTypeKey)}}</el-table-column>
                        </template>
                    </el-table-column>

                    <el-table-column width="100" prop="roomTypeKey" header-align="center" align="center"
                                     :label="$t('hotel.roomtype.roomtype')">
                        <template slot-scope="scope">
                            <el-tag>{{$t('hotel.'+scope.row.roomTypeKey)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column width="100" prop="bedTypeKey" header-align="center" align="center"
                                     :label="$t('hotel.bedtype.bedtype')">
                        <template slot-scope="scope">
                            <el-tag>{{$t('hotel.'+scope.row.bedTypeKey)}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column min-width="100" prop="breakType" header-align="center" align="center"
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

                <el-form-item :label="$t('hotel.provinceCode.provinceCode')" prop="provinceCode" auto-complete="off">
                    <el-select v-model="dataForm.provinceCode" :disabled="true">
                        <el-option v-for="rt in paraConfig.provinceCode" :key="rt.paraCode"
                                   :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="$t('hotel.cityCode.cityCode')" prop="cityCode" auto-complete="off">
                    <el-select v-model="dataForm.cityCode" :disabled="true">
                        <el-option v-for="rt in paraConfig.cityCode" :key="rt.paraCode"
                                   :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="commonDate">
                    <el-date-picker
                        v-model="filters.commonDate"
                        type="daterange"
                        :range-separator="$t('hotel.dateSep')"
                        value-format="yyyyMMdd"
                        :start-placeholder="$t('hotel.inDateStart')"
                        :end-placeholder="$t('hotel.outDateEnd')"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="dataForm.roomNight" :placeholder="$t('hotel.roomNight')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-form-item>
                        <el-input v-model="dataForm.sPrice" :disabled="true"
                                  :placeholder="$t('hotel.sPrice')"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item :label="$t('hotel.hotelname')" prop="hotelCode" auto-complete="off">
                    <el-select v-model="dataForm.hotelCode" :disabled="disableHotelName">
                        <el-option v-for=" hotelName in hotelNames" :key="hotelName.hotelCode"
                                   :label="language.lge=='zh_cn'?hotelName.hotelCname:hotelName.hotelEname"
                                   :value="hotelName.hotelCode"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="$t('hotel.lastCrtTime')">
                    <el-date-picker
                        v-model="dataForm.lastCrtTime"
                        align="right"
                        type="date"
                        :placeholder="$t('hotel.lastCrtTime')">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="dataForm.roomType" :disabled="true"
                               :placeholder="$t('hotel.roomtype.roomtype')">
                        <el-option v-for="rs in paraConfig.roomtype" :key="rs.paraCode"
                                   :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="dataForm.adultNum" :placeholder="$t('hotel.adultNum')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="dataForm.childrenNum" :placeholder="$t('hotel.childrenNum')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="dataForm.inventory" :disabled="true"
                              :placeholder="$t('hotel.inventory')"></el-input>
                </el-form-item>


                <el-form-item :label="$t('hotel.hotelAddr')" prop="hotelAddr">
                    <el-input v-model="dataForm.hotelAddr" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('hotel.hotelPhone')" prop="hotelPhone">
                    <el-input v-model="dataForm.hotelPhone" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('hotel.hotelWeb')" prop="hotelWeb">
                    <el-input v-model="dataForm.hotelWeb" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('hotel.introc')" prop="introC" auto-complete="off">
                            <el-input v-model="dataForm.introC" :disabled="true" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item :label="$t('hotel.introe')" prop="introE" auto-complete="off">
                            <el-input v-model="dataForm.introE" :disabled="true" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <h3 style="text-align: left">常用信息:</h3>
                <el-row>
                    <el-col :span="12" align="left">
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswify')"
                                         v-model="dataForm.iswify" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isfront')"
                                         v-model="dataForm.isfront" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbarrifr')"
                                         v-model="dataForm.isbarrifr" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" align="left">

                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbalcony')"
                                         v-model="dataForm.isbalcony" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iskitchen')"
                                         v-model="dataForm.iskitchen" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswindow')"
                                         v-model="dataForm.iswindow" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" align="left">
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isheat')"
                                         v-model="dataForm.isheat" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isicebox')"
                                         v-model="dataForm.isicebox" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isiron')"
                                         v-model="dataForm.isiron" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" align="left">
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isnosmk')"
                                         v-model="dataForm.isnosmk" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islandscape')"
                                         v-model="dataForm.islandscape" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishighrise')"
                                         v-model="dataForm.ishighrise" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" align="left">
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ispark')"
                                         v-model="dataForm.ispark" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isgym')"
                                         v-model="dataForm.isgym" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isswmp')"
                                         v-model="dataForm.isswmp" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" align="left">
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbeach')"
                                         v-model="dataForm.isbeach" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishotsp')"
                                         v-model="dataForm.ishotsp" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ischildct')"
                                         v-model="dataForm.ischildct" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" align="left">
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isroomserv')"
                                         v-model="dataForm.isroomserv" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isknead')"
                                         v-model="dataForm.isknead" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islounge')"
                                         v-model="dataForm.islounge" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" align="left">
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.issuper')"
                                         v-model="dataForm.issuper" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbus')"
                                         v-model="dataForm.isbus" border></el-checkbox>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col align="left">
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.istrafic')"
                                         v-model="dataForm.istrafic" border></el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isrestau')"
                                         v-model="dataForm.isrestau" border></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>

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
                <el-form-item :label="$t('hotel.contactEmail')" prop="contactEmail" auto-complete="off">
                    <el-input v-model="dataForm.emailAddress"></el-input>
                </el-form-item>
                <el-form-item :label="$t('hotel.adultNum1')" prop="adultNum1" auto-complete="off">
                    <el-input v-model="dataForm.anum"></el-input>
                </el-form-item>
                <el-form-item :label="$t('hotel.children612')" prop="children612" auto-complete="off">
                    <el-input v-model="dataForm.bnum"></el-input>
                </el-form-item>
                <el-form-item :label="$t('hotel.children46')" prop="children46" auto-complete="off">
                    <el-input v-model="dataForm.cnum"></el-input>
                </el-form-item>
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
    import {baseUrl} from '@/utils/global';
    import {format} from "@/utils/datetime"

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
            permsReservatRoom: String,  // 编辑权限标识
            permsDelete: String,  // 删除权限标识
            permsPriceEdit: String, //编辑权限标识
            permsStockEdit: String, //库存编辑权限标识
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
                pickerOptions:{
                    disabledDate(time){
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                loading: false,  // tab加载标识
                baseUrl: baseUrl,
                priceBoolean: true,
                stockBoolean: true,
                radio:'',
                disableHotelName: false,
                dataurl: '/bizRoom/uploadFile',
                size: 'small',
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
                    highRoomPrice: null,
                    hotelname: null,
                    inDateStart: null,
                    outDateEnd: null,
                    commonDate:[],
                    roomNum: null,
                    adultNum: null,
                    childrenNum: null,
                    sPrice: null,
                    roomNight: null
                },
                // pageRequest: { pageNum: 1, pageSize: 10 },
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
                    roomStock: [
                        {required: true, message: this.$t('action.pRoomStock'), trigger: 'blur'}
                    ]

                },
                // 新增编辑界面数据
                dataForm: {
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
                    creatBy: null,
                    creatTime: null,
                    lastUpdateBy: null,
                    lastUpdateTime: null,
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
                    remark: null
                },
                hotelNames: [],
                paraConfig: [],
                sysPara: {},
                bizHotl: [],
                language: {},
                headersInfo: {},
                fileList: [],
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
                // console.log("param", params);
                this.disableHotelName = true
                this.editDialogVisible = true
                this.operation = false

                this.dataForm = Object.assign({}, row)
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
            proving: function () {
                this.filters.lowRoomPrice=this.filters.lowRoomPrice.replace(/[^\.\d]/g,'');
                this.filters.lowRoomPrice=this.filters.lowRoomPrice.replace('.','');
            },
            // 换页刷新
            refreshPageRequest: function (pageNum) {
                // this.pageRequest.pageNum = pageNum
                this.pageRequest.page = pageNum

                this.findPage()
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
</style>
