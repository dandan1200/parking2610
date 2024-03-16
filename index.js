require('dotenv').config();

const routes = require('./routes/routes');
const Model = require('./models/model');

const mongoString = process.env.DATABASE_URL

const express = require('express');
const mongoose = require('mongoose');

//Database config
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


//App config
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.json());
app.use('/', routes);
app.use(express.static("public"));

app.get('/', async (req, res) => {
    const lots = await Model.find();
    res.render("index", {"lots": lots, "day" : "availability_monday"});
});
  
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})