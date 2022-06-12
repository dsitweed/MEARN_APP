import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

const URI = process.env.DB_URI;

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors()); 

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conneted to DB');
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    }).catch(err => {
        console.log('err', err);
    }) 

