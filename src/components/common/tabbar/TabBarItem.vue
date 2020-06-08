<template>
        <div class="tab-bar-item" @click="itemclick"> 
        <div v-if="!isactive"><slot name="item-iocn"></slot></div> 
        <div v-else><slot name="item-iocn-active"></slot> </div>
        <div :style="activeStyle"><slot name="item-text"></slot> </div>
        <!-- <img src="../../assets/img/tabbar/shouye.png">
        <div>首页</div> -->
        </div>
</template>

<script>
export default {
name:"TabBarItem",
props:{
  path:String,
  activeColor:{
    type:String,
    default:'red'
  }
},
data(){
  return{
   // isactive:true
  }
},
computed:{
  isactive(){
    return this.$route.path.indexOf(this.path) !== -1
  },
  activeStyle(){
    return this.isactive ? {color: this.activeColor} : {}
  }
},
methods:{
  itemclick(){
    this.$router.replace(this.path)
  }
}
}
</script>

<style>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 29px;
    height: 24px;
    margin-top: 3px;
     vertical-align: middle;
     margin-bottom: 2px;
  }

  /* .active{
    color: salmon;
  } */
</style>