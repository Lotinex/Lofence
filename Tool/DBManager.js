const MySQL = require('mysql')
const DBConfig = require('./db.json')

/*const DB = MySQL.createConnection({
    host : DBConfig.host,
    port : DBConfig.port,
    user : DBConfig.user,
    password : DBConfig.MySQLPassword,
    database : DBConfig.database
})*/
const DB = MySQL.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : DBConfig.password,
    database : 'lofence'
})
/**
 * 새 개체를 등록한다.
 * @param {string} table 
 * @param {{name : string; id : string; date : string; lv : number; pw : string;}} product 
 */
exports.createOne = (table, product) => {
    DB.query(`INSERT INTO ${table} VALUES ("${product.id}","${product.date}","${product.name}","${product.lv}","${product.pw}");`)
}
exports.delete = (option) => {
    DB.query(`DELETE FROM ${option.table} WHERE ${option.condition};`)
}
exports.dropColumn = (option) => {
     DB.query(`ALTER TABLE ${option.table} DROP ${option.target};`)
}
exports.find = (option, cb) => { //TODO: return Promise Object instead of using callback function
    DB.query(`SELECT * FROM lofence.${option.table} WHERE ${option.condition};`, (err, result) => {
        cb(result)
 })
}
exports.test = function(cb){
    DB.query(`SELECT * FROM lofence.users WHERE id="a"`, (err, result) => {
        if(err) console.log(err)
        cb(result)
    })
}
exports.Table = class {
    constructor(table){
        this.table = table
    }
    find(condition){
        let table = this.table
        return new Promise((rs, rj) =>{
            exports.find({
                table,
                condition
            }, result => {
                rs(result)
            })
        })
    }
    createOne(product){
        let table = this.table
        exports.createOne(table, product)
    }
}