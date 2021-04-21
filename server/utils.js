const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const send = require('koa-send')
const NodeRSA = require('node-rsa')

/*
 *@function  生成密钥
 *@description  生成密钥
 *@return {Obj} 返回加密对象
 */

async function generator() {
    let key = new NodeRSA({ b: 512 })
    key.setOptions({ encryptionScheme: 'pkcs1' })
    let privatePem = key.exportKey('pkcs1-private-pem')
    let publicPem = key.exportKey('pkcs1-public-pem')
    await exitsFolder('./pem')
    try {
        fs.writeFile('./pem/public.pem', publicPem, (err) => {
            if (err) throw err
            console.log('公钥已保存！')
        })
        fs.writeFile('./pem/private.pem', privatePem, (err) => {
            if (err) throw err
            console.log('私钥已保存！')
        })
    } catch (error) {
        console.log('报错了', err)
    }

    return {
        privatePem: privatePem,
        publicPem: publicPem,
    }
}

/*
 *@function  写入密钥
 *@description  在指定目录下写入密钥
 *@param{String} key:密钥文件名 msg:密钥内容
 *@return {String}
 */
function writeKey(key, msg) {
    let filePath = path.join(__dirname, `./pem/${key}`)
    fs.writeFileSync(filePath, msg)
    return `替换${key}成功`
}

/*
 *@function  创建文件夹
 *@description  如果路径不存在就创建文件夹
 */
async function exitsFolder(reaPath) {
    const absPath = path.resolve(__dirname, reaPath)
    try {
        await fs.promises.stat(absPath)
    } catch (e) {
        // 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
        console.log('不存在')
        await fs.promises.mkdir(absPath, { recursive: true })
    }
}
/*
 *@function  加密
 *@description  通过私钥加密返回加密后的内容
 *@param{String} msg:需要加密的内容
 *@return {String}
 */
function encrypt(msg, des) {
    let desRes
    try {
        des =
            des.length >= 8 ?
            des.slice(0, 8) :
            des.concat('0'.repeat(8 - des.length))
        const keyHex = new Buffer.from(des)
        const cipher = crypto.createCipheriv('des-cbc', keyHex, keyHex)
        desRes = cipher.update(msg, 'utf8', 'base64')
        desRes += cipher.final('base64')
    } catch {
        throw 'des加密失败'
    }
    try {
        let data = fs.readFileSync('./pem/private.pem')
        let key = new NodeRSA(data)
        let cipherText = key.encryptPrivate(desRes, 'base64')
        return cipherText
    } catch (err) {
        console.log(err)
        throw 'rsa加密失败'
    }
}

/*
 *@function  解密
 *@description  通过公钥解密返回解密后的内容
 *@param{String} msg:需要解密的内容
 *@return {String}
 */
function decrypt(msg, des) {
    let rawText
    try {
        let data = fs.readFileSync('./pem/public.pem')
        let key = new NodeRSA(data)
        rawText = key.decryptPublic(msg, 'utf8')
    } catch {
        throw 'rsa解密失败'
    }

    try {
        des =
            des.length >= 8 ?
            des.slice(0, 8) :
            des.concat('0'.repeat(8 - des.length))
        const desHex = new Buffer.from(des)
        const cipher = crypto.createDecipheriv('des-cbc', desHex, desHex)
        let desRes = cipher.update(rawText, 'base64', 'utf8')
        desRes += cipher.final('utf8')
        return desRes
    } catch {
        throw 'des解密失败'
    }
}
/*
 *@function  下载
 *@description  生成下载数据流，该用法为插件固定用法
 *@param{String} ctx:上下文 path：需要下载的文件在后端的路径
 *@return {String}
 */
async function download(ctx, path) {
    ctx.attachment(path)
    await send(ctx, path)
}

module.exports = {
    generator,
    writeKey,
    encrypt,
    decrypt,
    download,
}