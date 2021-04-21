# RSA-WEB

### 项目介绍

> 这是一个根据des rsa加密构建的加密系统。上传文件进行des→rsa加密。解密rsa→des.
>
> 前端部分为 VUE Element
>
> 后端部分为 Koa

### 项目操作



#### **启动**

```shell
npm run serve
```



#### **打包**

```shell
npm run build
```

#### 

#### 项目目录

```shell
src
|
|── server  			后台 
|── axios   
│	└── http.js			请求封装
|── components  			  
│	|── Generate.vue	生成key
│	|── Decrypt.vue		解密
│	└── Encrypt.vue		加密
|── router  				 
|	└── /index.js		路由
|── views  			
|	└── /Home.vue		主页面
|
|── main.js  			主函数
└── App.vue  			vue入口

```



#### 

