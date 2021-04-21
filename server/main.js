const Koa = require('koa')
const cors = require('koa2-cors')
const rsaApi = require('./router/api')
const app = new Koa()

const koaBody = require('koa-body')

/* 跨域中间件 */
app.use(
	cors({
		methods: ['GET', 'POST', 'DELETE', 'PATCH'],
	})
)

/* 参数解析中间件 */
app.use(
	koaBody({
		multipart: true,
		formidable: {
			maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
		},
	})
)

app.use(rsaApi.routes())
app.use(rsaApi.allowedMethods())
app.listen(8888, () => {
	console.log('koa服务器启动')
})
