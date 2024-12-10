const express = require('express');
const app = express();
const ejs = require('ejs');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;
const mongoose = require('mongoose');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const authRoutes = require('./routes/authRoutes.js');
const cookieParser = require('cookie-parser');


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(authRoutes);


//Swagger documentation
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//Connect to MongoDB
mongoose.connect(uri).then(
    async () =>{

        console.log(`Connected to MongoDB database`);

        app.listen(PORT, ()=>{
            console.log(`Connected to port ${PORT}`);
        });
    }
).catch((err) =>{  console.log(`Error connecting to database: ${err}`); });