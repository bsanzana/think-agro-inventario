const express = require('express');
const cors = require('cors');
require('dotenv').config()
require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const PORT = process.env.PORT || 3000;



app.use('/api', require('./routes/api'));

app.listen(PORT, ()=> {
    console.log(`Server ON port ${PORT}`);
})

