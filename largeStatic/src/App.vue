<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Microsoft YaHei";
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
  background: #020e34;
}
.date {
  width: 300px;
  font-size: 22px;
  font-weight: 400;
  color: rgba(0, 204, 255, 1);
  position: absolute;
  right:5%; 
  top: 4%;
}
</style>
