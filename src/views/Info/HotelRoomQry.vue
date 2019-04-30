<template>
  <div class="container" style="width:99%;margin-top:-25px;">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:30px;padding-left:20px;">
		<el-form :inline="true" :model="filters" :size="size">
      <el-form-item>
        <el-select v-model="filters.provinceCode" :placeholder="$t('hotel.provinceCode.provinceCode')">
          <el-option v-for="rt in paraConfig.provinceCode" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.cityCode" :placeholder="$t('hotel.cityCode.cityCode')">
          <el-option v-for="rt in paraConfig.cityCode" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.inDateStart" :placeholder="$t('hotel.inDateStart')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.outDateEnd" :placeholder="$t('hotel.outDateEnd')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.roomNum" :placeholder="$t('hotel.roomNum')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.adultNum" :placeholder="$t('hotel.adultNum')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.childrenNum" :placeholder="$t('hotel.childrenNum')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="filters.inventory" :placeholder="$t('hotel.inventory')"></el-input>
      </el-form-item>

          <el-row>
            <el-col :span="4">
              <el-form-item>
                <el-select v-model="filters.hotelLevel" :placeholder="$t('hotel.hotelLevel.hotelLevel')">
                  <el-option v-for="rt in paraConfig.hotelLevel" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-select v-model="filters.hotelType" :placeholder="$t('hotel.hotelType.hotelType')">
                  <el-option v-for="rt in paraConfig.hotelType" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item >
                <el-select v-model="filters.roomType"  :placeholder="$t('hotel.roomtype.roomtype')">
                  <el-option v-for="rt in paraConfig.roomtype" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="filters.roomStyle" :placeholder="$t('hotel.roomstyle.roomstyle')">
                  <el-option v-for="rs in paraConfig.roomstyle" :key="rs.paraCode" :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="filters.bedType" :placeholder="$t('hotel.bedtype.bedtype')">
                  <el-option v-for="bt in paraConfig.bedtype" :key="bt.paraCode" :label="$t('hotel.'+ bt.paraCode)" :value="bt.paraValue1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="filters.breakType" :placeholder="$t('hotel.breaktype.breaktype')">
                  <el-option v-for="bk in paraConfig.breaktype" :key="bk.paraCode" :label="$t('hotel.'+ bk.paraCode)" :value="bk.paraValue1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item>
                <el-input v-model="filters.roomArea"  :placeholder="$t('hotel.roomarea')+'(m2)'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="3">
              <el-form-item>
                <el-form-item>
                  <el-input v-model="filters.roomPrice"  :placeholder="$t('hotel.roomPrice')"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item  :label="$t('hotel.hotelname')" prop="hotelCode"  auto-complete="off" >
                <el-select v-model="dataForm.hotelCode" :disabled="disableHotelName">
                  <el-option v-for=" hotelName in hotelNames" :key="hotelName.hotelCode" :label="language.lge=='zh_cn'?hotelName.hotelCname:hotelName.hotelEname" :value="hotelName.hotelCode"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!--<br>-->
          <h3 style="text-align: left">常用信息:</h3>
          <el-row>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswify')" v-model="filters.iswify" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isfront')" v-model="filters.isfront" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbarrifr')" v-model="filters.isbarrifr" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="left">

              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbalcony')" v-model="filters.isbalcony" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iskitchen')" v-model="filters.iskitchen" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.iswindow')" v-model="filters.iswindow" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isheat')" v-model="filters.isheat" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isicebox')" v-model="filters.isicebox" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isiron')" v-model="filters.isiron" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isnosmk')" v-model="filters.isnosmk" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islandscape')" v-model="filters.islandscape" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishighrise')" v-model="filters.ishighrise" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ispark')" v-model="filters.ispark" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isgym')" v-model="filters.isgym" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isswmp')" v-model="filters.isswmp" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbeach')" v-model="filters.isbeach" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ishotsp')" v-model="filters.ishotsp" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.ischildct')" v-model="filters.ischildct" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isroomserv')" v-model="filters.isroomserv" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isknead')" v-model="filters.isknead" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.islounge')" v-model="filters.islounge" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.issuper')" v-model="filters.issuper" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isbus')" v-model="filters.isbus" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col align="left">
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.istrafic')" v-model="filters.istrafic" border></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="2" :label="$t('hotel.isrestau')" v-model="filters.isrestau" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
			<el-form-item>
				<kt-button :label="$t('action.search')" perms="sys:bizRoom:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<!--<el-form-item>-->
				<!--<kt-button :label="$t('action.detileSearch')" perms="sys:bizRoom:add" type="primary" @click="handleDetileSearch" />-->
			<!--</el-form-item>-->
		</el-form>
	</div>
	<!--表格内容栏-->
	<room-table permsReservatRoom="sys:bizRoom:reservatRoom"
		:data="pageResult"
		@findPage="findPage" @handleReservatRoom="handleReservatRoom">
    <!--@findPage="page" @handleEdit="handleEdit" @handleDelete="handleDelete" >-->
    </room-table>

    <!--新增订单界面-->
    <el-dialog :title="$t('hotel.reservatRoom')" width="50%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size":inline="true" label-position="left">

        <el-form-item :label="$t('hotel.provinceCode.provinceCode')" prop="provinceCode" auto-complete="off" >
          <el-select v-model="dataForm.provinceCode" :disabled="true">
            <el-option v-for="rt in paraConfig.provinceCode" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-table-column prop="provinceCode" header-align="center" align="center" :label="$t('hotel.provinceCode.provinceCode')">-->
          <!--<template slot-scope="scope">-->
            <!--<el-table-column>{{$t('hotel.'+scope.row.provinceCode)}} </el-table-column>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-form-item :label="$t('hotel.provinceCode.provinceCode')" prop="provinceCode" auto-complete="off">-->
          <!--<el-input v-model="{$t('hotel.'+scope.row.provinceCodeKey)}" :placeholder="" :disabled="true"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item :label="$t('hotel.cityCode.cityCode')" prop="cityCode" auto-complete="off" >
          <el-select v-model="dataForm.cityCode" :disabled="true" >
            <el-option v-for="rt in paraConfig.cityCode" :key="rt.paraCode" :label="$t('hotel.'+rt.paraCode)" :value="rt.paraValue1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input v-model="dataForm.inDateStart" :placeholder="$t('hotel.inDateStart')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.outDateEnd" :placeholder="$t('hotel.outDateEnd')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.roomNight" :placeholder="$t('hotel.roomNight')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <el-input v-model="dataForm.sPrice" :disabled="true" :placeholder="$t('hotel.sPrice')"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item  :label="$t('hotel.hotelname')" prop="hotelCode"  auto-complete="off" >
          <el-select v-model="dataForm.hotelCode" :disabled="disableHotelName">
            <el-option v-for=" hotelName in hotelNames" :key="hotelName.hotelCode" :label="language.lge=='zh_cn'?hotelName.hotelCname:hotelName.hotelEname" :value="hotelName.hotelCode"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input v-model="dataForm.lastCrtTime":placeholder="$t('hotel.lastCrtTime')"></el-input>
        </el-form-item>

        <el-form-item>
          <el-select v-model="dataForm.roomType" :disabled="true" :placeholder="$t('hotel.roomtype.roomtype')">
            <el-option v-for="rs in paraConfig.roomtype" :key="rs.paraCode" :label="$t('hotel.'+ rs.paraCode)" :value="rs.paraValue1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input v-model="dataForm.adultNum" :placeholder="$t('hotel.adultNum')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.childrenNum" :placeholder="$t('hotel.childrenNum')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.inventory" :disabled="true" :placeholder="$t('hotel.inventory')"></el-input>
        </el-form-item>

        <!--<el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-input v-model="dataForm.sPrice" :disabled="true" :placeholder="$t('hotel.sPrice')"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-form-item>-->

        <el-form-item :label="$t('hotel.hotelAddr')" prop="hotelAddr" >
          <el-input v-model="dataForm.hotelAddr" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.hotelPhone')" prop="hotelPhone" >
          <el-input v-model="dataForm.hotelPhone" :disabled="true"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.hotelWeb')" prop="hotelWeb">
          <el-input v-model="dataForm.hotelWeb" :disabled="true"  auto-complete="off"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="24" >
            <el-form-item :label="$t('hotel.introc')" prop="introC"  auto-complete="off">
              <el-input v-model="dataForm.introC" :disabled="true"  type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('hotel.introe')" prop="introE"  auto-complete="off">
              <el-input v-model="dataForm.introE" :disabled="true"  type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

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

        <el-form-item :label="$t('hotel.representName')" prop="representName" auto-complete="off">
          <el-input v-model="dataForm.representName" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.passportNo')" prop="passportNo" auto-complete="off">
          <el-input v-model="dataForm.passportNo" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.birthday')" prop="birthday" auto-complete="off">
          <el-input v-model="dataForm.birthday" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.contactPhone')" prop="contactPhone" auto-complete="off">
          <el-input v-model="dataForm.contactPhone" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.contactEmail')" prop="contactEmail" auto-complete="off">
          <el-input v-model="dataForm.contactEmail" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.adultNum1')" prop="adultNum1" auto-complete="off">
          <el-input v-model="dataForm.adultNum1" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.children612')" prop="children612" auto-complete="off">
          <el-input v-model="dataForm.children612" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.children46')" prop="children46" auto-complete="off">
          <el-input v-model="dataForm.children46" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.children04')" prop="children04" auto-complete="off">
          <el-input v-model="dataForm.children04" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.roomNum')" prop="roomNum" auto-complete="off">
          <el-input v-model="dataForm.roomNum" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('hotel.totalPrice')" prop="totalPrice" auto-complete="off">
          <el-input v-model="dataForm.totalPrice" ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.makeAppointment')}}</el-button>
        <el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.returnHome')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Cookies from "js-cookie";
  import RoomTable from "@/views/Core/hotelRoomTable"
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
    KtInput
	},
	data() {
		return {
		  baseUrl:baseUrl,
      priceBoolean:true,
      stockBoolean:true,
      disableHotelName:false,
      dataurl:'/bizRoom/uploadFile',
			size: 'small',
			filters: {
        hotelName:'',
        inventory:'',
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
        lastUpdateTime: null,
        roomPrice: null,
        hotelname: null,
        inDateStart:null,
        outDateEnd:null,
        roomNum:null,
        adultNum:null,
        childrenNum:null,
        sPrice:null,
        roomNight:null
			},
			columns: [

			],
			// pageRequest: { pageNum: 1, pageSize: 10 },
      pageRequest: { page: 1, rows:10  },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
      editPriceDialogVisible: false, // 编辑牌价界面是否显示
			editLoading: false,
      editPriceLoading:false,
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
        lastUpdateTime: null,
        roomPrice: null,
         hotelname: null,
        inDateStart:null,
        outDateEnd:null,
        roomNum:null,
        adultNum:null,
        childrenNum:null,
        lastCrtTime:null,
        representName:null,
        passportNo:null,
        birthday:null,
        contactPhone:null,
        contactEmail:null,
        adultNum1:null,
        children612:null,
        children46:null,
        children04:null,
        totalPrice:null
			},
      hotelNames:[],
      paraConfig:[],
      sysPara:{},
      bizHotl:[],
      language:{},
      headersInfo:{},
      fileList:[],
		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
      this.pageRequest.hotelName=this.filters.hotelName;
      this.pageRequest.inventory=this.filters.inventory;
      this.pageRequest.roomCode=this.filters.roomCode;
      this.pageRequest.hotelCode=this.filters.hotelCode;
      this.pageRequest.roomType=this.filters.roomType;
      this.pageRequest.roomStyle=this.filters.roomStyle;
      this.pageRequest.bedType=this.filters.bedType;
      this.pageRequest.breakType=this.filters.breakType;
      this.pageRequest.roomArea=this.filters.roomArea;
      this.pageRequest.introC=this.filters.introC;
      this.pageRequest.introE=this.filters.introE;
      this.pageRequest.photo=this.filters.photo;
      this.pageRequest.roomStock=this.filters.roomStock;
      this.pageRequest.recommended=this.filters.recommended;
      this.pageRequest.iswify=this.filters.iswify;
      this.pageRequest.isfront=this.filters.isfront;
      this.pageRequest.isbarrifr=this.filters.isbarrifr;
      this.pageRequest.isbalcony=this.filters.isbalcony;
      this.pageRequest.iskitchen=this.filters.iskitchen;
      this.pageRequest.iswindow=this.filters.iswindow;
      this.pageRequest.isheat=this.filters.isheat;
      this.pageRequest.isicebox=this.filters.isicebox;
      this.pageRequest.isiron=this.filters.isiron;
      this.pageRequest.isnosmk=this.filters.isnosmk;
      this.pageRequest.islandscape=this.filters.islandscape;
      this.pageRequest.ishighrise=this.filters.ishighrise;
      this.pageRequest.ispark=this.filters.ispark;
      this.pageRequest.isgym=this.filters.isgym;
      this.pageRequest.isswmp=this.filters.isswmp;
      this.pageRequest.isbeach=this.filters.isbeach;
      this.pageRequest.ishotsp=this.filters.ishotsp;
      this.pageRequest.ischildct=this.filters.ischildct;
      this.pageRequest.isroomserv=this.filters.isroomserv;
      this.pageRequest.isknead=this.filters.isknead;
      this.pageRequest.islounge=this.filters.islounge;
      this.pageRequest.issuper=this.filters.issuper;
      this.pageRequest.isbus=this.filters.isbus;
      this.pageRequest.istrafic=this.filters.istrafic;
      this.pageRequest.isrestau=this.filters.isrestau;
      this.pageRequest.roomPrice=this.filters.roomPrice;
      this.pageRequest.hotelname=this.filters.hotelname;
      this.pageRequest.inDateStart=this.filters.inDateStart;
      this.pageRequest.outDateEnd=this.filters.outDateEnd;
      this.pageRequest.roomNum=this.filters.roomNum;
      this.pageRequest.adultNum=this.filters.adultNum;
      this.pageRequest.childrenNum =this.filters.childrenNum;

			this.$api.hotelRoom.findPage(this.pageRequest).then((res) => {
			  this.pageRequest={}
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
			this.$api.bizRoom.batchDelete(data.params).then(data!=null?data.callback:'')
		},

		// 显示预订界面
    handleReservatRoom: function (params) {
		  console.log("param",params);
		  this.disableHotelName = true
			this.editDialogVisible = true
			this.operation = false
      this.dataForm.lastUpdateBy = sessionStorage.getItem("user")
			this.dataForm = Object.assign({}, params.row)
		},


    //绑定token
    handleFileMethod() {
      let token = Cookies.get('token');
      this.headersInfo = {
        token: token
      }
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
					})
				} else {
          this.$message({message:this.$t('action.incompleteInfo'), type: 'error' })
        }
			})
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

    findHotelRoomDataSelect : function () {
      this.sysPara={}
      let params = Object.assign({}, this.sysPara);
      this.$api.sysParaConfig.findKeyValueHotelRoom(params).then((res) => {
        this.paraConfig = res.data
        console.log(this.paraConfig);
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

    }
	},
	mounted() {
 //   this.findDataSelect()
    this.findHotlnmSelect()
    this.localLanguageLoad()
    this.handleFileMethod()
    this.findHotelRoomDataSelect()
	}
}
</script>

<style scoped>

</style>
