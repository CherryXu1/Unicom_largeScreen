<template>
  <div class="businessRatings">
    <times class="date"/>
    <tab/>
    <div class="ratings_left">
      <div class="live_viewing">
        <div class="liveWrappe">
          <!-- zhibo -->
          <rankingList
            :EPGRankingData="liveRatingsData"
            id="listBox1"
            :typeValue="1"
            title="频道名称"
            data-length="7"
            :num="setNum"
          ></rankingList>
        </div>
      </div>
      <div class="lookback">
        <div class="lookbackWrappe">
          <rankingList
            :EPGRankingData="lookBackData"
            id="listBox3"
            :typeValue="3"
            title="频道名称"
            data-length="7"
            :num="setNum"
          ></rankingList>
        </div>
      </div>
    </div>
    <div class="ratings_right">
      <div class="on_demand">
        <div class="demandWrappe">
          <!-- 点播收视排行榜 -->
          <rankingList
            :EPGRankingData="onDemandData"
            id="listBox2"
            :typeValue="2"
            title="节目名称"
            data-length="7"
            :num="setNum"
          ></rankingList>
        </div>
      </div>
      <div class="EPG_ratings">
        <div class="EPGWrappe">
          <!-- EPG收视排行榜 -->
          <rankingList
            :EPGRankingData="EPGRankingData"
            id="listBox4"
            :typeValue="4"
            title="页面名称"
            data-length="7"
            :num="setNum"
          ></rankingList>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import rankingList from "./common/rankingList";
import times from './iptv_yxx/times'
import tab from './iptv_yxx/tab'

