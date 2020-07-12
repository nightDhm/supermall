<template>
  <div id="detail">
     <DetailNavBar/>
     <DetailSwiper :top-images="topImages"/>
     <DetailBaseInfo :goods="goods"/>
  </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'

    import {getDetail, Goods} from 'network/detail'

export default {
name:"Detail",
components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
},
data(){
    return{
        iid: null,
        topImages: [],
        goods: {}
    }
},
created(){
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据
    getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.data.result
        this.topImages =data.itemInfo.topImages
        
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
} 
}
</script>

<style>

</style>