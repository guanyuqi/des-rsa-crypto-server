# RSA后台接口

**手机管理系统api文档**

**baseUrl:** http://127.0.0.1:8888/api

## 项目操作



#### **启动项目**

```shell
node main.js
```

#### 项目目录

```shell
server
|
|- /pem     				密钥存放
|- /router  				路由  
	|- api.js					接口逻辑
|- /upload  				上传
	|- /decrypt					解密存放
	|- /decrypt					加密存放
|- main.js  				主函数
|- utils.js 				工具函数
```



## 密钥操作



#### 生成密钥

**URL: `/generator`**

**Method: `GET`**

**Description: `生产密钥方法返回结果`**

**Response-example:**

```json
//json
{
    "code": 0,
    "msg": "创建密钥成功",
    "data": {
        "privatePem": "-----BEGIN RSA PRIVATE KEY-----\nMIIBOgIBAAJBAIGE54KgnYNCpBAkYvhFsn9rg0d9b6J5P8U444GgZ6Y7rBtRM13H\n6eDEdzDHDBG6xbGva+kx3aLXA3gDIac6TiECAwEAAQJAN1yEzKw0x797ez7iYvb/\ntkFRawRt7Efhfz6y2FylEUN6lHu/yx/0YQ5uP+f0lSRKIl29Ui4V5w6E0sgMQ6TB\nhQIhAPtxc8OewhvbveVWUnysibb19+RCLOOdDoCLgsj3cYxjAiEAg93L9gCx72J1\n6Wz0Xkro/z8YQ9XjPsoTqyGIrjC62KsCIQDqRTFL0O4f0KPkOoJOQN9qxU96r6Ft\nTNbHM7TeE5YK6wIgGtnyK1Cu6uDww6x1AjJcyYTuivmlwWZipOk6LMYtdesCIFyF\nebhYP4xROugWGMeTj387QVkSfeV1HNf4ilNYs8y9\n-----END RSA PRIVATE KEY-----",
        "publicPem": "-----BEGIN RSA PUBLIC KEY-----\nMEgCQQCBhOeCoJ2DQqQQJGL4RbJ/a4NHfW+ieT/FOOOBoGemO6wbUTNdx+ngxHcw\nxwwRusWxr2vpMd2i1wN4AyGnOk4hAgMBAAE=\n-----END RSA PUBLIC KEY-----"
    }
```



#### 获取key

**URL: `/getkey`**

**Method: `GET`**

**Description: `读取密钥返回内容 供富文本框使用`**

**Params:`空`**

**Response-example:**

```json
//json
{
    "code": 0,
    "data": {
        "privatePem": "-----BEGIN RSA PRIVATE KEY-----\nMIIBOgIBAAJBAIGE54KgnYNCpBAkYvhFsn9rg0d9b6J5P8U444GgZ6Y7rBtRM13H\n6eDEdzDHDBG6xbGva+kx3aLXA3gDIac6TiECAwEAAQJAN1yEzKw0x797ez7iYvb/\ntkFRawRt7Efhfz6y2FylEUN6lHu/yx/0YQ5uP+f0lSRKIl29Ui4V5w6E0sgMQ6TB\nhQIhAPtxc8OewhvbveVWUnysibb19+RCLOOdDoCLgsj3cYxjAiEAg93L9gCx72J1\n6Wz0Xkro/z8YQ9XjPsoTqyGIrjC62KsCIQDqRTFL0O4f0KPkOoJOQN9qxU96r6Ft\nTNbHM7TeE5YK6wIgGtnyK1Cu6uDww6x1AjJcyYTuivmlwWZipOk6LMYtdesCIFyF\nebhYP4xROugWGMeTj387QVkSfeV1HNf4ilNYs8y9\n-----END RSA PRIVATE KEY-----",
        "publicPem": "-----BEGIN RSA PUBLIC KEY-----\nMEgCQQCBhOeCoJ2DQqQQJGL4RbJ/a4NHfW+ieT/FOOOBoGemO6wbUTNdx+ngxHcw\nxwwRusWxr2vpMd2i1wN4AyGnOk4hAgMBAAE=\n-----END RSA PUBLIC KEY-----"
    }
}
```



#### 上传key

**URL: `/key/upload/:name`**

**Method: `POST`**

**Description: `根据接口的params上传密钥`**

**Params:`name:密钥文件名`**

**body:**

```json
{
    "name":"private.pem",
    "path":"D:\test.txt"
}
```

**Response-example:**

```json
//json
{
    code: 0
	msg: "替换private.pem成功"
}
```

#### 下载key

**URL: `/download/:name`**

**Method: `GET`**

**Description: `根据接口的params下载密钥`**



#### 修改key

**URL: `/key/modify`**

**Method: `POST`**

**Description: `修改密钥内容`**

**Params:`空`**

**body:**

```json
{
    "fileName":"private.pem",
    "key":"我是修改测试"
}
```

**Response-example:**

```json
//json
{
   "code": 0
   "msg": "替换private.pem成功"
}
```



## 加密



#### 通过路径加密

**URL: `/encrypt/path`**

**Method: `POST`**

**Description: ` 根据路径加密文件`**

**Params:`空`**

**body:**

```json
{
    "path":"C:\test.txt"
}
```

**Response-example:**

```json
//json
{
    "code": 0,
    "msg": "加密成功~"
}
```



#### 上传加密

**URL: `/encrypt/upload`**

**Method: `POST`**

**Description: `上传文件到指定路径后加密`**

**Params:`空`**

**formData**:

```json
{
    "frile":"test.txt"
}
```

**Response-example:**

```json
//json
{
    code: 0
	msg: "上传成功!"
	data: {
    	path: "C:\README.md", 
    	name:"README.md"
	}
}
```



#### 下载加密后的文件

**URL: `/download/encrypt/:name`**

**Method: `GET`**

**Description: `通过上个函数返回的文件名下载`**

**Params:`name:下载的文件名`**



## 解密



#### 通过路径解密

**URL: `/decrypt/path`**

**Method: `POST`**

**Description: ` 根据路径解密文件`**

**Params:`空`**

**body:**

```json
{
    "path":"C:\test.txt"
}
```

**Response-example:**

```json
//json
{
    "code": 0,
    "msg": "解密成功~"
}
```



#### 上传解密

**URL: `/decrypt/upload`**

**Method: `POST`**

**Description: `上传文件到指定路径后解密`**

**Params:`空`**

**formData**:

```json
{
    "frile":"test.txt"
}
```

**Response-example:**

```json
//json
{
    code: 0
	msg: "上传成功!"
	data: {
    	path: "C:\README.md", 
    	name:"README.md"
	}
}
```



#### 下载解密后的文件

**URL: `/download/decrypt/:name`**

**Method: `GET`**

**Description: `通过上个函数返回的文件名下载`**

**Params:`name:下载的文件名`**



