<template>
  <div class="userDevelopment">
    <times class="date" />
    <tab/>
    <!-- 活跃率 -->
    <div class="activity_tate">
      <div class="contontBox">
        <div class="rateBox">
          <div class="ratestyleBox">
            <span class="textSize">月均<br>跃率</span>
            <activityRate
              class="ratestyle"
              :Data="sergeData"
              id="usageDetail_one"
              type="one"
            ></activityRate>
          </div>
          <div class="font_rate">
            <ul>
              <li
                v-for="(item, index) in sergeData"
                :key="index"
              >
                <span :style="{backgroundColor:color[index]}"></span>
                <span :style="{color:color[index]}">{{item.AREANAME}}</span>
                <span :style="{color:color[index]}">{{(item.MONTHAVGACTIVERATE*100).toFixed(2)}}%</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="rateBox">
          <div class="ratestyleBox">
            <span class="textSize">日均<br>次数</span>
            <activityRate
              class="ratestyle"
              :Data="sergeData"
              id="usageDetail_two"
              type="two"
            ></activityRate>
          </div>
          <div class="font_rate">
            <ul>
              <li
                v-for="(item, index) in sergeData"
                :key="index"
              >
                <span :style="{backgroundColor:color[index]}"></span>
                <span :style="{color:color[index]}">{{item.AREANAME}}</span>
                <span :style="{color:color[index]}">{{item.AVGTIMES.toFixed(2)}}次</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="rateBox">
          <div class="ratestyleBox">
            <span class="textSize">日均<br>时长</span>
            <activityRate
              class="ratestyle"
              :Data="sergeData"
              id="usageDetail_three"
              type="three"
            ></activityRate>
          </div>
          <div class="font_rate">
            <ul>
              <li
                v-for="(item, index) in sergeData"
                :key="index"
              >
                <span :style="{backgroundColor:color[index]}"></span>
                <span :style="{color:color[index]}">{{item.AREANAME}}</span>
                <span :style="{color:color[index]}">{{item.AVGDURATION.toFixed(2)}}小时</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
    <!-- 用户发展趋势 与各省接入类型数-->
    <div class="user_development">
      <div class="userTrendBox">
        <div class="userTrend">
          <div class="userTitle">
            <span>
              <a :class="setNum == 10 ? 'active':''">全国</a>
              <a :class="setNum == 20 ? 'active':''">北京</a>
              <a :class="setNum == 30 ? 'active':''">重庆</a>
              <a :class="setNum == 40 ? 'active':''">吉林</a>
              <a :class="setNum == 50 ? 'active':''">山西</a>
            </span>
          </div>
          <div
            id="rokenLine"
            class="rokenLine"
          ></div>
        </div>
        <div class="userTypeNum">
          <div class="userTypeNumBox">
            <div class="userTitle">
              <span>
                <a :class="accessNumber == 10 ? 'active':''">4K</a>
                <a :class="accessNumber == 20 ? 'active':''">高清</a>
                <a :class="accessNumber == 30 ? 'active':''">标清</a>
                <a :class="accessNumber == 40 ? 'active':''">其它</a>
              </span>
            </div>
            <div
              id="barChart"
              class="barChart"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="ageOf_account">
      <div class="ageAcountBox">
        <div class="ageOpeningBox">
            <div
                id="ageOpening"
                class="ageOpening"
            ></div>
        </div>
        
        <div class="broadbandRatio">
          <div class="broadbandBox">
            <div class="ageTitle">
              <span>
                <a :class="setNum == 10 ? 'active':''">全国</a>
                <a :class="setNum == 20 ? 'active':''">北京</a>
                <a :class="setNum == 30 ? 'active':''">重庆</a>
                <a :class="setNum == 40 ? 'active':''">吉林</a>
                <a :class="setNum == 50 ? 'active':''">山西</a>
              </span>
            </div>
            <div class="broadBox">
              <img class="broadbandBg" src="./../assets/img/penetrationBg.png" alt="" srcset="">  
              <div
                id="broadband"
                class="broadband"
              ></div>
              <div class="penetration">
                <span>宽带渗透率</span>
                <span>{{penetrationRate}}%</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import activityRate from "./common/activityRate"; // 引入圆环进度条插件
