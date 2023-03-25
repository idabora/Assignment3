const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser=require('cookie-parser');
require('./connection/connection')
const controller=require('./middleware/controller')
const config = require('./config/config')
const path = require('path');
const flash=require('connect-flash')
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt');
const methodOverride = require('method-override')


const hostname = '127.0.0.1';
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(methodOverride(function (req, res) {
   // console.log("upto here")
   // console.log(req.body)
   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
       console.log("upto there")
       // look in urlencoded POST bodies and delete it
       let method = req.body._method
       delete req.body._method
       return method
   }
}))



const templatePath = path.join(__dirname, '/public')
const staticPath = path.join(__dirname, '/public/style')
app.set('view engine', 'hbs');
app.set('views', templatePath)
app.use(express.static(staticPath));



//API ROUTES
app.use('/',require('./routes/register'));
app.use('/login',require('./routes/login'));
app.use('/stories', require('./routes/stories'));


app.get('/forgetPassword',(req,res)=>{
   res.render('forget');
})

app.post('/forgetPassword',controller.forget_password)


app.get('/resetpassword',controller.reset_password)

app.listen(PORT, () => {
   console.log(`Listening on Port http://${hostname}:${PORT}`);
})