
//业务订购
<template>
  <div class="businessOredr">
    <tab/>
    <times class="date" />
    <!-- 组件 -->
    <div class="shangfang">
      <bar class="bar1" :barJSON="barJSON1" />
      <productOrder class="productOrder" />
      <bar class="bar2" :barJSON="barJSON2" />
    </div>
    <div class="xiafang">
      <cprevenue class="bar4" />
      <category class="bar3" />
    </div>
  </div>
</template>
<script>
const path = require("path");
const files = require.context("@/components/iptv_yxx", false, /\.vue$/);
const modules = {};
files.keys().forEach(key => {
  const name = path.basename(key, ".vue");
  modules[name] = files(key).default || files(key);
});
export default {
  data() {
    return {
      barJSON1: {
        tabTitle: ["付费用户数", "付费次数"],
        data: [{}],
        xAxis: [],
        legend: []
      },
      barJSON2: {
        tabTitle: ["日", "周", "月"],
        data: [{}],
        xAxis: [],
        legend: []
      },
      times: null
    };
  },
  components: modules,
  mounted() {
    this.jiekou();
    this.huoyue();
    // this.times = setTimeout(() => {
    //   this.$router.push("/userDevelopment");
    // }, 60000);
  },
  methods: {
    // jiekou() {
    //   let params = {
    //     qdi: "queryAreaPayment",
    //     userid: "superman",
    //     token: "HDdt7Zhq5qjWzddDMAni9u1G",
    //     limit: "20",
    //     offset: "0",
    //     areacode: "101','104','114','128"
    //   };
    //   this.axios({
    //     params,
    //     method: "post"
    //   }).then(res => {
    //     if (res.msg == "success") {
    //       //console.log("左侧柱状图");
    //       // console.log(res);
    //       let data_ = res.subject;
    //       var lengnd1 = [];
    //       data_.forEach(item => {
    //         lengnd1.push(item.AREANAME), (this.barJSON1.legend = lengnd1);
    //       });
    //       let data = [
    //         [
    //           {
    //             name: "全部",
    //             color1: "#0336FF",
    //             color2: "#01B4FF",
    //             data: []
    //           }
    //         ],
    //         [
    //           {
    //             name: "全部",
    //             color1: "#0336FF",
    //             color2: "#01B4FF",
    //             data: []
    //           }
    //         ]
    //       ];
    //       data_.filter((cur, index, arr) => {
    //         data[0][0].data.push(cur.USERCOUNT);
    //         data[1][0].data.push(cur.PAYTIMES);
    //         return data;
    //       });
    //       this.barJSON1.data = JSON.parse(JSON.stringify(data));
    //       //console.log(this.barJSON1.data);
    //     }
    //   });
    // },
    jiekou() {
      let data_ = [
        {
          AMOUNT: 524.56,
          AREACODE: "999",
          AREANAME: "全国",
          PAYTIMES: 923,
          PRODUCTTYPE: "所有",
          ROW_ID: 1,
          USERCOUNT: 820
        },
        {
          AMOUNT: 140,
          AREACODE: "101",
          AREANAME: "北京",
          PAYTIMES: 325,
          PRODUCTTYPE: "所有",
          ROW_ID: 2,
          USERCOUNT: 452
        },
        {
          AMOUNT: 299,
          AREACODE: "104",
          AREANAME: "重庆",
          PAYTIMES: 120,
          PRODUCTTYPE: "所有",
          ROW_ID: 3,
          USERCOUNT: 310
        },
        {
          AMOUNT: 45,
          AREACODE: "114",
          AREANAME: "吉林",
          PAYTIMES: 422,
          PRODUCTTYPE: "所有",
          ROW_ID: 4,
          USERCOUNT: 512
        },
        {
          AMOUNT: 2040.56,
          AREACODE: "128",
          AREANAME: "山西",
          PAYTIMES: 245,
          PRODUCTTYPE: "所有",
          ROW_ID: 5,
          USERCOUNT: 414
        }
      ];
      var lengnd1 = [];
      data_.forEach(item => {
        lengnd1.push(item.AREANAME), (this.barJSON1.legend = lengnd1);
      });
      let data = [
        [
          {
            name: "全部",
            color1: "#0336FF",
            color2: "#01B4FF",
            data: []
          }
        ],
        [
          {
            name: "全部",
            color1: "#0336FF",
            color2: "#01B4FF",
            data: []
          }
        ]
      ];
      data_.filter((cur, index, arr) => {
        data[0][0].data.push(cur.USERCOUNT);
        data[1][0].data.push(cur.PAYTIMES);
        return data;
      });
      this.barJSON1.data = JSON.parse(JSON.stringify(data));
    },
    // huoyue() {
    //   let params = {
    //     qdi: "queryAreaActiveOrder",
    //     userid: "superman",
    //     token: "HDdt7Zhq5qjWzddDMAni9u1G",
    //     limit: "20",
    //     offset: "0",
    //     week: "20200309",
    //     month: "20200301",
    //     areacode: "101','104','114','128"
    //   };
    //   this.axios({
    //     params,
    //     method: "post"
    //   }).then(res => {
    //     //console.log("右侧柱状图");
    //     // console.log(data);
    //     if (res.msg == "success") {
    //       let data_ = res.subject;
    //       console.log(data_);
    //       var lengnd2 = [];
    //       data_.forEach(item => {
    //         lengnd2.push(item.AREANAME), (this.barJSON2.legend = lengnd2);
    //       });
    //       let data = [
    //         [
    //           {
    //             name: "全部",
    //             color1: "#0336FF",
    //             color2: "#01B4FF",
    //             data: []
    //           }
    //         ],
    //         [
    //           {
    //             name: "全部",
    //             color1: "#0336FF",
    //             color2: "#01B4FF",
    //             data: []
    //           }
    //         ],
    //         [
    //           {
    //             name: "全部",
    //             color1: "#0336FF",
    //             color2: "#01B4FF",
    //             data: []
    //           }
    //         ]
    //       ];
    //       data_.filter((cur, index, arr) => {
    //         data[0][0].data.push(cur.ORDERUSER);
    //         data[1][0].data.push(cur.ORDERUSER_WEEK);
    //         data[2][0].data.push(cur.ORDERUSER_MONTH);
    //         return data;
    //       });
    //       this.barJSON2.data = JSON.parse(JSON.stringify(data));
    //     }

    //     // console.log(this.barJSON2.data)
    //   });
    // },
    huoyue() {
      let data_ = [
        {
          ORDERUSER_WEEK: 329,
          AREACODE: "999",
          ORDERUSER_MONTH: 659,
          ORDERUSER: 209,
          AREANAME: "全国",
          ROW_ID: 1
        },
        {
          ORDERUSER_WEEK: 162,
          AREACODE: "101",
          ORDERUSER_MONTH: 298,
          ORDERUSER: 40,
          AREANAME: "北京",
          ROW_ID: 2
        },
        {
          ORDERUSER_WEEK: 92,
          AREACODE: "104",
          ORDERUSER_MONTH: 142,
          ORDERUSER: 36,
          AREANAME: "重庆",
          ROW_ID: 3
        },
        {
          ORDERUSER_WEEK: 142,
          AREACODE: "114",
          ORDERUSER_MONTH: 252,
          ORDERUSER: 22,
          AREANAME: "吉林",
          ROW_ID: 4
        },
        {
          ORDERUSER_WEEK: 104,
          AREACODE: "128",
          ORDERUSER_MONTH: 244,
          ORDERUSER: 24,
          AREANAME: "山西",
          ROW_ID: 5
        }
      ];
      var lengnd2 = [];
      data_.forEach(item => {
        lengnd2.push(item.AREANAME), (this.barJSON2.legend = lengnd2);
      });
      let data = [
        [
          {
            name: "全部",
            color1: "#0336FF",
            color2: "#01B4FF",
            data: []
          }
        ],
        [
          {
            name: "全部",
            color1: "#0336FF",
            color2: "#01B4FF",
            data: []
          }
        ],
        [
          {
            name: "全部",
            color1: "#0336FF",
            color2: "#01B4FF",
            data: []
          }
        ]
      ];
      data_.filter((cur, index, arr) => {
        data[0][0].data.push(cur.ORDERUSER);
        data[1][0].data.push(cur.ORDERUSER_WEEK);
        data[2][0].data.push(cur.ORDERUSER_MONTH);
        return data;
      });
      this.barJSON2.data = JSON.parse(JSON.stringify(data));
    }
  },
  beforeDestroy() {
    clearInterval(this.times);
    this.times = null;
  }
};
</script>
<style lang="less">
.businessOredr {
  min-width: 1000px;
  height: 100%;
  width: 100%;
  background-image: url("../assets/img/businessOredr.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
}

.shangfang {
  position: absolute;
  top: 10%;
  width: 100%;
  height: 50%;
  display: flex;
  .bar1 {
    flex: 1;
  }
  .bar2 {
    flex: 1;
  }
  .productOrder {
    flex: 1;
  }
}
.xiafang {
  position: absolute;
  bottom: 2.2%;
  overflow: hidden;
  height: 37.5%;
  display: flex;
  flex-shrink: 0; /**不能缩放*/
  flex-grow: 0;
  .bar3 {
    flex: 1;
  }
  .bar4 {
    flex: 2.1;
  }
}
</style>
