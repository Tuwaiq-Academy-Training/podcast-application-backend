const mongoose = require('mongoose');
const express =require('express');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/podcastApp');




//Schema 1

const userSchema =mongoose.Schema({
    name: { type:String,
        required:true
    },
  username:String,
  gander:String,
      email:String
    })
    const users= mongoose.model('user',userSchema);

  //Schema 3
    const commentSchema =mongoose.Schema({
        descirption:String,
        userID:{
            type:mongoose.ObjectId,
            ref:'user',
           required:true
          },
          podcastID:{
              type:mongoose.ObjectId,
              ref:'podcast',
             required:true
            }
        })
  const comments= mongoose.model('comment',commentSchema);
//Schema 2
  const podcastSchema =mongoose.Schema({
      name_podcast: String,
      userID:{
          type:mongoose.ObjectId,
          ref:'user',
          required:true
        },
        comments:{
            type: [mongoose.ObjectId],
            ref:"comment"
        },
    tags:String
  })
const podcasts= mongoose.model('podcast',podcastSchema);

//insert
app.post('/podcast/create/comment', (req,res)=>{
    new comments((req.body)).save().then(() => res.json({"mag":"comment created"}));
})
//find
app.get('/comment', (req,res)=>{  comments.find({}).populate('userId').then((data)=>{ res.json(data); })})

 app.listen(3000,()=>{console.log("express started !")})