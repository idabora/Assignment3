const express=require('express');
const router=express.Router();
const cookieParser=require("cookie-parser");
const Post=require('../DB/postschema');
const controller=require('../middleware/controller')
const flash=require('connect-flash')
const Form_data=require('../DB/schema')
const bcrypt=require('bcrypt');
const crypto=require("crypto");


const algo='aes-256-cbc';
const iv=crypto.randomBytes(16);
const key='iamastudentofengineeringplmkoijn';


router.get('/',(req,res)=>{
   res.render('login');
})

router.get('/home/:id' , async (req,res)=>{
   try{
      var id=req.params.id;
      console.log(id)
      const user = await Form_data.findOne({_id:id});
      // console.log(user)
      // console.log("here....");
      const token=await controller.generateAuthToken(user.id,user);
      const Posts=await Post.find()
      // const decipher=crypto.createDecipheriv(algo , key ,iv);
      // let decryptedData=decipher.update(Posts.toString() , 'hex' , 'utf-8' );
      // decryptedData +=decipher.final("utf-8");
      // const token=req.token;
      console.log("HOME PAGE")
      res.cookie('jwt_token',token,{
         httpOnly:true
      })
      res.render('home',{
         Posts,id
      });
      return
      
  }catch(err){
      console.log(err);
  }


 })


router.post('/', async (req,res)=>{
   console.log("hello again")
    const Username=req.body.username;
    const Password=req.body.password;
 
    if(Username && Password)
    {
       var user=await Form_data.findOne({username:Username})
       
       if(user!=null)
       {
          const ismatch= await bcrypt.compare(Password,user.password)
 
          if(ismatch==true)
          {
               console.log(user.id)
               // const token=await controller.generateAuthToken(user.id,user);
               // console.log('at register-',token);
            // _id se isObjectId("asjcbsacadahg........") ye data milega
            // console.log(user,user.id);
            var id=user.id.toString();
         //    res.cookie("jwt_token", token,{
         //       httpOnly:true
         //   });
            return res.redirect(`/login/home/${id}`);
          }
          else{
             req.flash('message','Incorrect Password')
             return res.redirect('/login',{message:req.flash('message')});
          }
 
       }
       else{
          req.flash('message','User not found')
          return res.redirect('/login',{message:req.flash('message')});
 
 
       }
    }
    else{
       req.flash('message','Make sure each input field is filled');
       return res.redirect('/login',{message:req.flash('message')});
    }
 })



 module.exports=router;