import { EleResize } from "../assets/js/esresize"; // 引入封装的地图放大缩小js
import times from "./iptv_yxx/times";
import tab from './iptv_yxx/tab'
export default {
  name: "userDevelopment",
  components: {
    activityRate,
    times,
    tab
  },
  data() {
    return {
      color: ["#0dcdff", "#fa858b", "#feb342", "#49b386"],
      sergeData: null, // 活跃率数据
      userTrendData: null, // 用户发展趋势数据
      kData: [], // 4K数据
      HDData: [], // 高清
      standardData: [], // 标清
      otherData: [], // 其它
      accessUsersData: null, // 接入用户数占比
      penetrationRate: null, // 宽带渗透率
      ageOpening: null,
      setTimer: 0, // 设置数值累加计时器实现切换页面
      setNum: 10, // 判断计时器的间隔时长
      closeTimeOut: null, // 计时器清除开关
      areacodeData: [
        { areacode: "104", name: "全国" },
        { areacode: "101", name: "北京" },
        { areacode: "104", name: "重庆" },
        { areacode: "114", name: "山西" },
        { areacode: "128", name: "吉林" }
      ],
      accessTimer: 0, // 各省接入类型用户数切换控制器
      accessNumber: 10 // 判断各省接入类型用户数计时器的间隔时长
    };
  },
  created() {
    // 获取活跃率数据
    // this.getUsergeData();
    // 获取用户发展趋势折线图数据
    // this.getBrokenLine(this.areacodeData[0].areacode);
    // 获取各省接入类型用户数据
    // this.getAreaUserByStb();
    // 获取开户年龄数据
    // this.getAge();
    // 获取接入占比数据请求数据
    // this.getBroadband(this.areacodeData[0].areacode);
  },
  watch: {
    // 监听计时器变化
    setTimer: function(newValue, oldValue) {
      if (newValue - 10 == this.setNum) {
        if (this.setNum / 10 == 5) {
          this.setNum = 10;
          this.setTimer = 10;
        } else {
          this.setNum = newValue;
        }
        // console.log(this.areacodeData[this.setNum/10-1].areacode)
        this.getBrokenLine(this.areacodeData[this.setNum / 10 - 1].areacode);
        this.getBroadband(this.areacodeData[this.setNum / 10 - 1].areacode);
      }
    },
    accessTimer: function(newValue, oldValue) {
      if (newValue - 10 == this.accessNumber) {
        if (this.accessNumber / 10 == 4) {
          this.accessNumber = 10;
          this.accessTimer = 10;
        } else {
          this.accessNumber = newValue;
        }
        if (this.accessNumber == 10) {
          this.setbarChart(this.kData, "4k");
        } else if (this.accessNumber == 20) {
          this.setbarChart(this.HDData, "高清");
        } else if (this.accessNumber == 30) {
          this.setbarChart(this.standardData, "标清");
        } else if (this.accessNumber == 40) {
          this.setbarChart(this.otherData, "其它");
        }
      }
    }
  },
  beforeDestroy() {
    // 当组件销毁清除计时器
    this.closeTimeOut = null;
  },
  mounted() {
    this.setTimes();
    // setTimeout(() => {
    //   this.$router.push("/businessQuality");
    // }, 60000);
    // 获取活跃率数据
    this.getUsergeData();
    // 获取用户发展趋势折线图数据
    this.getBrokenLine(this.areacodeData[0].areacode);
    // 获取各省接入类型用户数据
    this.getAreaUserByStb();
    // 获取开户年龄数据
    this.getAge();
    // 获取接入占比数据请求数据
    this.getBroadband(this.areacodeData[0].areacode);
  },
  methods: {
    // 生成随机数
    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    },
    // 设置时间切换器
    setTimes() {
      this.closeTimeOut = setInterval(() => {
        this.setTimer++;
        this.accessTimer++;
      }, 1000);
    },
    // 获取活跃率数据
    getUsergeData() {
      let data = [
        {
          AREACODE: "10100",
          AREANAME: "北京",
          AVGDURATION: 6.0283,
          AVGTIMES: 40,
          DURATION: 50112.8861,
          MONTHAVGACTIVERATE: 0.8,
          USERCOUNT: 8313,
          USERTIMES: 50
        }, 
        {
          AREACODE: "10100",
          AREANAME: "重庆",
          AVGDURATION: 4.0283,
          AVGTIMES: 23,
          DURATION: 30112.8861,
          MONTHAVGACTIVERATE: 0.7,
          USERCOUNT: 2313,
          USERTIMES: 50
        },
        {
          AREACODE: "10100",
          AREANAME: "吉林",
          AVGDURATION: 3.0283,
          AVGTIMES: this.random(1,49),
          DURATION: 10112.8861,
          MONTHAVGACTIVERATE: 0.6,
          USERCOUNT: 6313,
          USERTIMES: 50
        },
        {
          AREACODE: "10100",
          AREANAME: "山西",
          AVGDURATION: 3.0283,
          AVGTIMES: 45,
          DURATION: 10112.8861,
          MONTHAVGACTIVERATE: 0.6,
          USERCOUNT: 6313,
          USERTIMES: 50
        }
      ]
      this.sergeData = data
      // let params = {
      //   qdi: "queryAreaOnlineUser",
      //   userid: "superman",
      //   token: "HDdt7Zhq5qjWzddDMAni9u1G",
      //   limit: "20",
      //   offset: "0",
      //   areacode: `101','104','114','128`
      // };
      // this.axios({
      //   params,
      //   method: "post"
      // }).then(data => {
      //   if (data.msg == "success") {
      //     //   this.sergeData = data.subject;
      //   }
      // });
    },
    // 获取折线图数据
    getBrokenLine(areacode) {
      let _that = this;
      this.userTrendData = []
      for(var i = 0; i<11;i++){
        let obj= {
          TOTALUSER:this.random(100,120),
          NEWCOUNT:this.random(20,40),
          ACTIVECOUNT:this.random(10,30),
          OFFCOUNT:this.random(0,20),
          MONTHDAY:'2019.0'+(1+i)
        }
        this.userTrendData.push(obj)

      }
      _that.setBrokenLine();
      // let params = {
      //   qdi: "queryAreaUserDevelop",
      //   userid: "superman",
      //   token: "HDdt7Zhq5qjWzddDMAni9u1G",
      //   limit: "20",
      //   offset: "0",
      //   areacode: areacode
      // };
      // this.axios({
      //   params,
      //   method: "post"
      // }).then(data => {
      //   if (data.msg == "success") {
      //     console.log('aaaaaaaa')
      //     console.log(data)
      //     this.userTrendData = data.subject;
      //     // 添加虚拟数据，后期注释删掉
      //     this.userTrendData.forEach(e=>{
      //         e.TOTALUSER = this.random(100,120)
      //         e.NEWCOUNT = this.random(20,40)
      //         e.ACTIVECOUNT = this.random(10,30)
      //         e.OFFCOUNT = this.random(0,20)
      //     })
      //     _that.setBrokenLine();
      //   }
      // });
    },
    // 渲染折线图
    setBrokenLine() {
      let rokenLine = this.$echarts.init(document.querySelector("#rokenLine"));
      let rokenLines = document.getElementById("rokenLine");
      let xAxisData = []; // X轴坐标时间数据
      let totalUser = []; // 总用户数
      let newlyAddedn = []; // 新增用户数
      let activation = []; // 激活用户数
      let salesAccount = []; // 销户用户数
      if (this.userTrendData.length == 0) {
        return false;
      }
      this.userTrendData.forEach(e => {
        xAxisData.push(e.MONTHDAY);
        totalUser.push(e.TOTALUSER);
        newlyAddedn.push(e.NEWCOUNT);
        activation.push(e.ACTIVECOUNT);
        salesAccount.push(e.OFFCOUNT);
      });
      let option = {
        xAxis: {
          // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
          data: xAxisData,
          boundaryGap: false,
          // axisTick: {
          //     show: false
          // },
          axisLine: {
            lineStyle: {
              color: "#223C90"
              // width:8,//这里是为了突出显示加上的
            }
          },
          axisLabel: {
            textStyle: {
              color: "#30c3cb" //坐标的字体颜色
            }
          }
        },
        grid: {
          top: "16%",
        //   left: "2%",
        //   right: "4%",
          bottom: "2%",
          containLabel: true
        },
        tooltip: {
          show: false // 关闭鼠标提示窗
          // trigger: 'axis',
          // axisPointer: {
          //     type: 'cross',
          //     lineStyle:{
          //         color: 'blue'
          //     }
          // },
          // padding: [5, 10]
        },
        yAxis: {
          name: "单位： K",
          nameTextStyle: {
            color: "#20d8d3", // 设置单位颜色
            fontSize: this.$notsize(16)
          },
          axisLine: {
            name: "",
            lineStyle: {
              color: "#223C90"
              // width:8,//这里是为了突出显示加上的
            }
          },
          axisLabel: {
            textStyle: {
              color: "#30c3cb" //坐标的字体颜色
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#223C90"],
              width: 1,
              type: "solid"
            }
          }
          // splitLine:{show: false},
        },
        legend: {
          data: ["总用户数", "新增", "激活"],
          x: "right",
          padding: [0, 55, 0, 0],
          textStyle: {
            fontSize: this.$notsize(15),
            // fontWeight: "400",
            color: "rgba(255,255,255,1)"
          }
        },
        series: [
          {
            name: "总用户数",
            type: "line",
            // stack: "总量",
            animationDuration: 2800,

            itemStyle: {
              normal: {
                color: "#25C686"
                // lineStyle: {
                //     color: '#3888fa',
                //     width: 2
                // },
              }
            },
            // data: [120, 132, 101, 134, 90, 230, 210,123,111,333,223,212]
            data: totalUser
          },
          {
            name: "新增",
            type: "line",
            // stack: "总量",
            animationDuration: 2800,
            itemStyle: {
              normal: {
                color: "#5E49D8"
                // lineStyle: {
                //     color: '#3888fa',
                //     width: 2
                // },
              }
            },
            data: newlyAddedn
            // data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 210,123,111]
          },
          {
            name: "激活",
            type: "line",
            // stack: "总量",
            animationDuration: 2800,
            itemStyle: {
              normal: {
                color: "#0676D8"
              }
            },
            data: activation
            // data: [1, 12, 8, 4, 12, 3, 4, 8, 19, 23, 29, 30, 10, 11]
          }
        ]
      };
      rokenLine.setOption(option);
      let listener = function() {
        rokenLine.resize();
      };
      EleResize.on(rokenLines, listener);
    },
    // 获取各省接入类型用户数据
    getAreaUserByStb() {
      let _that = this;
      // let params = {
      //   qdi: "queryAreaUserByStb",
      //   userid: "superman",
      //   token: "HDdt7Zhq5qjWzddDMAni9u1G",
      //   limit: "20",
      //   offset: "0",
      //   areacode: `101','104','114','128`
      // };
      // this.axios({
      //   params,
      //   method: "post"
      // }).then(data => {
      //   if (data.msg == "success") {
      //     for (var i = 0; i < data.subject.length; i++) {
      //       for (var key in data.subject[i]) {
      //         // console.log(key)
      //         // kData: null, // 4K数据
      //         // HDData: null, // 高清
      //         // standardData: null, // 标清
      //         // otherData: null, // 其它
      //         // data.subject[i].userNum = data.subject[i][key]
      //         if (key == "USERCOUNT_4K") {
      //           // 4k数据
      //           this.kData.push(data.subject[i]);
      //           data.subject[i].userNum = data.subject[i][key];
      //         } else if (key == "USERCOUNT_HIGH") {
      //           // 高清
      //           this.HDData.push(data.subject[i]);
      //           data.subject[i].userNum = data.subject[i][key];
      //         } else if (key == "USERCOUNT_STANDARD") {
      //           // 标清
      //           this.standardData.push(data.subject[i]);
      //           data.subject[i].userNum = data.subject[i][key];
      //         } else if (key == "USERCOUNT_OTHER") {
      //           // 其它
      //           this.otherData.push(data.subject[i]);
      //           data.subject[i].userNum = data.subject[i][key];
      //         }
      //       }
      //     }
      //     _that.setbarChart(this.kData, "4k");
      //   }
      // });
      _that.setbarChart(this.kData, "4k");
    },
    // 渲染各省接入类型用户数据条形图
    setbarChart(data, tyep) {
      data = [
        {
          TOTALUSER: this.random(40,50),
          AREACODE: "10100",
          AREANAME: "北京",
          USERCOUNT_HIGH: 7,
          userNum: this.random(20,30),
        },
        {
          TOTALUSER: this.random(40,50),
          AREACODE: "10100",
          AREANAME: "重庆",
          USERCOUNT_HIGH: 7,
          userNum: this.random(20,30),
        },
        {
          TOTALUSER: this.random(40,50),
          AREACODE: "10100",
          AREANAME: "吉林",
          USERCOUNT_HIGH: 7,
          userNum: this.random(20,30),
        },
        {
          TOTALUSER: this.random(40,50),
          AREACODE: "10100",
          AREANAME: "山西",
          USERCOUNT_HIGH: 7,
          userNum: this.random(20,30),
        },
      ]
      let barChart = this.$echarts.init(document.querySelector("#barChart"));
      let barCharts = document.getElementById("barChart");
      let xAxisData = [];
      let userNumber = [];
      let totalNumber = [];
      data.forEach(e => {
        xAxisData.push(e.AREANAME);
        userNumber.push(e.userNum);
        totalNumber.push(e.TOTALUSER);
      });
      let option = {
        tooltip: {
          show: false,
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["用户数", "全国总数"],
          x: "right",
          padding: [0, 60, 0, 0],
          textStyle: {
            fontSize: this.$notsize(15),
            // fontWeight: "400",
            color: "rgba(255,255,255,1)"
          }
        },
        grid: {
          top: "16%",
        //   left: "2%",
        //   right: "4%",
          bottom: "2%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          name: "单位：万人",
          nameTextStyle: {
            color: "#20d8d3", // 设置单位颜色
            fontSize: this.$notsize(16)
          },
          axisLine: {
            lineStyle: {
              color: "#223C90"
              // width:8,//这里是为了突出显示加上的
            }
          },
          axisLabel: {
            textStyle: {
              color: "#30c3cb" //坐标的字体颜色
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#223C90"],
              width: 1,
              type: "solid"
            }
          }
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLine: {
            lineStyle: {
              color: "#223C90"
              // width:8,//这里是为了突出显示加上的
            }
          },
          axisLabel: {
            textStyle: {
              color: "#30c3cb" //坐标的字体颜色
            }
          }
        },
        series: [
          {
            name: "用户数",
            type: "bar",
            stack: "总量",
            barWidth: 40,
            // label: {
            //     show: true,
            //     position: 'insideRight'
            // },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#04fbc5"
                  },
                  {
                    offset: 1,
                    color: "#0e9c9a"
                  }
                ])
              }
            },

            data: userNumber
          },
          {
            name: "全国总数",
            type: "bar",
            stack: "总量",
            barWidth: 40,
            // label: {
            //     show: true, // 是否显示数值
            //     position: 'insideRight'
            // },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00b5ff"
                  },
                  {
                    offset: 1,
                    color: "#0038ff"
                  }
                ])
              }
            },
            data: totalNumber
          }
        ]
      };
      barChart.setOption(option);
      let listener = function() {
        barChart.resize();
      };
      EleResize.on(barCharts, listener);
    },
    // 获取开户年龄数据
    getAge() {
      // let params = {
      //   qdi: "queryAgeBootUser",
      //   userid: "superman",
      //   token: "HDdt7Zhq5qjWzddDMAni9u1G",
      //   limit: "20",
      //   offset: "0"
      //   // areacode: `101','104','114','128`
      // };
      // this.axios({
      //   params,
      //   method: "post"
      // }).then(data => {
      //   if (data.msg == "success") {
      //   //   this.ageOpening = data.subject;
      //     this.ageOpening = [
      //       {
      //         AGELEVELNAME: "老年",
      //         BOOTRATE: 1, // 开机率
      //         BOOTUSER: 1000, // 开机用户数
      //         ROW_ID: 1,
      //         TOTALUSER: 100000 // 总用户数
      //       },
      //       {
      //         AGELEVELNAME: "中年",
      //         BOOTRATE: 19,
      //         BOOTUSER: 19000,
      //         ROW_ID: 1,
      //         TOTALUSER: 100000
      //       },
      //       {
      //         AGELEVELNAME: "熟龄青年",
      //         BOOTRATE: 28,
      //         BOOTUSER: 28000,
      //         ROW_ID: 1,
      //         TOTALUSER: 100000
      //       },
      //       {
      //         AGELEVELNAME: "青年",
      //         BOOTRATE: 25,
      //         BOOTUSER: 25000,
      //         ROW_ID: 1,
      //         TOTALUSER: 100000
      //       },
      //       {
      //         AGELEVELNAME: "少年",
      //         BOOTRATE: 12,
      //         BOOTUSER: 12000,
      //         ROW_ID: 1,
      //         TOTALUSER: 100000
      //       },
      //       {
      //         AGELEVELNAME: "儿童",
      //         BOOTRATE: 15,
      //         BOOTUSER: 15000,
      //         ROW_ID: 1,
      //         TOTALUSER: 100000
      //       }

      //     ]
      //     this.setAge();
      //   }
      // });
      this.ageOpening = [
        {
          AGELEVELNAME: "老年",
          BOOTRATE: 1, // 开机率
          BOOTUSER: 1000, // 开机用户数
          ROW_ID: 1,
          TOTALUSER: 100000 // 总用户数
        },
        {
          AGELEVELNAME: "中年",
          BOOTRATE: 19,
          BOOTUSER: 19000,
          ROW_ID: 1,
          TOTALUSER: 100000
        },
        {
          AGELEVELNAME: "熟龄青年",
          BOOTRATE: 28,
          BOOTUSER: 28000,
          ROW_ID: 1,
          TOTALUSER: 100000
        },
        {
          AGELEVELNAME: "青年",
          BOOTRATE: 25,
          BOOTUSER: 25000,
          ROW_ID: 1,
          TOTALUSER: 100000
        },
        {
          AGELEVELNAME: "少年",
          BOOTRATE: 12,
          BOOTUSER: 12000,
          ROW_ID: 1,
          TOTALUSER: 100000
        },
        {
          AGELEVELNAME: "儿童",
          BOOTRATE: 15,
          BOOTUSER: 15000,
          ROW_ID: 1,
          TOTALUSER: 100000
        }

      ]
      this.setAge();
    },
    // 开户年龄
    setAge() {
      let myAge = this.$echarts.init(document.querySelector("#ageOpening"));
      let myAges = document.getElementById("ageOpening");
      let indicatorData = []; // 开机用户数对应模块的标题展示模块数据
      let valueData = []; // 开机用户数数据
      this.ageOpening.forEach((e, i) => {
        let obj = {
          name: null,
          MAX: 100
        };
        valueData.push(e.BOOTUSER);
        obj.name = e.BOOTRATE + "% " + e.AGELEVELNAME;
        indicatorData.push(obj);
      });
      //   console.log(valueData);
      let option = {
        // title: {},
        // tooltip: {},
        radar: {
        //   shape: 'circle',
          center: ["50%", "50%"],

          name: {
            textStyle: {
              color: "#27d3e7",
              fontSize: 23,
            //   borderRadius: 3,
              padding: [-10, -10],
              fontSize: 11
            }
          },
        //   indicator: indicatorData,
          indicator: [
              { name: "15% 儿童", max: 100 },
              { name: "1% 老年", max: 100 },
              { name: "19% 中年", max: 100 },
              { name: "28% 熟龄青年", max: 100 },
              { name: "25% 青年", max: 100 },
              { name: "12% 少年", max: 100 },
          ],
          splitNumber: 6, //环的数量
        //   shape: "cirpolygoncle",
          axisLine: {
            // (圆内的几条直线)坐标轴轴线相关设置
            lineStyle: {
              color: "#357296",
              // 坐标轴线线的颜色。
              width: 1,
              // 坐标轴线线宽。
              type: "solid"
              // 坐标轴线线的类型。
            }
          },
          splitLine: {
            // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
            lineStyle: {
              color: "#357296",
              // 分隔线颜色
              width: 1
              // 分隔线线宽
            }
          },
          splitArea: {
            // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: {
              // 分隔区域的样式设置。
              color: [
                "#47d1ee",
                "#3aadd6",
                "#338abc",
                "#24669d",
                "#14477b",
                "#062959"
              ]
              // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
          }
        },

        series: [
          {
            type: "radar",
            // areaStyle: {normal: {}},
            itemStyle: {
              // 折线拐点标志的样式。
              normal: {
                // 普通状态时的样式
                lineStyle: {
                  color: "#1bd2e4",
                  width: 1
                },
                opacity: 0.2
              }
            },
            data: [
              {
                value: [60, 20, 70, 90,80,40],
                // value: valueData
              }
            ]
          }
        ]
      };
      myAge.setOption(option);
      let listener = function() {
        myAge.resize();
      };
      EleResize.on(myAges, listener);
    },
    // 获取接入占比数据请求数据
    getBroadband(areacode) {
      // let params = {
      //   qdi: "queryNetModeUser",
      //   userid: "superman",
      //   token: "HDdt7Zhq5qjWzddDMAni9u1G",
      //   limit: "20",
      //   offset: "0",
      //   areacode: areacode
      //   // areacode: `101','104','114','128`
      // };
      // this.axios({
      //   params,
      //   method: "post"
      // }).then(data => {
      //   if (data.msg == "success") {
      //   //   this.accessUsersData = data.subject;
      //     this.accessUsersData = [
      //         {
      //           TOTALUSER: 1826937, // 总用户数
      //           BANDRATE: 0, // 宽带渗透率
      //           WIFIRATE: 0, // wifi接入比例
      //           WANRATE: 0, // 宽带接入比例
      //           ROW_ID: 1,
      //         }
      //     ]
      //     this.accessUsersData.forEach(e=>{
      //         e.TOTALUSER = this.random(50000,100000)
      //         e.WIFIRATE = this.random(30000,50000)
      //         e.WANRATE = e.TOTALUSER - e.WIFIRATE
      //         e.BANDRATE = e.WANRATE/e.TOTALUSER
      //     })
      //     this.penetrationRate = (this.accessUsersData[0].BANDRATE * 100).toFixed(2);
      //     this.setBroadband();
      //   }
      // });
      this.accessUsersData = [
          {
            TOTALUSER: 1826937, // 总用户数
            BANDRATE: 0, // 宽带渗透率
            WIFIRATE: 0, // wifi接入比例
            WANRATE: 0, // 宽带接入比例
            ROW_ID: 1,
          }
      ]
      this.accessUsersData.forEach(e=>{
          e.TOTALUSER = this.random(50000,100000)
          e.WIFIRATE = this.random(30000,50000)
          e.WANRATE = e.TOTALUSER - e.WIFIRATE
          e.BANDRATE = e.WANRATE/e.TOTALUSER
      })
      this.penetrationRate = (this.accessUsersData[0].BANDRATE * 100).toFixed(2);
      this.setBroadband();
    },
    // 渲染接入占比
    setBroadband() {
      let myBroadband = this.$echarts.init(
        document.querySelector("#broadband")
      );
      let myBroadbands = document.getElementById("broadband");
      // console.log(this.accessUsersData)
      let accessData = [];
      let option = {
        grid: {
            top: '13%',
            left: '25%',
            right: '25%',
            bottom: '13%',
            containLabel: false
        },
        series: [
          {
            type: "pie",
            center: ["49%", "51%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
            radius: ["48%", "62%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            showContent: false,
            clickable: false,
            color: ["#0ecfff", "#0d84ff"],
            label: {
            //   fontSize: 13,
              formatter: "{per|{d}%}   \n{b}  ",
              color: "#20bfe4",
              position: 'outside',
              rich: {
                b: {
                  fontSize: 16,
                  lineHeight: 30
                },
                per: {
                  color: "#fff",
                  fontSize: 16,
                  lineHeight: 30,
                  borderRadius: 2
                }
              }
            },
            labelLine: {
              lineStyle: {
                color: "#29648d"
              }
            },
            data: [
              { value: this.accessUsersData[0].WANRATE, name: "有线" },
              { value: this.accessUsersData[0].WIFIRATE, name: "Wi-Fi" }
            ]
          }
        ]
      };
      myBroadband.setOption(option);
      let listener = function() {
        myBroadband.resize();
      };
      EleResize.on(myBroadbands, listener);
    }
  }
};
</script>
<style>
.userDevelopment {
  width: 100%;
  height: 100%;
  background: url("../assets/img/userDevelopmentBg01.png");
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>