<template>
    <div class="main-content" style="width: 100%;height: 100%">
        <el-form :model="dataForm" label-width="180px" :rules="dataFormRules" ref="dataForm" :size="size" label-position="left"
                 :inline="true" v-loading="loading">
            <el-row>
                <el-col :span="11">
                    <el-row style="width: 100%;text-align: left;display: flex;margin: 0 auto;">
                        <el-col :span="6" style="padding-top:10px;border-right: 1px solid #e6e6e6;border-bottom: 1px solid #e6e6e6;text-align: center;">
                            <label style="font-size: 16px;color: #212121;">{{$t('order.baseInfo')}}</label>
                        </el-col>
                        <el-col :span="18" style="border-bottom: 1px solid #e6e6e6;">
                            <ul class="hotel-base">
                                <li >
                                    <el-row >
                                        <el-col :span="18">
                                            <label>{{$t('order.departureTime')}}</label>
                                            <el-form-item prop="commonDate" style="margin-bottom: 0;vertical-align: middle;width: 100px">
                                                <el-date-picker
                                                    size="mini"
                                                    v-model="commonDate"
                                                    type="daterange"
                                                    :clearable="false"
                                                    value-format="yyyyMMdd"
                                                    :start-placeholder="$t('hotel.inDateStart')"
                                                    :end-placeholder="$t('hotel.outDateEnd')"
                                                    :picker-options="pickerOptions"
                                                    @blur="dateChangeCanculate">
                                                </el-date-picker>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :span="6" align="right">
                                            <el-form-item label-width="60px" prop="roomNight" style="margin-bottom: 6px;margin-right: 0;" >
                                                <input v-model="filters.roomNight" hidden></input>
                                                <el-tag>{{filters.roomNight}}</el-tag>
                                                <label>&nbsp;{{$t('order.night')}}</label>
                                            </el-form-item>
                                        </el-col>

                                    </el-row>


                                </li>
                                <!--<li style="padding-top: 4px">-->


                                <!--</li>-->
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
                                <li style="padding-top: 4px;font-weight: bold;font-style: italic;">
                                    <label>{{$t('order.peopleNum')}}</label>

                                </li>
                                <li style="padding-top: 4px">
                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label-width="180px"  :label="$t('hotel.adultNum')" prop="adultNum" style="margin-bottom: 6px;margin-right: 0; ">
                                                <el-input-number size="mini" v-model="dataForm.adultNum" controls-position="right"  :min="0" ></el-input-number>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label-width="180px" :label="$t('hotel.childrenNum')" prop="childNum"  style="margin-bottom: 6px;margin-right: 0;">
                                                <el-input-number v-model="dataForm.childNum" controls-position="right" size="mini"  :min="0" ></el-input-number>
                                            </el-form-item>
                                        </el-col>

                                    </el-row>
                                </li>
                                <li style="display: flex">
                                    <el-row>
                                        <el-col :span="12" >
                                            <el-form-item :label="$t('hotel.roomNum')" label-width="180px" prop="roomNum" >
                                                <el-input-number size="mini" v-model="dataForm.roomNum" controls-position="left" :max="dataForm.inventory" :min="0"></el-input-number>
                                            </el-form-item>

                                        </el-col>

                                        <el-col :span="12" >
                                            <el-form-item label-width="180px" :label="$t('hotel.lastCrtTime')" prop="lastCrtTime"  >
                                                <el-date-picker
                                                    v-model="dataForm.lastCrtTime"
                                                    align="left"
                                                    type="date"
                                                    value-format="yyyyMMdd"
                                                    :placeholder="$t('hotel.lastCrtTime')"
                                                    :picker-options="pickerOptions2"
                                                    readonly
                                                    size="mini">
                                                </el-date-picker>
                                            </el-form-item>
                                        </el-col>

                                    </el-row>

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
                                    <el-row>
                                        <el-col :span="12">
                                            <label style="display: inline-block;">{{$t('hotel.hotelname')}}</label>
                                            <input hidden v-model="dataForm.hotelCname"/>
                                            <input hidden v-model="dataForm.hotelEname"/>
                                            <el-tag>{{able?dataForm.hotelCname:dataForm.hotelEname}}</el-tag>
                                        </el-col>

                                        <el-col :span="12">
                                            <label style="width: 60px; display: inline-block;">{{$t('order.localArea')}}</label>
                                            <input hidden v-model="dataForm.provinceCode"/>
                                            <span>{{resolveRoomTypeName(provinceCode,dataForm.provinceCode)}}</span>
                                            <span>{{resolveRoomTypeName(cityCode,dataForm.cityCode)}}</span>
                                        </el-col>
                                    </el-row>
                                </li>
                                <li>
                                    <label>{{$t('hotel.hotelAddr')}}</label>
                                    <input hidden v-model="dataForm.hotelAddr"/>
                                    <span>{{dataForm.hotelAddr}}</span>
                                </li>
                                <li>
                                    <el-row>
                                        <el-col :span="12">
                                            <label style="width: 60px; display: inline-block;">{{$t('hotel.hotelPhone')}}</label>
                                            <input hidden v-model="dataForm.hotelPhone"/>
                                            <el-tag>{{dataForm.hotelPhone}}</el-tag>
                                        </el-col>
                                        <el-col :span="12">
                                            <label style="width: 60px; display: inline-block;">{{$t('order.hotelWWW')}}</label>
                                            <input hidden v-model="dataForm.hotelWeb"/>
                                            <el-tag>{{dataForm.hotelWeb}}</el-tag>
                                        </el-col>
                                    </el-row>
                                </li>
                                <!--<li>-->
                                    <!--<label>{{$t('order.roomPrice')}}</label>-->
                                    <!--<input hidden v-model="dataForm.sRoomPrice"/>-->
                                    <!--<span>{{dataForm.sRoomPrice}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<label>{{$t('hotel.inventory')}}</label>-->
                                    <!--<input hidden v-model="dataForm.inventory"/>-->
                                    <!--<span>{{dataForm.inventory}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!---->
                                <!--</li>-->

                                <li>
                                    <el-row>
                                        <el-col :span="12">
                                            <label style="display: inline-block;">{{$t('hotel.scheduledays')}}</label>
                                            <el-tag>{{dataForm.scheduledays}}</el-tag>
                                        </el-col>
                                        <el-col :span="12">
                                            <label style="display: inline-block;">{{$t('hotel.favorableprice')}}</label>
                                            <el-tag>{{dataForm.favorableprice}}</el-tag>
                                        </el-col>
                                    </el-row>

                                </li>
                                <li>
                                    <label >{{$t('hotel.evenlive')}}</label>
                                    <span>{{dataForm.evenlive==0?"":dataForm.evenlive}}</span>

                                </li>
                                <li>
                                    <label width="60px">{{$t('hotel.present')}}</label>
                                    <span>{{dataForm.present}}</span>
                                </li>
                                <li style="color: darkorange">
                                    <label>{{$t('hotel.SpecialMatters')}}</label>
                                    <input hidden v-model="dataForm.specialMatters"/>
                                    <span>{{dataForm.specialMatters}}</span>
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
                                    <el-row>
                                        <el-col :span="12">
                                            <label>{{$t('hotel.roomtype.roomtype')}}</label>
                                            <input hidden v-model="dataForm.roomType"/>
                                            <el-tag>{{resolveRoomTypeName(roomType,dataForm.roomType)}}</el-tag>
                                        </el-col>
                                        <el-col :span="12">
                                            <label>{{$t('hotel.breaktype.breaktype')}}</label>
                                            <input hidden v-model="dataForm.breakType"/>
                                            <el-tag>{{resolveRoomTypeName(breakType,dataForm.breakType)}}</el-tag>

                                        </el-col>
                                    </el-row>

                                </li>
                                <li>
                                    <el-row>
                                        <el-col :span="12">
                                            <label>{{$t('hotel.roomstyle.roomstyle')}}</label>
                                            <input hidden v-model="dataForm.roomStyle"/>
                                            <el-tag>{{resolveRoomTypeName(roomStyle,dataForm.roomStyle)}}</el-tag>
                                        </el-col>
                                        <el-col :span="12">
                                            <label>{{$t('hotel.bedtype.bedtype')}}</label>
                                            <input hidden v-model="dataForm.bedType"/>
                                            <el-tag>{{resolveRoomTypeName(bedType,dataForm.bedType)}}</el-tag>
                                        </el-col>
                                    </el-row>
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
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isSeaviewRoom==1">{{$t('hotel.isSeaviewRoom')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isMountainViewRoom==1">{{$t('hotel.isMountainViewRoom')}}</el-tag>
                            <el-tag style="margin: 6px" type="success" v-show="dataForm.isCityViewRoom==1">{{$t('hotel.isCityViewRoom')}}</el-tag>
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
                            <div v-show="roomPhoto && roomPhoto.length>0">
                                <el-carousel style="margin-top: 20px" :interval="4000" type="card" height="200px">
                                    <el-carousel-item v-for="ph in roomPhoto" :key="ph">
                                        <el-image style="width:400px;height:200px" :src="photoUrl+ ph">
                                            <div slot="error" class="el-image__error">
                                                <h1 class="el-icon-picture-outline"></h1>
                                            </div>
                                        </el-image>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            <el-row style="border-top: 1px solid #e6e6e6;padding-top:5px;">
                                <el-col :span="12" >
                                    <el-form-item label-width="180px" :label="$t('hotel.representName')" prop="pName" >
                                        <el-input v-model="dataForm.pName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label-width="180px" :label="$t('hotel.passportNo')" prop="passport" >
                                        <el-input v-model="dataForm.passport"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label-width="180px" :label="$t('hotel.contactEmail')" prop="emailAddress">
                                        <el-input v-model="dataForm.emailAddress"></el-input>
                                    </el-form-item>


                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label-width="180px" :label="$t('hotel.contactPhone')" prop="phone">
                                        <el-input v-model="dataForm.phone"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label-width="180px" :label="$t('hotel.birthday')" prop="birth" >
                                        <el-date-picker
                                            v-model="dataForm.birth"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            :placeholder="$t('hotel.birthday')"  style="width: 200px" >
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span="24" align="left" style="border-top: 1px solid #e6e6e6;padding-top:5px;margin-bottom: 10px;margin-left: 10px;font-weight: bold;font-style: italic;">{{$t('hotel.childrenNum')}}</el-col>
                            </el-row>

                            <el-form-item label-width="180px" :label="$t('hotel.children612')" prop="children612">
                                <el-input-number v-model="dataForm.children612" controls-position="right" style="width: 200px"  :min="0" ></el-input-number>
                            </el-form-item>
                            <el-form-item label-width="180px" :label="$t('hotel.children46')" prop="children46" >
                                <el-input-number v-model="dataForm.children46" controls-position="right" style="width: 200px"  :min="0" ></el-input-number>
                            </el-form-item>
                            <el-form-item label-width="180px" :label="$t('hotel.children04')" prop="children4" >
                                <el-input-number v-model="dataForm.children4" controls-position="right" style="width: 200px"  :min="0" ></el-input-number>
                            </el-form-item>

                            <el-form-item label-width="180px" :label="$t('hotel.reMark')" prop="reMark">
                                <el-input type="textarea" style="width: 200px;letter-spacing: 1px" :rows="4" resize="none" v-model="dataForm.remark"></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="24" style="margin-top: 20px;margin-bottom: 20px;padding-top:10px;border-bottom: 1px solid #e6e6e6;text-align: center;border-top: 1px solid #e6e6e6;">

                                    <el-form-item  :label="$t('hotel.totalPrice')" label-width="180px" prop="totalPrice">
                                        <span  style="width: 200px;display: inline-block;text-align: left;color: #bd0b38;font-size: 24px;font-weight: bold;">{{dataForm.totalSAmount}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span="12">
                                    <el-button  @click.native="tabsCloseCurrentHandle">{{$t('action.returnHome')}}
                                    </el-button>
                                </el-col>
                                <el-col :span="12">
                                    <el-button icon="el-icon-s-order" type="primary" @click.native="submitFormBefore" :loading="editLoading">
                                        {{$t('action.makeAppointment')}}
                                    </el-button>
                                </el-col>
                            </el-row>


                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-form>


        <el-dialog width="50%"  :title="$t('order.orderAgree')" :visible.sync="agreementDialog"  append-to-body>
            <div align="center">
                <div style="overflow:scroll;width: 80%; height: 400px;" v-html="able?agreeZh:agreeEn">
                    <!--<div><p style="margin:0pt; orphans:0; text-align:center; widows:0"><span style="font-family:STXihei; font-size:10.5pt; font-weight:bold">订</span><span style="font-family:STXihei; font-size:10.5pt; font-weight:bold">房必</span><span style="font-family:STXihei; font-size:10.5pt; font-weight:bold">读</span><span style="font-family:STXihei; font-size:10.5pt; font-weight:normal">/</span><span style="background-color:#ffffff; font-family:STXihei; font-size:10.5pt; font-weight:bold">预订须</span><span style="background-color:#ffffff; font-family:STXihei; font-size:10.5pt; font-weight:bold">知</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">1、</span><span style="font-family:STXihei; font-size:10.5pt">入住和离店</span><span style="font-family:STXihei; font-size:10.5pt">：</span><span style="font-family:STXihei; font-size:10.5pt">请</span><span style="font-family:STXihei; font-size:10.5pt">遵守</span><span style="font-family:STXihei; font-size:10.5pt">各酒店</span><span style="font-family:STXihei; font-size:10.5pt">规</span><span style="font-family:STXihei; font-size:10.5pt">定</span><span style="font-family:STXihei; font-size:10.5pt">在指定的</span><span style="font-family:STXihei; font-size:10.5pt">时间</span><span style="font-family:STXihei; font-size:10.5pt">段</span><span style="font-family:STXihei; font-size:10.5pt">办</span><span style="font-family:STXihei; font-size:10.5pt">理</span><span style="font-family:STXihei; font-size:10.5pt">入住和退房手</span><span style="font-family:STXihei; font-size:10.5pt">续</span><span style="font-family:STXihei; font-size:10.5pt">。</span><span style="font-family:STXihei; font-size:10.5pt">超</span><span style="font-family:STXihei; font-size:10.5pt">时</span><span style="font-family:STXihei; font-size:10.5pt">退房酒店方会收取差价。</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">2、在</span><span style="font-family:STXihei; font-size:10.5pt">线预</span><span style="font-family:STXihei; font-size:10.5pt">定</span><span style="font-family:STXihei; font-size:10.5pt">：</span><span style="font-family:STXihei; font-size:10.5pt">请</span><span style="font-family:STXihei; font-size:10.5pt">按系</span><span style="font-family:STXihei; font-size:10.5pt">统</span><span style="font-family:STXihei; font-size:10.5pt">提示完成您的</span><span style="font-family:STXihei; font-size:10.5pt">预</span><span style="font-family:STXihei; font-size:10.5pt">定，</span><span style="font-family:STXihei; font-size:10.5pt">为</span><span style="font-family:STXihei; font-size:10.5pt">确保您的</span><span style="font-family:STXihei; font-size:10.5pt">订单</span><span style="font-family:STXihei; font-size:10.5pt">，在您填写</span><span style="font-family:STXihei; font-size:10.5pt">时</span><span style="font-family:STXihei; font-size:10.5pt">，</span><span style="font-family:STXihei; font-size:10.5pt">务</span><span style="font-family:STXihei; font-size:10.5pt">必留下准确入住人姓名（</span><span style="font-family:STXihei; font-size:10.5pt">请</span><span style="font-family:STXihei; font-size:10.5pt">确保与使用的有效</span><span style="font-family:STXihei; font-size:10.5pt">证</span><span style="font-family:STXihei; font-size:10.5pt">件上的姓名一致）以及</span><span style="font-family:STXihei; font-size:10.5pt">联</span><span style="font-family:STXihei; font-size:10.5pt">系人方式。</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">3、最晚</span><span style="font-family:STXihei; font-size:10.5pt">预</span><span style="font-family:STXihei; font-size:10.5pt">定</span><span style="font-family:STXihei; font-size:10.5pt">时间:建议</span><span style="font-family:STXihei; font-size:10.5pt">您在</span><span style="font-family:STXihei; font-size:10.5pt">规</span><span style="font-family:STXihei; font-size:10.5pt">定</span><span style="font-family:STXihei; font-size:10.5pt">时间</span><span style="font-family:STXihei; font-size:10.5pt">提前1-2天预</span><span style="font-family:STXihei; font-size:10.5pt">定。但</span><span style="font-family:STXihei; font-size:10.5pt">节</span><span style="font-family:STXihei; font-size:10.5pt">假日，会展期</span><span style="font-family:STXihei; font-size:10.5pt">间</span><span style="font-family:STXihei; font-size:10.5pt">或旅游旺季最好提前</span><span style="font-family:STXihei; font-size:10.5pt">较长时间预</span><span style="font-family:STXihei; font-size:10.5pt">定，以防酒店客</span><span style="font-family:STXihei; font-size:10.5pt">满</span><span style="font-family:STXihei; font-size:10.5pt">。超</span><span style="font-family:STXihei; font-size:10.5pt">过</span><span style="font-family:STXihei; font-size:10.5pt">最晚</span><span style="font-family:STXihei; font-size:10.5pt">预</span><span style="font-family:STXihei; font-size:10.5pt">定</span><span style="font-family:STXihei; font-size:10.5pt">时间</span><span style="font-family:STXihei; font-size:10.5pt">，系</span><span style="font-family:STXihei; font-size:10.5pt">统则</span><span style="font-family:STXihei; font-size:10.5pt">无法</span><span style="font-family:STXihei; font-size:10.5pt">预</span><span style="font-family:STXihei; font-size:10.5pt">定。</span><span style="font-family:STXihei; font-size:10.5pt">请联</span><span style="font-family:STXihei; font-size:10.5pt">系人工服</span><span style="font-family:STXihei; font-size:10.5pt">务</span><span style="font-family:STXihei; font-size:10.5pt">。</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">4、最晚修改及取消</span><span style="font-family:STXihei; font-size:10.5pt">时间</span><span style="font-family:STXihei; font-size:10.5pt">：</span><span style="font-family:STXihei; font-size:10.5pt">预</span><span style="font-family:STXihei; font-size:10.5pt">付以及担保</span><span style="font-family:STXihei; font-size:10.5pt">订单</span><span style="font-family:STXihei; font-size:10.5pt">有</span><span style="font-family:STXihei; font-size:10.5pt">规</span><span style="font-family:STXihei; font-size:10.5pt">定的最晚修改</span><span style="font-family:STXihei; font-size:10.5pt">时间</span><span style="font-family:STXihei; font-size:10.5pt">以及取消</span><span style="font-family:STXihei; font-size:10.5pt">时间</span><span style="font-family:STXihei; font-size:10.5pt">，超</span><span style="font-family:STXihei; font-size:10.5pt">过</span><span style="font-family:STXihei; font-size:10.5pt">此</span><span style="font-family:STXihei; font-size:10.5pt">时</span><span style="font-family:STXihei; font-size:10.5pt">将</span><span style="font-family:STXihei; font-size:10.5pt">可能</span><span style="font-family:STXihei; font-size:10.5pt">给</span><span style="font-family:STXihei; font-size:10.5pt">您造成</span><span style="font-family:STXihei; font-size:10.5pt">损</span><span style="font-family:STXihei; font-size:10.5pt">失。</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">5、当您需要</span><span style="font-family:STXihei; font-size:10.5pt">预</span><span style="font-family:STXihei; font-size:10.5pt">定多</span><span style="font-family:STXihei; font-size:10.5pt">间</span><span style="font-family:STXihei; font-size:10.5pt">客房</span><span style="font-family:STXihei; font-size:10.5pt">时</span><span style="font-family:STXihei; font-size:10.5pt">，</span><span style="font-family:STXihei; font-size:10.5pt">请</span><span style="font-family:STXihei; font-size:10.5pt">提供不少于</span><span style="font-family:STXihei; font-size:10.5pt">预</span><span style="font-family:STXihei; font-size:10.5pt">定客房数量的</span><span style="font-family:STXihei; font-size:10.5pt">实际</span><span style="font-family:STXihei; font-size:10.5pt">入住人的信息，入住人的姓名最好不同，以方便</span><span style="font-family:STXihei; font-size:10.5pt">预</span><span style="font-family:STXihei; font-size:10.5pt">定确</span><span style="font-family:STXihei; font-size:10.5pt">认</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">&#xa0;</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt; font-weight:bold">儿童及加床政策</span><span style="width:10.5pt; text-indent:0pt; display:inline-block"></span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">1、</span><span style="font-family:STXihei; font-size:10.5pt">酒店允</span><span style="font-family:STXihei; font-size:10.5pt">许</span><span style="font-family:STXihei; font-size:10.5pt">携</span><span style="font-family:STXihei; font-size:10.5pt">带</span><span style="font-family:STXihei; font-size:10.5pt">儿童入住</span><span style="font-family:STXihei; font-size:10.5pt">（各家酒店</span><span style="font-family:STXihei; font-size:10.5pt">规</span><span style="font-family:STXihei; font-size:10.5pt">定</span><span style="font-family:STXihei; font-size:10.5pt">不同）</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">2、</span><span style="font-family:STXihei; font-size:10.5pt">每</span><span style="font-family:STXihei; font-size:10.5pt">间</span><span style="font-family:STXihei; font-size:10.5pt">客房</span><span style="font-family:STXihei; font-size:10.5pt">根据房型可</span><span style="font-family:STXihei; font-size:10.5pt">容</span><span style="font-family:STXihei; font-size:10.5pt">纳</span><span style="font-family:STXihei; font-size:10.5pt">1</span><span style="font-family:STXihei; font-size:10.5pt">-2</span><span style="font-family:STXihei; font-size:10.5pt">名</span><span style="font-family:STXihei; font-size:10.5pt">6</span><span style="font-family:STXihei; font-size:10.5pt">岁</span><span style="font-family:STXihei; font-size:10.5pt">（</span><span style="font-family:STXihei; font-size:10.5pt">或</span><span style="font-family:STXihei; font-size:10.5pt">12</span><span style="font-family:STXihei; font-size:10.5pt">岁</span><span style="font-family:STXihei; font-size:10.5pt">）</span><span style="font-family:STXihei; font-size:10.5pt">及以下儿童，和成人共用</span><span style="font-family:STXihei; font-size:10.5pt">现</span><span style="font-family:STXihei; font-size:10.5pt">有床</span><span style="font-family:STXihei; font-size:10.5pt">铺</span><span style="font-family:STXihei; font-size:10.5pt">。</span></p><p style="margin:0pt; orphans:0; text-align:justify; text-indent:30pt; widows:0"><span style="font-family:STXihei; font-size:10.5pt">5</span><span style="font-family:STXihei; font-size:10.5pt">岁</span><span style="font-family:STXihei; font-size:10.5pt">及以下</span><span style="width:6.18pt; text-indent:0pt; display:inline-block"></span><span style="font-family:STXihei; font-size:10.5pt">1名</span><span style="font-family:STXihei; font-size:10.5pt">-</span><span style="font-family:STXihei; font-size:10.5pt">使用</span><span style="font-family:STXihei; font-size:10.5pt">现</span><span style="font-family:STXihei; font-size:10.5pt">有床</span><span style="font-family:STXihei; font-size:10.5pt">铺</span><span style="font-family:STXihei; font-size:10.5pt">免</span><span style="font-family:STXihei; font-size:10.5pt">费</span><span style="font-family:STXihei; font-size:10.5pt">，</span><span style="font-family:STXihei; font-size:10.5pt">免</span><span style="font-family:STXihei; font-size:10.5pt">费</span><span style="font-family:STXihei; font-size:10.5pt">含儿童早餐。</span></p><p style="margin:0pt; orphans:0; text-align:justify; text-indent:30pt; widows:0"><span style="font-family:STXihei; font-size:10.5pt">6-12</span><span style="font-family:STXihei; font-size:10.5pt">岁</span><span style="font-family:STXihei; font-size:10.5pt">1名</span><span style="font-family:STXihei; font-size:10.5pt">-</span><span style="font-family:STXihei; font-size:10.5pt">使用</span><span style="font-family:STXihei; font-size:10.5pt">现</span><span style="font-family:STXihei; font-size:10.5pt">有床</span><span style="font-family:STXihei; font-size:10.5pt">铺</span><span style="font-family:STXihei; font-size:10.5pt">收</span><span style="font-family:STXihei; font-size:10.5pt">费</span><span style="font-family:STXihei; font-size:10.5pt">，每人每晚</span><span style="font-family:STXihei; font-size:10.5pt">JPY650</span><span style="font-family:STXihei; font-size:10.5pt">～</span><span style="font-family:STXihei; font-size:10.5pt">，含儿童早餐。</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">3、</span><span style="font-family:STXihei; font-size:10.5pt">每</span><span style="font-family:STXihei; font-size:10.5pt">间</span><span style="font-family:STXihei; font-size:10.5pt">客房最多容</span><span style="font-family:STXihei; font-size:10.5pt">纳</span><span style="font-family:STXihei; font-size:10.5pt">1</span><span style="font-family:STXihei; font-size:10.5pt">张婴</span><span style="font-family:STXihei; font-size:10.5pt">儿床</span><span style="font-family:STXihei; font-size:10.5pt"> ：</span><span style="font-family:STXihei; font-size:10.5pt">1</span><span style="font-family:STXihei; font-size:10.5pt">岁</span><span style="font-family:STXihei; font-size:10.5pt">及以下</span><span style="font-family:STXihei; font-size:10.5pt">加</span><span style="font-family:STXihei; font-size:10.5pt">婴</span><span style="font-family:STXihei; font-size:10.5pt">儿床</span><span style="font-family:STXihei; font-size:10.5pt">免</span><span style="font-family:STXihei; font-size:10.5pt">费</span><span style="font-family:STXihei; font-size:10.5pt">，含儿童早餐。</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">4、</span><span style="font-family:STXihei; font-size:10.5pt">12</span><span style="font-family:STXihei; font-size:10.5pt">岁</span><span style="font-family:STXihei; font-size:10.5pt">以上的客人一律按照成人</span><span style="font-family:STXihei; font-size:10.5pt">标</span><span style="font-family:STXihei; font-size:10.5pt">准</span><span style="font-family:STXihei; font-size:10.5pt">100%收</span><span style="font-family:STXihei; font-size:10.5pt">费</span><span style="font-family:STXihei; font-size:10.5pt">。</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">加床及儿童政策取决于您所</span><span style="font-family:STXihei; font-size:10.5pt">选</span><span style="font-family:STXihei; font-size:10.5pt">的房型，若超</span><span style="font-family:STXihei; font-size:10.5pt">过</span><span style="font-family:STXihei; font-size:10.5pt">房型限定人数，或携</span><span style="font-family:STXihei; font-size:10.5pt">带</span><span style="font-family:STXihei; font-size:10.5pt">儿童年</span><span style="font-family:STXihei; font-size:10.5pt">龄</span><span style="font-family:STXihei; font-size:10.5pt">不在政策描述范</span><span style="font-family:STXihei; font-size:10.5pt">围</span><span style="font-family:STXihei; font-size:10.5pt">内，可能需收取</span><span style="font-family:STXihei; font-size:10.5pt">额</span><span style="font-family:STXihei; font-size:10.5pt">外</span><span style="font-family:STXihei; font-size:10.5pt">费</span><span style="font-family:STXihei; font-size:10.5pt">用，提出的任何要求均需</span><span style="font-family:STXihei; font-size:10.5pt">获</span><span style="font-family:STXihei; font-size:10.5pt">得酒店的确</span><span style="font-family:STXihei; font-size:10.5pt">认</span><span style="font-family:STXihei; font-size:10.5pt">。</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">&#xa0;</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt; font-weight:bold">吸烟</span><span style="font-family:STXihei; font-size:10.5pt; font-weight:bold">罚</span><span style="font-family:STXihei; font-size:10.5pt; font-weight:bold">款</span><span style="font-family:STXihei; font-size:10.5pt; font-weight:bold">政策</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">日本的酒店或温泉旅</span><span style="font-family:STXihei; font-size:10.5pt">馆</span><span style="font-family:STXihei; font-size:10.5pt">内的公共</span><span style="font-family:STXihei; font-size:10.5pt">场</span><span style="font-family:STXihei; font-size:10.5pt">所大都</span><span style="font-family:STXihei; font-size:10.5pt">实</span><span style="font-family:STXihei; font-size:10.5pt">行禁烟。一些酒店</span><span style="font-family:STXihei; font-size:10.5pt">设</span><span style="font-family:STXihei; font-size:10.5pt">有吸烟区，</span><span style="font-family:STXihei; font-size:10.5pt">请</span><span style="font-family:STXihei; font-size:10.5pt">注意酒店</span><span style="font-family:STXihei; font-size:10.5pt">內</span><span style="font-family:STXihei; font-size:10.5pt">的相关</span><span style="font-family:STXihei; font-size:10.5pt">标</span><span style="font-family:STXihei; font-size:10.5pt">示，遵守酒店的</span><span style="font-family:STXihei; font-size:10.5pt">规</span><span style="font-family:STXihei; font-size:10.5pt">定和公共道德。日本的酒店客房分</span><span style="font-family:STXihei; font-size:10.5pt">为</span><span style="font-family:STXihei; font-size:10.5pt">禁烟房和吸烟房，在禁烟房内是</span><span style="font-family:STXihei; font-size:10.5pt">绝对</span><span style="font-family:STXihei; font-size:10.5pt">禁止吸烟的</span><span style="font-family:STXihei; font-size:10.5pt">、</span><span style="font-family:STXihei; font-size:10.5pt">请</span><span style="font-family:STXihei; font-size:10.5pt">避免在客房，阳台和走廊吸烟。</span><span style="font-family:STXihei; font-size:10.5pt">请</span><span style="font-family:STXihei; font-size:10.5pt">注意，如果在房</span><span style="font-family:STXihei; font-size:10.5pt">间</span><span style="font-family:STXihei; font-size:10.5pt">内</span><span style="font-family:STXihei; font-size:10.5pt">发现</span><span style="font-family:STXihei; font-size:10.5pt">吸烟或烟</span><span style="font-family:STXihei; font-size:10.5pt">头</span><span style="font-family:STXihei; font-size:10.5pt">，将向您收取</span><span style="font-family:STXihei; font-size:10.5pt">20,000日元至30,000日元的房</span><span style="font-family:STXihei; font-size:10.5pt">间</span><span style="font-family:STXihei; font-size:10.5pt">清</span><span style="font-family:STXihei; font-size:10.5pt">洁费</span><span style="font-family:STXihei; font-size:10.5pt">和房</span><span style="font-family:STXihei; font-size:10.5pt">间损</span><span style="font-family:STXihei; font-size:10.5pt">坏</span><span style="font-family:STXihei; font-size:10.5pt">赔偿费</span><span style="font-family:STXihei; font-size:10.5pt">。感</span><span style="font-family:STXihei; font-size:10.5pt">谢</span><span style="font-family:STXihei; font-size:10.5pt">您的</span><span style="font-family:STXihei; font-size:10.5pt">理解和</span><span style="font-family:STXihei; font-size:10.5pt">合作</span><span style="font-family:STXihei; font-size:10.5pt">。</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">&#xa0;</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">&#xa0;</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">附</span><span style="font-family:STXihei; font-size:10.5pt">则</span></p><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:STXihei; font-size:10.5pt">本</span><span style="font-family:STXihei; font-size:10.5pt">标</span><span style="font-family:STXihei; font-size:10.5pt">准最</span><span style="font-family:STXihei; font-size:10.5pt">终</span><span style="font-family:STXihei; font-size:10.5pt">解</span><span style="font-family:STXihei; font-size:10.5pt">释权归</span><span style="font-family:STXihei; font-size:10.5pt">平台事</span><span style="font-family:STXihei; font-size:10.5pt">业</span><span style="font-family:STXihei; font-size:10.5pt">部</span><span style="font-family:STXihei; font-size:10.5pt">所有</span></p></div>-->
                </div>
                <br>
                <el-checkbox v-model="agreeValue">{{$t('order.agree')}}</el-checkbox>
            </div>

            <div slot="footer" class="form-footer" align="center">
                <el-button icon="el-icon-s-order" type="primary" @click.native="submitForm" :loading="editLoading" :disabled="agreeButton">
                    {{$t('action.makeAppointment')}}
                </el-button>
                <el-button  @click.native="closeAgreeDialog">{{$t('action.cancel')}}
                </el-button>
            </div>

        </el-dialog>


    </div>
</template>

<script>
    import {baseUrl} from '@/utils/global'
    import {getAgreeZh,getAgreeEn} from "@/utils/agree"
    import {parseStrToDate,formatDate} from "@/utils/datetime"

    export default {
        name: "HotelOrderPage",
        props:{
            roomCd:String,
            frameDate:Array
        },
        data() {
            return {
                loading:false,
                editLoading:false,
                agreementDialog:false,
                agreeValue:false,
                agreeButton:true,
                able:false,
                agreeZh:'',
                agreeEn:'',
                size: 'mini',
                gridData:[],
                commonDate:[],
                photoUrl: baseUrl + '/document/preview/',
                roomId:null,
                pageRequest: {page: 1, rows: 10},
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
                advanceDays:null,//用于获取预定房间的日期与当前日期的天数
                language: {},
                filters: {
                    hotelType:null,
                    roomCode: null,
                    photo: null,
                    inDateStart: null,
                    outDateEnd: null
                },
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
                    hotelCname:null,
                    hotelEname:null,
                    photo: null,
                    roomStock: null,
                    recommended: null,
                    roomPrice: null,
                    inDateStart: null,
                    outDateEnd: null,
                    roomNum: 0,
                    adultNum: 0,
                    childNum: 0,
                    lastCrtTime: null,
                    pName: null,
                    passport: null,
                    birth: null,
                    contactPhone: null,
                    emailAddress: null,
                    children612: 0,
                    children46: 0,
                    children4: 0,
                    totalSAmount: null,
                    totalTAmount: null,
                    remark: null,
                    sRoomPrice: null,
                    endPrice:null,
                    specialMatters:null,
                    roomNight:null
                },
                dataFormRules: {
                    adultNum: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    childNum: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
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
                    ],
                    roomNum:[
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    children612: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    children46: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    children4: [
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ],
                    birth:[
                        {required: true, message: this.$t('action.noNull'), trigger: 'blur'}
                    ]

                },
                pickerOptions:{
                    disabledDate : (time) => {
                        var nowDate = new Date();
                        var day = 7;
                        if(nowDate.getHours()>17 || (nowDate.getHours()==17 && nowDate.getMinutes() >= 30)){
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
                }
            }
        },
        methods:{
            // 获取分页数据
            findPage: function () {
                this.dataForm= {
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
                        hotelCname:null,
                        hotelEname:null,
                        photo: null,
                        roomStock: null,
                        recommended: null,
                        roomPrice: null,
                        inDateStart: null,
                        outDateEnd: null,
                        roomNum: 0,
                        adultNum: 0,
                        childNum: 0,
                        lastCrtTime: null,
                        pName: null,
                        passport: null,
                        birth: null,
                        contactPhone: null,
                        emailAddress: null,
                        children612: 0,
                        children46: 0,
                        children4: 0,
                        totalSAmount: null,
                        totalTAmount: null,
                        remark: null,
                        sRoomPrice: null,
                        endPrice:null,
                        specialMatters:null,
                        roomNight:null
                }
                // console.log(this.frameDate+this.roomCd)
                this.commonDate = this.frameDate;
                this.loading = true;
                this.roomPhoto=[];
                this.initData(); //初始化客房编号字段
                //如果roomId为空，说明需要关闭当前页面
                if (!this.roomId) {
                    this.filters.roomCode = this.$route.query.recommondCode
                } else {
                    this.filters.roomCode = this.roomId;
                }
                //调用查询
                this.dateChangeCanculate();

            },
            submitForm: function () {
                if (!this.agreeValue) {
                    this.$message({ message: this.$t('action.agreement'), type: 'warn' })
                    return;
                }
                this.editLoading = true
                this.loading = true
                let params = Object.assign({}, this.dataForm,
                    {'inDateStart':this.filters.inDateStart,
                        'outDateEnd':this.filters.outDateEnd})
                this.$api.hotelRoom.save(params).then((res) => {
                    if(res.code == 200) {
                        this.$message({ message: this.$t('action.success'), type: 'success' })
                    } else {
                        this.$message({message: this.$t('action.fail') , type: 'error'})
                    }
                    this.editLoading = false
                    this.loading = false
                    this.agreementDialog = false;
                    this.agreeValue = false;
                    this.$refs['dataForm'].resetFields()
                    this.tabsCloseCurrentHandle();

                }).catch(() => {
                    this.loading = false
                    this.editLoading = false
                    this.agreementDialog = false;
                    this.agreeValue = false;
                })

            },
            submitFormBefore:function () {
                if (!this.validFunction()) {
                    return;
                }
                this.$refs.dataForm.validate((valid) => {
                        if (valid) {
                            //弹出框提示用户需要同意协议
                            this.agreementDialog = true;
                        } else {
                            this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
                        }
                })
            },
            closeAgreeDialog: function() {
                this.agreeValue = false;
                this.agreementDialog = false;
            },
            localLanguageLoad: function () {
                this.language = {lge: this.$i18n.locale}
                this.able = this.language.lge=='zh_cn'?true:false;

                this.agreeZh = getAgreeZh();
                this.agreeEn = getAgreeEn();

            },
            // tabs, 删除tab
            removeTabHandle(tabName) {
                if(this.$route.query.recommondCode) {
                    this.mainTabs = this.mainTabs.filter(item => item.name !== this.mainTabsActiveName)
                    if (this.mainTabs.length >= 1) {
                        // 当前选中tab被删除
                        if (this.mainTabsActiveName === this.mainTabsActiveName) {
                            this.$router.push({name: this.mainTabs[this.mainTabs.length - 1].name}, () => {
                                this.mainTabsActiveName = this.$route.name
                            })
                        }
                    }
                    this.$router.push("/info/hotelRoomQry")
                } else {
                    this.commonDate = this.frameDate
                    console.log(this.$refs.dataForm);
                    if(this.$refs.dataForm){
                        this.$refs.dataForm.resetFields();
                    }
                    this.$emit('editDialog')
                }
            },
            // tabs, 关闭当前
            tabsCloseCurrentHandle() {
                this.removeTabHandle(this.mainTabsActiveName)
            },
            dateChangeCanculate: function() {
                console.log("+++++++",this.commonDate)
                if(this.commonDate.length>1){
                    this.filters.inDateStart = this.commonDate[0];
                    this.filters.outDateEnd = this.commonDate[1];
                } else {
                    this.$message({ message: this.$t('action.invIsOutException'), type: 'warn' })
                    return
                }
                this.dataForm.roomNum = 0;
                this.$api.hotelRoom.findPage({...this.pageRequest,...this.filters}).then((res) => {
                    console.log("hotelRoom",res)
                    this.dataForm = Object.assign(this.dataForm,res.rows[0]);
                    if(res.rows[0] == null|| res.rows[0] == "") {
                        this.$message({ message: this.$t('action.pInvPriceErr'), type: 'warn' })
                    } else {
                        this.dataForm.sRoomPrice = res.rows[0].sPrice
                    }
                    if (res.rows[0].photo != null && res.rows[0].photo!='') {
                        if(res.rows[0].photo){
                            this.$api.user.showFile({'relationId':res.rows[0].photo}).then((res) =>{
                                this.roomPhoto = res;
                            })
                        }
                    }
                    //查询明细牌价
                    this.$api.bizPuchs.findByDate({...this.pageRequest,...this.filters}).then((res) => {
                        console.log("bizPuchs",res)
                        this.gridData = res;
                        this.loading = false;
                    },() =>{
                        this.loading = false;
                    })

                    if (this.commonDate.length>1) {
                        var n = this.commonDate;
                        var startDate = n[0].substr(0,4) + "/" + n[0].substr(4,2) +"/" +n[0].substr(6,2) ;
                        var oDate1 = Date.parse(startDate);
                        var lastCrt = new Date(oDate1 - 3600 * 1000 * 24 * 7);
                        this.dataForm.lastCrtTime = formatDate(lastCrt,'yyyyMMdd');
                    }
                },() =>{
                })


            },
            initData:function() {
                if (!this.roomCd) {
                    if (!this.$route.query.recommondCode) {
                        this.$message({ message: this.$t('action.noHaveRoomInfo'), type: 'warn' })
                        this.tabsCloseCurrentHandle();
                        return;
                    }
                }
                if (this.roomCd) {
                    this.roomId = this.roomCd;
                    return;
                }
                if (this.$route.query.recommondCode) {
                    this.roomId = this.$route.query.recommondCode
                    return;
                }

            },
            validFunction:function () {
                if (this.commonDate.length <1) {
                    this.$message({message: this.$t('action.pInOutDate') , type: 'error'})
                    return false;
                }
                if (this.dataForm.roomNum < 1 ) {
                    this.$message({message: this.$t('action.roomNumErr') , type: 'error'})
                    return false;
                }
                if (this.gridData.length != this.filters.roomNight) {
                    this.$message({message: this.$t('action.priceErr') , type: 'error'})
                    return false;
                }
                if (this.dataForm.totalTAmount =='' || this.dataForm.totalTAmount == null) {
                    this.$message({message: this.$t('action.operErr') , type: 'error'})
                    return false;
                }

                /*
                入住日算起，倒退七天前的那一天18:30分开始，将无法预约入住日的酒店客
                 */
                var date = new Date();
                var y = date.getFullYear();
                var m = date.getMonth() +1;
                var d = date.getDate();
                var t = y+"-"+m+"-"+d+" "+"17:30:00";
                var tDate = new Date(Date.parse(t.replace(/-/g, "/")))
                var inDateStart = this.commonDate[0];
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
                    return false;
                }
                return true
            }
        },
        created(){
            this.getTypeValues('SYSTEM_DAYS,ROOM_STYLE,ROOM_TYPE,HOTEL_STAR,HOTEL_TYPE,BREAK_TYPE,BED_TYPE,PREFECTURE,DISTRICT').then( res =>{
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
        mounted() {
            this.localLanguageLoad();
            this.findPage();
        },
        computed: {
            mainTabs: {
                get() {
                    return this.$store.state.tab.mainTabs
                },
                set(val) {
                    this.$store.commit('updateMainTabs', val)
                }
            },
            mainTabsActiveName: {
                get() {
                    return this.$store.state.tab.mainTabsActiveName
                },
                set(val) {
                    this.$store.commit('updateMainTabsActiveName', val)
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
                    num = this.dataForm.favorableprice * this.filters.roomNight*this.dataForm.roomNum;
                }
                this.dataForm.totalSAmount = this.dataForm.roomNum==0?0:this.dataForm.roomNum * totlPrice-num;
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
                    num = this.dataForm.favorableprice*this.filters.roomNight*this.dataForm.roomNum;
                }
                this.dataForm.totalSAmount = this.dataForm.roomNum==0?0:this.dataForm.roomNum * totlPrice-num;

            },
            'dataForm.adultNum'(){
                var totlPrice = 0;
                if(this.gridData.length<0) {
                    return
                } else {
                    for (var i = 0 ; i<this.gridData.length ; i++) {
                        totlPrice += this.gridData[i].tprice
                    }
                }
                console.log("this.dataForm.roomType",this.dataForm.roomType);
                if (this.dataForm.roomType != "5") {
                    this.dataForm.totalTAmount = (this.dataForm.adultNum ) * totlPrice;
                } else {
                    this.dataForm.totalTAmount =  totlPrice;
                }
            },
            agreeValue(n,o) {
                if (n) {
                    this.agreeButton = false
                } else {
                    this.agreeButton=true
                }
            },
            'dataForm.children612'(){
                var totlPrice = 0;
                if(this.gridData.length<0) {
                    return
                } else {
                    for (var i = 0 ; i<this.gridData.length ; i++) {
                        totlPrice += this.gridData[i].tprice
                    }
                }
                if (this.dataForm.roomType != "5") {
                    this.dataForm.totalTAmount = (this.dataForm.adultNum ) * totlPrice;
                } else {
                    console.log(totlPrice)
                    this.dataForm.totalTAmount =  totlPrice;
                }
            },
            'dataForm.children46'(){
                var totlPrice = 0;
                if(this.gridData.length<0) {
                    return
                } else {
                    for (var i = 0 ; i<this.gridData.length ; i++) {
                        totlPrice += this.gridData[i].tprice
                    }
                }
                if (this.dataForm.roomType != "5") {
                    this.dataForm.totalTAmount = (this.dataForm.adultNum ) * totlPrice;
                } else {
                    this.dataForm.totalTAmount = totlPrice;
                }
            },
            commonDate(n,o){
                if (this.commonDate.length > 1) {
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

                    var lastCrt = new Date(oDate1 - 3600 * 1000 * 24 * 7);
                    this.dataForm.lastCrtTime = formatDate(lastCrt,'yyyyMMdd');

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
                    this.dataForm.totalSAmount = this.dataForm.roomNum==0?0:this.dataForm.roomNum * totlPrice-num;
                    if (this.dataForm.roomType != "5") {
                        this.dataForm.totalTAmount = (this.dataForm.adultNum ) * tPrice;
                    } else {
                        this.dataForm.totalTAmount = tPrice;
                    }


                }

            },
            roomCd(n,o) {
                if (n) {
                    this.findPage()
                }

            }
        }

    }

</script>

<style scoped>
    .hotel-base >>> .el-date-editor {
        width: 200px;
    }
    .main-content {
        margin-top: 10px;
        padding-top: 10px;
    }
    .form-footer {
        margin-top: 20px;
        margin-bottom: 50px;
    }
    .hotel-base{
        margin: 0;
        padding: 0;
        color: #212121;
    }
    .hotel-base>li{
        padding: 10px 20px;
        list-style: none;
        font-size: 14px;
    }
    .hotel-base>li>label {
        width: 80px;
        display: inline-block;
    }

</style>
