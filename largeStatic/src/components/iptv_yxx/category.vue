// 业务订购每月arpu值
<template>
  <div class="fu">
    <!-- 组件 -->
    <div ref="piecontent" id="fu" :style="{ width: '130%', height: '100%' }"></div>
  </div>
</template>
<script>
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
  data() {
    return {
      show: true,
      data: [], //diqu
      data1: [], //shijian
      vod: [], //shuju
      arr: []
    };
  },
  watch: {
    vod: {
      handler() {
        let color_ = ["#25C686", "#5E49D8", "#0676D8", "#F46F69"];
        this.vod.forEach((item, i) => {
          this.arr.push({
            data: this.vod[i],
            name: this.data[i],
            color: color_[i]
          });
        });
        this.bar(this.data, this.data1, this.arr);
      },
      deep: true
    }
  },
  mounted() {
    // 接口得到数据
    this.arpu();
  },
  methods: {
    // 渲染
    bar(data, data1, arr) {
      console.log("我在打印");
      console.log(this.data);
      let myChart = this.$echarts.init(this.$refs.piecontent);
      let myages = document.querySelector("#fu");
      let option = null;
      var series = [];
      for (var i = 0; i < arr.length; i++) {
        series.push({
          type: "line",
          name: arr[i].name,
          data: arr[i].data,

          itemStyle: {
            normal: {
              color: arr[i].color
            }
          }
        });
      }

      option = {
        legend: {
          data: data,
          align: "left",
          right: this.$notsize(25),
          top: this.$notsize(25),
          textStyle: {
            color: "#fff",
            fontSize: this.$notsize(17)
          },
          itemWidth: this.$notsize(25),
          itemHeight: this.$notsize(10),
          itemGap: this.$notsize(15)
        },
        grid: {
          top: this.$notsize(80),
          x: this.$notsize(50),
          x2: this.$notsize(25),
          bottom: this.$notsize(55)
        },
        title: {
          text: "单位：元/月",
          top: this.$notsize(25),
          left: this.$notsize(50),
          x: "left",
          textStyle: {
            //标题颜色
            color: "#00F2F1",
            fontSize: this.$notsize(16),
            fontWeight: "normal"
          }
        },
        xAxis: {
          type: "category",
          data: data1,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              // 设置y轴颜色
              color: "#07245d"
            },
            onZero: true
          },
          axisLabel: {
            color: "rgba(0,242,241,1)",
            fontSize: this.$notsize(13),
            fontWeight: 400,
            margin: this.$notsize(20)
          }
        },
        yAxis: [
          {
            type: "value",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                // 设置y轴颜色
                color: "#07245d"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#07245d"
              }
            },
            axisLabel: {
              color: "rgba(0,242,241,1)",
              fontSize: this.$notsize(16),
              fontWeight: 400,
              margin: this.$notsize(15)
            }
            //   position:
          },
          {}
        ],
        series: series
      };

      // 渲染 条件-有值并且为{}
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }
    },

    unique(arr) {
      return Array.from(new Set(arr));
    },

    // arpu() {
    //   let params = {
    //     qdi: "queryAreaArpu",
    //     userid: "superman",
    //     token: "HDdt7Zhq5qjWzddDMAni9u1G",
    //     starttime: "20190701",
    //     endtime: "20200301",
    //     areacode: "101','104','114','128",
    //     limit: "100",
    //     offset: "0"
    //   };
    //   this.axios({
    //     params,
    //     method: "post"
    //   }).then(res => {
    //     if (res.msg == "success") {
    //       let data_ = res.subject.slice(0, 28);
    //       //console.log(data_);
    //       var quchong = [],
    //         diqu = [];
    //       const a = [],
    //         b = [],
    //         c = [],
    //         d = [];
    //       data_.forEach(item => {
    //         quchong.push(item.MONTHDAY);
    //         if (item.AREANAME == "全国") {
    //           item.AREANAME == "";
    //         } else {
    //           diqu.push(item.AREANAME);
    //         }

    //         if (item.AREANAME == "重庆") {
    //           a.push(item.ARPU);
    //         } else if (item.AREANAME == "北京") {
    //           b.push(item.ARPU);
    //         } else if (item.AREANAME == "吉林") {
    //           c.push(item.ARPU);
    //         } else if (item.AREANAME == "山西") {
    //           d.push(item.ARPU);
    //         }
    //       });
    //       this.vod.push(a, b, c, d);
    //       //这是我获取的时间
    //       this.data1 = Array.from(new Set(quchong));
    //       this.data = Array.from(new Set(diqu));
    //     }
    //   });
    // },
    arpu() {
      let data_ = [
        {
          SALE: 140,
          AREACODE: "101",
          ARPU: 32.67,
          AREANAME: "北京",
          MONTHDAY: "2019.10",
          ROW_ID: 8,
          USERCOUNT: 3
        },
        {
          SALE: 140,
          AREACODE: "101",
          ARPU: 26.67,
          AREANAME: "北京",
          MONTHDAY: "2019.11",
          ROW_ID: 9,
          USERCOUNT: 3
        },
        {
          SALE: 140,
          AREACODE: "101",
          ARPU: 16.67,
          AREANAME: "北京",
          MONTHDAY: "2019.12",
          ROW_ID: 10,
          USERCOUNT: 3
        },
        {
          SALE: 140,
          AREACODE: "101",
          ARPU: 26.67,
          AREANAME: "北京",
          MONTHDAY: "2020.01",
          ROW_ID: 11,
          USERCOUNT: 3
        },
        {
          SALE: 140,
          AREACODE: "101",
          ARPU: 32.67,
          AREANAME: "北京",
          MONTHDAY: "2020.02",
          ROW_ID: 11,
          USERCOUNT: 3
        },
        {
          SALE: 140,
          AREACODE: "101",
          ARPU: 46.67,
          AREANAME: "北京",
          MONTHDAY: "2020.03",
          ROW_ID: 12,
          USERCOUNT: 3
        },
        {
          SALE: 70,
          AREACODE: "101",
          ARPU: 23.33,
          AREANAME: "北京",
          MONTHDAY: "2020.04",
          ROW_ID: 13,
          USERCOUNT: 3
        },
        {
          SALE: 209.3,
          AREACODE: "104",
          ARPU: 22.9,
          AREANAME: "重庆",
          MONTHDAY: "2019.10",
          ROW_ID: 15,
          USERCOUNT: 7
        },
        {
          SALE: 299,
          AREACODE: "104",
          ARPU: 21.9,
          AREANAME: "重庆",
          MONTHDAY: "2019.11",
          ROW_ID: 16,
          USERCOUNT: 10
        },
        {
          SALE: 299,
          AREACODE: "104",
          ARPU: 19.9,
          AREANAME: "重庆",
          MONTHDAY: "2019.12",
          ROW_ID: 17,
          USERCOUNT: 10
        },
        {
          SALE: 209.3,
          AREACODE: "104",
          ARPU: 29.9,
          AREANAME: "重庆",
          MONTHDAY: "2020.01",
          ROW_ID: 18,
          USERCOUNT: 7
        },
        {
          SALE: 508.3,
          AREACODE: "104",
          ARPU: 35.83,
          AREANAME: "重庆",
          MONTHDAY: "2020.02",
          ROW_ID: 19,
          USERCOUNT: 10
        },
        {
          SALE: 299,
          AREACODE: "104",
          ARPU: 42.9,
          AREANAME: "重庆",
          MONTHDAY: "2020.03",
          ROW_ID: 20,
          USERCOUNT: 10
        },
        {
          SALE: 299,
          AREACODE: "104",
          ARPU: 32.9,
          AREANAME: "重庆",
          MONTHDAY: "2020.03",
          ROW_ID: 20,
          USERCOUNT: 10
        },
        
        


        {
          SALE: 2156.55,
          AREACODE: "999",
          ARPU: 10.54,
          AREANAME: "吉林",
          MONTHDAY: "2019.10",
          ROW_ID: 1,
          USERCOUNT: 105
        },
        {
          SALE: 2286.22,
          AREACODE: "999",
          ARPU: 12.78,
          AREANAME: "吉林",
          MONTHDAY: "2019.11",
          ROW_ID: 2,
          USERCOUNT: 110
        },
        {
          SALE: 2394.91,
          AREACODE: "999",
          ARPU: 23.96,
          AREANAME: "吉林",
          MONTHDAY: "2019.12",
          ROW_ID: 3,
          USERCOUNT: 120
        },
        {
          SALE: 2106.64,
          AREACODE: "999",
          ARPU: 18.86,
          AREANAME: "吉林",
          MONTHDAY: "2020.01",
          ROW_ID: 4,
          USERCOUNT: 101
        },
        {
          SALE: 2712,
          AREACODE: "999",
          ARPU: 22,
          AREANAME: "吉林",
          MONTHDAY: "2020.02",
          ROW_ID: 5,
          USERCOUNT: 113
        },
        {
          SALE: 2001.93,
          AREACODE: "999",
          ARPU: 15.52,
          AREANAME: "吉林",
          MONTHDAY: "2020.03",
          ROW_ID: 6,
          USERCOUNT: 129
        },
        {
          SALE: 2524.56,
          AREACODE: "999",
          ARPU: 11.57,
          AREANAME: "吉林",
          MONTHDAY: "2020.04",
          ROW_ID: 7,
          USERCOUNT: 129
        },
        {
          SALE: 2156.55,
          AREACODE: "999",
          ARPU: 20.54,
          AREANAME: "山西",
          MONTHDAY: "2019.10",
          ROW_ID: 1,
          USERCOUNT: 105
        },
        {
          SALE: 2286.22,
          AREACODE: "999",
          ARPU: 20.78,
          AREANAME: "山西",
          MONTHDAY: "2019.11",
          ROW_ID: 2,
          USERCOUNT: 110
        },
        {
          SALE: 2394.91,
          AREACODE: "999",
          ARPU: 19.96,
          AREANAME: "山西",
          MONTHDAY: "2019.12",
          ROW_ID: 3,
          USERCOUNT: 120
        },
        {
          SALE: 2106.64,
          AREACODE: "999",
          ARPU: 20.86,
          AREANAME: "山西",
          MONTHDAY: "2020.01",
          ROW_ID: 4,
          USERCOUNT: 101
        },
        {
          SALE: 2712,
          AREACODE: "999",
          ARPU: 24,
          AREANAME: "山西",
          MONTHDAY: "2020.02",
          ROW_ID: 5,
          USERCOUNT: 113
        },
        {
          SALE: 2001.93,
          AREACODE: "999",
          ARPU: 15.52,
          AREANAME: "山西",
          MONTHDAY: "2020.03",
          ROW_ID: 6,
          USERCOUNT: 129
        },
        {
          SALE: 2524.56,
          AREACODE: "999",
          ARPU: 19.57,
          AREANAME: "山西",
          MONTHDAY: "2020.04",
          ROW_ID: 7,
          USERCOUNT: 129
        },
      ];
      //console.log(data_);
      var quchong = [],
        diqu = [];
      const a = [],
        b = [],
        c = [],
        d = [];
      data_.forEach(item => {
        quchong.push(item.MONTHDAY);
        if (item.AREANAME == "全国") {
          item.AREANAME == "";
        } else {
          diqu.push(item.AREANAME);
        }

        if (item.AREANAME == "重庆") {
          a.push(item.ARPU);
        } else if (item.AREANAME == "北京") {
          b.push(item.ARPU);
        } else if (item.AREANAME == "吉林") {
          c.push(item.ARPU);
        } else if (item.AREANAME == "山西") {
          d.push(item.ARPU);
        }
      });
      this.vod.push(a, b, c, d);
      //这是我获取的时间
      this.data1 = Array.from(new Set(quchong));
      this.data = Array.from(new Set(diqu));
    }
  }
};
</script>
<style lang='less'>
</style>
