export function debounce(func,delay){
    //防抖性能优化
    let timer = null
    return function(...args){
      //...不止传一个参数
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
        //apply改变this指向
      },delay)
    }
}