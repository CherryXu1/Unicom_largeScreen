<template>
    <div class="rankingList">
        <div class="rankingList_title">
            <span>
                <a :class="titleindex == '10' ? 'active':''" style="color:#fff;">北京</a>
                <a :class="titleindex == '20' ? 'active':''">重庆</a>
                <a :class="titleindex == '30' ? 'active':''">吉林</a>
                <a :class="titleindex == '40' ? 'active':''">山西</a>
            </span>
        </div>
        <div class="listTitle">
            <a></a>
            <span>{{title}}</span>
            <span>{{typeValue=="4" ? "浏览":"收视"}}人数</span>
            <span>{{typeValue=="4" ? "浏览":"收视"}}次数</span>
            <span v-if="typeValue!='4'">收视时长</span>
            <span v-if="typeValue=='1'">收视率</span>
        </div>
        <div class="listBox" :id="id">
            <ul>
                <li v-for="(item, index) in EPGRankingData" :key="index">
                    <a>{{item.ROW_ID}}</a>
                    <!-- 名称 -->
                    <span v-if="typeValue != '4' && typeValue != '2'">{{item.channelname}}</span>
                    <span v-if="typeValue == '2'">{{item.programname}}</span>
                    <span v-if="typeValue == '4'">{{item.pagename}}</span>
                    <!-- 收视人数 -->
                    <span>{{format(item.usercount)}}</span>
                    <!-- 收视次数 -->
                    <span>{{format(item.viewtimes)}}</span>
                    <!-- 收视时长 -->
                    <span v-if="typeValue!='4'">{{format(item.viewduration)}}h</span>
                    <!-- 收视率 -->
                    <span v-if="typeValue=='1'">{{item.rtg}}%</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            titleindex: 10,
        }
    },
    props: ["EPGRankingData","typeValue","title","id","dataLength","num"],
    watch: {
        'num': function(val){
            this.titleindex = val
        }
    },
    mounted(){
        this.$nextTick(function(){
            var box = document.getElementById(this.id);
            var imgWid = box.offsetHeight;//图片宽度
            var list = box.children[0];//要运动的ul
            var timer = null;
            timer = setInterval(function () {
                var leader = list.offsetTop;//当前位置
                var step = -1;
                //我们需要判断盒子运动的位置(什么时候可以抽回)
                if (leader > -(list.offsetHeight - imgWid)) {
                    //没有到达抽回的位置，继续运动
                    leader = leader + step;
                    //将计算后的值设置给top即可
                    list.style.top = leader + "px";
                } else {
                //达到位置，抽回
                //将运动速度放慢后我们发现，当抽回时，由于真假第一张是重合的
                // 会有一个定时器间隔没有图片画面的改变(实际上是换了图片)
                    list.style.top = 0 + "px";
                }
            }, 100);
            /////方法

        })
    },
    methods:{
        format(num) {
            var tag = (num || 0).toString().split(".");
            tag[0] = tag[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return tag.join(".");
        },
    }
}
</script>