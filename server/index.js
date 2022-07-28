import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors';
import multer from "multer";
import path from "path";
import 'dotenv/config';

import auth from './routes/auth.js';
import users from './routes/users.js';
import posts from './routes/posts.js';
import categories from './routes/categories.js';
import authorPost from './routes/authorPost.js';
import google from './routes/google.js';

const app = express();
const port = process.env.PORT || 5000;
const URI = process.env.MDB_URI;
// set images folder save
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        //req.body.name luu tru ten file anh gui tu client
        cb(null, req.body.name);
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

const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "/images")));


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
app.use('/api/authorPost', authorPost);
app.use('/api/google', google);

app.post('/api/upload', upload.single("file"), (req,res) => {
    res.status(200).json("File has been uploaded");
});

app.get('/', (req, res) => {
    res.json("heelo");
})