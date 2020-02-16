// /**
//  * mongodb 数据库操作类
//  */


import config from './config'
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient

class Db {
    public client:any
    static instance:Db | null

    static getInstance() {
        if(!Db.instance) this.instance = new Db()
        return this.instance
    }

    constructor() {
        console.log('constructor')
        this.connection()
    }

    connection() {
        return new Promise((resolve, reject) => {
            if(!this.client) {
                MongoClient.connect(config.url, {useUnifiedTopology:true}, (err, cliect) => {
                    if(err){
                        reject(err)
                    } else {
                        console.log('db server start success!')
                        this.client = cliect
                        resolve(cliect)
                    }
                })
            }
        })
    }

    add() {

    }

    delete() {

    }

    updata() {

    }
    
    // 使用函数泛型来约束返回结果
    find<T>(collectionName:string, json:object):Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            
        })
    }

    aggregate() {

    }
}


export default Db