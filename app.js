const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const UUID = require('uuid');
//const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb://localhost:27017/";
const app = express();
app.use(express.json());

const usersSchema = new Schema({ 
    id:{
        type: String,
        required : true
    },
    name:{
        type: String,
        required: true
    },
    dob:{
        type: Date
    },
    gender:{
        type: String,
        required: true
    },
    address:{
        type: String,
        
    },
    profession:{
        type: String,
        required: true
    }
});


app.post('/api/users/create',(req,res,next)=>{
    //console.log(id);
    const name = req.body.name;
    const dob =  req.body.dob;
    const gender = req.body.gender;
    const address = req.body.address;
    const profession = req.body.profession;
    const user = new User({
        id: UUID(),
        name: name,
        dob: dob,
        gender: gender,
        address: address,
        profession: profession,
    });
    user.save()
        .then( result=>{
            console.log(result);
            console.log('Created User');
        })
        .catch(err => {
            console.log(err);
        })
});

app.get('/api/users/getuser/:id',(req,res,next)=>{
    User.find({ id: req.params.id}, function (err, docs) {
        console.log(docs);
        res.send(docs);
    });
});
app.post('/api/users/edituser/:id',(req,res,next)=>{
    // User.find({ id: req.params.id}, function(err, user){
        User.update({ id: req.params.id},{ name:req.body.name,
                                            dob:req.body.dob,
                                            gender:req.body.gender,
                                            address: req.body.address,
                                            profession: req.body.profession }, function(err,user){
                                                console.log(user);
                                                res.send(user);

        });
    // });
});
app.post('/api/users/deleteuser/:id',(req,res,next)=>{
    User.deleteOne({ id: req.params.id},function(err,user){
        console.log("deleteisdone");
        res.send(user);
    });
});
app.get('/api/users/filterage/:age',(req,res,next)=>{
    User.find()
    .then(users=>{
        console.log(users);
        function isGreaterThan(value){
            let today = new Date();
            let age = today.getFullYear()-value.dob.getFullYear();
            let m = today.getMonth() - value.dob.getMonth();
            if(m<0||(m === 0 && today.getDate()<value.dob.getDate())){
                age--;
            } 
            return age>req.params.age;
        }
        const filteredarray = users.filter(isGreaterThan);
        console.log(filteredarray);
        res.send(filteredarray);
    });
});
app.get('/api/users/filtername/:value',(req,res,next)=>{
    User.find({name: req.params.value},function(err,users){
        res.send(users);
    });
});
app.get('/api/users/filtercity/:value',(req,res,next)=>{
    User.find({ address: {$regex: req.params.value} },function(err,users){
        res.send(users);
    });
});
app.get('/api/users/filterprofession/:value',(req,res,next)=>{
    User.find({profession: req.params.value},function(err,users){
        res.send(users);
    });
});
app.get('/api/users/compoundfiltering/:query',(req,res,next)=>{
    let queryCond = {}
    if(query.name){
           queryCond.name={$regex:query.name,$options:"i"};
    }
    if(query.profession){
        queryCond.profession = {$regex:query.profession,options:"i"};
    }
    if(query.dob){
        queryCond.dob = query.dob;
    }
    User.find(queryCond)
    .then(users=>{
        res.send(users);
    });
});
const User = mongoose.model('User',usersSchema); 

console.log(User);

mongoose.connect('mongodb://localhost:27017/UsersManagment')
                .then(resut =>{
                    app.listen(3000);
                })
                .catch(err => {
                    console.log(err);
                });
  

