const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;
const mongoose = require('mongoose');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const authRoutes = require('./routes/authRoutes.js');



app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(authRoutes);


//Swagger Documentation 
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


//Connect to MongoDB
mongoose.connect(uri).then(
    async () => {

        console.log(`Connected to MongoDB database`);

        app.listen(PORT, () =>{
            console.log(`Connected to port ${PORT}`);
        });

    } 
).catch((err) =>{ console.log(`Error connecting to database :${err}`); });


