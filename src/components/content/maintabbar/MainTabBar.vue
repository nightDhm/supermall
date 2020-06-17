<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="salmon">
        <img slot="item-iocn" src="~assets/img/tabbar/shouye.png">
        <img slot="item-iocn-active" src="~assets/img/tabbar/shouye.png">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="salmon">
        <img slot="item-iocn" src="~assets/img/tabbar/fenlei.png">
        <img slot="item-iocn-active" src="~assets/img/tabbar/shouye.png">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="salmon">
        <img slot="item-iocn" src="~assets/img/tabbar/sousuo.png">
        <img slot="item-iocn-active" src="~assets/img/tabbar/shouye.png">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="salmon">
        <img slot="item-iocn" src="~assets/img/tabbar/my.png">
        <img slot="item-iocn-active" src="~assets/img/tabbar/shouye.png">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
name:"Maintabbbar",
components:{
    TabBar,
    TabBarItem
}
}
</script>

<style>
#tab-bar{
  z-index: 10;
}
</style>