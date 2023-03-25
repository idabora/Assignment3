const mongoose=require('mongoose');
mongoose.set('strictQuery',false);

mongoose.connect('mongodb://localhost:27017/Form_API')
.then(()=>{
    console.log("Connection Succesfull......")
}).catch((err)=>{
    console.log("Connection error--",err);
})