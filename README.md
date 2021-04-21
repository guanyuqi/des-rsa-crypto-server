# RSA-WEB

**根据vue + vue-router + ElementUI 构建的前端管理系统**

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
|- /axios   
	|- http.js				请求封装
|- /components  			模块  
	|- Generate.vue				生成key
	|- Decrypt.vue				解密
	|- Encrypt.vue				加密
|- /router  				路由 
	|- /index.js				解密存放
|- /views  				路由 
	|- /Home.vue				主页面
	
|- main.js  				主函数
|- App.vue  				主vue

```



#### 依赖

```json
"axios": "^0.21.1",
"core-js": "^3.6.5",
"element-ui": "^2.15.1",
"vue": "^2.6.11",
"vue-router": "^3.2.0"
```

