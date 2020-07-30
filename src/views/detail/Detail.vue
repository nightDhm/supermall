<template>
  <div id="detail">
     <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"/>
     <scroll class="content" ref="scroll" :probe-type='3'  @scroll="contentScroll">
        
        <DetailSwiper :top-images="topImages"/>
        <DetailBaseInfo :goods="goods"/>
        <DetailShopInfo :shop="shop"/>
        <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad" />
        <DetailParamInfo ref="params" :paramInfo="paramInfo"/>
        <DetailCommentInfo ref="comment" :commentInfo="commentInfo"/>
        <Goodslist ref="recommend" :goods="recommends" />
     </scroll>
     <DetailBottomBar @addCart="addToCart"/>
    <BackTop  @click.native="backClick" v-show="isShowBackTop"/>

    <!-- <Toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetaliShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'

    import Scroll from 'components/common/scroll/Scroll'
    import Goodslist from 'components/content/goods/GoodsList'
    // import Toast from 'components/common/toast/Toast'

    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
    import {debounce} from "common/utils"
    import {itemListenerMixin,backTopMixin} from 'common/mixin'

    import {mapActions} from 'vuex'
export default {
name:"Detail",
components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Goodslist,
    DetailBottomBar,
    // Toast
},
mixins: [itemListenerMixin,backTopMixin],
data(){
    return{
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex: 0,
        // message:'',
        // show: false
    }
},
created(){
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
        //1.获取顶部图片轮播数据
        
        const data = res.data.result
        this.topImages =data.itemInfo.topImages
        
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    
        //3.获取店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.获取商品详细信息
        this.detailInfo = data.detailInfo;

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    
        //取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

    })

    //3.请求推荐数据
    getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.data.list
    })

    this.getThemeTopY = debounce(() =>{
        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
            
    },100)
},
 //方法集合
 // 判断图片加载完成，刷新可滚动区域
methods:{
    ...mapActions(['addCart']),
    imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
    },
    titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],200)
    },
    contentScroll(position) {
        //positionT 在0和7938之间，index = 0
        //positionT 在=7938之和9120之间，index = 1
        //positionT 在9120和9452之间，index = 2
        //positionT 在9120和 非常大的值之间，index = 3
        // 获取Y值
        const positionY = -position.y
        // 与themeTopY进行比对，滚动时让navbar中标题和内容对应
        let length = this.themeTopYs.length;
        for(let i =0; i < length-1; i++) {
          if(this.currentIndex !== i && (positionY >=  this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        
        //是否显示回到顶部
        this.listenShoBackTop(position)
      

    },
    addToCart(){
        //1获取购物车需要展示的信息信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品加入到购物车
        // this.$store.commit('addCart',product)
        this.addCart(product).then(res => {
            // this.show = true;
            // this.message = res;
            // setTimeout(() => {
            //     this.show = false;
            //     this.message = ''
            // },1500)     

            this.$toast.show(res, 2000)
        })

        // this.$store.dispatch('addCart',product).then(res => {
        //     console.log(res);        
        // })


    }
}
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 19;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav{
        position: relative;
        z-index:9 ;
        background-color: #fff;
    }


    .content{
        
        height: calc(100% - 44px - 60px);
    }
</style>