const users = require ('./model')
const express = require('express')
const app = express()
const router = express.Router()
const port = 3001
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
const MongoClient = require('mongodb').MongoClient
var db

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

MongoClient.connect('mongodb://localhost:27017/test', (err, client) => {
        if (err) return console.log(err)
        db = client.db('test') // whatever your database name is
})

app.post('/login', async(req,res) => {
    // const usersSchema = new mongoose.Schema({
    //     name: String,
    //     password: String
    // })
   // var users = mongoose.model('users', usersSchema)
    var addUser = new users({"name":req.body.name,"password": req.body.password});
    await  addUser.save({})
    res.send(addUser)
})


app.get('/', (req, res) => {
   /* const profile = { name: "Noey", bd: "12/12/12", age: "22" }
    res.status(404) //StatusCode
    res.send(profile) 
    throw new Error('Not') //Error*/

   /* var users =  db.collection('users').find({}).toArray(function(err,results){
       console.log(results);
    })

    console.log(users);
    res.end()*/

/* //-------mongoDB
const usersSchema = new mongoose.Schema({
    name: String,
    password: String
})
    var users = mongoose.model('users', usersSchema)
    users =  db.collection('users').find({}).toArray(function(err,results){
        if(err) {
            return console.log(`Error has occurred: ${err}`);
          }
        console.log(results);
        res.send(results)
    })*/

//---------mongoose
    users.find({},function(err,results){
        res.send(results)
    })
})

app.delete('/login', (req,res) => {
    users.findByIdAndRemove("5d318ae7ba24bd20b003d421", function (err){
        if(err) console.log(err);
        res.send("Delete OK")
        
    } );
    //res.send(res)
})

app.get('/:id',(req,res) => {
    console.log(req.param.id);
    
    users.findById(req.param.id, function(err,results){
        if(err) console.log(err);
        res.send(results)
    })
})


app.listen(port, () => console.log("Running"));






/*app.get('/users', (req, res) => res.send('Hello')) //method GET

app.post('/login', (req, res) => { //method GET in Postman
    console.log(req.param('name')); 
    console.log(req.body);
    res.send('POST request to the homepage')
})*/