<template>
    <div :id="id">
    </div>
</template>
<script>
import {EleResize} from '../../assets/js/esresize' // 引入封装的地图放大缩小js
export default {
    data(){
        return {
            htmltement: null
        }
    },
    props: ['id','Data','type'],
    watch:{
        'Data':function(val){
            if(val){
                this.steadinde(val)
            }
        }
    },
    methods: {
        steadinde(val){
            let myChart_zb = this.$echarts.init(document.getElementById(this.id));
            let myChart_zbs = document.getElementById(this.id)
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
            var color= ["#0dcdff", "#fa858b", "#feb342",'#49b386']
            var placeHolderStyle= {
                normal: { //正常
                    color: '#2c3c58',
                    opacity: .7,
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: { //高亮样式
                    color: "#393d50"
                },
            }
            var pie_update= 1000
            let serData = []
            let radiusX = 65
            let radiusY = 70
            for(var i = 0; i< val.length; i++){
                let rateValue = null
                let MaxValue = null
                if(this.type == 'one'){ // 判断type类型 one取活跃率  two取日均在线次数   three取日均在线时长
                    MaxValue = val[i].MONTHAVGACTIVERATE
                    rateValue = 1 - val[i].MONTHAVGACTIVERATE
                }else if(this.type == 'two'){
                    MaxValue = val[i].AVGTIMES
                    rateValue = val[i].USERTIMES - val[i].AVGTIMES
                }else if(this.type == 'three'){
                    MaxValue = val[i].AVGDURATION
                    rateValue = 24-val[i].AVGDURATION
                }
                let obj = {
                    name: 'Line'+(i+1),
                    type: 'pie',
                    clockWise: i==3?false:true, //饼图的扇区是否是顺时针排布。
                    startAngle: 90,
                    radius: [radiusX-(i*10)+'%', radiusY-(i*10)+'%'], ////饼图的半径，数组的第一项是内半径，第二项是外半径。支持设置成百分比，相对于容器高宽中较小的一项的一半。可以将内半径设大显示成圆环图（Donut chart）。
                    center: ['50%', '50%'],
                    animationDuration: 2800,
                    itemStyle: dataStyle, //图形样式。
                    hoverAnimation: false,
                    data: [
                        {
                        value: MaxValue,
                        // name: '30%直播',

                        itemStyle: {
                            normal: {
                                color: color[i]
                            },
                        }
                    },
                    {
                        value:  rateValue,
                        // name: '',
                        tooltip: {
                            show: false
                        },
                        itemStyle: placeHolderStyle
                    }], //data
                    animationDurationUpdate: pie_update

                }
                serData.push(obj)
            }
            var option= {
                series: serData
            }
            myChart_zb.setOption(option)
            let listener = function() {
                myChart_zb.resize()
            }
            EleResize.on(myChart_zbs,listener)

        }
    },
    
}
</script>