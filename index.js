{/*importing all the modules*/ }
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const port = 9000 || process.env
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

{/*Mongodb related stuff*/ }
const url = "mongodb+srv://root:pranavj1610@cluster0.rctns.mongodb.net/user?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected to the database")
});

{/*User Schema*/ }

const Usermodel = new mongoose.Schema({
    Username: String,
    Email: String,
    Password: String
});

const User = mongoose.model('User', Usermodel)

{/*Routes*/ }

app.post("/3idiotsclub_server/register_newUesr", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password,10,(err,hash)=>{
       if(hash){
        User.create({
            Username: name,
            Email: email,
            Password: hash
        })
            .then(() => {
                res.send("user created succesfully")
               
            })
        }
    })
    
})
app.post("/3idiotsclub_server/Login_newUesr", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    User.findOne({Username:name},(err,doc)=>{
        if(doc)
        {
          const isCorrect = bcrypt.compareSync(password,doc.Password)
          
          if(isCorrect){
            
            const access_token=jwt.sign(doc.Username,"_my_secret_key")
            res.json({accessToken:access_token}) 
          }
          else if(!isCorrect){
              res.send('password incorrect')
          }
        
        }
    })

  
    
})

app.get('/3idiotsclub_server/:username',authenticationToken,(req,res)=>{     
    User.findOne({Username:req.params.username},(err,doc)=>{
        if(err){
            res.sendStatus(404)
        }
        if(doc){
            res.json(doc)
        }
    })

    
     
})









{/*Middlewares*/}


function authenticationToken (req,res,next){
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]
   if(token){
       jwt.verify(token,"_my_secret_key",(err,user)=>{
           if(err){res.sendStatus(403)}
           if(user){req.user=user;next()}
       })
   }
   else{
       res.sendStatus(403)
   }

   
    
}












app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})