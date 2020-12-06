var express = require('express')
//var parser = require('body-parser')
const DBManager = require('../Tool/DBManager')
const dice = (min, max) => {
  return Math.floor( Math.random() * (max - min + 1 ) ) + min;
}
const getTime = () => {
  let t = new Date()
  return {
      full : `${t.getFullYear()} ${t.getMonth()} ${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`,
      year : t.getFullYear(),
      month : t.getMonth() + 1,
      day : t.getDate(),
      hour : t.getHours(),
      minute : t.getMinutes(),
      second : t.getSeconds()
  }

}
var Server = express()

Server.use(express.static('public'));
Server.use(express.urlencoded({ extended : true }))
//Server.use(express.json())


Server.listen(80, function(){
  console.log("웹 서버가 열렸습니다.")
  Server.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html")
})
})

Server.post('/login', (req, res) => { //TODO: Login
  if(!req.body.id || !req.body.pw) return res.send({error : 'invalid-value'})
  let T = new DBManager.Table('users')
  T.find(`id="${req.body.id}" and pw="${req.body.pw}"`).then(u => {
    if(u.length == 0) return res.send({error : 'auth-failed'})
    res.send({profile : u[0]})
  })
})

Server.post('/register', (req, res) => {

  if(!req.body.id || !req.body.pw) return res.json({error : 'invalid-value'})

  let T = new DBManager.Table('users')

  T.find(`id="${req.body.id}"`).then(u => {
    if(u.length != 0) return res.send({error : 'id-already-exists'})
    let newProfile = {
      name : `익명${dice(0,9999)}`,
      id : req.body.id,
      pw : req.body.pw,
      lv : 1,
      date : getTime().full
    }
    T.createOne(newProfile)
    res.send({profile : newProfile})
  })

})