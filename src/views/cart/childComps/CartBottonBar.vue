<template>
  <div class="bottom-bar">
      <div class="check-content">
          <CheckButton 
          :isChecked="isSelectAll"
          class="check-button"
          @click.native="checkClick"/>
          <span>全选</span>
      </div>

        <div class="price">
            合计: {{totalPrice}}
        </div>

        <div class="cacluate" @click="calcClick">
            去计算({{checkLength}})
        </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
    name:"CartButtonBar",
    components:{
        CheckButton
    },
    computed:{
        ...mapGetters(['cartList']),
         // 合计
        totalPrice(){
            return '￥' + this.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        // 付款
        checkLength(){
            return this.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
        //    return  !(this.cartList.filter(item => !item.checked).length)
            if (this.cartList.length === 0) return false
            return !this.cartList.find(item => !item.checked)
      }
    },
    methods:{
        checkClick(){
            if (this.isSelectAll){  //全部选中
                this.cartList.forEach(item => item.checked = false)
            } else {    //部分或全部不选中
                this.cartList.forEach(item => item.checked = true)
            }
        },
        calcClick(){
            if(!this.isSelectAll){
                this.$toast.show('请选择购买的商品',2000)
            }
        }
    }
}
</script>

<style scoped>
    .bottom-bar{
        position: relative;
        display: flex;

        height: 40px;
        line-height: 40px;

        background-color: #eee;
        
        font-size: 14px;
    }

    .check-content{
        display: flex;
        align-items: center;
        margin-left: 10px;
        margin-right: 5px;
        width: 60px;
    }

    .check-button{
        width: 20px;
        height: 20px;
        line-height: 20px;
    }

    .price{
        margin-left: 20px;
        flex: 1;
    }

    .cacluate{
        width: 90px;
        background: red;
        text-align: center;

        color:white;
    }
</style>