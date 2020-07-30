import {debounce} from './utils';
import BackTop from 'components/content/backTop/BackTop'
import {BACK_POSITION} from "common/const"

export const itemListenerMixin = {
    data() {
      return{
        itemImgListener: null,
        newRefresh:null
      }
    },
    mounted() {
      // 图片加载完成事件监听，刷新scroll的可滚动高度，优化用户体验(防抖)
      const refresh = debounce(this.$refs.scroll.refresh, 100)
      
      // 监听事件总线发送来的事件并保存
      this.itemImgListener = this.$bus.$on('itemImageLoad', () => {
      // 调用scroll的refresh刷新可滚动高度
      refresh()
      })
    }
  }

  export const backTopMixin = {
    components:{
      BackTop
    },
    data(){
      return{
        isShowBackTop:false
      }
    },
    methods:{
      backClick(){
        this.$refs.scroll.scrollTo(0, 0)
      },
      listenShoBackTop(position){
        this.isShowBackTop = -position.y > BACK_POSITION
      }
    }
  }