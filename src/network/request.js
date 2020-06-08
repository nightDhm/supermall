import axios from 'axios'

export function request(config){
    //axios 的封装
    //1.创建axios的实例
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })

    //axios的拦截器
    //请求拦截
    //拦截instance这个实例
     //1.比如config中的一些信息不符合服务器的要求

        //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标

        //3.某些网络请求（比如登陆（token）），必须携带一些特殊的信息

        //请求成功后 处理后 返回处理后的config
    instance.interceptors.request.use(config => {    
        return config
    },err => {
        console.log(err);   //请求失败后干什么
    })

    
    return instance(config)

    // instance(config)
    // .then(res => {
    //     resolve(res);
    // })
    // .catch(err => {
    //     reject(err);
    // })
}