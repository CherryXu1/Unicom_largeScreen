// 业务订购两侧柱状图
<template>
  <div>
    <div
      class="toop"
      :class="{'toop_zuo' :barJSON.tabTitle.length == 2, 'toop_you' :barJSON.tabTitle.length == 3}"
    >
      <p v-for="(item, i) in barJSON.tabTitle" :key="i" :class="{ cy: cur == i }">{{ item }}</p>
    </div>
    <!-- 组件 -->
    <div class="tubiao" ref="piecontent" :style="{ width: '100%', height: '93%' }"></div>
  </div>
</template>
<script>
export default {
  props: ["barJSON"],
  data() {
    return {
      show: false,
      cur: 0 //默认选中第一个tab
    };
  },
  watch: {
    barJSON: {
      handler() {
        //调用渲染
        this.bar(this.barJSON.legend, this.barJSON.xAxis, this.barJSON.data[0]);
      },
      deep: true
    }
  },
  mounted() {
    //调用渲染
    this.bar(this.barJSON.legend, this.barJSON.xAxis, this.barJSON.data[0]);
    this.gool();
  },
  // 切换
  methods: {
    gool() {
      setTimeout(() => {
        this.cur++;
        let cur_ = this.cur;

        if (this.cur == this.barJSON.tabTitle.length) {
          this.cur = 0;
          cur_ = 0;
        }

        this.bar(
          this.barJSON.legend,
          this.barJSON.xAxis,
          this.barJSON.data[cur_]
        );
        this.gool();
      }, 5000);
    },

    // 渲染
    bar(xAxis, legend, arr) {
      let myChart = this.$echarts.init(this.$refs.piecontent);
      let option = null;
      var series = [];
      for (var i = 0; i < arr.length; i++) {
        series.push({
          name: arr[i].name,
          type: "bar",
          data: arr[i].data,
          barWidth: this.$notsize(30), //柱子宽度
          barGap: this.$notsize(73), //柱子之间间距
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: arr[i].color1
                },
                {
                  offset: 1,
                  color: arr[i].color2
                }
              ]),
              opacity: 1
            }
          }
        });
      }

      option = {
        //单位部分
        title: {
          text: "单位：万人",
          color: "write",
          top: this.$notsize(70),
          left: this.$notsize(45),
          x: "left",
          textStyle: {
            //标题颜色
            fontSize: this.$notsize(18),
            fontWeight: "400",
            color: "rgba(2,238,255,1)"
          }
        },
        backgroundColor: "",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },

        grid: {
          top: this.$notsize(130),
          left: this.$notsize(42),
          right: this.$notsize(40),
          bottom: this.$notsize(8),
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                type: "solid"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              margin: this.$notsize(25),
              textStyle: {
                color: "rgba(2, 238, 255, 1)",
                fontFamily: "Microsoft YaHei",
                fontWeight: 400,
                fontSize: this.$notsize(21)
              }
            }
          }
        ],
        yAxis: [
          {
            min: "0", // 最小值
            type: "value",
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#02EEFF",
                fontFamily: "Microsoft YaHei",
                fontWeight: 400,
                fontSize: this.$notsize(16)
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#00c7ff",
                width: 1,
                type: "solid"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#063374"
              }
            }
          }
        ],
        series: series
      };
      //渲染 条件-有值并且为{}
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.toop {
  font-size: 21px;
  position: absolute;
  width: 360px;
  top: 5%;
  display: flex;
  height: 55px;
  color: "#FFFFFF";
}

.toop_you {
  margin: 0% 0% 0% 16.7%;
  width: 340px;
  p {
    flex: 1;
    font-size: 21px;
    font-weight: bold;
    width: 130px;
    // margin-left: 25px;
    line-height: 53px;

    text-align: center;
  }
  .cy {
    font-size: 21px;
    font-weight: bold;
    color: rgba(2, 238, 255, 1);
    background: url("../../assets/img/xuanz.png") no-repeat;
    background-size: 91% 92%;
  }
}
.toop_zuo {
  margin: 0% 0% 0% 18.5%;
  width: 362px;
  display: flex;
  p {
    flex: 1;
    font-size: 21px;
    font-weight: bold;
    // margin-left: 25px;
    line-height: 53px;

    text-align: center;
  }
  .cy {
    font-size: 21px;
    font-weight: bold;
    color: rgba(2, 238, 255, 1);
    background: url("../../assets/img/xuanz.png") no-repeat;
    background-size: 100% 92%;
  }

  // p {
  //   margin-left: 50px;
  // }
}
</style>
