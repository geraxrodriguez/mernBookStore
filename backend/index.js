import express from 'express';
import mongoose from 'mongoose';
import { PORT } from './config.js';
import { DB_STRING } from './config.js';
import booksRoute from './router/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// CORS middleware
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))
app.use(cors())

// route for books
app.use('/books', booksRoute)

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome!')
});

mongoose
    .connect(DB_STRING)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`)
        });
    })
    .catch((err) => {
        console.log(err)
    });