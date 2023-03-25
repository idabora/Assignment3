const express = require('express');
const router = express.Router();
const Post = require('../DB/postschema');
const flash = require('connect-flash')
const crypto=require("crypto");
const config = require('../config/config')
const Form_data = require('../DB/schema')
const controller=require('../middleware/controller')


const algo='aes-256-cbc';
const iv=crypto.randomBytes(16);
const key='iamastudentofengineeringplmkoijn';


router.post('/:id',controller.ensureAuth,  async (req, res) => {
    try {
        console.log(req.params.id)
        var id = req.params.id;
        console.log(id);

        const userData = await Form_data.findOne({ _id: id });
        console.log(userData,"******************************");
        console.log(userData.Token);
        const token = userData.Token;
        console.log("userrrr");
        const message=req.body;

        const cipher=crypto.createCipheriv(algo , key ,iv);
        let encryptedData=cipher.update(message.toString() , 'utf-8' , 'hex' );
        encryptedData +=cipher.final("hex");
        // const base64data=Buffer.from(iv , 'binary' ).toString('base64');
        // await Form_data.Post('strings').insertOne({
        //     iv: base64data,
        //     body:encrypteData
        // });
        console.log(encryptedData);
        
        // req.body=encryptedData.toString();
        await Post.create({body:encryptedData})
        res.cookie('jwt_token', token, {
            httpOnly: true
        })
        return res.redirect(`/login/home/${id}`)
    } catch (err) {
        console.log(err);

    }
})



// show edit page
//GET /stories/edit/:id
router.get('/editpage/:id', controller.ensureAuth ,  async (req, res) => {
    var id = req.params.id;
    const post = await Post.findOne({
        _id: req.params.id
    }).lean()
    const uid = req.userdata.id;
    console.log(post)
    // console.log(uid)
      const token=req.token;
      console.log(token)
      res.cookie('jwt_token',token,{
         httpOnly:true
      })
    if (!post) {
        console.log("error in edit page");
    }
    else {
        console.log("sagdja");
        res.render('editpage',
            {
                post, id

            })
    }
})




// PUT request
// route PUT /stories/id
router.put('/editpage/:id',controller.ensureAuth,  async (req, res) => {
    console.log("innnnnn")
    var id = req.params.id;
    var post = await Post.findById(req.params.id).lean()
    const uid = req.userdata.id;
    if (!post) {
        console.log("error hai ")
    }
    else {

        story = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        console.log(story);
        // console.log("*************");
        res.redirect(`/login/home/${uid}`);
    }
})


// DELETE request
// route DELETE /stories/id
router.delete('/delete/:id',controller.ensureAuth,  async (req, res) => {
    try {
        var id = req.params.id;
        await Post.findByIdAndRemove({ _id: req.params.id })
        uid=req.userdata.id;
        res.redirect(`/login/home/${uid}`)
    } catch (err) {
        console.log(err);
    }
})

// router.put("/like/:id" , async(req,res,next)=>{

//     var postId=req.params.id;

//     //to add which posts user liked (user schema)
//     req.session.user=await Forms_data.findByIdAndUpdate(userId, { [option] : { likes : postId } } , { new : true })
//     .catch((err)=>{
//         console.log(err);
//     })

//     //to add likes on post (post schema)
//     var post =await Post_data.findByIdAndUpdate(postId, { [option] : { likes : userId } } , { new : true })
//     .catch((err)=>{
//         console.log(err);
//     })


//     res.send(post);

// })

module.exports = router;