const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/podcastApp')
const express = require("express")
const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.listen(3000,()=> console.log('express started'))

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

  //Schema 2
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
//Schema 3
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

//insert podcast
app.post('/podcast/create', (req,res)=>{
    new podcasts((req.body)).save().then(() => res.json({msg:"podcast created successfully >o<"}));
})
//update podcast
app.put('/podcast/update/', (req,res)=>{
    podcasts.updateOne(req.body).then(()=>{res.json({msg:"Yay the Podcast is updated successfully +_+"})
   })
 })

 //delete podcast
app.delete("/podcast/delete", (req, res) => {
    podcasts.deleteOne({ _id: req.body.id }).then(() => {
      res.json({ msg: "podcast deleted" });
    });
  });
//show podcast
app.get('/podcast', (req,res)=>{podcasts.find({}).then
((data)=>{ res.json(data); })})




app.get('/users',(req,res)=>{
    users.find({}).then((data)=>{
        res.json(data)
    })
});
app.post('/user/create',(req,res)=>{
    const newuser=new users(req.body);
    newuser.save().then(()=>res.json({"mes": "user created"}))
});
app.put('/user/update/:id',(req,res)=>{
    users.updateOne({_id : req.params.id},{name:req.body.name}).then(()=>{
        res.json({'mes' : "user updated"})
    })
});
app.delete('/user/delete/:id',(req,res)=>{
    users.deleteOne({_id : req.params.id},{name : req.body.name}).then(()=>{
        res.json({'mes' : "user deleted"})
    })
})
