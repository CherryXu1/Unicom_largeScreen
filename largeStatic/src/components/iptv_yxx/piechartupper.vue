//业务总览全国分布图
<template>
  <div class="pie_content">
    <div class="pie_sj" v-for="(item, index) in shangfang" :key="index">
      <p class="yhl">{{item}}</p>
      <p class="sjl">
        {{format(ops[index])}}<span>w</span>
      </p>
      <div class="pei_jd"></div>
    </div>
    <div class="biao" ref="chenyi" style="width:58%; height: 110%;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shangfang: [
        "全国用户数",
        "开机数",
        "直播用户数",
        "点播用户数",
        "回看用户数"
      ],
      ops: [300.25,42.34,23.43,52.12,12.2]
    };
  },
  methods: {
    cy() {
      let myChart = this.$echarts.init(this.$refs.chenyi);
      let option = null;
      var data = [
        {
          value: (this.ops[1]/ this.ops[0]*100).toFixed(1),
        },
        {
          value: (this.ops[2]/ this.ops[0]*100).toFixed(1),
        },
        {
          value: (this.ops[3]/ this.ops[0]*100).toFixed(1),
        },
        {
          value: (this.ops[4]/ this.ops[0]*100).toFixed(1),
        }
      ];

      var titleArr = [],
        seriesArr = [];
      var colors = [
        ["#389af4", "#dfeaff"],
        ["#ff8c37", "#ffdcc3"],
        ["#ffc257", "#ffedcc"],
        ["#fd6f97", "#fed4e0"],
        ["#a181fc", "#e3d9fe"]
      ];
      data.forEach((item, index) => {
        titleArr.push({
          left: index * 10 + 10 + "%",
          top: "65%",
          textAlign: "center",
          textStyle: {
            fontWeight: 400,
            fontSize: this.$notsize(20),
            color: "red",
            textAlign: "center"
          }
        });
        seriesArr.push({
          type: "pie",
          clockWise: false,
          radius: [this.$notsize(25), this.$notsize(22)],
          itemStyle: {
            normal: {
              color: "rgba(0, 164, 255, 1)",
              labelLine: {
                show: false
              },
              textStyle: {
                fontSize: this.$notsize(20)
              }
            }
          },
          hoverAnimation: false,
          center: [index * 24.5 + 19 + "%", "45%"],
          data: [
            {
              value: item.value,
              label: {
                normal: {
                  formatter: function(params) {
                    return params.value + "%";
                  },
                  position: "center",
                  textStyle: {
                    color: "white",
                    fontSize: this.$notsize(14)
                  }
                }
              }
            },
            {
              value: 100 - item.value,
              itemStyle: {
                normal: {
                  color: "rgba(0, 164, 255, .3)"
                }
              }
            }
          ]
        });
      });

      option = {
        backgroundColor: "transparent",
        title: titleArr,
        series: seriesArr
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }
    },
    // kaiji() {
    //   let params = {
    //     qdi: "queryUserOverview",
    //     userid: "superman",
    //     token: "HDdt7Zhq5qjWzddDMAni9u1G",
    //     limit: "20",
    //     offset: "0"
    //   };
    //   this.axios({
    //     params,
    //     method: "post"
    //   }).then(res => {
    //     if (res.msg == "success") {
    //       console.log("查询开机情况");
    //       console.log(res.subject);
    //       let obj = res.subject;
    //       console.log(res.subject);
    //       this.ops.push(
    //         obj[0].TOTALUSER,
    //         obj[0].BOOTUSER,
    //         obj[0].LIVETVUSER,
    //         obj[0].VODUSER,
    //         obj[0].TVODUSER
    //       );
    //     }
    //   });
    // },

    format(num) {
      var tag = (num || 0).toString().split(".");
      tag[0] = tag[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return tag.join(".");
    }
  },
  mounted() {
    this.cy();
    // this.kaiji();
    // console.log(this.$notsize(20));
    //console.log(this.ops);

    // this.times();
  },
  created() {}
};
</script>
<style lang="less">
.pie_content {
  text-align: center;
  position: relative;
  width: 100%;
  height: 9%;
  top: 12%;
  .biao {
    position: absolute;
    // border: 1px solid red;
    left: 27.6%;
    margin-left: 30px;
    top: 13%;
  }

  .pie_sj {
    width: 14%;
    height: 120px;
    display: inline-block;
    .yhl {
      margin-top: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      width: 140px;
      margin-left: 54px;
      height: 28px;
      line-height: 28px;
      font-size: 23px;
      font-family: Microsoft YaHei;
      text-align: left;
      color: #e2a61e;
    }
    .sjl {
      margin-left: 10%;
      text-align: left;
      margin-top: 7%;
      height: 17px;
      // letter-spacing: 1px;
      width: 400px;
      font-size: 40px;
      font-family: "DigifaceWide";
      font-weight: 400;
      color: rgba(2, 238, 255, 1);
      span {
        font-family: Microsoft YaHei;
      }
    }
    .pei_jd {
      float: right;
      margin: -23% 8% 0% 0%;
      width: 80px;
      height: 70px;
    }
  }
}
</style>
