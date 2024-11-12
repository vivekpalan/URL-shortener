require('dotenv').config();
const express = require('express');
const path = require('path')
const urlRoutes = require('./routes/urlRoutes')
const { connection } = require('./connection/connect');
const URL = require('./models/url')
const app = express();
console.log(process.env.PORT,process.env.MONGO_DB_URI)

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.static(path.join(__dirname,'public')));


connection(process.env.MONGO_DB_URI).then(()=>{
    console.log('MongoDB connected successfully')
})
// connection('mongodb://localhost:27017/short-url').then(()=>{
//     console.log('MongoDB connected successfully')
// })


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/url',urlRoutes);


app.get('/',async(req,res)=>{

    const result = await URL.find()
   res.render('index',{
    urls: result,
   })
})

// app.post('/test',(req,res)=>{
//     const name = req.body.name;
//     const email = req.body.email;
//     res.send(`Hello ${name} your email ${email} is valid`)
// })



app.get('/url/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;

    const result = await URL.findOneAndUpdate({ shortId },{
        $push:{ visitHistory:{
            timestamp: Date.now()
        } }
    })

    res.redirect(result.redirectURL)
})

// console.log(typeof(Date.now().toString()))

// app.post('/url',async(req,res)=>{
//     //Call short id package with length 8;
//     const shortId = nanoid(8)

//     //db query to add the data in the db

//     await User.create({
//         shortId : shortId,
//         redirectUrl : req.body.url,
//         visitedHistory : Date.now()
//     }) 

//     res.json({ shortId : shortId })

// })

// app.get('/url/:shortid',(req,res)=>{
//     //Need db value to get the redirect value

// })

app.listen(8001,()=>console.log('Server started'));