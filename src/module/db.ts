// /**
//  * mongodb 数据库操作类
//  */


import config from './config'
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient

class Db {
    public client:mongodb.MongoClient | undefined
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
        return new Promise<mongodb.MongoClient>((resolve, reject) => {
            if(!this.client) {
                MongoClient.connect(config.url, {useUnifiedTopology:true}, (err, client) => {
                    if(err){
                        reject(err)
                    } else {
                        console.log('db server start success!')
                        this.client = client
                        resolve(client)
                    }
                })
            } else {
                resolve(this.client)
            }
        })
    }

    insert<T>(collectionName:string, doc:T):Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.connection().then((client) => {
                 const db = client.db()
                 const result = db.collection(collectionName).insert(doc, (err, result) => {
                     if(err){
                         resolve(false)
                         reject(err)
                     } else {
                         resolve(true)
                     }
                 })
            })
        })
    }

    insertMany<T>(collectionName:string, docs:T[]):Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.connection().then((client) => {
                 const db = client.db()
                 const result = db.collection(collectionName).insertMany(docs, (err, result) => {
                     if(err){
                         resolve(false)
                         reject(err)
                     } else {
                         resolve(true)
                     }
                 })
            })
        })
    }

    delete(collectionName:string, filter:object):Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.connection().then((client) => {
                const db = client.db()
                db.collection(collectionName).deleteOne(filter, (err, result) => {
                    if(err) {
                        resolve(false)
                        reject(err)
                    } else {
                        resolve(true)
                    }
                })
            })
        })
    }

    update(collectionName:string, filter:object, update:object):Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            this.connection().then((client) => {
                const db = client.db()
                db.collection(collectionName).updateOne(filter, {$set: update}, (err, result) => {
                    if(err){
                        resolve(false)
                        reject(err)
                    } else {
                        resolve(true)
                    }
                })
            })
        })
    }
    
    // 使用函数泛型来约束返回结果
    find(collectionName:string, filter:object):Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.connection().then((client) => {
                 const db = client.db()
                 const result = db.collection(collectionName).find(filter)
                 result.toArray((err, docs) => {
                     if(err) {
                         reject(err)
                     } else {
                         resolve(docs)
                     }
                 })
            })
        })
    }

    aggregate(collectionName:string, pipeline:object[]):Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.connection().then((client) => {
                const db = client.db()
                db.collection(collectionName).aggregate(pipeline).toArray((err, docs) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(docs)
                    }
                })
            })
        })
    }
}


export default Db