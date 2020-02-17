import Koa from 'koa'
import Router from 'koa-router'
import Db from './module/db'

const app = new Koa(),
    router = new Router(),
    db = new Db()

router.get('/', async (ctx) => {
    const users = await db.find('users', {})
    console.log(users)
    // 测试添加

    interface User{
        name:string
    }
    const result = await db.insertMany<User>('users',[{name: '888'}])
    console.log(result)
    ctx.body = 'index'
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, ()=>{
    console.log('serve start on 3000')
})