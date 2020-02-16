import Koa from 'koa'
import Router from 'koa-router'
import Db from './module/db'

const app = new Koa(),
    router = new Router(),
    db = new Db()

router.get('/', async (ctx) => {
    ctx.body = 'index'
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, ()=>{
    console.log('serve start on 3000')
})