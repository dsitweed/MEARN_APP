import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import multer from "multer";
import 'dotenv/config';

import auth from './routes/auth.js';
import users from './routes/users.js';
import posts from './routes/posts.js';
import categories from './routes/categories.js';

const app = express();
const port = process.env.PORT || 5000;
const URI = process.env.MDB_URI;
// set images folder save
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage: storage });


app.use(bodyParser.json({limit:'30mb'}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));
app.use(cors());

mongoose.connect(URI)
    .then(() =>{
        app.listen(port, () => {
            console.log("Connected to MongooseDB")
            console.log(`Server is running on: http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.log("err:", err);
    });

app.use('/api/auth', auth);
app.use('/api/users', users);   
app.use('/api/posts', posts);
app.use('/api/category', categories);

app.post('/api/upload', upload.single("file"), (req,res) => {
    res.status(200).json("File has been uploaded");
});

app.get('/', (req, res) => {
    res.json("heelo");
})