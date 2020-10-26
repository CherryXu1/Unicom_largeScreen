//业务总览全国开机数上方四个圆环
<template>
  <div class="loop">
    <div class="shuju">
      <p class="dan" v-for="(item1, ii) in tabMain" :key="ii">
        <span class="name">{{ item1.AREANAME }}</span>
        <span class="number">{{ format(item1.TOTALUSER) }}</span>
        <span class="boot">{{ toPercent(item1.BOOTRATE) }}</span>
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
      tabMain: []
    };
  },

  watch: {},

  methods: {
    // bookings() {
    //   let params = {
    //     qdi: "queryAreaBootUser",
    //     userid: "superman",
    //     token: "HDdt7Zhq5qjWzddDMAni9u1G",
    //     limit: "20",
    //     offset: "0"
    //   };
    //   this.axios({
    //     params,
    //     method: "post"
    //   }).then(res => {
    //     //console.log(123213213)
    //     //console.log(res)
    //     if (res.msg == "success") {
    //       this.tabMain = res.subject.slice(0, 4);
    //       //console.log(this.tabMain)
    //     }
    //   });
    // },
    bookings() {
      this.tabMain = [
        {
          AREACODE: "101",
          AREANAME: "北京",
          BOOTRATE: 0.5717,
          BOOTUSER: 602000,
          TOTALUSER: 1053000
        },
        {
          AREACODE: "104",
          AREANAME: "重庆",
          BOOTRATE: 0.5944,
          BOOTUSER: 491000,
          TOTALUSER: 826000
        },
        {
          AREACODE: "114",
          AREANAME: "吉林",
          BOOTRATE: 0.6382,
          BOOTUSER: 591000,
          TOTALUSER: 926000
        },
        {
          AREACODE: "128",
          AREANAME: "山西",
          BOOTRATE: 0.641,
          BOOTUSER: 650000,
          TOTALUSER: 1014000
        }
      ];
    },
    format(num) {
      var tag = (num || 0).toString().split(".");
      tag[0] = tag[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return tag.join(".");
    },
    toPercent(point) {
      if (point == 0) {
        return 0;
      }
      var str = Number(point * 100).toFixed();
      str += "%";
      return str;
    }
  },

  mounted() {
    this.bookings();
  },

  created() {}
};
</script>
<style lang="less" scoped>
.shuju {
  position: absolute;
  height: 20%;
  // border: 1px solid red;
  left: 42.7%;
  top: 40%;
  width: 16%;
  display: flex;
  flex-flow: column;
  .dan {
    position: relative;
    top: 7.5%;
    color: white;
    font-family: Microsoft YaHei;
    font-weight: 400;
    flex: 1;
    .name {
      font-size: 28px;
      font-style: italic;
      margin-left: 5%;
      display: inline-block;
      width: 85px;
    }
    .number {
      font-size: 27px;
      width: 125px;
      display: inline-block;
      margin-left: 4%;
    }
    .boot {
      font-size: 27px;
      margin-left: 6%;
    }
  }
}
</style>
