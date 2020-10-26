//业务总览
<template>
  <div id="content">
    <tab/>
    <times class="date" />
    <!-- 组件 -->
    <div class="zuoce">
      <piechartupper class="kaiji" />
    </div>
    <div class="map" style="width: 44%; height: 90%" ref="myEchart"></div>
    <div class="zhong">
      <loop />
      <boot />
    </div>
    <acti />
    <img class="dian" src="../assets/img/yuan.png" />
  </div>
</template>
<script>
import "../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
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
      chart: null,
      times: null
    };
  },
  components: modules,
  mounted() {
    this.chinaConfigure();

    // this.times = setTimeout(() => {
    //   this.$router.push("/businessOrder");
    // }, 60000);
  },
  methods: {
    chinaConfigure() {
      var myChart = this.$echarts.init(this.$refs.myEchart);
      let smap = document.querySelector(".map");
      var data = [
     // 等待中
     {name: '山西', value: [0,111]},

     // 作业中
     {name: '重庆', value: [1,42]},

     
     // 已完成
     {name: '北京', value: [2,86]},

 
];

      var geoCoordMap = {
        重庆: [106.54, 29.59],
        山西: [112.53, 37.87],
        北京: [116.395645, 39.92998],
        吉林: [125.35, 43.88]
      };

      var overduedata = [
        // 逾期作业
        { name: "吉林", value: [3, 11] },
        { name: "山西", value: [0, 111] },

        // 作业中
        { name: "重庆", value: [1, 42] },

        // 已完成
        { name: "北京", value: [2, 86] }
      ];
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name, // 城市名称
              value: geoCoord.concat(data[i].value[0]) // 坐标
            });
          }
        }
        return res;
      };

      
      myChart.setOption({
        visualMap: {
          //图例值控制
          min: 0,
          max: 3,
          calculable: true,
          show:false,
          color: ["#FFCC00", "red", "#66FF00","#5AECF8" ],
          textStyle: {
            color: "#fff"
          }
        },

        geo: {
          map: "china",
          roam: false,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "#51DCFF",
                fontSize: this.$notsize(14)
              }
            }
          },
          regions: [
            {
              name: "南海诸岛",
              label: {
                show: false // 隐藏文字
              }
            },
            {
              name: "北京",
              label: {
                show: false // 隐藏文字
              }
            },
            {
              name: "山西",
              label: {
                show: false // 隐藏文字
              }
            },
            {
              name: "重庆",
              label: {
                show: false // 隐藏文字
              }
            },
            {
              name: "吉林",
              label: {
                show: false // 隐藏文字
              }
            }
          ],

          zoom: 1.1,
          aspectScale: 0.67,
          itemStyle: {
            normal: {
              areaColor: "#01215c",
              borderWidth: 1,
              borderColor: "#9ffcff",
              shadowColor: "rgba(0,54,255, 1)",
              shadowBlur: 150,
              borderColor: "#578EFF",
              areaColor: "rgba(81, 220, 255, .2)"
            },
            emphasis: {
              color: "transparent",
              textStyle: {
                color: "lightblue",
                fontSize: this.$notsize(6)
              }
            }
          }
        },
        series: [
          {
            type: "effectScatter", //类型为 - 带有涟漪特效动画的散点（气泡）图
            coordinateSystem: "geo",
            showEffectOn: "render", //配置何时显示特效。可选：'render' 绘制完成后/'emphasis' hover时
            legendHoverLink: true, //悬浮 散点时不启用  图例hover时的联动高亮。
            effectType: "ripple",
            rippleEffect: {
              //涟漪特效相关配置。
              // color: "red", //默认散点颜色
              period: 1.5, //动画的周期，秒数
              brushType: "fill", //stroke(涟漪)和fill(扩散);
              scale: 14 //动画中波纹的最大缩放比例
            },
            hoverAnimation: false,
            label: {
              normal: {
                formatter: "{b}"
              },
            },
            // itemStyle: {
            //   normal: {
            //     borderWidth: 2, //
            //     borderColor: "rgba(81, 220, 255, 1)", //散点边框颜色
            //     label: {
            //       textStyle: {
            //         fontSize:30, //字体大小
            //         fontWeight: 400, //字体粗细
            //         // color 颜色默认区域颜色
            //       }
            //     }
            //   }
            // },
            zlevel: 4
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(overduedata),
            symbolSize: function(val, params) {
              var size = this.$notsize(13);
              for (var i = 0; i < overduedata.length; i++) {
                if (params.name == overduedata[i].name) {
                  if (overduedata[i].value[1] == 0) {
                    size = 0;
                  }
                }
              }
              return size; // 闪点图的size
            },
            showEffectOn: "render",
            rippleEffect: {
              period: 3, //动画时间，值越小速度越快
              brushType: "fill", //波纹绘制方式 stroke, fill
              scale: 10 //波纹圆环最大限制，值越大波纹越大
            },
            zlevel: 1,
            symbolSize: 4,
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true // 是否显示地名
              }
            },
            itemStyle: {
              normal: {
                color: "#f4e925",
                shadowBlur: 10,
                shadowColor: "#333",
                fontSize:30
              }
            },
            zlevel: 1
          }
        ]
      });
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.times);
    this.times = null;
  }
};
</script>
<style>
#content {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: url("../assets/img/1.png");
  background-size: 100% 100%;
  overflow: hidden;
}
.dian {
  position: absolute;
  left: 36%;
  bottom: 10%;
}
.zuoce {
  width: 100%;
  position: absolute;
  top: 2.5%;
  height: 80%;
}
.kaiji {
  width: 100%;
}

.map {
  position: absolute;
  top: 16%;
  left: 0%;
}
</style>
