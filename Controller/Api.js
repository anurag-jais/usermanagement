const User = require('../models/user');
const UUID = require('uuid');
const services = require('../Services/service');

exports.createUser = (req,res,next)=>{
    services.createUserFunc(req.body)
        .then( result=>{
            console.log(result);
            console.log('Created User');
            res.send("Created User");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
};
exports.getUser = (req,res,next)=>{
    services.getUserFunc(req.params.id)
    .then(result=>{
        if(result.length>0)
            res.send(result);
        else
            res.send("USER NOT FOUND");
    })
    .catch(err=>{
        res.status(500).send("err");
    });
};
exports.updateUser = (req,res,next)=>{
    services.updateFunc(req.params.id,req.body)
    .then(user=>{
        if(user.nModified === 0)
            res.send("NOT UPDATED");
        else
            res.send("USER IS UPDATED");
    })
    .catch(err=>{
        if(err){ res.status(500).send("ERROR");}
    });
};

exports.deleteUser = (req,res,next)=>{
    services.deleteUserFunc(req.params.id)
    .then(user=>{
        if(user.deletedCount === 0)
            res.send("ID NOT FOUND");
        else
            res.send("USER IS DELETED");
    })
    .catch(err=>{
        res.send(err);
    });
};
exports.filterAge = (req,res,next)=>{
    services.filterAgeFunc()
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
    services.filterNameFunc(req.params.value)
    .then(user=>{
        if(user.length>0)
            res.send(users);
        else
            res.send("SUCH FILTER NOT EXIST");
    })
    .catch(err=>{
        res.status(500).send("NAME NOT FOUND");
    });
};
exports.filterAddress = (req,res,next)=>{
    
    services.filterAddressFunc()
    .then(user=>{
        if(user.length>0)
            res.send(users);
        else 
            res.send("SUCH FILTER NOT EXIST");
    })
    .catch(err=>{
        res.status(500).send("ADDRESS NOT FOUND");
    });
};
exports.filterProfession = (req,res,next)=>{
    
    services.filterProfessionFunc(req.params.value)
    .then(user=>{
        if(user.length>0)
            res.send(users);
        else
            res.send("SUCH FILTER NOT EXIST");
    })
    .catch(err=>{
        res.status(500).send("PROFESSION NOT FOUND");
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

    //User.find(queryBuilder)
    services.compoundfilterFunc()
    .then(users=>{
        res.send(users);
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    });
};
