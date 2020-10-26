<template>
  <div class="vod">
    <span @click="tiao('/')"></span>
    <span @click="tiao('/businessOrder')"></span>
    <span @click="tiao('/userDevelopment')"></span>
    <span @click="tiao('/businessQuality')"></span>
    <span @click="tiao('/businessRatings')"></span>
  </div>
</template>

<script>

  export default {
    name:'',

    components: {},

    data () {
      return {

      };
    },

    watch: {},

    methods: {
        tiao(a){
           this.$router.push(a);
        }
    },

    mounted() {
    },

    created() {}

  }

</script>
<style lang='less' scoped>
.vod {
  width: 50%;
  height: 5%;
  position: absolute;
  top: 2.7%;
  left: 30%;
  z-index: 20;
  span {
    width: 15%;
    margin-top: 1%;
    margin-left: 40px;
    height: 70%;
    display: inline-block;
  }
  span:hover {
    cursor: pointer;
  }
}
</style>