<template>
  <div class="container" style="width:99%;margin-top:-25px;">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:30px;padding-left:20px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.hotelCode" :placeholder="$t('hotel.hotelCode')"></el-input>
			</el-form-item>
      <el-form-item>
        <el-input v-model="filters.hotelName" :placeholder="$t('hotel.hotelname')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.roomType" :placeholder="$t('hotel.roomtype.roomtype')">
          <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item>-->
        <!--<el-select v-model="filters.roomStyle" :placeholder="$t('hotel.roomstyle.roomstyle')">-->
          <!--<el-option v-for="rs in paraConfig.roomstyle" :key="rs.paraCode" :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>-->

        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-select v-model="filters.bedType" :placeholder="$t('hotel.bedtype.bedtype')">
          <el-option v-for="bt in paraConfig.bedtype" :key="bt.paraCode" :label="$t('hotel.'+ bt.paraCode)" :value="bt.paraValue1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.breakType" :placeholder="$t('hotel.breaktype.breaktype')">
          <el-option v-for="bk in paraConfig.breaktype" :key="bk.paraCode" :label="$t('hotel.'+ bk.paraCode)" :value="bk.paraValue1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.inventory" :placeholder="$t('hotel.inventory')"></el-input>
      </el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.search')" perms="sys:bizRoom:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.add')" perms="sys:bizRoom:add" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
	<room-table permsEdit="sys:bizRoom:edit" permsDelete="sys:bizRoom:delete" permsPriceEdit="sys:bizRoom:editPrice" permsStockEdit="sys:bizRoom:editStock"
		:data="pageResult"
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete" @handlePriceEdit="handlePriceEdit" @handleStockEdit="handleStockEdit">
	</room-table>

	<!--新增编辑界面-->
	<el-dialog :title="operation?$t('action.add'):$t('action.edit')" width="50%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{$t('common.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('sys.guestMng')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('sys.guestEdit')}}</el-breadcrumb-item>
    </el-breadcrumb>

		<el-form :model="dataForm" style="margin-top: 20px" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size" :inline="true" label-position="left">
			<!--<el-form-item label="客房编号" prop="roomCode"  v-if="dataForm.isPrimaryKey">-->
				<!--<el-input v-model="dataForm.roomCode" auto-complete="off"></el-input>-->
			<!--</el-form-item>-->
      <el-row>
        <el-col :span="12">
          <el-form-item  :label="$t('hotel.hotelname')" prop="hotelCode"  auto-complete="off" >
            <el-select v-model="dataForm.hotelCode" :disabled="disableHotelName">
              <el-option v-for=" hotelName in hotelNames" :key="hotelName.hotelCode" :label="language.lge=='zh_cn'?hotelName.hotelCname:hotelName.hotelEname" :value="hotelName.hotelCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('hotel.roomtype.roomtype')" prop="roomType" auto-complete="off" >
          <el-select v-model="dataForm.roomType" >
            <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('hotel.roomstyle.roomstyle')" prop="roomStyle" auto-complete="off" >
            <el-select v-model="dataForm.roomStyle" >
              <el-option v-for="rs in paraConfig.roomstyle" :key="rs.paraCode" :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('hotel.bedtype.bedtype')" prop="bedType" auto-complete="off">
            <el-select v-model="dataForm.bedType" >
              <el-option v-for="bt in paraConfig.bedtype" :key="bt.paraCode" :label="$t('hotel.'+ bt.paraCode)" :value="bt.paraValue1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('hotel.breaktype.breaktype')" prop="breakType" auto-complete="off">
            <el-select v-model="dataForm.breakType" >
              <el-option v-for="bk in paraConfig.breaktype" :key="bk.paraCode" :label="$t('hotel.'+ bk.paraCode)" :value="bk.paraValue1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('hotel.roomarea')+'(m2)'" prop="roomArea" auto-complete="off">
            <el-input v-model="dataForm.roomArea" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" >
          <el-form-item :label="$t('hotel.introc')" prop="introC"  auto-complete="off">
            <el-input v-model="dataForm.introC" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('hotel.introe')" prop="introE"  auto-complete="off">
            <el-input v-model="dataForm.introE" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('hotel.roomstock')" prop="roomStock"  auto-complete="off">
            <el-input v-model="dataForm.roomStock" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <!--<el-select v-model="dataForm.recommended" perms="sys:bizRoom:check" type="primary">-->
              <!--<el-option v-for="rm in paraConfig.recommended" :key="rm.paraCode" :label="$t('hotel.'+ rm.paraCode)" :value="rm.paraValue1"></el-option>-->
            <!--</el-select>-->
            <kt-checkbox trueLable="01" falseLable="02" :label="$t('hotel.recommended')" @changeValue="changeValue" :modelParent="dataForm.recommended" perms="sys:bizRoom:check"></kt-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <br>
      <h3 style="text-align: left">常用信息:</h3>
      <el-row>
        <el-col :span="12" align="left">
            <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswify')" v-model="dataForm.iswify" border></el-checkbox>
            </el-form-item>
            <el-form-item>
               <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isfront')" v-model="dataForm.isfront" border></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbarrifr')" v-model="dataForm.isbarrifr" border></el-checkbox>
            </el-form-item>
        </el-col>
        <el-col :span="12" align="left">

          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbalcony')" v-model="dataForm.isbalcony" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iskitchen')" v-model="dataForm.iskitchen" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswindow')" v-model="dataForm.iswindow" border></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isheat')" v-model="dataForm.isheat" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isicebox')" v-model="dataForm.isicebox" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isiron')" v-model="dataForm.isiron" border></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isnosmk')" v-model="dataForm.isnosmk" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islandscape')" v-model="dataForm.islandscape" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishighrise')" v-model="dataForm.ishighrise" border></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ispark')" v-model="dataForm.ispark" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isgym')" v-model="dataForm.isgym" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isswmp')" v-model="dataForm.isswmp" border></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbeach')" v-model="dataForm.isbeach" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishotsp')" v-model="dataForm.ishotsp" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ischildct')" v-model="dataForm.ischildct" border></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isroomserv')" v-model="dataForm.isroomserv" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isknead')" v-model="dataForm.isknead" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islounge')" v-model="dataForm.islounge" border></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12" align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.issuper')" v-model="dataForm.issuper" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbus')" v-model="dataForm.isbus" border></el-checkbox>
          </el-form-item>

        </el-col>
      </el-row>

      <el-row>
        <el-col align="left">
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.istrafic')" v-model="dataForm.istrafic" border></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isrestau')" v-model="dataForm.isrestau" border></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item :label="$t('hotel.photo')" prop="photo" auto-complete="off">
            <el-upload
              ref="upload"
              :http-request="uploadFile"
              list-type="picture-card"
              :on-error="handlerror"
              :on-success="handlesuccess"
              :auto-upload="false"
              action="#"
              :file-list="files"
              multiple>
              <i class="el-icon-plus"></i>
            </el-upload>

          </el-form-item>
        </el-col>
      </el-row>

      <!--<el-row>-->
        <!--<el-col>-->
          <!--<el-form-item :label="$t('hotel.photo')" prop="photo" auto-complete="off">-->
            <!--<el-upload-->
              <!--ref="upload"-->
              <!--list-type="picture-card"-->
              <!--:on-error="handlerror"-->
              <!--:on-success="handlesuccess"-->
              <!--:file-list="files"-->
              <!--:auto-upload="false"-->
              <!--:action="baseUrl+dataurl"-->
              <!--name="files"-->
              <!--multiple>-->
              <!--<i class="el-icon-plus"></i>-->
            <!--</el-upload>-->

          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
  </el-dialog>


    <!--牌价修改弹出框-->
    <el-dialog @open="datePickerMethod" :title="operation?$t('action.add'):$t('action.edit')" width="50%" :visible.sync="editPriceDialogVisible" :close-on-click-modal="false">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{$t('common.home')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('sys.guestMng')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('sys.guestPriceEdit')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-form style="margin-top: 20px" :model="priceForm" label-width="80px" :rules="priceFormRules" ref="priceForm" :size="size" :inline="true" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item  :label="$t('hotel.roomcode')" prop="hotelCode"  auto-complete="off" >
              <el-input v-model="priceForm.roomCode" :disabled="priceBoolean"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('action.pPriceYear')" prop="pPriceYear"  auto-complete="off">
              <el-date-picker
                v-model="priceForm.priceYear"
                align="right"
                type="year"
                :placeholder="$t('action.pPriceYear')">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item  :label="$t('hotel.provinceCode.provinceCode')" prop="provinceCode"  auto-complete="off" >
              <el-input v-model="priceForm.provinceCode" :disabled="priceBoolean"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('hotel.cityCode.cityCode')" prop="cityCode" auto-complete="off" >
              <el-input v-model="priceForm.cityCode" :disabled="priceBoolean"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item  :label="$t('hotel.hotelCode')" prop="hotelCode"  auto-complete="off" >
              <el-input v-model="priceForm.hotelCode" :disabled="priceBoolean"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item  :label="$t('hotel.hotelname')" prop="hotelCName"  auto-complete="off" >
              <el-input v-model="language.lge=='zh_cn'?priceForm.hotelCname:priceForm.hotelEname" :disabled="priceBoolean"></el-input>
            </el-form-item>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('hotel.roomtype.roomtype')" prop="roomType" auto-complete="off" >
              <el-select v-model="priceForm.roomType" :disabled="priceBoolean">
                <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('hotel.bedtype.bedtype')" prop="roomType" auto-complete="off" >
              <el-select v-model="priceForm.bedType" :disabled="priceBoolean">
                <el-option v-for="rt in paraConfig.bedtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('hotel.priceDateInterval')" prop="priceDateInterval" auto-complete="off" >
              <el-date-picker
                v-model="priceForm.priceDateInterval"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item prop="isMonday">
              <el-checkbox true-label="1" false-label="2" v-model="priceForm.isMonday" label="月" border></el-checkbox>
            </el-form-item>
            <el-form-item   prop="isTuesday">
              <el-checkbox true-label="1" false-label="2" v-model="priceForm.isTuesday" label="火" border></el-checkbox>
            </el-form-item>
            <el-form-item prop="isThursday" >
              <el-checkbox true-label="1" false-label="2" v-model="priceForm.isThursday" label="水" border></el-checkbox>
            </el-form-item>
            <el-form-item  prop="isFourday">
              <el-checkbox true-label="1" false-label="2" v-model="priceForm.isFourday" label="木" border></el-checkbox>
            </el-form-item>
            <el-form-item  prop="isFriday" >
              <el-checkbox true-label="1" false-label="2" v-model="priceForm.isFriday" label="金" border></el-checkbox>
            </el-form-item>
            <el-form-item   prop="isSaterday">
              <el-checkbox true-label="1" false-label="2" v-model="priceForm.isSaterday" label="土" border></el-checkbox>
            </el-form-item>
            <el-form-item prop="isSunday" >
              <el-checkbox true-label="1" false-label="2" v-model="priceForm.isSunday" label="日" border></el-checkbox>
            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('hotel.sPrice')" prop="sprice" auto-complete="off" >
              <el-input v-model="priceForm.sprice" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('hotel.tPrice')" prop="tprice" auto-complete="off" >
              <kt-input :modelValue="isNaN(String(priceForm.tprice))?'':String(priceForm.tprice)" perms="sys:bizRoom:input" @changInputValue="changInputValue"></kt-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('hotel.sRoomPrice')" prop="sRoomPrice" auto-complete="off" >
              <el-input v-model="priceForm.sRoomPrice" :disabled="priceBoolean" >{{sRoomPrice}}</el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item  auto-complete="off" >
              <el-button type="primary" round @click="producePriceData">输入</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <date-picker :dateData="priceDateData" :roomId="priceForm.roomCode" ref="init">

            </date-picker>
          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="cancelPriceForm">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submitPriceForm" :loading="editPriceLoading">{{$t('action.submit')}}</el-button>
      </div>
    </el-dialog>

    <!--库存修改弹出框-->
    <el-dialog @open="datePickerStockMethod" :title="operation?$t('action.add'):$t('action.edit')" width="50%" :visible.sync="editStockDialogVisible" :close-on-click-modal="false">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{$t('common.home')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('sys.guestMng')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('sys.stockMng')}}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-form style="margin-top: 20px" :model="stockForm" label-width="80px" :rules="stockFormRules" ref="stockForm" :size="size" :inline="true" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item  :label="$t('hotel.roomcode')" prop="hotelCode"  auto-complete="off" >
              <el-input v-model="stockForm.roomCode" :disabled="stockBoolean"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('action.pPriceYear')" prop="pPriceYear"  auto-complete="off">
              <el-date-picker
                v-model="stockForm.stockYear"
                align="right"
                type="year"
                :placeholder="$t('action.pPriceYear')">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item  :label="$t('hotel.provinceCode.provinceCode')" prop="provinceCode"  auto-complete="off" >
              <el-input v-model="stockForm.provinceCode" :disabled="stockBoolean"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('hotel.cityCode.cityCode')" prop="cityCode" auto-complete="off" >
              <el-input v-model="stockForm.cityCode" :disabled="stockBoolean"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item  :label="$t('hotel.hotelCode')" prop="hotelCode"  auto-complete="off" >
              <el-input v-model="stockForm.hotelCode" :disabled="stockBoolean"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item  :label="$t('hotel.hotelname')" prop="hotelCName"  auto-complete="off" >
              <el-input v-model="language.lge=='zh_cn'?stockForm.hotelCname:stockForm.hotelEname" :disabled="stockBoolean"></el-input>
            </el-form-item>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('hotel.roomtype.roomtype')" prop="roomType" auto-complete="off" >
              <el-select v-model="stockForm.roomType" :disabled="stockBoolean">
                <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('hotel.bedtype.bedtype')" prop="roomType" auto-complete="off" >
              <el-select v-model="stockForm.bedType" :disabled="stockBoolean">
                <el-option v-for="rt in paraConfig.bedtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('hotel.priceDateInterval')" prop="priceDateInterval" auto-complete="off" >
              <el-date-picker
                v-model="stockForm.stockDateInterval"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item prop="isMonday">
              <el-checkbox true-label="1" false-label="2" v-model="stockForm.isMonday" label="月" border></el-checkbox>
            </el-form-item>
            <el-form-item   prop="isTuesday">
              <el-checkbox true-label="1" false-label="2" v-model="stockForm.isTuesday" label="火" border></el-checkbox>
            </el-form-item>
            <el-form-item prop="isThursday" >
              <el-checkbox true-label="1" false-label="2" v-model="stockForm.isThursday" label="水" border></el-checkbox>
            </el-form-item>
            <el-form-item  prop="isFourday">
              <el-checkbox true-label="1" false-label="2" v-model="stockForm.isFourday" label="木" border></el-checkbox>
            </el-form-item>
            <el-form-item  prop="isFriday" >
              <el-checkbox true-label="1" false-label="2" v-model="stockForm.isFriday" label="金" border></el-checkbox>
            </el-form-item>
            <el-form-item   prop="isSaterday">
              <el-checkbox true-label="1" false-label="2" v-model="stockForm.isSaterday" label="土" border></el-checkbox>
            </el-form-item>
            <el-form-item prop="isSunday" >
              <el-checkbox true-label="1" false-label="2" v-model="stockForm.isSunday" label="日" border></el-checkbox>
            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('hotel.inventory')" prop="sPrice" auto-complete="off" >
              <el-input v-model="stockForm.inventory" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="autoClose" auto-complete="off" >
              <el-checkbox true-label="Y" false-label="N" v-model="stockForm.autoClose" :label="$t('hotel.autoClose')" border></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item  auto-complete="off" >
              <el-button type="primary" round @click="produceStockData">输入</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <!--<date-picker :dateData="stockDateData" :trType="stockState">-->

            <!--</date-picker>-->
            <stock-picker :dateData="stockDateData" :roomId="stockForm.roomCode" ref="init" >

            </stock-picker>
          </el-col>

        </el-row>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="cancelStockForm">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submitStockForm" :loading="editStockLoading">{{$t('action.submit')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Cookies from "js-cookie";
  import DatePicker from "@/views/Core/DatePicker"
  import StockPicker from "@/views/Core/StockPicker"
  import RoomTable from "@/views/Core/RoomTable"
  import KtInput from "@/views/Core/KtInput"
  import KtCheckbox from "@/views/Core/KtCheckbox"
  import KtButton from "@/views/Core/KtButton"
  import { baseUrl } from '@/utils/global';
  import { format } from "@/utils/datetime"

