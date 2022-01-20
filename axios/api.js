import axios from 'axios';


axios.defaults.baseURL = '/apis';

// http request拦截器，添加一个请求拦截器
axios.interceptors.request.use(function(config){
    config.headers['Content-Type'] = "multupart/form-data"
    let token = sessionStorage.getItem("token");
  
    if(token){
      // 将token放到请求头发送给服务器，将tokenkey放到请求头中
      config.headers.token = token;
    }
    return config;
  },function(error){
    return Promise.reject(error);
  });

//   请求方法

// 登录
export const login = (username,password) => {
    let fd = new FormData();
    fd.append('username', username);
    fd.append('password', password);
    return axios.post('/api/user/login',fd)
}

// 获取菜单
export const getDishes = () => {
  return axios.post('/api/menu/get')
}

// 添加菜品
export const addDish = (name,descr,price,img) => {
  let fd = new FormData();
  
  fd.append('name',name);
  fd.append('descr',descr);
  fd.append('price',price);
  fd.append('image',img);
  return axios.post('/api/menu/add',fd);
}