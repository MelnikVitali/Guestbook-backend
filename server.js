import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv  from "dotenv"; //to use env variables
import mongoSanitize from 'express-mongo-sanitize';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Remove any keys containing prohibited characters
app.use(mongoSanitize());

const DB_URL = process.env.DB_CONNECT;

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // routes(app);

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`SERVER RUNNING ON PORT=${PORT}`, new Date());
        });
    } catch (e) {
        console.log(e);
    }
};

startApp();
