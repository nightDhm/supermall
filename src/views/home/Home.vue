<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>

    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
             @scroll="contentscoll" 
             :pull-up-load="true" 
             @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control" :titles="['流行','精选','新款']" @tabClick="tabClick"/>
      <good-list :goods="showGoods"/>
    </scroll>
    
    <BackTop  @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from "network/home";

export default {
name:"Home",
components:{
  NavBar,
  HomeSwiper,
  RecommendView,
  FeatureView,
  TabControl,
  GoodList,
  Scroll,
  BackTop
},
data(){
  return{
    banners:[],
    recommends:[],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]},
    },
    currentType:'pop',
    isShowBackTop:false
  }
},
computed:{
  showGoods(){
    return this.goods[this.currentType].list
  }
},
created(){
  //请求多个数据
  this.getHomeMultidata()

  //请求商品数据
  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')
},
 methods:{
/**
 * 事件监听相关的方法
 */
  tabClick(index){
    switch(index){
      case 0:
        this.currentType = 'pop'
        break
      case 1:
        this.currentType = 'new'
        break
      case 2:
        this.currentType -'sell'
        break
    }
  },
  backClick(){
    //让ref的scroll使用scrollTo事件
    this.$refs.scroll.scrollTo(0,0)
  },
  contentscoll(position){
    //接收监听滚动的位置position事件
    this.isShowBackTop = (-position.y) > 1000
  },
  loadMore(){
     this.getHomeGoods(this.currentType)   
  },

/**
 * 网络请求相关的方法
 */
   getHomeMultidata(){
     getHomeMultidata().then(res => {
    //this.result = res;    //res数据存入到result
    this.banners = res.data.data.banner.list;
    this.recommends = res.data.data.recommend.list;
    })
   },
   getHomeGoods(type){
    const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
      this.goods[type].list.push(...res.data.data.list)
      this.goods[type].page += 1

      this.$refs.scroll.finishPullUp()
    })
   }

 }
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;

  }

  .home-nav{
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }

.tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }

</style>