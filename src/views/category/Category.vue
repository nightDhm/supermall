<template>
  <div class="wrapper">
    <ul class="content">
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
       <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
name:"Catgory",
  data(){
    return{
      scroll:null
    }
  },
  mounted(){
 this.scroll = new BScroll('.wrapper',{
   probeType:3,
   pullUpLoad:true,
   click:true
  })
  
  this.scroll.on('scroll',(position) => {
    console.log(position);
    })

  this.scroll.on('pullingUp',() => {
    console.log('上拉加载更多');
  })
}
}
</script>

<style scoped>
  .wrapper{
    height: 150px;
    

    /* overflow: hidden; */
  }

</style>