const mongoose=require('mongoose');

const formSchema=new mongoose.Schema(
    {
        username:{
            type: String,
            required:[true,"Username is required"],
            unique:true,
            trim:true
        },
        email:{
            type: String,
            required:[true,"Email is required"],
            unique:true,
            trim:true
        },
        password:{
            type: String,
            required:[true,"Passwod is required"],
        },
        confirmPassword:{
            type: String,
            required:[true,"Confirm password is required"],
            
        },
        token:{
            type:String,
            default:""
        },
        Token:{
            type:String,
            default:""
        }
    }
);
const Form_data=new mongoose.model('Form_data',formSchema);
module.exports=Form_data;
