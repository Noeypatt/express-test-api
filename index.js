const express = require('express')
const app = express()
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


app.get('/', (req, res) => {
    //const profile = { name: "Noey", bd: "12/12/12", age: "22" }
    // res.status(404) //StatusCode
    // res.send(profile) 
    // throw new Error('Not') //Error

    
       var users =  db.collection('user').find({}).toArray(function(err,results){
           console.log(results);
       })
       
       console.log(users);
       res.end()

//mongoose
    // var usersSchema = new mongoose.Schema({
    //     name: String,
    //     password: String
    // })
    // var users = mongoose.model('user', usersSchema)
    // users.find({}, function (err, user) {
    //     console.log(user);
    //     res.send(user)
    // })

})
app.get('/users', (req, res) => res.send('Hello')) //method GET

app.post('/login', (req, res) => { //method GET in Postman
    // console.log(req.param('name')); 
    console.log(req.body);
    res.send('POST request to the homepage')
})

app.listen(port, () => console.log("Running"));
