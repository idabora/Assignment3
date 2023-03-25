const express=require('express');
const app=express();
const path=require('path');
// const router=express.Router();
const Forms_data = require('../DB/schema')
// const Post=require('../DB/schema');
const bodyparser=require('body-parser');


const templatepath=path.join(__dirname,'/templatepath');
const staticpath=path.join(__dirname,'/public');
const partialpath=path.join(__dirname,'/templates/partials')

app.set('view engine','hbs');
app.set('views',templatepath);

app.use(bodyparser.urlencoded({ extended: false }));



app.post("/add", controller.ensureAuth , async (req,res)=>{
    try{
        await Post.create(req.body)
        res.redirect('/home')
    }catch(err){
        console.log(err);
    }
})






























// app.get("/" , async(req,res,next)=>{
// //   console.log("hupp");
//     Post_data.find()
//     .populate("postedBy")
//     .populate("retweetData")
//     .sort({"createdAt":-1})
//     .then(async (results)=>{
//         results=await Post_data.populate(results , { path: 'retweetData.postedBy'})
//         res.send(results);
//     }).catch((err)=>{
//         console.log(err);
//     })


// })

// app.post('/',async (req,res,next)=>{
// // console.log("hjavsd");
//     if( !req.body.content )
//     {   console.log('content is not there');
//         return res.status(400).send("Conent is not there");
//     }

//     var postdata={
//         content: req.body.content,
//         postedBy:req.session.user
//     }

//     Post_data.create(postdata)
//     .then(async (newpost)=>{
//         newpost=await Forms_data.populate(newpost,{path:'postedBy'})

//         res.status(200).send(newpost);

//     }).catch((error)=>{
//         console.log(error);
//         res.sendStatus(400);
//     })



//     // res.send("WORKED.....");

// })
