// const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/";
// const app = express();
// app.use(express.json());



// app.get('/api/users/create', function (req, res) {

//   MongoClient.connect(url, function (err, client) {
//       if (err) throw err;
//       const db = client.db("Reports");
//       const collection = db.collection('repo_card');
//       collection.find().toArray((err, items) => {
//           if (err) throw err;
//           res.send(items);
//       });
//   });
// });


// app.get('/api/users/show_all/:value', function (req, res) {
//   MongoClient.connect(url, function (err, client) {
//       if (err) throw err;
//       const db = client.db("Reports");
//       const collection = db.collection('repo_card');
//       collection.find({ $or: [ {title: { $regex: req.params.value}},
//       {description: {$regex: req.params.value}} ] }).toArray((err,items)=>{
//         res.send(items);
//       });
//   });
// });




// mongoose.connect('mongodb://localhost:27017/')
//                 .then(resut =>{
//                     app.listen(3000);
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });