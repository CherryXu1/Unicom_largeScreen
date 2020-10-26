<template>
  <div class="loop">
    <p class="xiaobiao">
      <span class="span1">所属频道</span>
      <span class="span2">收视率</span>
    </p>

    <div class="toop">
      <p class="yxx" v-for="(item, i) in tabTitle" :key="i" :class="{ cy: cur == i }">
        {{ item }}
        <span v-if=" i != tabTitle.length-1 " style="color:rgba(118, 106, 80, 1)">/</span>
      </p>
    </div>

    <div class="jiemu" v-for="(item, i) in tabMain" v-show="cur == i" :key="i">
      <p v-for="(item1, ii) in item" :key="ii">
        <span style="text-align: left" class="name">{{ item1.programname }}</span>
        <span v-if="i == 1" class="pindao">{{ format(item1.viewuser)}}</span>
        <span v-if="i != 1" class="pindao">{{ item1.channelname }}</span>

        <span
          v-if="i==0"
          style="font-family:DigifaceWide"
          class="zhanbi"
        >{{ item1.rtg | Percentage}}</span>
        <span
          v-if="i==1"
          style="font-family:DigifaceWide"
          class="zhanbi"
        >{{ item1.ratio | Percentage}}</span>
        <span v-if="i==2" class="zhanbi">{{ format(item1.viewuser)}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",

  components: {},

  data() {
    return {
      tabTitle: ["直播收视", "点播收视", "回看收视"],
      tabMain: [],
      cur: 0 //默认选中第一个tab
    };
  },
  filters: {
    Percentage: function(value) {
      if (value) {
        return value * 100 + "%";
      } else {
        return "无";
      }
    }
  },
  watch: {},

  methods: {
    hh() {
      setTimeout(() => {
        this.cur++;
        if (this.cur == this.tabTitle.length) {
          this.cur = 0;
        }
        var span1 = document.querySelector(".span1");
        var span2 = document.querySelector(".span2");

        if (this.cur == 1) {
          span1.innerHTML = "收视人数";
          span2.innerHTML = "收视占比";
        } else if (this.cur == 2) {
          span1.innerHTML = "所属频道";
          span2.innerHTML = "收视人数";
        } else {
          span1.innerHTML = "所属频道";
          span2.innerHTML = "收视率";
        }
        this.hh();
      }, 5000);
    },
    format(num) {
      var tag = (num || 0).toString().split(".");
      tag[0] = tag[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return tag.join(".");
    },

    // shoushi() {
    //   let params = {
    //     qdi: "queryViewTopN",
    //     userid: "superman",
    //     token: "HDdt7Zhq5qjWzddDMAni9u1G",
    //     viewtype: "1",
    //     limit: "20",
    //     offset: "0"
    //   };
    //   const promise1 = new Promise((resolve, reject) => {
    //     params.viewtype = 1;
    //     this.axios({
    //       params,
    //       method: "post"
    //     }).then(res => {
    //       if (res.msg == "success") {
    //         resolve(res.subject.slice(0, 5));
    //       }
    //     });
    //   });
    //   const promise2 = new Promise((resolve, reject) => {
    //     params.viewtype = 2;

    //     this.axios({
    //       params,
    //       method: "post"
    //     }).then(res => {
    //       if (res.msg == "success") {
    //         resolve(res.subject.slice(0, 5));
    //       }
    //     });
    //   });
    //   const promise3 = new Promise((resolve, reject) => {
    //     params.viewtype = 3;
    //     this.$axios;
    //     this.axios({
    //       params,
    //       method: "post"
    //     }).then(res => {
    //       if (res.msg == "success") {
    //         resolve(res.subject.slice(0, 5));
    //       }
    //     });
    //   });

    //   Promise.all([promise1, promise2, promise3]).then(values => {
    //     this.tabMain = values;

    //     console.log(this.tabMain);
    //   });
    // },
    shoushi() {
      this.tabMain = [
        [
          {
            ROW_ID: 1,
            channelname: "CCTV-734",
            programname: "CCTV-734节目12",
            ratio: "",
            rtg: 0.042,
            viewuser: 17
          },
          {
            ROW_ID: 2,
            channelname: "CCTV-671",
            programname: "CCTV-671节目15",
            ratio: "",
            rtg: 0.039,
            viewuser: 17
          },
          {
            ROW_ID: 3,
            channelname: "CCTV-734",
            programname: "CCTV-734节目15",
            ratio: "",
            rtg: 0.032,
            viewuser: 16
          },
          {
            ROW_ID: 4,
            channelname: "CCTV-734",
            programname: "CCTV-734节目17",
            ratio: "",
            rtg: 0.031,
            viewuser: 16
          },
          {
            ROW_ID: 5,
            channelname: "CCTV-962",
            programname: "CCTV-962节目17",
            ratio: "",
            rtg: 0.023,
            viewuser: 16
          }
        ],
        [
          {
            RTG: "",
            viewuser: 4321,
            programname: "节目757",
            channelname: "",
            ROW_ID: 1,
            ratio: 0.012
          },
          {
            RTG: "",
            viewuser: 4120,
            programname: "节目709",
            channelname: "",
            ROW_ID: 2,
            ratio: 0.0113
          },
          {
            RTG: "",
            viewuser: 4002,
            programname: "节目500",
            channelname: "",
            ROW_ID: 3,
            ratio: 0.0104
          },
          {
            RTG: "",
            viewuser: 3921,
            programname: "节目322",
            channelname: "",
            ROW_ID: 4,
            ratio: 0.0098
          },
          {
            RTG: "",
            viewuser: 3801,
            programname: "节目646",
            channelname: "",
            ROW_ID: 5,
            ratio: 0.0095
          }
        ],
        [
          {
            viewuser: 6210,
            programname: "CCTV-410节目8",
            channelname: "CCTV-410",
            ROW_ID: 1,
            ratio: 0.009
          },
          {
            viewuser: 5902,
            programname: "CCTV-391节目1",
            channelname: "CCTV-391",
            ROW_ID: 2,
            ratio: 0.0083
          },
          {
            viewuser: 5529,
            programname: "CCTV-781节目17",
            channelname: "CCTV-781",
            ROW_ID: 3,
            ratio: 0.0078
          },
          {
            viewuser: 5324,
            programname: "CCTV-961节目3",
            channelname: "CCTV-961",
            ROW_ID: 4,
            ratio: 0.0074
          },
          {
            viewuser: 5102,
            programname: "CCTV-723节目11",
            channelname: "CCTV-723",
            ROW_ID: 5,
            ratio: 0.0072
          }
        ]
      ];
    }
  },

  mounted() {
    this.hh();
    this.shoushi();
  },

  deactivated() {
    clearTimeout(this.hh());
  },

  created() {}
};
</script>
<style lang="less" scoped>
.loop {
  position: absolute;
  z-index: 10;
  width: 30%;
  top: 24%;
  right: 4%;
  height: 37%;
  display: flex;
  .jiemu {
    position: relative;
    top: 27%;
    margin-left: -68%;
    height: 70%;
    font-size: 25px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    p {
      height: 21%;
      line-height: 57px;
      // border: 1px solid red;
      font-size: 30px;
      span {
        display: inline-block;
        // border: 1px solid red;
        text-align: center;
      }
    }
  }
  .toop {
    height: 10%;
    display: flex;
    padding-top: 3.4%;
    font-size: 32px;
    letter-spacing: 2px;
    font-style: italic;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    .yxx {
      position: relative;
      padding-left: 25px;
      font-size: 32px;
      left: -26%;
    }
  }
  .cy {
    color: rgba(226, 166, 30, 1);
    font-weight: 700;
  }
  .name {
    text-align: left;
    position: absolute;
    width: 240px;
    height: 40px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    line-height: 50px;
    color: rgba(255, 255, 255, 1);
  }
  .pindao {
    display: inline-block;
    width: 180px;
    margin-left: 38%;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(2, 238, 255, 1);
  }
  .zhanbi {
    margin-left: 14%;
    width: 90px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(2, 238, 255, 1);
  }
  .xiaobiao {
    position: absolute;
    right: 11%;
    top: 21%;
    font-size: 26px;
    color: white;
    display: inline-block;
    .span2 {
      margin-left: 160px;
      display: inline-block;
      width: 120px;
    }
  }
}
</style>
