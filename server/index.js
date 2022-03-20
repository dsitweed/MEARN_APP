import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import 'dotenv/config';

import auth from './routes/auth.js';
import users from './routes/users.js';
import posts from './routes/posts.js';
import categories from './routes/categories.js';

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MDB_URI;

app.use(bodyParser.json({limit:'30mb'}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));

mongoose.connect(URI)
    .then(() =>{
        app.listen(PORT, () => {
            console.log("Connected to MongooseDB")
            console.log(`Server is running on: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.log("err:", err);
    });

app.use('/api/auth', auth);
app.use('/api/users', users);   
app.use('/api/posts', posts);
app.use('/api/category', categories);   