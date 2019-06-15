<template>
    <div class="container room_container">
        <!--工具栏-->
        <div class="header query_room_container" style="min-width: 1300px;padding-bottom: 10px;">
            <el-form :inline="true" ref="filters" :model="filters" :size="size" align="left" style="width: 1300px">
                <div style="background: #daf6fa;display: inline-block;padding: 10px;width: 1300px;box-sizing: border-box;margin-bottom: 4px;">
                    <el-form-item prop="provinceCode" style="margin-bottom: 0;vertical-align: middle;">
                        <el-select v-model="filters.provinceCode" filterable clearable :placeholder="$t('hotel.provinceCode.provinceCode')">
                            <el-option v-for="rt in provinceCode" :key="rt.code"
                                       :label="rt.name" :value="rt.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="cityCode" style="margin-bottom: 0;vertical-align: middle;">
                        <el-select v-model="filters.cityCode" filterable clearable :placeholder="$t('hotel.cityCode.cityCode')">
                            <el-option v-for="rt in cityCode" :key="rt.code"
                                       :label="rt.name" :value="rt.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="hotelName" style="margin-bottom: 0;vertical-align: middle;">
                        <el-input v-model="filters.hotelName" clearable :placeholder="$t('hotel.hotelname')" ></el-input>
                    </el-form-item>
                    <el-form-item prop="commonDate" style="margin-bottom: 0;vertical-align: middle;">
                        <el-date-picker
                            v-model="commonDate"
                            type="daterange"
                            :clearable="false"
                            value-format="yyyyMMdd"
                            @blur="findPage"
                            :start-placeholder="$t('hotel.inDateStart')"
                            :end-placeholder="$t('hotel.outDateEnd')"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0;vertical-align: middle;" align="center">
                        <el-button style="width: 100px" size="medium" perms="sys:bizRoom:view" type="primary" @click="findPage(null)">{{$t('action.search')}}</el-button>
                        <el-button style="width: 100px" type="info" size="medium" @click="clearAll('filters')">{{$t('action.clearAll')}}</el-button>
                    </el-form-item>
                </div>

                <div style="display: flex;margin-bottom: 6px;">
                    <div style="width: 8%;background: #daf6fa;text-align: center;line-height: 32px;font-size:.9em;color: #14889a;">数量</div>
                    <div style="width: 100%;padding: 0 10px;">
                        <el-form-item prop="roomNum" :label="$t('hotel.roomNum')" style="margin-bottom: 0;vertical-align: middle;">
                            <el-input-number v-model="filters.roomNum" controls-position="right"  :placeholder="$t('hotel.roomNum')" :min="1"></el-input-number>
                        </el-form-item>
                        <el-form-item prop="adultNum" :label="$t('hotel.adultNum')" style="margin-bottom: 0;vertical-align: middle;">
                            <el-input-number v-model="filters.adultNum" controls-position="right"  :placeholder="$t('hotel.adultNum')" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item prop="childNum" :label="$t('hotel.childrenNum')" style="margin-bottom: 0;vertical-align: middle;">
                            <el-input-number v-model="filters.childNum" controls-position="right"  :placeholder="$t('hotel.childrenNum')" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item prop="lowRoomPrice" :label="$t('hotel.lowRoomPrice')" style="margin-bottom: 0;vertical-align: middle;">
                            <el-input-number  v-model="filters.lowRoomPrice" controls-position="right"  :placeholder="$t('hotel.lowRoomPrice')" :min="0" :step="500"></el-input-number>
                        </el-form-item>
                        <el-form-item prop="highRoomPrice" :label="$t('hotel.highRoomPrice')" style="margin-bottom: 0;vertical-align: middle;">
                            <el-input-number  v-model="filters.highRoomPrice" controls-position="right"  :placeholder="$t('hotel.highRoomPrice')" :min="0" :step="500"></el-input-number>
                        </el-form-item>
                        <el-form-item prop="roomArea" style="margin-bottom: 0;vertical-align: middle;width: 140px;">
                            <el-input v-model="filters.roomArea" :placeholder="$t('hotel.roomarea')+'(m2)'" clearable></el-input>
                        </el-form-item>
                    </div>
                </div>

                <div style="display: flex;margin-bottom: 6px;">
                    <div style="width: 8%;background: #daf6fa;text-align: center;line-height: 32px;font-size:.9em;color: #14889a;">类型</div>
                    <div style="width: 100%;padding: 0 10px;">
                        <el-form-item prop="hotelType" style="margin-bottom: 0;vertical-align: middle;">
                            <el-select v-model="filters.hotelType"  clearable :placeholder="$t('hotel.hotelType.hotelType')">
                                <el-option v-for="rt in hotelType" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="roomType" style="margin-bottom: 0;vertical-align: middle;">
                            <el-select v-model="filters.roomType" clearable :placeholder="$t('hotel.roomtype.roomtype')">
                                <el-option v-for="rt in roomType" :key="rt.code"
                                           :label="rt.name" :value="rt.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="roomStyle" style="margin-bottom: 0;vertical-align: middle;">
                            <el-select v-model="filters.roomStyle" clearable :placeholder="$t('hotel.roomstyle.roomstyle')">
                                <el-option v-for="rs in roomStyle" :key="rs.code"
                                           :label="rs.name" :value="rs.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="bedType" style="margin-bottom: 0;vertical-align: middle;">
                            <el-select v-model="filters.bedType" clearable :placeholder="$t('hotel.bedtype.bedtype')">
                                <el-option v-for="bt in bedType" :key="bt.code"
                                           :label="bt.name" :value="bt.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="breakType" style="margin-bottom: 0;vertical-align: middle;">
                            <el-select v-model="filters.breakType" clearable :placeholder="$t('hotel.breaktype.breaktype')">
                                <el-option v-for="bk in breakType" :key="bk.code"
                                           :label="bk.name" :value="bk.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>

                <div style="display: flex;margin-bottom: 6px;">
                    <div style="width: 8%;background: #daf6fa;text-align: center;line-height: 32px;font-size:.9em;color: #14889a;">星级</div>
                    <div style="width: 100%;padding: 0 10px;">
                        <el-form-item prop="hotelLevel" style="margin-bottom: 0;vertical-align: middle;margin-right: 14px">
                            <el-checkbox-group v-model="starLevel">
                                <el-checkbox v-for="hs in hotelStar" style="width: 202px;box-sizing: border-box;margin-bottom: 0;vertical-align: middle;margin-right: 5px"
                                             :label="hs.code" :key="hs.code" name="hotelLevel" border>{{hs.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                </div>


                <div style="display: flex;margin-bottom: 6px;">
                    <div style="width: 8%;background: #daf6fa;text-align: center;line-height: 50px;font-size:.9em;color: #14889a;">{{$t('hotel.information')}}</div>
                    <div style="width: 100%;padding: 0 10px;">
                        <el-collapse>
                            <el-collapse-item>
                                <template slot="title">
                                    <el-form-item prop="iswify" style="margin-bottom: 0;vertical-align: middle;line-height: 32px;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswify')"
                                                     v-model="filters.iswify" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isfront" style="margin-bottom: 0;vertical-align: middle;line-height: 32px;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isfront')"
                                                     v-model="filters.isfront" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isbarrifr" style="margin-bottom: 0;vertical-align: middle;line-height: 32px;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbarrifr')"
                                                     v-model="filters.isbarrifr" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isbalcony" style="margin-bottom: 0;vertical-align: middle;line-height: 32px;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbalcony')"
                                                     v-model="filters.isbalcony" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="iskitchen" style="margin-bottom: 0;vertical-align: middle;line-height: 32px;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iskitchen')"
                                                     v-model="filters.iskitchen" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="iswindow" style="margin-bottom: 0;vertical-align: middle;line-height: 32px;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswindow')"
                                                     v-model="filters.iswindow" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isheat" style="margin-bottom: 0;vertical-align: middle;line-height: 32px;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isheat')"
                                                     v-model="filters.isheat" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isicebox" style="margin-bottom: 0;vertical-align: middle;line-height: 32px;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isicebox')"
                                                     v-model="filters.isicebox" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isiron" style="margin-bottom: 0;vertical-align: middle;line-height: 32px;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isiron')"
                                                     v-model="filters.isiron" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isnosmk" style="margin-bottom: 0;vertical-align: middle;line-height: 32px;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isnosmk')"
                                                     v-model="filters.isnosmk" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="islandscape" style="margin-bottom: 0;vertical-align: middle;line-height: 32px;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islandscape')"
                                                     v-model="filters.islandscape" border></el-checkbox>
                                    </el-form-item>
                                </template>
                                <div style="width: 100%;padding: 4px 0;">
                                    <el-form-item prop="ishighrise" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishighrise')"
                                                     v-model="filters.ishighrise" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="ispark" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ispark')"
                                                     v-model="filters.ispark" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isgym" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isgym')"
                                                     v-model="filters.isgym" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isswmp" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isswmp')"
                                                     v-model="filters.isswmp" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isbeach" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbeach')"
                                                     v-model="filters.isbeach" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="ishotsp" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishotsp')"
                                                     v-model="filters.ishotsp" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="ischildct" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ischildct')"
                                                     v-model="filters.ischildct" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isroomserv" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isroomserv')"
                                                     v-model="filters.isroomserv" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isknead" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isknead')"
                                                     v-model="filters.isknead" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="islounge" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islounge')"
                                                     v-model="filters.islounge" border></el-checkbox>
                                    </el-form-item>
                                </div>
                                <div style="width: 100%;padding: 4px 0;">
                                    <el-form-item prop="issuper" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.issuper')"
                                                     v-model="filters.issuper" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isbus" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbus')"
                                                     v-model="filters.isbus" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="istrafic" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox  true-label="1" false-label="2" :label="$t('hotel.istrafic')"
                                                     v-model="filters.istrafic" border></el-checkbox>
                                    </el-form-item>
                                    <el-form-item prop="isrestau" style="margin-bottom: 0;vertical-align: middle;">
                                        <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isrestau')"
                                                     v-model="filters.isrestau" border></el-checkbox>
                                    </el-form-item>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </el-form>
        </div>
        <!--表格内容栏-->
        <div class="table_room_container" style="min-width: 1300px;">
                <!--表格栏-->
                <el-table :data="this.pageResult.rows" ref="table"  @row-click="selectRow"
                           v-loading="loading" :element-loading-text="$t('action.loading')"
                          :border="border"
                          :row-class-name="tableRowClassName"
                          :show-overflow-tooltip="showOverflowTooltip" :align="align">
                    <!--<el-table-column :label="$t('action.operation')" width="55">
                        <template slot-scope="scope">
                            <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                        </template>
                    </el-table-column>-->
                    <el-table-column  prop="hotelCode" header-align="center" align="center" :label="$t('hotel.hotelCode')">
                    </el-table-column>
                    <el-table-column  prop="provinceCode" header-align="center" align="center"
                                     :label="$t('hotel.provinceCode.provinceCode')">
                        <template slot-scope="scope">
                            <el-tag>{{resolveRoomTypeName(provinceCode,scope.row.provinceCode)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="cityCode" header-align="center" align="center"
                                     :label="$t('hotel.cityCode.cityCode')">
                        <template slot-scope="scope">
                            <el-tag>{{resolveRoomTypeName(cityCode,scope.row.cityCode)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column :prop="language.lge=='zh_cn'?'hotelCname':'hotelEname'" header-align="center"
                                     align="center" :label="$t('hotel.hotelname')">
                    </el-table-column>
                    <el-table-column prop="hotelType" header-align="center" align="center"
                                     :label="$t('hotel.hotelType.hotelType')">
                        <template slot-scope="scope">
                            <el-tag>{{resolveRoomTypeName(hotelType,scope.row.hotelType)}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="roomTypeKey" header-align="center" align="center"
                                     :label="$t('hotel.roomtype.roomtype')">
                        <template slot-scope="scope">
                            <el-tag>{{resolveRoomTypeName(roomType,scope.row.roomType)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bedTypeKey" header-align="center" align="center"
                                     :label="$t('hotel.bedtype.bedtype')">
                        <template slot-scope="scope">
                            <el-tag>{{resolveRoomTypeName(bedType,scope.row.bedType)}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column  prop="breakType" header-align="center" align="center"
                                     :label="$t('hotel.breaktype.breaktype')">
                        <template slot-scope="scope">
                            <el-tag>{{resolveRoomTypeName(breakType,scope.row.breakType)}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column  prop="sPrice" header-align="center" align="center" :label="$t('hotel.sAverageSprice')">
                    </el-table-column>
                    <el-table-column :label="$t('action.operation')" fixed="right" align="center">
                        <template slot-scope="scope">
                        <kt-button icon="fa fa-edit" type="danger" :label="$t('hotel.reservatRoom')" perms="sys:bizRoom:reservatRoom" size="mini"
                                   @click="handleBookRoom(scope.row)" />
                        </template>
                    </el-table-column>
                </el-table>
<!--                分页栏-->
                <div  style="padding:10px;height: 35px">
                    <el-pagination layout="prev, pager, next" @current-change="refreshPageRequest"
                                   :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="this.pageResult.total"
                                   style="float:right;">
                    </el-pagination>
                </div>
            </div>

        <!--新增订单界面-->
        <el-dialog :title="$t('hotel.reservatRoom')" width="80%" style="margin-top: -120px" :visible.sync="editDialogVisible"
                   :close-on-click-modal="false">
            <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
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
                                        <input hidden v-model="commonDate"/>
                                        <input v-model="filters.roomNight" hidden/>
                                        <span>{{parseStrToDate(commonDate[0])}}  {{$t('hotel.dateSep')}}  {{parseStrToDate(commonDate[1])}} {{$t('order.total')}} {{filters.roomNight}} {{$t('order.night')}}</span>

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
                                            <el-form-item label-width="60px" :label="$t('hotel.adultNum')" prop="adultNum" style="margin-bottom: 6px;margin-right: 0;">
                                                <el-input-number v-model="dataForm.adultNum" controls-position="right" style="width: 120px"  :min="1" ></el-input-number>
                                            </el-form-item>

                                            <el-form-item label-width="60px" :label="$t('hotel.childrenNum')" prop="childNum"  style="margin-bottom: 6px;margin-right: 0;">
                                                <el-input-number v-model="dataForm.childNum" controls-position="right" style="width: 120px"  :min="0" ></el-input-number>
                                            </el-form-item>
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
                                <el-form-item label-width="120px" :label="$t('hotel.lastCrtTime')" prop="lastCrtTime" >
                                    <el-date-picker
                                        v-model="dataForm.lastCrtTime"
                                        align="right"
                                        type="date"
                                        value-format="yyyyMMdd"
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
                                <el-form-item  :label="$t('hotel.totalPrice')" label-width="120px" >
                                    <span  style="width: 200px;display: inline-block;text-align: left;color: #bd0b38;font-size: 18px;font-weight: bold;">{{dataForm.totalSAmount}}</span>
                                </el-form-item>

                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button icon="el-icon-s-order" type="primary" @click.native="submitForm" :loading="editLoading">
                    {{$t('action.makeAppointment')}}
                </el-button>
                <el-button  @click.native="editDialogVisible = false">{{$t('action.returnHome')}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import KtInput from "@/views/Core/KtInput"
    import KtCheckbox from "@/views/Core/KtCheckbox"
    import KtButton from "@/views/Core/KtButton"
    import {baseUrl} from '@/utils/global'
    import {parseStrToDate,formatDate} from "@/utils/datetime"

    const invoice_start = new Date();
    const invoice_end = new Date();
    invoice_start.setTime(invoice_start.getTime() + 3600 * 1000 * 24 * 7);
    invoice_end.setTime(invoice_start.getTime() + 3600 * 1000 * 24 * 5);
    export default {
        components: {
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
                radio:'',
                photoUrl: baseUrl + '/document/preview/',
                size: 'small',
                commonDate:[],
                gridData:[],//牌价详细信息
                pageRequest: {page: 1, rows: 10},
                pageResult: {},
                editDialogVisible: false, // 新增编辑界面是否显示
                editPriceDialogVisible: false, // 编辑牌价界面是否显示
                editLoading: false,
                editPriceLoading: false,
                roomPhoto:[],
                hotelType: [], //酒店类型
                hotelStar:[], //酒店星级
                roomStyle:[], //房间样式
                roomType:[], //房间类型
                breakType: [], //餐饮条件
                bedType: [], //床铺类型
                provinceCode: [], //地区编码
                cityCode: [], //城市编码
                systemDays:[],//系统参数 天数
                language: {},
                starLevel:[],
                filters: {
                    provinceCode: '',
                    hotelName: '',
                    hotelLevel:'',
                    hotelType:null,
                    roomCode: null,
                    hotelCode: null,
                    roomType: null,
                    roomStyle: null,
                    bedType: null,
                    breakType: null,
                    roomArea: null,
                    photo: null,
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
                    lowRoomPrice: 0,
                    highRoomPrice: 1000,
                    inDateStart: null,
                    outDateEnd: null,
                    roomNum: 1,
                    adultNum: 0,
                    childNum: 0,
                    sPrice: null,
                    roomNight: 0
                },
                // 新增编辑界面数据
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
                    phone: null,
                    emailAddress: null,
                    children612: 0,
                    children46: 0,
                    children4: 0,
                    totalSAmount: null,
                    totalTAmount: null,
                    remark: null,
                    sPrice:null,
                    endPrice:null,
                    scheduledays:0,
                    favorableprice:0
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
                        var nowDate = new Date();
                        var day = 7;
                        if(nowDate.getHours()>18 || (nowDate.getHours()==18 && nowDate.getMinutes() >= 30)){
                            day = 8;
                        }
                        return time.getTime() < Date.now() - 8.64e7 +  3600 * 1000 * 24 * day;
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
                },
            }
        },
        methods: {
            // 获取分页数据
            findPage: function () {
                this.loading = true;
                if(this.commonDate.length>0){
                    this.filters.inDateStart = this.commonDate[0];
                    this.filters.outDateEnd = this.commonDate[1];
                }
                this.$api.hotelRoom.findPage({...this.pageRequest,...this.filters}).then((res) => {
                    this.pageResult = res;
                    this.loading = false;
                    this.radio = '';
                },() =>{
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
            },
            // 显示预订界面
            handleBookRoom: function (row) {
                /*
                入住日算起，倒退七天前的那一天18:30分开始，将无法预约入住日的酒店客
                 */
                var date = new Date();
                var y = date.getFullYear();
                var m = date.getMonth() +1;
                var d = date.getDate();
                var t = y+"-"+m+"-"+d+" "+"18:30:00";
                var tDate = new Date(Date.parse(t.replace(/-/g, "/")))
                var inDateStart = this.filters.inDateStart;
                inDateStart = inDateStart.substring(0,4)+"-"+inDateStart.substring(4,6)+"-"+inDateStart.substring(6)+ " "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
                var dateStart = new Date(Date.parse(inDateStart.replace(/-/g, "/")))
                if ( date>=tDate ) {
                    var i = this.systemDays[0].code
                    date.setDate(date.getDate()+ parseInt(i))
                }else {
                    var i = this.systemDays[0].code -1
                    date.setDate(date.getDate()+ parseInt(i))
                }
                if (dateStart<date) {
                    this.$message({message: this.$t('action.OverSevenAfterExcetpion') , type: 'warn'})
                    return;
                }

                this.editDialogVisible = true;
                if(this.$refs.dataForm){
                    this.$refs.dataForm.resetFields();
                }
                var obj = Object.assign({},{'adultNum':this.filters.adultNum,
                    'childNum':this.filters.childNum,
                    'roomNum':this.filters.roomNum,
                    'inDateStart':this.filters.inDateStart,
                    'outDateEnd':this.filters.outDateEnd
                });
                this.dataForm = Object.assign(this.dataForm,obj,row)
                console.log("this.dataForm",this.dataForm)
                if(row.photo){
                    this.$api.user.showFile({'relationId':row.photo}).then((res) =>{
                        this.roomPhoto = res;
                    })
                }
                this.$api.bizPuchs.findByDate({'inDateStart': obj.inDateStart,'outDateEnd': obj.outDateEnd,'roomCode':row.roomCode}).then((res) => {
                    this.gridData = res;
                },() =>{
                })
            },
            // 预约
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
                                this.findPage(null)
                            })
                        }).finally(() =>{
                            this.editLoading = false
                            this.editDialogVisible = false
                        })
                    } else {
                        this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
                    }
                })
            },

            localLanguageLoad: function () {
                this.language = {lge: this.$i18n.locale}
                this.able = this.language.lge=='zh_cn'?true:false
            },
            clearAll: function (formName) {
                this.$refs[formName].resetFields();
                this.starLevel = [];
            },
            // 换页刷新
            refreshPageRequest: function (pageNum) {
                this.pageRequest.page = pageNum;
                this.findPage()
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 !=0) {
                    return 'success-row';
                }
                return '';
            },
            parseStrToDate(str) {
                if(str == undefined){
                    return ;
                }
                return str.substr(0,4) + "-" + str.substr(4,2) +"-" + str.substr(6,2)
            }
        },
        created(){
            this.getTypeValues('SYSTEM_DAYS,ROOM_STYLE,ROOM_TYPE,HOTEL_STAR,HOTEL_TYPE,BREAK_TYPE,BED_TYPE,PREFECTURE,DISTRICT').then( res =>{
                // console.log(res)
                this.roomStyle = res.ROOM_STYLE;
                this.roomType = res.ROOM_TYPE;
                this.hotelStar = res.HOTEL_STAR;
                this.hotelType = res.HOTEL_TYPE;
                this.breakType = res.BREAK_TYPE;
                this.bedType = res.BED_TYPE;
                this.provinceCode = res.PREFECTURE;
                this.cityCode = res.DISTRICT;
                this.systemDays = res.SYSTEM_DAYS;
            })
        },
        watch:{
            'dataForm.roomNum'(){

                var num = 0;
                if(this.filters.roomNight >= this.dataForm.scheduledays){
                    num = this.dataForm.favorableprice;
                }
                this.dataForm.totalSAmount = this.dataForm.roomNum==null?0:this.dataForm.roomNum * this.dataForm.sPrice * this.filters.roomNight - num;
            },
            'dataForm.sPrice'(){
                var num = 0;
                if(this.filters.roomNight >= this.dataForm.scheduledays){
                    num = this.dataForm.favorableprice;
                }
                this.dataForm.totalSAmount = this.dataForm.roomNum==null?0:this.dataForm.roomNum * this.dataForm.sPrice * this.filters.roomNight - num;
            },
            'filters.roomNight'(){
                var num = 0;
                if(this.filters.roomNight >= this.dataForm.scheduledays){
                    num = this.dataForm.favorableprice;
                }
                this.dataForm.totalSAmount = this.dataForm.roomNum==null?0:this.dataForm.roomNum * this.dataForm.sPrice * this.filters.roomNight - num;
            },
            'dataForm.adultNum'(){
                this.dataForm.totalTAmount = this.dataForm.roomNum==null?0:(this.dataForm.adultNum + this.dataForm.childNum) * this.dataForm.endPrice * this.filters.roomNight;
            },
            'dataForm.childNum'(){
                this.dataForm.totalTAmount = this.dataForm.roomNum==null?0:(this.dataForm.adultNum + this.dataForm.childNum) * this.dataForm.endPrice * this.filters.roomNight;
            },
            commonDate(n,o){
                var startDate = n[0].substr(0,4) + "/" + n[0].substr(4,2) +"/" +n[0].substr(6,2) ;
                var endDate = n[1].substr(0,4) + "/" + n[1].substr(4,2) +"/" +n[1].substr(6,2) ;
                var oDate1, oDate2, iDays ;
                oDate1 = Date.parse(startDate);
                oDate2 = Date.parse(endDate);
                iDays = parseInt(Math.abs(oDate1 -oDate2)/1000/60/60/24); //把相差的毫秒数转换为天数
                this.filters.roomNight = iDays;
            },
            starLevel(n,o){
                this.filters.hotelLevel = this.starLevel.join(",");
            },
        },
        mounted() {
            var nowDate = new Date();
            if(nowDate.getHours()>18 || (nowDate.getHours()==18 && nowDate.getMinutes() >= 30)){
                invoice_start.setDate(invoice_start.getDate() + 1 );
                invoice_end.setDate(invoice_end.getDate() + 1);
            }
            this.commonDate = [formatDate(invoice_start,'yyyyMMdd'),formatDate(invoice_end,'yyyyMMdd')];
            this.localLanguageLoad()
            this.findPage();
        }
    }
</script>

<style scoped>
    .el-collapse-item__content{
        padding-bottom: 0;
    }
    .room_container{
        width:100%;
        /*margin-top:-25px;*/
        margin-bottom: 50px;
        /*background: #FFFFFF;*/
    }
    .query_room_container{
        padding-top:10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .table_room_container{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-top: 20px
    }
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
        width: 120px;
        display: inline-block;
    }
</style>