export default {
	components:{
    RoomTable,
    KtButton,
    KtCheckbox,
    KtInput,
    DatePicker,
    StockPicker
	},
	data() {
		return {
		  baseUrl:baseUrl,
      priceBoolean:true,
      stockBoolean:true,
      disableHotelName:false,
      dataurl:'/document/upload',
			size: 'small',
			filters: {
        hotelCode: '',
        hotelName:'',
        roomType:'',
        bedType:'',
        breakType:'',
        inventory:''
			},
			columns: [

			],
			pageRequest: {
		    page: 1,
        rows:10 ,
        hotelCode: null,
        hotelName: null,
        roomType:null,
        bedType:null,
        breakType:null,
        inventory: null
      },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
      editPriceDialogVisible: false, // 编辑牌价界面是否显示
      editStockDialogVisible: false, // 编辑库存界面是否显示
			editLoading: false,
      editPriceLoading:false,
      editStockLoading:false,
			dataFormRules: {
        hotelCode: [
					{ required: true, message: this.$t('action.pHotelName'), trigger: 'blur' }
				],
        roomType:[
          {required:true, message:this.$t('action.pRoomType'),trigger:'blur'}
        ],
        roomStyle:[
          {required:true, message:this.$t('action.pRoomStyle'),trigger:'blur'}
        ],
        bedType:[
          {required:true, message:this.$t('action.pBedType'),trigger:'blur'}
        ],
        breakType:[
          {required:true, message:this.$t('action.pBreakType'),trigger:'blur'}
        ],
        roomStock:[
          {required:true, message:this.$t('action.pRoomStock'),trigger:'blur'}
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
        filesId:[],
				roomStock: null,
				recommended: null,
        iswify:null,
        isfront:null,
        isbarrifr:null,
        isbalcony:null,
        iskitchen:null,
        iswindow:null,
        isheat:null,
        isicebox:null,
        isiron:null,
        isnosmk:null,
        islandscape:null,
        ishighrise:null,
        ispark:null,
        isgym:null,
        isswmp:null,
        isbeach:null,
        ishotsp:null,
        ischildct:null,
        isroomserv:null,
        isknead:null,
        islounge:null,
        issuper:null,
        isbus:null,
        istrafic:null,
        isrestau:null,
        creatBy: null,
        creatTime: null,
        lastUpdateBy: null,
        lastUpdateTime: null
			},
      //牌价界面新增数据
      priceForm:{
        roomCode: null,
        hotelCode: null,
        provinceCode:null,
        cityCode:null,
        roomType:null,
        bedType:null,
        priceYear:null,
        priceDateInterval:null,
        sprice:null,
        tprice:null,
        sRoomPrice:null,
        hotelCname: null,
        hotelEname: null,
        isMonday:null,
        isTuesday:null,
        isThursday:null,
        isFourday:null,
        isFriday:null,
        isSaterday:null,
        isSunday:null,
        priceDateData:[],
        creatBy: null,
        creatTime: null,
        lastUpdateBy: null,
        lastUpdateTime: null
      },
      //库存界面新增数据
      stockForm:{
        roomCode: null,
        hotelCode: null,
        provinceCode:null,
        cityCode:null,
        roomType:null,
        bedType:null,
        stockYear:null,
        stockDateData:null,
        stockDateInterval:null,
        inventory:null,
        hotelCname: null,
        hotelEname: null,
        autoClose:null,
        isMonday:null,
        isTuesday:null,
        isThursday:null,
        isFourday:null,
        isFriday:null,
        isSaterday:null,
        isSunday:null,
        creatBy: null,
        creatTime: null,
        lastUpdateBy: null,
        lastUpdateTime: null
      },
      priceFormRules:{//牌价界面规则限制
        sprice: [
          { required: true, message: this.$t('action.pSprice'), trigger: 'blur' }
        ]
      },
      stockFormRules:{ // 库存页面规则限制
        inventory:[
          {required: true, message: this.$t('action.pInventory'), trigger: 'blur'}
        ]
      },
      hotelNames:[],
      paraConfig:[],
      sysPara:{},
      bizHotl:[],
      language:{},
      headersInfo:{},
      files:[],
      formDate:"",
      fileList:[],
      priceDateData:[],
      stockDateData:[],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }

		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.hotelCode = this.filters.hotelCode;
      this.pageRequest.hotelName = this.filters.hotelName;
      this.pageRequest.roomType = this.filters.roomType;
      this.pageRequest.bedType = this.filters.bedType;
      this.pageRequest.breakType = this.filters.breakType;
      this.pageRequest.inventory = this.filters.inventory;
			this.$api.bizRoom.findPage(this.pageRequest).then((res) => {
			  this.pageRequest={}
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
			this.$api.bizRoom.batchDelete(data.params).then(data!=null?data.callback:'')
		},
		// 显示新增界面
		handleAdd: function () {
      this.disableHotelName = false
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
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
        files:[],
				roomStock: null,
				recommended: null,
        iswify:null,
        isfront:null,
        isbarrifr:null,
        isbalcony:null,
        iskitchen:null,
        iswindow:null,
        isheat:null,
        isicebox:null,
        isiron:null,
        isnosmk:null,
        islandscape:null,
        ishighrise:null,
        ispark:null,
        isgym:null,
        isswmp:null,
        isbeach:null,
        ishotsp:null,
        ischildct:null,
        isroomserv:null,
        isknead:null,
        islounge:null,
        issuper:null,
        isbus:null,
        istrafic:null,
        isrestau:null,
        creatBy: null,
        creatTime: null,
        lastUpdateBy: null,
        lastUpdateTime: null
			}
			this.dataForm.creatBy = sessionStorage.getItem("user")
		},
		// 显示编辑界面
		handleEdit: function (params) {

		  console.log("param",params);
		  this.disableHotelName = true
			this.editDialogVisible = true
			this.operation = false
      this.dataForm.lastUpdateBy = sessionStorage.getItem("user")
			this.dataForm = Object.assign({}, params.row)
		},
    // 牌价编辑界面
    handlePriceEdit:function(params) {

      console.log("param",params);
      params.row.isMonday=null;
      params.row.isTuesday=null;
      params.row.isThursday=null;
      params.row.isFourday=null;
      params.row.isFriday=null;
      params.row.isSaterday=null;
      params.row.isSunday=null;
      this.editPriceDialogVisible = true
      this.operation = false
      this.priceForm = Object.assign({}, params.row)
    },
    //库存编辑界面
    handleStockEdit:function(params) {
      console.log("param",params);
      params.row.isMonday=null;
      params.row.isTuesday=null;
      params.row.isThursday=null;
      params.row.isFourday=null;
      params.row.isFriday=null;
      params.row.isSaterday=null;
      params.row.isSunday=null;
      this.editStockDialogVisible = true
      this.operation = false
      this.stockForm = Object.assign({}, params.row)
    },
    //上传
    submitUpload() {

    },
    uploadFile(params) {
		  console.log("uploadFile:"+params.file);
      this.formDate.append("files",params.file);

    },
    //失败回调
    handlerror(err, file, fileList){
      console.log("上传失败时："+err);
    },
    //上传成功回调
    handlesuccess(res, file, fileList){
      console.log("成功回调:"+res);
    },
		// 编辑
		submitForm: function () {

			this.$refs.dataForm.validate((valid) => {
				if (valid) {

					this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {}).then(() => {
						this.editLoading = true;

						//图片上传代码
            this.formDate = new FormData();
            this.$refs.upload.submit();
            this.$api.bizRoom.uploadFile(this.formDate).then((res) => {
              if (res.length>0) {
                this.dataForm.filesId = res;
                console.log("filesId:"+this.dataForm.filesId);
              } else {
                return false
              }
            })
            //保存信息图片信息
						let params = Object.assign({}, this.dataForm)
						this.$api.bizRoom.save(params).then((res) => {
							if(res.code == 200) {
								this.$message({ message: this.$t('action.success'), type: 'success' })
							} else {
								this.$message({message: this.$t('action.fail') , type: 'error'})
							}
							this.editLoading = false
							this.$refs['dataForm'].resetFields()
							this.editDialogVisible = false
              this.disableHotelName = false
              this.formDate = "";
							this.files=[];
							this.findPage(null)
						})
					})
				} else {
          this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
        }
			})
		},
    // 牌价编辑提交
    submitPriceForm: function () {

      this.$refs.priceForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {}).then(() => {
            this.editPriceLoading = true;
            this.priceForm.priceDateData = this.priceDateData;
            this.priceForm.lastUpdateBy = sessionStorage.getItem("user")

            let params = Object.assign({}, this.priceForm)
            this.$api.bizRoom.savePrice(params).then((res) => {
              if(res.code == 200) {
                this.$message({ message: this.$t('action.success'), type: 'success' })
              } else {
                this.$message({message: this.$t('action.fail') , type: 'error'})
              }
              this.editPriceLoading = false
              this.$refs['priceForm'].resetFields()
              this.editPriceDialogVisible = false
              this.priceDateData = []
              this.findPage(null)
            })
          })
        } else {
          this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
        }
      })
    },
    //牌价点击取消，将所有输入的清空。
    cancelPriceForm :function() {
		  this.priceDateData=[];
      this.editPriceLoading = false;
      this.editPriceDialogVisible= false;
    },
    //库存编辑提交
    submitStockForm:function() {
      if (!this.stockForm.stockDateInterval && !this.stockForm.stockYear) {
        this.$message({message: this.$t('action.pAllDateNull') , type: 'error'})
        return
      }
      this.$refs.stockForm.validate((valid) => {
        if (valid) {
          this.$confirm(this.$t('action.sureSubmit'), this.$t('action.tips'), {}).then(() => {
            this.editStockLoading = true
            this.stockForm.stockDateData = this.stockDateData;
            this.stockForm.lastUpdateBy = sessionStorage.getItem("user")

            let params = Object.assign({}, this.stockForm)
            this.$api.bizRoom.saveStock(params).then((res) => {
              if(res.code == 200) {
                this.$message({ message: this.$t('action.success'), type: 'success' })
              } else {
                this.$message({message: this.$t('action.fail') , type: 'error'})
              }
              this.editStockLoading = false
              this.$refs['stockForm'].resetFields()
              this.editStockDialogVisible = false
              this.stockDateData = []
              this.findPage(null)
            })
          })
        } else {
          this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
        }
      })
    },
    cancelStockForm:function() {
      this.stockDateData=[];
      this.editStockLoading = false
      this.editStockDialogVisible= false;
    },
		// 时间格式化
  dateFormat: function (row, column, cellValue, index){
    return format(row[column.property])
  },
    findHotlnmSelect : function() {
		  this.bizHotl={};
		  let params = Object.assign({}, this.bizHotl);
      this.$api.bizHotl.findAllData(params).then((res) => {
        this.hotelNames = res.data
      })
    },
    findDataSelect : function () {
		  this.sysPara={paraSubCode1:'bizroom'}
      let params = Object.assign({}, this.sysPara);
      this.$api.sysParaConfig.findKeyValue(params).then((res) => {
        this.paraConfig = res.data
      })
    },
    localLanguageLoad:function () {
      this.language={lge:this.$i18n.locale}
    },
    changeValue:function (val) {//和checkbox双向绑定
      this.dataForm.recommended=val;
    },
    changInputValue:function (val) {//和input组件双向绑定
		  this.priceForm.tprice=val;

    },
    producePriceData:function() {
      this.$refs.priceForm.validate((valid) => {
        if (valid) {
          if (!this.priceForm.priceDateInterval && !this.priceForm.priceYear) {
            this.$message({message: this.$t('action.pAllDateNull'), type: 'error'})
            return
          }
          if (!this.priceForm.sprice) {
            this.$message({message: this.$t('action.pSprice'), type: 'error'})
          }

          this.priceForm.priceDateData = this.priceDateData;
          this.$api.bizRoom.priceDatePro(this.priceForm).then((res) => {
            console.log(res);
            if (res.data.code == "0000") {
              this.priceDateData = res.data.list;
            }
          })

        } else {
          this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
        }
      })
    },
    produceStockData:function () {
      this.$refs.stockForm.validate((valid) => {
        if (valid) {
          if (!this.stockForm.stockDateInterval && !this.stockForm.stockYear) {
            this.$message({message: this.$t('action.pAllDateNull'), type: 'error'})
            return
          }
          if (!this.stockForm.inventory) {
            this.$message({message: this.$t('action.pInventory'), type: 'error'})
          }

          this.stockForm.stockDateData = this.stockDateData;
          this.$api.bizRoom.stockDatePro(this.stockForm).then((res) => {
            console.log(res);
            if (res.data.code == "0000") {
              this.stockDateData = res.data.list;
            }
          })

        } else {
          this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
        }
      })

    },
    datePickerMethod:function () {
      this.priceDateData=[];
		},
    datePickerStockMethod:function () {
      this.stockDateData=[];
    }
	},
	mounted() {
    this.findDataSelect()
    this.findHotlnmSelect()
    this.localLanguageLoad()
	},
  computed: {
	  sRoomPrice:function () {
	    let total = 0;
	    let me = this;
      if (me.priceForm.roomType=="01") {
        total =  me.priceForm.sprice * 1
      }
      if (me.priceForm.roomType=="02") {
        total =  me.priceForm.sprice * 2
      }
      if (me.priceForm.roomType=="03") {
        total = me.priceForm.sprice * 3
      }
      if (me.priceForm.roomType=="04") {
        total =  me.priceForm.sprice * 4
      }
      me.priceForm.sRoomPrice = total;
      return total;
    }

  }
}
</script>

<style scoped>

</style>
