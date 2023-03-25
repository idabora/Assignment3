// const { max } = require('moment/moment');
const mongoose=require('mongoose');

const StorySchema=new mongoose.Schema({

        body: {
            type:String,
            // required: true
        },
        user:[{
            type: mongoose.Schema.Types.ObjectId ,
            ref: "Form_data"
        }],
        createdAt:{
            type:Date,
            default: Date.now(),
            maxLength:15
        }
})
module.exports=mongoose.model('Post',StorySchema)