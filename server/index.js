import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
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
        const extension = file.originalname.split('.');
        const extenFile = extension[extension.length - 1];
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extenFile);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


app.use(bodyParser.json({limit:'30mb'}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));
//random string for cookie signed
app.use(cookieParser("random string for cookie signed"));
app.use(cors({
    origin:true,
    credentials: true
}));

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
app.use('/api/categories', categories);

app.post('/api/upload', upload.single("file"), (req,res) => {
    res.status(200).json("File has been uploaded");
});

app.get('/', (req, res) => {
    res.json("heelo");
})