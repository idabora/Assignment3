console.log("heloooo");
const express=require('express');
const router=express.Router();
const flash=require('connect-flash')
const Form_data=require('../DB/schema');
const controller=require('../middleware/controller')
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt');


// Login/Landingn Page
// route GET/
router.get('/',(req,res)=>{
    res.render('register');
})


router.post('/register', async (req, res) => {

    const Username = req.body.username.trim();
    const Email = req.body.email.trim();
    const Password = req.body.password.trim();
    const Cpassword = req.body.confirm_p.trim();
 
    console.log(Username, Email, Password, Cpassword);
 
    if (Username && Email && Password && Cpassword) {
 
       var user = await Form_data.findOne(
          {
             $and:[
                { username: Username },{ email: Email }
             ]
          }
       )
       if (user == null) {
          const data = new Form_data({
             username: req.body.username,
             email: req.body.email,
             password: req.body.password,
             confirmPassword: req.body.confirm_p,
 
          })
          if (req.body.password == req.body.confirm_p) {
             
             data.password = await bcrypt.hash(req.body.password, 10);
             console.log(data);
             console.log("entered");
             Form_data.create(data)
             .then(async (user) => {  
                res.json({
                   message: 'Registered Successfully...',
                   values: user
                   })

                })
          }
          else {
             req.flash('message', 'Passwords are not matching');
             return res.redirect('/', { message: res.flash('message') })
          }
       }
       else {
          req.flash('message', 'Username and Email already in use');
         return  res.redirect('/', { message: res.flash('message') })
       }
 
 
    }
    else {
       req.flash('message', 'Make sure each input is filled');
       res.render('/', { message: req.flash('message') })
    }
 })
 module.exports=router;