const User = require('../models/user');
const UUID = require('uuid');
//const services = require('../Services/service');

exports.createUser = (req,res,next)=>{
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
            res.send("Created User");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
};
exports.getUser = (req,res,next)=>{
    //console.log("getUser is running");
    User.find({ id: req.params.id}, function (err, docs) {
        if(err){
            res.status(500).send("ERROR");
        }
        if(docs.length>0)
            res.send(docs);
        else
            res.send("USER NOT EXIST");
    });
    // console.log("getUser is running");
    // services.getUserFunc(req.params.id)
    // .then(result=>{
    //     res.send(result);
    // })
    // .catch(err=>{
    //     res.status(500).send("err");
    // });
};
exports.updateUser = (req,res,next)=>{
    User.update({ id: req.params.id},{ name:req.body.name,
                                        dob:req.body.dob,
                                        gender:req.body.gender,
                                        address: req.body.address,
                                        profession: req.body.profession }, function(err,user){
                                            if(err){ res.status(500).send("ERROR");}
                                            console.log(user);
                                            if(user.nModified === 0)
                                            res.send("NOT UPDATED");
                                            else
                                            res.send("USER IS UPDATED");
    });
};

exports.deleteUser = (req,res,next)=>{
    User.deleteOne({ id: req.params.id},function(err,user){
        if(err){ res.status(404).send("ID NOT FOUND"); }
        if(user.deletedCount === 0)
        res.send("ID NOT FOUND");
        else
            res.send("USER IS DELETED");
    });
};

exports.filterAge = (req,res,next)=>{
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
        if(filteredarray.length>0)
            res.send(filteredarray);
        else
            res.send("SUCH FILTER NOT EXIST");
    });
};

exports.filterName = (req,res,next)=>{
    User.find({name: req.params.value},function(err,users){
        if(err){ res.status(500).send("NAME NOT FOUND");}
        if(user.length>0)
            res.send(users);
        else
            res.send("SUCH FILTER NOT EXIST");
    });
};
exports.filterAddress = (req,res,next)=>{
    User.find({ address: {$regex: req.params.value} },function(err,users){
        if(err){ res.status(500).send("NAME NOT FOUND");}
        if(user.length>0)
            res.send(users);
        else 
            res.send("SUCH FILTER NOT EXIST");
    });
};
exports.filterProfession = (req,res,next)=>{
    User.find({profession: req.params.value},function(err,users){
        if(err){ res.status(500).send("PROFESSION NOT FOUND");}
        if(user.length>0)
            res.send(users);
        else
            res.send("SUCH FILTER NOT EXIST");
    });
};

exports.compoundFilter = (req,res,next)=>{
    let queryBuilder = {};
    if(req.query.name){
            console.log(req.query.name);
           queryBuilder.name = {$regex:req.query.name,$options:"i"};
    }
    if(req.query.profession){
        queryBuilder.profession = {$regex:req.query.profession};
    }
    if(req.query.dob){
        queryBuilder.dob = req.query.dob;
    }
    if(req.query.address){
        queryBuilder.address = {$regex: req.query.address};
    }
    if(req.query.gender){
        queryBuilder.gender = req.query.gender;
    }

    User.find(queryBuilder)
    .then(users=>{
        res.send(users);
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    });
};

//module.exports = service;