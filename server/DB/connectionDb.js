const mongoose = require("mongoose");

// DB
const connectionString = 'mongodb://127.0.0.1/bank-system'
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('connection work'))
