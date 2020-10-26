<template>
    <div class="business">
        <times class="date"/>
        <tab/>
        <div class="business_left">
            <div class="MOS">
                <div class="MOS_box">
                    <div class="MOS_title">
                        <span>
                            <a class="MOS_size " :class="MOSType == 1 ? 'active' : ''">直播</a>
                            <a class="MOS_size" :class="MOSType != 1 ? 'active' : ''">点播</a>
                        </span>
                    </div>
                    <ul class="progressbox">
                        <li v-for="(item, index) in MOSData" :key="index">
                            <label class="progressTitle" v-show="item.VIEWTYPE == MOSType">{{item.PROVINCENAME}}</label>
                            <span v-show="item.VIEWTYPE == MOSType" >
                                <small :style="{width:item.AVGMOS/5*100+'%'}"><i>{{item.AVGMOS}}</i></small>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="uccessRate">
                <div class="uccessRateBox">
                    <div id="uccessRateChart"  class="uccessRateChart"></div>
                    <div class="uccessCont">
                        <div class="RateChart">
                            <div class="RateChartcolor" style="background: #0ccffb;"></div>
                            <div class="RateChartBox">
                                <span >{{unicast*100}}%</span>
                                <span style="color: #0ccffb;">单播</span>
                            </div>
                        </div>
                        <div class="RateChart">
                            <div class="RateChartcolor" style="background: #0964e1;"></div>
                            <div class="RateChartBox">
                                <span>{{multicast*100}}%</span>
                                <span style="color: #0964e1;">组播</span>
                            </div>
                        </div>
                        <div class="RateChart">
                            <div class="RateChartcolor" style="background: #f25f5c;"></div>
                            <div class="RateChartBox">
                                <span>{{EPG*100}}%</span>
                                <span style="color: #f25f5c;">EPG</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="business_center">
            <div class="proportion_types">
                <div class="proportionBox">
                    <div class="proportion_title">
                        <span>
                            <a :class="setNum == 10 ? 'active' : ''">全国</a>
                            <a :class="setNum == 20 ? 'active' : ''">北京</a>
                            <a :class="setNum == 30 ? 'active' : ''">重庆</a>
                            <a :class="setNum == 40 ? 'active' : ''">吉林</a>
                            <a :class="setNum == 50 ? 'active' : ''">山西</a>
                        </span>
                    </div>
                    <div class="second_title">
                        <span>
                            <a :class="MOSType == 1 ? 'active':''">直播频道</a>
                            <a :class="MOSType != 1 ? 'active':''">点播节目</a>
                        </span>
                    </div>
                    <div class="typesEchartstyl">
                        <img class="typesEchartBg" src="../assets/img/businessQualityrd.png">
                        <div id="typesEchart" class="typesEchart"></div>
                    </div>
                </div>
            </div>
            <div class="request">
                <div class="requestTitle">
                    <span>
                        <a :class="accessNumber == 10 ? 'active':''">EPG</a>
                        <a :class="accessNumber == 20 ? 'active':''">单播</a>
                        <a :class="accessNumber == 30 ? 'active':''">组播</a>
                    </span>
                </div>
                <div id="requestDelay" class="requestDelay">

                </div>
            </div>
        </div>
        <div class="business_right">
            <div class="userAnalysis">
                <!-- <div class="userTitle">
                    <span><a></a>次数</span>
                    <span><a></a>人数</span>
                </div> -->
                <div id="userEchart" class="userEchart"></div>
            </div>
            <div class="CDN_hitRate">
                <div id="hitRateEcharts" class="hitRateEcharts"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {EleResize} from '../assets/js/esresize' // 引入封装的地图放大缩小js
import times from './iptv_yxx/times'
import tab from './iptv_yxx/tab'

