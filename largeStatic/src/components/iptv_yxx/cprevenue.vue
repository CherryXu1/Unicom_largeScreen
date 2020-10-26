// 业务订购top10
<template>
  <div class="vv">
    <div class="shouru" v-for="(item, index) in dataList" :key="index">
      <h1>{{ item.PRODUCTNAME }}</h1>
      <p>
        订购金额：
        <span class="span" style="color:rgba(243, 98, 98, 1);">{{ item.AMOUNT }}</span>
      </p>
      <p>
        订购次数：
        <span class="span" style="color:rgba(153, 199, 225, 1);">{{ item.ORDERTIMES }}</span>
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
      dataList: []
    };
  },

  watch: {},

  methods: {
    setString(str, len) {
      var strlen = 0;
      var s = "";
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) {
          strlen += 2;
        } else {
          strlen++;
        }
        s += str.charAt(i);
        if (strlen >= len) {
          return s + "...";
        }
      }
      return s;
    },

    // topten() {
    //   let params = {
    //     qdi: "queryProductOrderTopN",
    //     userid: "superman",
    //     token: "HDdt7Zhq5qjWzddDMAni9u1G"
    //   };
    //   this.axios({
    //     params,
    //     method: "post"
    //   }).then(res => {
    //     if (res.msg == "success") {
    //       console.log("在这里打印");
    //       this.dataList = res.subject;
    //       this.dataList.forEach(item => {
    //         console.log(item);
    //         if (item.PRODUCTNAME == "高清会员连续包月29.9元第三方")
    //           // item.PRODUCTNAME = this.setString(item.PRODUCTNAME, 15);
    //           item.PRODUCTNAME = "高清会员连续包月";
    //       });
    //     }
    //   });
    // },
    topten() {
      this.dataList = [
        {
          AMOUNT: 1345.5,
          ORDERTIMES: 45,
          PRODUCTNAME: "高清影视会员",
          PRODUCTCODE: "nmghyyby@208",
          ROW_ID: 1,
          USERCOUNT: 45
        },
        {
          AMOUNT: 875,
          ORDERTIMES: 35,
          PRODUCTNAME: "大乐园",
          PRODUCTCODE: "hb0dlyby025@206",
          ROW_ID: 2,
          USERCOUNT: 36
        },
        {
          AMOUNT: 847.45,
          ORDERTIMES: 85,
          PRODUCTNAME: "高清影视会员",
          PRODUCTCODE: "2400023500",
          ROW_ID: 3,
          USERCOUNT: 66
        },
        {
          AMOUNT: 657.8,
          ORDERTIMES: 22,
          PRODUCTNAME: "高清影视会员",
          PRODUCTCODE: "gqVIPsydj@208",
          ROW_ID: 4,
          USERCOUNT: 22
        },
        {
          AMOUNT: 600,
          ORDERTIMES: 24,
          PRODUCTNAME: "百灵K歌",
          PRODUCTCODE: "lutongkgeby025dlrk@201",
          ROW_ID: 5,
          USERCOUNT: 24
        },
        {
          AMOUNT: 460,
          ORDERTIMES: 23,
          PRODUCTNAME: "经典游戏包",
          PRODUCTCODE: "hb0jdyxby020@206",
          ROW_ID: 6,
          USERCOUNT: 22
        },
        {
          AMOUNT: 406,
          ORDERTIMES: 14,
          PRODUCTNAME: "月度电影包",
          PRODUCTCODE: "gdprdt203",
          ROW_ID: 7,
          USERCOUNT: 14
        },
        {
          AMOUNT: 348,
          ORDERTIMES: 12,
          PRODUCTNAME: "沃家教育",
          PRODUCTCODE: "lwjjyby029@201",
          ROW_ID: 8,
          USERCOUNT: 12
        },
        {
          AMOUNT: 348,
          ORDERTIMES: 12,
          PRODUCTNAME: "TV学堂包月29元",
          PRODUCTCODE: "2418003807",
          ROW_ID: 9,
          USERCOUNT: 12
        },
        {
          AMOUNT: 328.9,
          ORDERTIMES: 11,
          PRODUCTNAME: "高清会员连续包月",
          PRODUCTCODE: "gqVIPllxbydkfy@208",
          ROW_ID: 10,
          USERCOUNT: 11
        }
      ];
    }
  },

  mounted() {
    this.topten();
  },

  created() {}
};
</script>
<style lang="less">
.vv {
  box-sizing: border-box;
  color: #fff;
  margin-left: 5.5%;
  margin-top: 2.7%;
}
.shouru {
  display: inline-block;
  width: 20%;
  height: 48%;
  padding-left: 1%;
  // border: 1px solid red;
  h1 {
    margin-left: 10%;
    box-sizing: border-box;
    font-size: 28px;
    margin-top: 14%;
    line-height: 50px;
    letter-spacing: 3px;
    font-weight: 400;
  }
  p {
    margin-top: 5%;
    font-size: 24px;
    letter-spacing: 1px;
    margin-left: 10%;
  }
}
</style>
