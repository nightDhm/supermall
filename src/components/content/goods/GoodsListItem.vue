<template>
  <div class="goods_item" @click="itemClick">
      <img :src="showImage" alt="" @load="imageLoad">
      <div class="goods_info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
name:"GoodsListItem",
props:{
    goodsItem:{
        type:Object,
        default(){
            return{}
        }
    }
},
computed:{
  showImage(){
    return this.goodsItem.image || this.goodsItem.show.img
  }
},
methods:{
  imageLoad(){
    //vue中的监听@load=“方法” 发出事件名称
  //  if(this.$route.path.indexOf('/home')){
  //     this.$bus.$emit('homeItemImageLoad')
  //  } else if(this.$route.path.indexOf('/detail')){
  //     this.$bus.$emit('detailItemImageLoad')
  //  }
 
  this.$bus.$emit('itemImageLoad')

  },
  itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
  }
}
}
</script>

<style>
.goods_item {
  padding: 0.21rem;
  width: 48%;
  position: relative;
  padding-bottom: 1.68rem;
}
.goods_item img {
  width: 100%;
  border-radius: 0.21rem;
}
.goods_info {
  /* 信息 */
  font-size: 0.64rem;
  text-align: center;
  position: absolute;
  bottom: 0.21rem;
  left: 0;
  right: 0;
}
.goods_info p {
  /* 标题 */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.price {
  /* 价格 */
  color: var(--color-high-text);
  margin-right: 0.85rem;
}

.collect::before {
  display: inline-block;
  content: "";
  background: url("~assets/img/common/collect.svg") 0 0/0.6rem 0.6rem;
  position: relative;
  top: 0.04rem;
  right: 0.08rem;
  height: 0.6rem;
  width: 0.6rem;
}
</style>