const fs = require('fs')
const path = require('path')

const Router = require('koa-router')

const rsaApi = new Router({ prefix: '/api' })
const { generator, writeKey, encrypt, decrypt, download } = require('../utils')

/*
 *@function  生成密钥
 *@description  调用生产密钥方法返回结果
 *@return {JSON} 返回密钥
 */
rsaApi.get('/generator', async(ctx, next) => {
    let res = await generator()
    ctx.response.body = {
        code: 0,
        msg: '创建密钥成功',
        data: res,
    }
})

/*
 *@function  获取key
 *@description  读取密钥返回内容 供富文本框使用
 *@return {JSON} 返回密钥内容
 */
rsaApi.get('/getkey', async(ctx, next) => {
    try {
        let publicKey = fs.readFileSync('./pem/public.pem', 'utf-8')
        let privateKey = fs.readFileSync('./pem/private.pem', 'utf-8')
        ctx.response.body = {
            code: 0,
            data: {
                privatePem: privateKey,
                publicPem: publicKey,
            },
        }
    } catch (error) {
        console.log(error)
        ctx.response.body = {
            code: 1,
            msg: error,
        }
    }
})

/*
 *@function  下载key
 *@description  根据接口的params下载密钥
 *@param{String} name:密钥文件名
 *@return {JSON} 生成下载流
 */
rsaApi.get('/download/:name', async(ctx) => {
    const name = ctx.params.name
    const path = `pem/${name}`
    await download(ctx, path)
})

/*
 *@function  上传key
 *@description  根据接口的params上传密钥
 *@param{String} name:密钥文件名（前端只会上传两种 分别是private.pem和public.pem，所以直接操作就行了）
 *@return {JSON} 返回信息
 */
rsaApi.post('/key/upload/:name', async(ctx, next) => {
    try {
        const name = ctx.params.name
        const file = ctx.request.files.file
        let res = fs.readFileSync(file.path, 'utf-8')
        msg = writeKey(name, res)
        ctx.response.body = {
            code: 0,
            msg: msg,
        }
    } catch (error) {
        console.log(error)
        ctx.response.body = {
            code: 1,
            msg: error,
        }
    }
})

/*
 *@function  修改key
 *@description  修改密钥内容
 *@param{OBj} {
		fileName:需要修改的key名，
		key:内容
 }
 *@return {JSON} 返回信息
*/
rsaApi.post('/key/modify', async(ctx, next) => {
    try {
        const msg = ctx.request.body
        res = writeKey(msg.fileName, msg.key)
        ctx.response.body = {
            code: 0,
            msg: res,
        }
    } catch (error) {
        console.log(error)
        ctx.response.body = {
            code: 1,
            msg: error,
        }
    }
})

/*
 *@function  通过路径加密
 *@description  根据路径加密文件
 *@param{OBj} {
		path:需要加密文件的绝对路径
 }
 *@return {JSON} 返回信息
*/
rsaApi.post('/encrypt/path', (ctx, next) => {
        try {
            const msg = ctx.request.body
            if (!msg.des) {
                throw '没有des密码'
            }
            let res = fs.readFileSync(msg.path, 'utf-8')
            res = encrypt(res, msg.des)
            fs.writeFile(msg.path, res, (err) => {
                if (err) throw err
            })
            ctx.response.body = {
                code: 0,
                msg: '加密成功!',
            }
        } catch (error) {
            console.log('通过路径加密', error)
            ctx.response.body = {
                code: 1,
                msg: error,
            }
        }
    })
    /*
     *@function  上传加密
     *@description  上传文件到指定路径后加密
     *@param{form}  file:form格式上传的文件
     *@return {JSON} 返回信息
     */
rsaApi.post('/encrypt/upload', async(ctx, next) => {
        try {
            const msg = ctx.request.body
            if (!msg.des) {
                throw '没有des密码'
            }
            const file = ctx.request.files.file
            let res = fs.readFileSync(file.path, 'utf-8')
            res = encrypt(res, msg.des)
            let filePath = path.join(__dirname, '../upload/encrypt/') + file.name
            fs.writeFileSync(filePath, res)
            ctx.response.body = {
                code: 0,
                msg: '上传成功!',
                data: {
                    path: filePath,
                    name: file.name,
                },
            }
        } catch (error) {
            console.log(error)
            ctx.response.body = {
                code: 1,
                msg: error,
            }
        }
    })
    /*
     *@function  下载加密后的文件
     *@description  通过上个函数返回的文件名下载
     *@param{String}  name:下载的文件名
     *@return {JSON} 返回信息
     */
rsaApi.get('/download/encrypt/:name', async(ctx) => {
    const name = ctx.params.name
    const path = `upload/encrypt/${name}`
    await download(ctx, path)
})

/* 解密 */

/*
 *@function  通过路径解密
 *@description  根据路径解密文件
 *@param{OBj} {
		path:需要解密文件的绝对路径
 }
 *@return {JSON} 返回信息
*/
rsaApi.post('/decrypt/path', (ctx, next) => {
        try {
            const msg = ctx.request.body
            if (!msg.des) {
                throw '没有des密码'
            }
            let res = fs.readFileSync(msg.path, 'utf-8')
            res = decrypt(res, msg.des)
            fs.writeFile(msg.path, res, (err) => {
                if (err) throw err
            })
            ctx.response.body = {
                code: 0,
                msg: '解密成功!',
            }
        } catch (error) {
            console.log('通过路径解密', error)
            ctx.response.body = {
                code: 1,
                msg: error,
            }
        }
    })
    /*
     *@function  上传解密
     *@description  上传文件到指定路径后解密
     *@param{form}  file:form格式上传的文件
     *@return {JSON} 返回信息
     */
rsaApi.post('/decrypt/upload', async(ctx, next) => {
        try {
            const msg = ctx.request.body
            if (!msg.des) {
                throw '没有des密码'
            }
            const file = ctx.request.files.file
            let res = fs.readFileSync(file.path, 'utf-8')
            res = decrypt(res, msg.des)
            let filePath = path.join(__dirname, '../upload/decrypt/') + file.name
            fs.writeFileSync(filePath, res)
            ctx.response.body = {
                code: 0,
                msg: '上传成功!',
                data: {
                    path: filePath,
                    name: file.name,
                },
            }
        } catch (error) {
            console.log('上传解密', error)
            ctx.response.body = {
                code: 1,
                msg: error,
            }
        }
    })
    /*
     *@function  下载解密后的文件
     *@description  通过上个函数返回的文件名下载
     *@param{String}  下载的文件名
     *@return {JSON} 返回信息
     */
rsaApi.get('/download/decrypt/:name', async(ctx) => {
    const name = ctx.params.name
    const path = `upload/decrypt/${name}`
    await download(ctx, path)
})
module.exports = rsaApi