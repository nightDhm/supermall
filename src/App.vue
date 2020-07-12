<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
      <!--</keep-alive>不让home随便销毁  -->
      <!-- exclude排除，就exclude重新获取 -->
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "components/content/maintabbar/MainTabBar"

export default {
  name: 'App',
  components: {
  MainTabBar
  }
}
</script>

<style>
 @import "assets/css/base.css";
</style>
