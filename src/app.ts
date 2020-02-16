import Koa from 'koa'

const app = new Koa()


// 中间件
app.use(async (ctx)=>{
    ctx.body='index1'
})

app.listen(3000, ()=>{
    console.log('serve start on 3000')
})