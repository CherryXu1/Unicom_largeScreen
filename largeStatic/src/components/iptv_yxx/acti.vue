<template>
  <div class="tubiao">
    <div ref="chenyi" style="width: 100%; height: 100%;"></div>
  </div>
</template>
<script>
export default {
  methods: {
    data() {
      return {
        datas: [],
        timejihe: []
      };
    },
    // fonts(res) {
    //   let docEl = document.documentElement,
    //     clientWidth =
    //       window.innerWidth ||
    //       document.documentElement.clientWidth ||
    //       document.body.clientWidth;
    //   if (!clientWidth) return;
    //   let fontSize = 100 * (clientWidth / 1920);
    //   return res * fontSize;
    // },
    cy() {
      let myChart = this.$echarts.init(this.$refs.chenyi);
      let option = null;
      var charts = {
        unit: "",
        names: ["", ""],
        lineX: this.timejihe,
        value: [
          // this.datas
          [
            23,
            42,
            23,
            34,
            23,
            12,
            12,
            22,
            31,
            51,
            12,
            13,
            41,
            51,
            21,
            2,
            41,
            51,
            12,
            54,
            12,
            22,
            31,
            41,
            23,
            42,
            23,
            34,
            23,
            12,
            12,
            22,
            31,
            51,
            12,
            13,
            41,
            51,
            21,
            2,
            41,
            51,
            12,
            54,
            12,
            22,
            31,
            41,
            23,
            42,
            23,
            34,
            23,
            12,
            12,
            22,
            31,
            51,
            12,
            13,
            41,
            51,
            21,
            2,
            41,
            51,
            12,
            54,
            12,
            22,
            31,
            41,
            23,
            42,
            23,
            34,
            23,
            12,
            12,
            22,
            31,
            51,
            12,
            13,
            41,
            51,
            21,
            2,
            41,
            51,
            12,
            54,
            12,
            22,
            31,
            41,
            23,
            42,
            23,
            34,
            23,
            12,
            12,
            22,
            31,
            51,
            12,
            13,
            41,
            51,
            21,
            2,
            41,
            51,
            12,
            54,
            12,
            22,
            31,
            41,
            23,
            42,
            23,
            34,
            23,
            12,
            12,
            22,
            31,
            51,
            12,
            13,
            41,
            51,
            21,
            2,
            41,
            51,
            12,
            54,
            12,
            22,
            31,
            41,
            23,
            42,
            23,
            34,
            23,
            12,
            12,
            22,
            31,
            51,
            12,
            13,
            41,
            51,
            21,
            2,
            41,
            51,
            12,
            54,
            12,
            22,
            31,
            41
          ]
        ]
      };
      var color = ["rgba(24, 121, 241", "rgba(255,100,97"];
      var lineY = [];
      for (var i = 0; i < charts.names.length; i++) {
        var x = i;
        if (x > color.length - 1) {
          x = color.length - 1;
        }
        var data = {
          name: charts.names[i],
          type: "line",
          color: color[x] + ")",
          smooth: true,
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1.3,
                [
                  {
                    offset: 0,
                    color: color[x] + ", 0.9)"
                  },
                  {
                    offset: 0.8,
                    color: color[x] + ", 0)"
                  }
                ],
                false
              ),
              shadowColor: "rgb(0,253,255,0.6)",
              shadowBlur: 10
            }
          },
          // symbol: 'circle',
          // symbolSize: 5,
          data: charts.value[i]
        };
        lineY.push(data);
      }

      option = {
        backgroundColor: "",
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: charts.names,
          textStyle: {
            fontSize: this.$notsize(12),
            color: "rgb(0,253,255,0.6)"
          }
        },
        grid: {
          top: this.$notsize(40),
          left: this.$notsize(10),
          bottom: this.$notsize(10),
          right: this.$notsize(30),
          containLabel: true
        },
        title: {
          text: "单位：万",
          top: this.$notsize(5),
          left: this.$notsize(50),
          x: "left",
          textStyle: {
            //标题颜色
            color: "#00F2F1",
            fontSize: "110%",
            fontWeight: "normal"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: charts.lineX,
          offset: 4,
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(4, 74, 191, .3)",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgba(0, 242, 241, 1)",
              fontSize: this.$notsize(13)
            }
            // formatter: function(params) {
            //   return params.split(" ")[0] + "\n" + params.split(" ")[1];
            // }
          }
        },
        yAxis: {
          name: charts.unit,
          type: "value",
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "rgba(0, 242, 241, 1)",
              fontSize: 10
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(4, 74, 191, .3)"
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgb(0,253,255,0.6)"
            }
          }
        },
        series: lineY
      };
      myChart.setOption({
        legend: {
          selected: {}
        }
      });
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    shijians() {
      const end = new Date();
      const a = new Date();
      let date;
      let dateTime;
      let dates = [];
      for (let i = 0; i < 7; i++) {
        a.setTime(end.getTime() - 3600 * 1000 * 24 * i);
        date = new Date(a);
        dateTime =
          this.checkTime(date.getMonth() + 1) +
          "." +
          this.checkTime(date.getDate());
        dates.push(dateTime);
      }
      var b = "";
      dates.forEach(item => {
        b += ",,,,,,,,,,"+item + "," + ",,,,,,,,,,,,,";
      });
      this.timejihe = b.split(",").reverse();
    }
    //右下角曲线图
    // quxian() {
    //   let params = {
    //     qdi: "queryHourUserView",
    //     userid: "superman",
    //     token: "HDdt7Zhq5qjWzddDMAni9u1G",
    //     limit: "100",
    //     starttime: "202003011",
    //     endtime: "20200318",
    //     offset: "0"
    //   };
    //   this.axios({
    //     params,
    //     method: "post"
    //   }).then(response => {
    //     if (response.msg == "success") {
    //       //console.log("仅七天收视图");
    //       //.log(response.subject);
    //       let arrs = [];
    //       response.subject.forEach(item => {
    //         arrs.push(item.USERCOUNT / 10000);
    //         //console.log(item.USERCOUNT);
    //       });
    //       this.datas = arrs;
    //       //console.log(this.datas);
    //       this.cy();
    //     }
    //   });
    // }
  },
  mounted() {
    this.shijians();

    this.cy();
    // this.quxian();
  },
  created() {}
};
</script>
<style lang="" scoped>
.tubiao {
  height: 28%;
  width: 52%;
  position: absolute;
  right: 3%;
  bottom: 3%;
}
</style>
