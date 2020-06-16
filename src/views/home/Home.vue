<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行','精选','新款']"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl'

import {getHomeMultidata} from "network/home";

export default {
name:"Home",
components:{
  NavBar,
  HomeSwiper,
  RecommendView,
  FeatureView,
  TabControl
},
data(){
  return{
    banners:[],
    recommends:[]
  }
},
created(){
  //请求多个数据
  getHomeMultidata().then(res => {
    console.log(res);
    //this.result = res;    //res数据存入到result
    this.banners = res.data.data.banner.list;
    this.recommends = res.data.data.recommend.list;
    
  })
}
}
</script>

<style>
  #home{
    padding-top: 44px;
    padding-bottom: 900px;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

.tab-control {
    position: sticky;
    top: 44px;

  }

</style>