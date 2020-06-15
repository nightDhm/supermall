<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
   <swiper>
     <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

import {getHomeMultidata} from "network/home"
import { Swiper, SwiperItem } from "components/common/swiper";


export default {
name:"Home",
components:{
  NavBar,
    Swiper,
        SwiperItem
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
    this.components = res.data.data.recommend.list;
    
    
  })
}
}
</script>

<style>
<<<<<<< HEAD
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }
=======

>>>>>>> 940105825559159255a30cd8afd85f8ad0426193
</style>