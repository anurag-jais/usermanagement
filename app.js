const mongoose = require('mongoose');
const express = require('express');
const adminRoutes = require('./Routes/adminRoute');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(adminRoutes);
mongoose.connect('mongodb://localhost:27017/UsersManagment')
                .then(resut =>{
                    app.listen(3000);
                })
                .catch(err => {
                    console.log(err);
                });