export default {
    components: {times,tab},
    data() {
        return {
            MOSData: null, // MOS数据容器
            MOSType: 1, // 类型：1为直播  2为点播
            InservQuality: null,
            DefinitionData: null, // 节目类型占比数据
            unicast: 0, // 单播成功率
            multicast: 0, // 组播成功率
            EPG: 0, // EPG成功率
            requestDelayData: null, // 请求延时均值
            cdnQualityData: null, // 质差用户分析数据与各省CDN命中率
            setTimer: 10, // 设置数值累加计时器实现切换页面
            setNum: 10, // 判断计时器的间隔时长
            closeTimeOut: null, // 计时器清除开关
            accessTimer: 10, // 请求延时均值切换控制器
            accessNumber: 10, // 请求延时均值计时器的间隔时长
            areacodeData: [
                {areacode: '999', name: '全国'},
                {areacode: '101', name: '北京'},
                {areacode: '104', name: '重庆'},
                {areacode: '114', name: '山西'},
                {areacode: '128', name: '吉林'},
            ],
            closeTimeOutes: null,
            
            
        }
    },
    watch: {
        // 监听计时器变化
        'setTimer':function(newValue,oldValue){
            if(newValue%5==0){
                if(this.MOSType == 1){
                    this.MOSType = 2
                }else{
                    this.MOSType = 1
                }
                if(newValue-10 == this.setNum){
                    if(this.setNum/10 == 5){
                        this.setNum = 10
                        this.setTimer = 10
                    }else{
                        this.setNum = newValue
                    }
                    
                }
                this.getTypes(this.areacodeData[this.setNum/10-1].areacode)
            }
        },
        'accessTimer':function(newValue,oldValue){
            if(newValue-10 == this.accessNumber){
                if(this.accessNumber/10 == 3){
                    this.accessNumber = 10
                    this.accessTimer = 10
                }else{
                    this.accessNumber = newValue
                }
                this.getRequestDelay()
                
            }
        }
    },
    beforeDestroy() {
        // 当组件销毁清除计时器
        this.closeTimeOut = null
        this.closeTimeOutes = null
    },
    created() {
        // 请求MOS值数据
        // this.getMos()
        // this.getUccessRateChart()
        // 获取节目类型占比数据
        // this.getTypes(this.areacodeData[0].areacode)
        // 获取质差用户分析数据
        // this.getCdnQuality()
        // this.getRequestDelay()
        // this.getUserEchart()
        // 获取质差用户数据
        // this.getqueryMosWeak()
        // this.getHitRateEcharts()
    },
    mounted () {
        this.setTimes()
        this.setTimeses()
    //      setTimeout(()=>{
    //   this.$router.push("/businessRatings")
    // },60000)
        this.getMos()
        this.getUccessRateChart()
        // 获取节目类型占比数据
        this.getTypes(this.areacodeData[0].areacode)
        // 获取质差用户分析数据
        this.getCdnQuality()
        this.getRequestDelay()
        // this.getUserEchart()
        // 获取质差用户数据
        this.getqueryMosWeak()
    },
    methods: {
        // 生成随机数
        random(lower, upper) {
            return Math.floor(Math.random() * (upper - lower)) + lower;
        },
        // 设置时间切换器
        setTimes(){
            this.closeTimeOut = setInterval(() => {
                this.setTimer++ 
            }, 2000);
        },
        setTimeses(){
            this.closeTimeOutes = setInterval(() => {
                this.accessTimer++
            }, 1000);
        },
        // 请求MOS值
        getMos(){
            // let params = {
            //     qdi: 'queryAreaMos',
            //     userid: 'superman',
            //     token: 'HDdt7Zhq5qjWzddDMAni9u1G',
            //     limit: '20',
            //     offset: '0'  
            // }
            // this.axios({
            //     params,
            //     method: "post"
            // }).then(data => {
            //     if(data.msg == "success"){
            //         // this.MOSData = data.subject
            //         let mosData = [
            //             {
            //                 AVGMOS: 3,
            //                 PROVINCECODE: "128",
            //                 PROVINCENAME: "山西",
            //                 ROW_ID: 2,
            //                 VIEWTYPE: "1",
            //                 WEAKCOUNT: 2763501,
            //                 WEAKUSER: 1658101,
            //             },
            //             {
            //                 AVGMOS: 4.5,
            //                 PROVINCECODE: "128",
            //                 PROVINCENAME: "北京",
            //                 ROW_ID: 2,
            //                 VIEWTYPE: "1",
            //                 WEAKCOUNT: 2763501,
            //                 WEAKUSER: 1658101,
            //             },
            //             {
            //                 AVGMOS: 3,
            //                 PROVINCECODE: "128",
            //                 PROVINCENAME: "吉林",
            //                 ROW_ID: 2,
            //                 VIEWTYPE: "1",
            //                 WEAKCOUNT: 2763501,
            //                 WEAKUSER: 1658101,
            //             },
            //             {
            //                 AVGMOS: 1.8,
            //                 PROVINCECODE: "128",
            //                 PROVINCENAME: "重庆",
            //                 ROW_ID: 2,
            //                 VIEWTYPE: "1",
            //                 WEAKCOUNT: 2763501,
            //                 WEAKUSER: 1658101,
            //             },
            //             {
            //                 VIEWTYPE: "2",
            //                 WEAKUSER: 981480,
            //                 PROVINCECODE: "114",
            //                 PROVINCENAME: "吉林",
            //                 AVGMOS: 2.5,
            //                 ROW_ID: 1,
            //                 WEAKCOUNT: 1635800,
            //             },
            //             {
            //                 VIEWTYPE: "2",
            //                 WEAKUSER: 1658101,
            //                 PROVINCECODE: "128",
            //                 PROVINCENAME: "山西",
            //                 AVGMOS: 3.7,
            //                 ROW_ID: 3,
            //                 WEAKCOUNT: 2763501,
            //             },
            //             {
            //                 VIEWTYPE: "2",
            //                 WEAKUSER: 1658101,
            //                 PROVINCECODE: "128",
            //                 PROVINCENAME: "北京",
            //                 AVGMOS: 1.5,
            //                 ROW_ID: 3,
            //                 WEAKCOUNT: 2763501,
            //             },
            //             {
            //                 VIEWTYPE: "2",
            //                 WEAKUSER: 1658101,
            //                 PROVINCECODE: "128",
            //                 PROVINCENAME: "重庆",
            //                 AVGMOS: 2.3,
            //                 ROW_ID: 3,
            //                 WEAKCOUNT: 2763501,
            //             }
            //         ]
            //         this.MOSData = mosData
            //     }
            // })
            let mosData = [
                {
                    AVGMOS: 3,
                    PROVINCECODE: "128",
                    PROVINCENAME: "山西",
                    ROW_ID: 2,
                    VIEWTYPE: "1",
                    WEAKCOUNT: 2763501,
                    WEAKUSER: 1658101,
                },
                {
                    AVGMOS: 4.5,
                    PROVINCECODE: "128",
                    PROVINCENAME: "北京",
                    ROW_ID: 2,
                    VIEWTYPE: "1",
                    WEAKCOUNT: 2763501,
                    WEAKUSER: 1658101,
                },
                {
                    AVGMOS: 3,
                    PROVINCECODE: "128",
                    PROVINCENAME: "吉林",
                    ROW_ID: 2,
                    VIEWTYPE: "1",
                    WEAKCOUNT: 2763501,
                    WEAKUSER: 1658101,
                },
                {
                    AVGMOS: 1.8,
                    PROVINCECODE: "128",
                    PROVINCENAME: "重庆",
                    ROW_ID: 2,
                    VIEWTYPE: "1",
                    WEAKCOUNT: 2763501,
                    WEAKUSER: 1658101,
                },
                {
                    VIEWTYPE: "2",
                    WEAKUSER: 981480,
                    PROVINCECODE: "114",
                    PROVINCENAME: "吉林",
                    AVGMOS: 2.5,
                    ROW_ID: 1,
                    WEAKCOUNT: 1635800,
                },
                {
                    VIEWTYPE: "2",
                    WEAKUSER: 1658101,
                    PROVINCECODE: "128",
                    PROVINCENAME: "山西",
                    AVGMOS: 3.7,
                    ROW_ID: 3,
                    WEAKCOUNT: 2763501,
                },
                {
                    VIEWTYPE: "2",
                    WEAKUSER: 1658101,
                    PROVINCECODE: "128",
                    PROVINCENAME: "北京",
                    AVGMOS: 1.5,
                    ROW_ID: 3,
                    WEAKCOUNT: 2763501,
                },
                {
                    VIEWTYPE: "2",
                    WEAKUSER: 1658101,
                    PROVINCECODE: "128",
                    PROVINCENAME: "重庆",
                    AVGMOS: 2.3,
                    ROW_ID: 3,
                    WEAKCOUNT: 2763501,
                }
            ]
            this.MOSData = mosData
        },
        // EPG请求成功率
        getUccessRateChart(){
            let _that = this
            // let params = {
            //     qdi: 'queryInservSuccRate',
            //     userid: 'superman',
            //     token: 'HDdt7Zhq5qjWzddDMAni9u1G',
            //     limit: '20',
            //     offset: '0'  
            // }
            // this.axios({
            //     params,
            //     method: "post"
            // }).then(data => {
            //     if(data.msg == "success"){
            //         this.InservQuality = data.subject
            //         _that.setUccessRateChart()
            //     }
            // })
            this.InservQuality = [
                {
                    "MONTHDAY": "2020-04-04",
                    "NETTYPE": "1",
                    "REQSUCC": 1851,
                    "REQTOTAL": 2221,
                    "ROW_ID": 1,
                    "SUCCRATE": 0.83
                },
                {
                    "MONTHDAY": "2020-04-04",
                    "NETTYPE": "2",
                    "REQSUCC": 2129,
                    "REQTOTAL": 2209,
                    "ROW_ID": 2,
                    "SUCCRATE": 0.96
                },
                {
                    "MONTHDAY": "2020-04-04",
                    "NETTYPE": "3",
                    "REQSUCC": 14839,
                    "REQTOTAL": 14879,
                    "ROW_ID": 3,
                    "SUCCRATE": 0.99
                }
            ]
            _that.setUccessRateChart()
        },
        // 渲染成功率
        setUccessRateChart(){
            this.unicast = this.InservQuality[0].SUCCRATE // 单播成功率
            this.multicast = this.InservQuality[1].SUCCRATE // 组播成功率
            this.EPG = this.InservQuality[2].SUCCRATE // EPG成功率
            let uccessRateChart = this.$echarts.init(document.querySelector('#uccessRateChart'));
            let uccessRateCharts = document.getElementById('uccessRateChart')
            var dataStyle= {
                normal: {
                    label: {
                        show: false
                    },
                    clockWise: false, //顺时针
                    labelLine: {
                        show: false
                    },
                    // shadowBlur:40,
                    borderWidth: 10,
                    // shadowColor:"rgba(0,0,0)"
                }
            }
            var color= ["#12cefe", "#0966e6",'#f65d5a']
            var placeHolderStyle= {
                normal: { //正常
                    color: '#2c3c58',
                    opacity: .7,
                    label: {
                        show: true
                    },
                    labelLine: {
                        show: true
                    }
                },
                emphasis: { //高亮样式
                    color: "#393d50"
                },
            }
            var pie_update= 1000
            // var data=[
            //     { value: '30%', name: '省台' },
            //     { value: '20%', name: '时移' },
            //     { value: '10%', name: '回看' }
                
            // ]
            var option= {
                graphic:{       //图形中间文字
                    type:"text",
                    left:"center",
                    top:"center",
                    style:{
                        text: '成功率',
                        textAlign:"center",
                        fill:"#fff",
                        fontSize:this.$notsize(16)
                    }
                },

                series: [
                {
                    name: 'Line1',
                    type: 'pie',
                    clockWise: true,
                    radius: ['75%', '85%'],
                    animationDuration: 2800,
                    itemStyle: dataStyle,
                    hoverAnimation: false,
                    startAngle: 90,
                    //start: 90,
                    data: [{
                        value: this.InservQuality[0].REQTOTAL,
                        // name: '20%时移',
                        itemStyle: {
                            normal: {
                                color: color[0],
                            }
                        }
                    }, {
                        value: this.InservQuality[0].REQTOTAL - this.InservQuality[0].REQSUCC,
                        name: '',
                        itemStyle: placeHolderStyle
                    }],
                    animationDurationUpdate: pie_update
                }, //series[1]
                {
                    name: 'Line2',
                    type: 'pie',
                    clockWise: false,
                    radius: ['55%', '65%'],
                    animationDuration: 2800,
                    clockWise: true, //饼图的扇区是否是顺时针排布。
                    // center: ['50%', '56%'],
                    itemStyle: dataStyle,
                    hoverAnimation: false,
                    // startAngle: 90,
                    //startAngle: 90,
                    data: [{
                        value: this.InservQuality[1].REQTOTAL,
                        itemStyle: {
                            normal: {
                                color: color[1]
                            }
                        }
                    }, {
                        value: this.InservQuality[1].REQTOTAL - this.InservQuality[1].REQSUCC,
                        
                        itemStyle: placeHolderStyle
                    }],
                    animationDurationUpdate: pie_update
                }, 
                {
                    name: 'Line3',
                    type: 'pie',
                    clockWise: false, //饼图的扇区是否是顺时针排布。
                    radius: ['35%', '45%'],
                    animationDuration: 2800,
                    // center: ['50%', '56%'],
                    itemStyle: dataStyle,
                    hoverAnimation: false,
                    // startAngle: 90,
                    data: [{
                        value: this.InservQuality[2].REQTOTAL,
                        itemStyle: {
                            normal: {
                                color: color[2]
                            }
                        }
                    }, {
                        value: this.InservQuality[2].REQTOTAL - this.InservQuality[2].REQSUCC,
                        itemStyle: placeHolderStyle
                    }],
                    animationDurationUpdate: pie_update
                },
                ] 
            }
            uccessRateChart.setOption(option)
            let listener = function() {
                uccessRateChart.resize()
            }
            EleResize.on(uccessRateCharts,listener)
        },
        
        
        // 获取节目类型占比数据
        getTypes(areacode){
            let _that = this
            // let params = {
            //     qdi: 'queryContentDefinition',
            //     userid: 'superman',
            //     token: 'HDdt7Zhq5qjWzddDMAni9u1G',
            //     limit: '20',
            //     offset: '0',
            //     areacode: areacode,
            //     contenttype: this.MOSType 
            // }
            // this.axios({
            //     params,
            //     method: "post"
            // }).then(data => {
            //     if(data.msg == "success"){
            //         this.DefinitionData = data.subject
            //         if(this.MOSType == 1){
            //             this.DefinitionData = [
            //                 {
            //                     K4COUNT: this.random(1,10),
            //                     CONTENTTYPE: "1",
            //                     SDCOUNT: this.random(1,10),
            //                     HDCOUNT: this.random(1,10)
            //                 }
            //             ]
            //         }else{
            //             this.DefinitionData = [
            //                 {
            //                     K4COUNT: this.random(1,10),
            //                     CONTENTTYPE: "2",
            //                     SDCOUNT: this.random(1,10),
            //                     HDCOUNT: this.random(1,10)
            //                 }
            //             ]
            //         }
            //         _that.setTypesEchart()
            //     }
            // })
            if(this.MOSType == 1){
                this.DefinitionData = [
                    {
                        K4COUNT: this.random(5,10),
                        CONTENTTYPE: "1",
                        SDCOUNT: this.random(5,10),
                        HDCOUNT: this.random(5,10),
                        OTHER: this.random(3,5)
                    }
                ]
            }else{
                this.DefinitionData = [
                    {
                        K4COUNT: this.random(1,10),
                        CONTENTTYPE: "2",
                        SDCOUNT: this.random(1,10),
                        HDCOUNT: this.random(1,10),
                        OTHER: this.random(1,10)
                    }
                ]
            }
            _that.setTypesEchart()
        },
        // 节目类型占比渲染
        setTypesEchart() {
            let typesEchart = this.$echarts.init(document.querySelector('#typesEchart'));
            let typesEcharts = document.getElementById('typesEchart')
            let datas = null
            for(var i = 0; i < this.DefinitionData.length; i++){
                if(this.DefinitionData[i].CONTENTTYPE == String(this.MOSType)){
                    datas = [
                        {value: this.DefinitionData[i].K4COUNT, name: '4k'},
                        {value: this.DefinitionData[i].SDCOUNT, name: '标清'},
                        {value: this.DefinitionData[i].HDCOUNT, name: '超清'},
                        {value: this.DefinitionData[i].OTHER, name: '其它'}
                    ]
                }
            }
            let option = {
                tooltip: {
                    show: false,
                },
                color:['#0fccff', '#f35c5f','#0465e9','#24ea91'],
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%','50%'],
                        hoverAnimation:false,
                        label: {
                            formatter: '{d}%\n {a|{b}}   ',
                            borderWidth: 1,
                            borderRadius: 4,
                            fontSize:this.$notsize(18),
                            rich: {
                                a: {
                                    color: '#fff',
                                    lineHeight: 22,
                                    align: 'left',
                                    fontSize:this.$notsize(16),
                                },
                                b: {
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#eee',
                                    
                                    backgroundColor: '#334455',
                                    borderRadius: 2
                                }
                            }
                        },
                        data: datas
                        
                    }
                ]
            }
            typesEchart.setOption(option)
            let listener = function() {
                typesEchart.resize()
            }
            EleResize.on(typesEcharts,listener)
        },
        // 获取请求延时均值
        getRequestDelay(){
            let _that = this
            // let params = {
            //     qdi: 'queryInservTimeDelay',
            //     userid: 'superman',
            //     token: 'HDdt7Zhq5qjWzddDMAni9u1G',
            //     limit: '20',
            //     offset: '0',
            //     nettype: this.accessNumber/10
            // } 
            // this.axios({
            //     params,
            //     method: "post"
            // }).then(data => {
            //     // console.log(data)
            //     if(data.msg == "success"){
            //         // this.requestDelayData = data.subject
            //         // 添加得虚拟数据
            //         let arrList = []
            //         for(var i = 1; i<8; i++){
            //             let obj = {
            //                 CONNTYPE: "LAN",
            //                 MONTHDAY: "04-0"+i,
            //                 ROW_ID: i,
            //                 TIMEDELAY: this.random(1,9),
            //             }
            //             arrList.push(obj)
            //         }
            //         for(var i = 1; i<8; i++){
            //             let obj = {
            //                 CONNTYPE: "WiFi",
            //                 MONTHDAY: "2020-04-0"+i,
            //                 ROW_ID: i,
            //                 TIMEDELAY: this.random(1,9),
            //             }
            //             arrList.push(obj)
            //         }
            //         this.requestDelayData = arrList
            //         _that.setRequestDelay()

            //     }
            // })
            let arrList = []
            for(var i = 1; i<8; i++){
                let obj = {
                    CONNTYPE: "LAN",
                    MONTHDAY: "04-0"+i,
                    ROW_ID: i,
                    TIMEDELAY: this.random(10,15),
                }
                arrList.push(obj)
            }
            for(var i = 1; i<8; i++){
                let obj = {
                    CONNTYPE: "WiFi",
                    MONTHDAY: "2020-04-0"+i,
                    ROW_ID: i,
                    TIMEDELAY: this.random(5,9),
                }
                arrList.push(obj)
            }
            this.requestDelayData = arrList
            _that.setRequestDelay()
        },
        // 渲染请求延时均值s
        setRequestDelay(){
            let requestDelay = this.$echarts.init(document.querySelector('#requestDelay'));
            let requestDelays = document.getElementById('requestDelay')
            let xAxisData = [] // x坐标参数
            let WiredData = [] // wifi 数据
            let wifiData = [] // 有线数据
            this.requestDelayData.forEach((e,i) => {
                if(e.CONNTYPE == 'LAN'){
                    xAxisData.push(e.MONTHDAY)
                    WiredData.push(e.TIMEDELAY)
                }else if(e.CONNTYPE == 'WiFi'){
                    wifiData.push(e.TIMEDELAY)
                }
            })
            let option = {
                grid: {
                    top: '15%',
                    left: '6%',
                    right: '10%',
                    bottom: '10%',
                    containLabel: true
                },
                legend: {
                    data: ['wifi', '有线'],
                    right: 50,
                    textStyle: {
                        // fontSize: 15,
                        // fontWeight: "400",
                        color: "rgba(255,255,255,1)"
                    },
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine:{
                        lineStyle:{
                            color:'#223C90',
                            // width:8,//这里是为了突出显示加上的
                        }
                    },
                    axisLabel: {
                        textStyle:{
                            color:'#20d8d3',  //坐标的字体颜色
                        },
                    }, 
                    data: xAxisData
                    // data: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7']
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '单位: 毫秒（ms）',
                        nameTextStyle: {
                            color: '#20d8d3', // 设置单位颜色
                            padding: [0, 0, 0, 80]    // 四个数字分别为上右下左与原位置距离
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color: ['#223C90'],
                                width: 1,
                                type: 'solid'
                            }
                    　　},
                        axisLine:{
                            lineStyle:{
                                color:'#223C90',
                                // width:8,//这里是为了突出显示加上的
                            }
                        },
                        axisLabel: {
                            textStyle:{
                                color:'#20d8d3',  //坐标的字体颜色
                            },
                        }, 
                    },
                    {
                        axisLine:{
                            lineStyle:{
                                color:'#223C90', // 右边封口线
                            }
                        },
                    }
                ],
                series: [
                    {
                        name: 'wifi',
                        type: 'line',
                        // smooth: true, //是否弧线
                        data: wifiData,
                        itemStyle: {
                            normal: {
                                color: '#2EF398',
                                borderColor: 'rgba(219,50,51,0.2)',
                                // borderWidth: 5

                            }
                        },
                    },
                    {
                        name: '有线',
                        type: 'line',
                        // smooth: true, //是否弧线
                        data: WiredData,
                        itemStyle: {
                            normal: {
                                color: '#078EFF',
                                borderColor: 'rgba(219,50,51,0.2)',
                                // borderWidth: 5

                            }
                        },
                    },
                ]
            }
            requestDelay.setOption(option)
            let listener = function() {
                requestDelay.resize()
            }
            EleResize.on(requestDelays,listener)
        },
        // 获取质差用户
        getqueryMosWeak(){
            // let params = {
            //     qdi: 'queryMosWeak',
            //     userid: 'superman',
            //     token: 'HDdt7Zhq5qjWzddDMAni9u1G',
            //     limit: '20',
            //     offset: '0'
            // }
            // this.axios({
            //     params,
            //     method: "post"
            // }).then(data=> {
            //     // console.log(data)
            //     if(data.msg == "success"){
            //         let mosWeakData = data.subject
            //         let obj = {
            //             PROVINCECODE: "101",
            //             PROVINCENAME: "重庆",
            //             ROW_ID: 1,
            //             WEAKCOUNT: 614966,
            //             WEAKUSER: 340980,
            //         }
            //         mosWeakData.push(obj)
            //         this.setUserEchart(mosWeakData)
            //     }
            // })
            
            let mosWeakData = [
                {
                    PROVINCECODE: "101",
                    PROVINCENAME: "北京",
                    ROW_ID: 1,
                    WEAKCOUNT: this.random(10000,500000),
                    WEAKUSER: this.random(100000,500000),
                },
                {
                    PROVINCECODE: "101",
                    PROVINCENAME: "重庆",
                    ROW_ID: 1,
                    WEAKCOUNT: this.random(10000,500000),
                    WEAKUSER: this.random(100000,500000),
                },
                {
                    PROVINCECODE: "101",
                    PROVINCENAME: "吉林",
                    ROW_ID: 1,
                    WEAKCOUNT: this.random(10000,500000),
                    WEAKUSER: this.random(100000,500000),
                },
                {
                    PROVINCECODE: "101",
                    PROVINCENAME: "山西",
                    ROW_ID: 1,
                    WEAKCOUNT: this.random(100000,500000),
                    WEAKUSER: this.random(100000,500000),
                }
            ]
            this.setUserEchart(mosWeakData)
        },
        // 获取各省命中率数据
        getCdnQuality(){
            let _that = this
            // let params = {
            //     qdi: 'queryCdnQuality',
            //     userid: 'superman',
            //     token: 'HDdt7Zhq5qjWzddDMAni9u1G',
            //     limit: '20',
            //     offset: '0'
            // }
            // this.axios({
            //     params,
            //     method: "post"
            // }).then(data => {
            //     // console.log(data)
            //     if(data.msg == "success"){
            //         this.cdnQualityData = data.subject
            //         this.cdnQualityData = [
            //             {
            //                 AREACODE: "125",
            //                 AREANAME: "山西",
            //                 HITNUM: 400,
            //                 HITRATE: 12,
            //                 HITSERVICE: 4000,
            //                 ROW_ID: 1
            //             },
            //             {
            //                 AREACODE: "125",
            //                 AREANAME: "吉林",
            //                 HITNUM: 400,
            //                 HITRATE: 8,
            //                 HITSERVICE: 4000,
            //                 ROW_ID: 1
            //             },
            //             {
            //                 AREACODE: "125",
            //                 AREANAME: "重庆",
            //                 HITNUM: 400,
            //                 HITRATE: 25,
            //                 HITSERVICE: 4000,
            //                 ROW_ID: 1
            //             },
            //             {
            //                 AREACODE: "125",
            //                 AREANAME: "北京",
            //                 HITNUM: 400,
            //                 HITRATE: 40,
            //                 HITSERVICE: 4000,
            //                 ROW_ID: 1
            //             }
            //         ]
            //         _that.setHitRateEcharts()
            //     }
            // })
            this.cdnQualityData = [
                {
                    AREACODE: "125",
                    AREANAME: "山西",
                    HITNUM: 400,
                    HITRATE: 12,
                    HITSERVICE: 4000,
                    ROW_ID: 1
                },
                {
                    AREACODE: "125",
                    AREANAME: "吉林",
                    HITNUM: 400,
                    HITRATE: 8,
                    HITSERVICE: 4000,
                    ROW_ID: 1
                },
                {
                    AREACODE: "125",
                    AREANAME: "重庆",
                    HITNUM: 400,
                    HITRATE: 25,
                    HITSERVICE: 4000,
                    ROW_ID: 1
                },
                {
                    AREACODE: "125",
                    AREANAME: "北京",
                    HITNUM: 400,
                    HITRATE: 40,
                    HITSERVICE: 4000,
                    ROW_ID: 1
                }
            ]
            _that.setHitRateEcharts()
        },
        // 渲染质差用户分析
        setUserEchart(mosWeakData){
            let userEchart = this.$echarts.init(document.querySelector('#userEchart'));
            let userEcharts = document.getElementById('userEchart')
            let yAxisData = [] // Y轴数据
            let frequency = [] // 次数
            let peopleNum = [] // 人数
            mosWeakData.forEach(e => {
                yAxisData.push(e.PROVINCENAME)
                frequency.push(e.WEAKCOUNT/1000)
                peopleNum.push(e.WEAKUSER/1000)
            })
            let option = {
                grid: {
                    top: '27%',
                    // left: '4%',
                    // right: '5%',
                    bottom: '1%',
                    containLabel: true
                },
                legend: {
                    data: ['次数', '人数'],
                    // align: "right",
                    right: 20,
                    textStyle: {
                        fontSize: this.$notsize(16),
                        // fontWeight: "400",
                        color: "rgba(255,255,255,1)"
                    }
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel: {
                        textStyle:{
                            color:'#30c3cb',  //坐标的字体颜色
                        },
                    }, 
                    axisLine:{
                        lineStyle:{
                            color:'#223C90',
                            // width:8,//这里是为了突出显示加上的
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: ['#223C90'],
                            width: 1,
                            type: 'solid'
                        }
                　　},
                },
                yAxis: {
                    type: 'category',
                    name: '单位: 万',
                    nameTextStyle: {
                        color: '#20d8d3', // 设置单位颜色
                        align: 'left',
                        fontSize:this.$notsize(16),
                        padding: [0, 0, 0, 240]    // 四个数字分别为上右下左与原位置距离
                    },
                    axisLabel: {
                        textStyle:{
                            color:'#fff',  //坐标的字体颜色
                        },
                    }, 
                    axisLine:{
                        lineStyle:{
                            color:'#223C90',
                            // width:8,//这里是为了突出显示加上的
                        }
                    },
                    data: yAxisData
                },
                series: [
                    {
                        name: '次数',
                        type: 'bar',
                        barWidth:12,
                        data: frequency,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#0038ff'
                                }, {
                                    offset: 1,
                                    color: '#00b5ff'
                                }]),
                            }
                        },

                    },
                    {
                        name: '人数',
                        type: 'bar',
                        barWidth:12,
                        data: peopleNum,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#00938f'
                                }, {
                                    offset: 1,
                                    color: '#2dff92'
                                }]),
                            }
                        },
                    }
                ]
            }
            userEchart.setOption(option)
            let listener = function() {
                userEchart.resize()
            }
            EleResize.on(userEcharts,listener)
        },
        // 获取各省命中率
        setHitRateEcharts(){
            let hitRateEcharts = this.$echarts.init(document.querySelector('#hitRateEcharts'));
            let hitRateEchartses = document.getElementById('hitRateEcharts')
            let yAxisData = [] // Y轴数据
            let hitRate = [] // 次数
            // let peopleNum = [] // 人数
            this.cdnQualityData.forEach(e => {
                yAxisData.push(e.AREANAME)
                hitRate.push(e.HITRATE)
                // peopleNum.push(e.HITSERVICE)
            })
            let option = {
                grid: {
                    top: '23%',
                    left: '4%',
                    right: '5%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel: {
                        formatter: '{value} %',  
                        textStyle:{
                            color:'#30c3cb',  //坐标的字体颜色
                        },
                    }, 
                    axisLine:{
                        lineStyle:{
                            color:'#223C90',
                            // width:8,//这里是为了突出显示加上的
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: ['#223C90'],
                            width: 1,
                            type: 'solid'
                        }
                　　},
                },
                yAxis: {
                    type: 'category',
                    // name: '单位: 百分比',
                    // nameTextStyle: {
                    //     color: '#20d8d3', // 设置单位颜色
                    //     align: 'left',
                    //     fontSize:this.$notsize(16),
                    //     padding: [0, 0, 0, 240]    // 四个数字分别为上右下左与原位置距离
                    // },
                    axisLabel: {
                        textStyle:{
                            color:'#fff',  //坐标的字体颜色
                        },
                    }, 
                    axisLine:{
                        lineStyle:{
                            color:'#223C90',
                            // width:8,//这里是为了突出显示加上的
                        }
                    },
                    data: yAxisData
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        barWidth:30,
                        data: hitRate,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#0038ff'
                                }, {
                                    offset: 1,
                                    color: '#00b5ff'
                                }]),
                            }
                        },

                    },
                    // {
                    //     name: '2012年',
                    //     type: 'bar',
                    //     data: [400, 300, 240, 400],
                    //     itemStyle: {
                    //         normal: {
                    //             color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    //                 offset: 0,
                    //                 color: '#00938f'
                    //             }, {
                    //                 offset: 1,
                    //                 color: '#2dff92'
                    //             }]),
                    //         }
                    //     },
                    // }
                ]
            }
            hitRateEcharts.setOption(option)
            let listener = function() {
                hitRateEcharts.resize()
            }
            EleResize.on(hitRateEchartses,listener)
        }
    },
}
</script>
<style lang="less" scoped>
    // .business{
    //     width: 100%;
    //     height: 100%;
    //     background: #f5f5f5;
    //     position: absolute;
    //     background: url('./../img/businessQuality.png') no-repeat;
    // }
    // .business_left{
    //     position: absolute;
    //     top: 0;
    //     left: 10%;
    //     width: 20%;
    //     height: 100%;
    //     border: 1px solid red;
    // }
    
</style>
