const User = require('../models/user');
const UUID = require('uuid');

 exports.createUserFunc = (body)=>{ 
    const name = body.name;
    const dob =  body.dob;
    const gender = body.gender;
    const address = body.address;
    const profession = body.profession;
    const user = new User({
        id: UUID(),
        name: name,
        dob: dob,
        gender: gender,
        address: address,
        profession: profession,
    });
    return user.save()
};
exports.updateFunc = (id,body)=>{
    return User.update({id: id},{ name:body.name,
        dob:body.dob,
        gender:body.gender,
        address: body.address,
        profession: body.profession })
};
 exports.getUserFunc = (id)=>{
    console.log("getUserFunc is running");
        return User.find({id: id})   
};
exports.deleteFunc = (id)=>{
    return User.deleteOne({id: id})
};
exports.filterAgeFunc = ()=>{
    return User.find()
}; 
exports.filterNameFunc = (name)=>{
    return User.find({name: name})
};
exports.filterAddressFunc =(address)=>{
    return User.find({address: {$regex : address}})
};
exports.filterProfessionFunc = (profession)=>{
    return User.find({profession: profession})
}; 
 exports.compoundfilterFunc = (queryBuilder)=>{
     return User.find(queryBuilder)
 };


