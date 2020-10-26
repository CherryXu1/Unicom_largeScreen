// 业务订购中间圆环
<template>
  <div class="tubiao">
    <p class="beijing"></p>
    <div ref="chenyi" style="width: 100%; height: 100%;"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seriesData: [],
      colors: [
        "rgba(1,177,255,1)",
        "#B19EFF",
        "rgba(94,247,224,1)",
        "rgba(243,98,98,1)",
        "#02EEFF"
      ]
    };
  },
  methods: {


    
    formatter(i) {
      if (i == 4) {
        return (
        "{f|" +
        this.seriesData[i].AREANAME +
        "} \n\n" +
        "{d|" +
        "订购金额}" +
        "\n\n{e|" +
        this.format(this.seriesData[i].AMOUNT) +
        "万元}\n\n" +
        "{d|" +
        "订购单}" +
        "\n\n{e|" +
        this.format(this.seriesData[i].USERCOUNT) +
        "单}"
      );
      }
      return (
        "{c|" +
        this.seriesData[i].AREANAME +
        "} \n\n" +
        "{a|" +
        (this.seriesData[i].RATIO * 100).toFixed(2) +
        "%}" +
        "\n\n{b|" +
         this.format(this.seriesData[i].AMOUNT) +
        "万元}" +
        "\n\n{b|" +
         this.format(this.seriesData[i].USERCOUNT) +
        "单}"
      );
    },
    label(i) {
      return {
        normal: {
          rich: {
            a: {
              color: this.colors[i],
              align: "center",
              fontSize: this.$notsize(25),
              fontWeight: 400,
              padding: [-15, 10, -18, 10]
            },
            b: {
              color: this.colors[i],
              align: "left",
              fontweight: 400,
              fontSize: this.$notsize(16),
              borderWidth: 1,
              borderColor: "rgba(66,138,255,.3)",
              width: this.$notsize(100),
              padding: [
                this.$notsize(5),
                this.$notsize(10),
                this.$notsize(9),
                this.$notsize(8)
              ],
              borderRadius: this.$notsize(20)
            },
            c: {
              color: "rgba(255, 255, 255, 1)",
              align: "center",
              fontSize: this.$notsize(18),
              fontweight: 400,
              padding: [
                this.$notsize(5),
                this.$notsize(10),
                this.$notsize(15),
                this.$notsize(10)
              ]
            },
            d: {
              fontSize: this.$notsize(13),
              color: "rgba(255, 255, 255, 1)",
              // margin: [-5, 10, -5, 10],
            },
            e:{
              color: this.colors[i],
              align: "center",
              fontweight: 400,
              fontSize: this.$notsize(20),
              width: this.$notsize(100),
              // padding: [
              //   this.$notsize(5),
              //   this.$notsize(10),
              //   this.$notsize(9),
              //   this.$notsize(8)
              // ],           
               },
               f: {
              color: "rgba(255, 255, 255, 1)",
              align: "center",
              fontSize: this.$notsize(18),
              fontweight: 400,
            },
          },
          formatter: this.formatter(i),
          position: "center",
          show: true,
          textStyle: {
            fontSize: this.$notsize(14),
            fontWeight: "normal",
            color: "#fff"
          }
        }
      };
    },
    cy() {
      let myChart = this.$echarts.init(this.$refs.chenyi);
      let option = null;
      var datas = {
        value: "",
        company: "%",
        ringColor: [
          {
            offset: 0,
            color: "rgba(181, 164, 255, 1)" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(105, 65, 255, 1)" // 100% 处的颜色
          }
        ],
        ringColor3: [
          {
            offset: 0,
            color: "rgba(3, 54, 255, 1)" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(1, 180, 255, 1)" // 100% 处的颜色
          }
        ],
        ringColor1: [
          {
            offset: 0,
            color: "rgba(9, 224, 183, 1)" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(122, 255, 238, 1)" // 100% 处的颜色
          }
        ],
        ringColor2: [
          {
            offset: 0,
            color: "rgba(242, 92, 93, 1)" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(255, 196, 161, 1)" // 100% 处的颜色
          }
        ],
        ringColor4: [
          {
            offset: 0,
            color: "rgba(3, 213, 232, 1)" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(147, 248, 255, 1)" // 100% 处的颜色
          }
        ]
      };

      option = {
        title: {
          text: "",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#fff",
            fontSize: this.$notsize(20)
          }
        },

        series: [
          {
            backgroundColor: "red",
            name: "Line 1",
            type: "pie",
            startAngle: 210,
            endAngle: -40,
            clockWise: true,
            center: ["17%", "32%"],
            radius: ["36%", "32%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: (this.seriesData[1].RATIO * 100).toFixed(2),
                name: "",
                label: this.label(1),
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: datas.ringColor
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: "",
                value: 100 - (this.seriesData[1].RATIO * 100).toFixed(2),
                label: {
                  normal: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: "rgba(0, 64, 169, .3)"
                  }
                }
              },
              {
                name: "",
                value: 50,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    show: false,
                    opacity: 0
                  }
                }
              }
            ]
          },
          {
            center: ["17%", "80%"],
            backgroundColor: "red",
            name: "Line 2",
            type: "pie",
            startAngle: 210,
            endAngle: -40,
            clockWise: true,
            radius: ["36%", "32%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: (this.seriesData[2].RATIO * 100).toFixed(2),
                name: "",
                label: this.label(2),
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: datas.ringColor1
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: "",
                value: 100 - (this.seriesData[2].RATIO * 100).toFixed(2),
                label: {
                  normal: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: ""
                  }
                }
              },
              {
                name: "",
                value: 50,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    show: false,
                    opacity: 0
                  }
                }
              }
            ]
          },
          {
            center: ["82%", "80%"],
            backgroundColor: "red",
            name: "Line 3",
            type: "pie",
            startAngle: 210,
            endAngle: -40,
            clockWise: true,
            radius: ["36%", "32%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: (this.seriesData[3].RATIO * 100).toFixed(2),
                name: "",
                label: this.label(3),
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: datas.ringColor2
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: "",
                value: 100 - (this.seriesData[3].RATIO * 100).toFixed(2),
                label: {
                  normal: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: ""
                  }
                }
              },
              {
                name: "",
                value: 50,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    show: false,
                    opacity: 0
                  }
                }
              }
            ]
          },
          {
            center: ["80%", "32%"],
            name: "Line 4",
            type: "pie",
            startAngle: 210,
            endAngle: -40,
            clockWise: true,
            radius: ["36%", "32%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: (this.seriesData[0].RATIO * 100).toFixed(2),
                label: this.label(0),
                name: "",
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: datas.ringColor3
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: "",
                value: 100 - (this.seriesData[0].RATIO * 100).toFixed(2),
                label: {
                  normal: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: ""
                  }
                }
              },
              {
                name: "",
                value: 50,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    show: false,
                    opacity: 0
                  }
                }
              }
            ]
          },
          {
            name: "",
            type: "pie",
            radius: ["46%", "42%"],
            center: ["50%", "58%"],
            hoverAnimation: false,

            data: [
              {
                value: 100,
                label: this.label(4),
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: datas.ringColor4
                    }
                  }
                }
              },
              {
                value: 0
              }
            ]
          }
        ]
      };

      if (option && typeof option === "object") {
        myChart.setOption(option, true);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }
    },
    format(num) {
      var tag = (num || 0).toString().split(".");
      tag[0] = tag[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return tag.join(".");
    },
    // ordering() {
    //   let params = {
    //     qdi: "queryAreaOrder",
    //     userid: "superman",
    //     token: "HDdt7Zhq5qjWzddDMAni9u1G",
    //     limit: "20",
    //     areacode: "101','104','114','128",

    //     offset: "0"
    //   };
    //   this.axios({
    //     params,
    //     method: "post"
    //   }).then(res => {
    //     if (res.msg == "success") {
    //       //console.log("中间五个圆环");
    //       //console.log(res.subject);
    //       this.seriesData = res.subject;
    //       this.cy();
    //     }
    //   });
    // },
    ordering() {
      this.seriesData = [
        {
          AMOUNT: 1892.76,
          AREACODE: "101",
          RATIO: 0.0555,
          AREANAME: " 重庆",
          ORDERTIMES: 6,
          ROW_ID: 1,
          USERCOUNT: 18029121
        },
        {
          AMOUNT: 627.8,
          AREACODE: "114",
          RATIO: 0.0178,
          AREANAME: "北京",
          ORDERTIMES: 2,
          ROW_ID: 2,
          USERCOUNT: 7261162
        },
        {
          AMOUNT: 799.72,
          AREACODE: "104",
          RATIO: 0.02084,
          AREANAME: "吉林",
          ORDERTIMES: 10,
          ROW_ID: 3,
          USERCOUNT: 10212231
        },
        {
          AMOUNT: 940.56,
          AREACODE: "128",
          RATIO: 0.02783,
          AREANAME: "山西",
          ORDERTIMES: 145,
          ROW_ID: 4,
          USERCOUNT: 827121
        },
        {
          AMOUNT: 16475.06,
          AREACODE: "999",
          AREANAME: "全国",
          ORDERTIMES: 848,
          ROW_ID: 5,
          USERCOUNT: 82231221
        }
      ];
       this.cy();
    }
  },
  mounted() {
    this.ordering();
  },
  created() {}
};
</script>
<style lang="" scoped>
.beijing{
  position: absolute;
  top: 36%;
  left: 44.3%;
  display: flex;
  width: 11.5%;
  height: 45%;
  background: url("../../assets/img/dinggouyuan.png");
  background-size: 100% 100%;
}
</style>
