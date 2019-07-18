const User = require('../models/user');

// exports.updateFunc = User.update({ id: req.params.id }, {
//     name: req.body.name,
//     dob: req.body.dob,
//     gender: req.body.gender,
//     address: req.body.address,
//     profession: req.body.profession
// }, function (err, user) {
//     if (err) return res.status(500).send("ERROR");
//     else
//         return user;
// });
// exports.getUserFunc = (id)=>{
//     console.log("getUserFunc is running");
//     User.find({ id: id }, function (err, docs) {
//         if (err) {
//             return "USER NOT EXIST";//res.status(500).send("ERROR");
//         }
//         //console.log(docs);
//         return docs; //res.send(docs);
//     });
// }
// exports.deleteFunc = User.deleteOne({ id: req.params.id }, function (err, user) {
//     if (err) { res.status(404).send("ID NOT FOUND"); }
//     console.log("deleteisdone");
//     res.send(user);
// });
// exports.filterAgeFunc = User.find()
//     .then(users => {
//         console.log(users);
//         function isGreaterThan(value) {
//             let today = new Date();
//             let age = today.getFullYear() - value.dob.getFullYear();
//             let m = today.getMonth() - value.dob.getMonth();
//             if (m < 0 || (m === 0 && today.getDate() < value.dob.getDate())) {
//                 age--;
//             }
//             return age > req.params.age;
//         }
//         const filteredarray = users.filter(isGreaterThan);
//         console.log(filteredarray);
//         res.send(filteredarray);
//     });
// exports.filterNameFunc = User.find({ name: req.params.value }, function (err, users) {
//     if (err) { res.status(500).send("NAME NOT FOUND"); }
//     res.send(users);
// });
// exports.filterAddressFunc = User.find({ address: { $regex: req.params.value } }, function (err, users) {
//     if (err) { res.status(500).send("NAME NOT FOUND"); }
//     res.send(users);
// });
// exports.filterProfessionFunc = User.find({ profession: req.params.value }, function (err, users) {
//     if (err) { res.status(500).send("PROFESSION NOT FOUND"); }
//     res.send(users);
// });
// exports.compoundfilterFunc = User.find(queryBuilder)


