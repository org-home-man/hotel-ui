<template>
    <div>
      <!-- 年份 月份 -->
      <div class="month">
        <ul>
          <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
          <li class="arrow">
            <span class="arrowSpan" @click="pickPreYear(currentYear,currentMonth)">❮❮</span>
            <span class="arrowSpan" @click="pickPre(currentYear,currentMonth)">❮</span>
          </li>
          <li class="year-month" @click="pickYear(currentYear,currentMonth)">
            <span class="choose-year">{{ currentYear }}</span>
            <span class="choose-month">{{ currentMonth }}{{$t('hotel.month')}}</span>
          </li>
          <li class="arrow">
            <span class="arrowSpan" @click="pickNext(currentYear,currentMonth)">❯</span>
            <span class="arrowSpan" @click="pickNextYear(currentYear,currentMonth)">❯❯</span>
          </li>
        </ul>
      </div>
      <!-- 星期 -->
      <ul class="weekdays">
          <li>{{$t('hotel.isMonday')}}</li>
          <li>{{$t('hotel.isTuesday')}}</li>
          <li>{{$t('hotel.isThursday')}}</li>
          <li>{{$t('hotel.isFourday')}}</li>
          <li>{{$t('hotel.isFriday')}}</li>
          <li style="color:red">{{$t('hotel.isSaterday')}}</li>
          <li style="color:red">{{$t('hotel.isSunday')}}</li>
      </ul>
      <!-- 日期 -->
      <ul class="days">
        <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
        <li  v-for="dayobject in days">
          <!--本月-->
          <!--如果不是本月  改变类名加灰色-->
          <div v-if="new Date(dayobject.invDate).getMonth()+1 != currentMonth" class="other-month">
            <span>{{ new Date(dayobject.invDate).getDate() }}</span><br/>
            <span style="color: burlywood">{{$t('hotel.stockNum')}}:{{ dayobject.inventory }}</span><br/>
          </div>

          <!--如果是本月  还需要判断是不是这一天-->
          <div v-else>
            <!--今天  同年同月同日-->
            <div v-if="new Date(dayobject.invDate).getFullYear() == new Date().getFullYear() && new Date(dayobject.invDate).getMonth() == new Date().getMonth() && new Date(dayobject.invDate).getDate() == new Date().getDate()" class="active">
              <span>{{ new Date(dayobject.invDate).getDate() }}</span><br/>
              <span style="color: burlywood">{{$t('hotel.stockNum')}}:{{ dayobject.inventory }}</span><br/>

            </div>
            <div v-else>
              <span>{{ new Date(dayobject.invDate).getDate() }}</span><br/>
              <span style="color: burlywood">{{$t('hotel.stockNum')}}:{{ dayobject.inventory }}</span><br/>
            </div>
          </div>

        </li>
      </ul>



    </div>
</template>

<script>
    export default {
      name: "StockPicker",
      data() {
        return{
          currentDay: 1,
          currentMonth: 1,
          currentYear: 1970,
          currentWeek: 1,
          days: [],
          tempArray:[],
          dataRequest:{
            date:null,
            dateArray:this.dateData,//用户输入的牌价或者库存的值,
            roomCode:this.roomId
          }
        }
      },
      props:{
        dateData:Array,
        roomId:String
      },
      methods: {
        initData: function(cur) {
          var leftcount=0; //存放剩余数量
          var date;
          this.tempArray = [];
          if (cur) {
            date = new Date(cur);
          } else {
            var now=new Date();
            var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
            d.setDate(35);
            console.log("d.getFullYear:"+d.getFullYear())
            console.log("Moth:"+(d.getMonth()+1));
            console.log("day:"+d.getDate());
            date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
          }

          this.currentDay = date.getDate();
          this.currentYear = date.getFullYear();

          this.currentMonth = date.getMonth() + 1;


          this.currentWeek = date.getDay(); // 1...6,0
          var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
          console.log("str:"+str);
          this.dataRequest.date = str;
          this.dataRequest.dateArray= this.dateData;
          this.dataRequest.roomCode = this.roomId;
          this.$api.bizRoom.produceStockCalendar(this.dataRequest,{headers:{'Content-Type': 'application/json;charset=UTF-8'}}).then((res) => {
            this.days.length=0;
            this.dataRequest={}
            if(res.code=="0000") {
              // console.log(res.data );
              for (var i = 0;i<res.list.length;i++) {
                this.days.push(res.list[i]);
              }
              console.log(this.days);
            }
          })


        },
        pickPre: function(year, month) {

          // setDate(0); 上月最后一天
          // setDate(-1); 上月倒数第二天
          // setDate(dx) 参数dx为 上月最后一天的前后dx天
          var d = new Date(this.formatDate(year , month , 1));
          d.setDate(0);
          this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickPreYear : function(year, month) {
          // setDate(0); 上月最后一天
          // setDate(-1); 上月倒数第二天
          // setDate(dx) 参数dx为 上月最后一天的前后dx天
          var d = new Date(this.formatDate(year , month , 1));
          d.setFullYear(year-1);
          this.initData(this.formatDate(d.getFullYear() ,d.getMonth() + 1,1));
        },
        pickNext: function(year, month) {
          var d = new Date(this.formatDate(year , month , 1));
          d.setDate(35);
          this.initData(this.formatDate(d.getFullYear(),d.getMonth()+1 ,1));
        },
        pickNextYear: function(year, month) {
          var d = new Date(this.formatDate(year , month , 1));
          d.setFullYear(year+1);
          this.initData(this.formatDate(d.getFullYear(),d.getMonth()+1 ,1));
        },
        // pickYear: function(year, month) {
        //   alert(year + "," + month);
        // },

        // 返回 类似 2016-01-02 格式的字符串
        formatDate: function(year,month,day){
          var y = year;
          var m = month;
          if(m<10) m = "0" + m;
          var d = day;
          if(d<10) d = "0" + d;
          return y+"-"+m+"-"+d
        }
      },
      mounted() {
        this.initData(null);
      },
      watch:{
        dateData:function (newVal,oldVal) {
          this.initData(null);
        }
      }
    }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  ul {
    list-style-type: none;
  }

  .month {
    width: 100%;
    background: rgb(19, 138, 156);
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }

  .choose-year {
    padding-left: 20px;
    padding-right: 20px;
  }

  .choose-month {
    text-align: center;
    font-size: 1.5rem;
  }

  .arrow {
    padding: 15px;
  }
  .arrowSpan {
    padding: 15px;
  }

  .arrowSpan:hover {
    background:rgb(19, 138, 156);
  }

  .month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: rgb(19, 138, 156);
    display: flex;
    flex-wrap: wrap;
    color: #FFFFFF;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }

  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding-bottom: 15px;
    padding-top: 15px;
    font-size: 1rem;
    color: #000;
  }

  .days li .active {
    padding: 6px 10px;
    border-radius: 50%;
    background: rgb(19, 138, 156);
    color: #fff;
  }

  .days li .other-month {
    /*padding: 5px;*/
    color: gainsboro;
  }

  .days li:hover {
    background: #e1e1e1;
  }
</style>
