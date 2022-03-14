const express = require('express');
const bodyParser = require("body-parser");
const userRouter = require('./routers/userRouter');
const transactionRouter = require('./routers/transactionRouter');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', userRouter);
app.use('/', transactionRouter);
// SERVER PORT
const PORT = 5000;
// DB
const connectionString = 'mongodb://127.0.0.1/bank-system';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('connection work'))

app.listen(PORT, () => {
    console.log(`SERVER RUN IN http://localhost:${PORT}`);
});