export default {
  data() {
    return {
      liveRatingsData: null, // 直播收视top榜
      onDemandData: null, // 点播收视排行榜
      lookBackData: null, // 回看收视排行榜
      EPGRankingData: null, // EPG收视排行榜
      setTimer: 0, // 设置数值累加计时器实现切换页面
      setNum: 10, // 判断计时器的间隔时长
      closeTimeOut: null, // 计时器清除开关
      // areacodeData: [
      //   { areacode: "101", name: "北京" },
      //   { areacode: "104", name: "重庆" },
      //   { areacode: "114", name: "山西" },
      //   { areacode: "128", name: "吉林" }
      // ],
      areacodeData: [
        { areacode: "101", name: "北京" },
        { areacode: "101", name: "重庆" },
        { areacode: "101", name: "吉林" },
        { areacode: "101", name: "山西" }
      ]
    };
  },
  components: { rankingList,times,tab},
  created() {
    // 直播收视top榜
    this.getLiveRating(this.areacodeData[0].areacode);
    // 点播收视情况top榜
    this.getDemandData(this.areacodeData[0].areacode);
    // 回看收视情况top榜
    this.getLookBack(this.areacodeData[0].areacode);
    // EPG收视top榜
    this.getEPGRanking(this.areacodeData[0].areacode);
  },
  mounted() {
    this.setTimes();
    // setTimeout(() => {
    //   this.$router.push("/");
    // }, 60000);
  },
  beforeDestroy() {
    // 当组件销毁清除计时器
    this.closeTimeOut = null;
  },
  watch: {
    setTimer: function(oldValue, newValue) {
      if (newValue - 10 == this.setNum) {
        if (this.setNum / 10 == 4) {
          this.setNum = 10;
          this.setTimer = 10;
        } else {
          this.setNum = newValue;
        }
        // 直播收视top榜
        this.getLiveRating(this.areacodeData[this.setNum / 10 - 1].areacode);
        // // 点播收视情况top榜
        this.getDemandData(this.areacodeData[this.setNum / 10 - 1].areacode);
        // // 回看收视情况top榜
        this.getLookBack(this.areacodeData[this.setNum / 10 - 1].areacode);
        // // EPG收视top榜
        this.getEPGRanking(this.areacodeData[this.setNum / 10 - 1].areacode);
      }
    }
  },
  methods: {
    // 生成随机数
    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    },
    // 设置时间切换器
    setTimes() {
      this.closeTimeOut = setInterval(() => {
        this.setTimer++;
      }, 1000);
    },
    // 直播收视top榜
    getLiveRating(areacode) {
      this.liveRatingsData = []
      // let params = {
      //   qdi: "queryLiveTVTopN",
      //   userid: "superman",
      //   token: "HDdt7Zhq5qjWzddDMAni9u1G",
      //   limit: "20",
      //   offset: "0",
      //   areacode: areacode
      // };
      // this.axios({
      //   params,
      //   method: "post"
      // }).then(data => {
      //   if (data.msg == "success") {
      //     this.liveRatingsData = data.subject;
      //     this.liveRatingsData.forEach(e =>{
      //       e.channelname = e.channelname+this.random(1,9)
      //       e.usercount = this.random(1000,9999)
      //       e.viewtimes = this.random(1000,9999)
      //       e.viewduration = this.random(10000,99999)
      //     })
      //   }
      // });
      setTimeout(() => {
        for(var i = 0;i<25;i++){
          let obj={
            channelname: 'cctv-2'+this.random(1,9)+this.random(1,9),
            usercount: this.random(1000,9999),
            viewtimes: this.random(1000,9999),
            viewduration: this.random(10000,99999),
            ROW_ID: 1+i,
            rtg: this.random(10,99)
          }
          this.liveRatingsData.push(obj)
        }
      }, 500);
      
    },
    // 点播收视排行榜
    getDemandData(areacode) {
      this.onDemandData = []
      // let params = {
      //   qdi: "queryVodTopN",
      //   userid: "superman",
      //   token: "HDdt7Zhq5qjWzddDMAni9u1G",
      //   limit: "20",
      //   offset: "0",
      //   areacode: areacode
      // };
      // this.axios({
      //   params,
      //   method: "post"
      // }).then(data => {
        
      //   if (data.msg == "success") {
      //     this.onDemandData = data.subject;
      //     this.onDemandData.forEach(e => {
      //       e.programname = e.programname + this.random(1,9)
      //       e.usercount = this.random(1000,9999)
      //       e.viewtimes = this.random(1000,9999)
      //       e.viewduration = this.random(1000,9999)
      //     })
      //   }
      // });
      setTimeout(() => {
        for(var i = 0; i<26;i++){
          let obj = {
            programname: '节目'+this.random(100,199)+''+this.random(1,9),
            usercount: this.random(1000,9999),
            viewtimes: this.random(1000,9999),
            ROW_ID: 1+i,
            viewduration: this.random(1000,9999)
          }
          this.onDemandData.push(obj)
        }
      }, 500);
      
    },
    // 回看收视排行榜
    getLookBack(areacode) {
      this.lookBackData = []
      // let params = {
      //   qdi: "queryTvodTopN",
      //   userid: "superman",
      //   token: "HDdt7Zhq5qjWzddDMAni9u1G",
      //   limit: "20",
      //   offset: "0",
      //   areacode: areacode
      //   // stbmodel: '0'
      // };
      // this.axios({
      //   params,
      //   method: "post"
      // }).then(data => {
      //   if (data.msg == "success") {
      //     this.lookBackData = data.subject;
      //     this.lookBackData.forEach(e=> {
      //       e.channelname = e.channelname + this.random(0,9)
      //       e.usercount = this.random(1000,9999)
      //       e.viewtimes = this.random(1111,9999)
      //       e.viewduration = this.random(11111,99999)+'.'+this.random(1,99)
      //     })
      //   }
      // });
      setTimeout(() => {
        for(var i=0; i< 25;i++){
          let obj = {
            channelname: 'CCTV-1'+this.random(100,999),
            usercount: this.random(1000,9999),
            viewtimes: this.random(1111,9999),
            ROW_ID: 1+i,
            viewduration: this.random(11111,99999)+'.'+this.random(1,99)
          }
          this.lookBackData.push(obj)
        }
      }, 500);
      
    },
    // EPG收视排行榜
    getEPGRanking(areacode) {
      this.EPGRankingData = []
      // let params = {
      //   qdi: "queryEpgTopN",
      //   userid: "superman",
      //   token: "HDdt7Zhq5qjWzddDMAni9u1G",
      //   limit: "20",
      //   offset: "0",
      //   areacode: areacode
      //   // stbmodel: '0'
      // };
      // this.axios({
      //   params,
      //   method: "post"
      // }).then(data => {
      //   if (data.msg == "success") {
      //     this.EPGRankingData = data.subject;
      //     this.EPGRankingData.forEach(e=> {
      //       e.usercount = this.random(1000,9999)
      //       e.viewtimes = this.random(1000,9999)
      //     })
      //   }
      // });
      setTimeout(() => {
        for(var i =0;i<24;i++){
          let obj = {
            pagename: 'epg'+(1+i),
            ROW_ID: 1+i,
            usercount: this.random(1000,9999),
            viewtimes: this.random(1000,9999)
          }
          this.EPGRankingData.push(obj)
        }
      }, 500);
    }
  }
};
</script>