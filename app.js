const express = require('express');
const app = express();
const path = require('path');
// const fs = require('fs');


const mongoose = require('mongoose');
const bodyparser = require("body-parser");
// getting-started.js
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
                                                  // db name   
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const port = 8000;

// defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

// defining collection / compiling to model  
const contact = mongoose.model('contact', contactSchema);
// name of the model is "contact" represents collection in mongoDB

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') // set template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory to "views"

//ENDPOINTS
app.get('/', (req, res)=>{
    const con = "msg when get request marenge"
    // const params = {'title':"html+node.js+expres+pug" , 'content':con}
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const con = "msg when get request marenge"
    // const params = {'title':"html+node.js+expres+pug" , 'content':con}
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req,res)=>{
    var myData = new contact(req.body);
    myData.save()
    .then(()=>{
        res.send("this data is saved in db.")
    })
    .catch(()=>{
        res.status(400).send("data is not saved in db");
    })

    // res.status(200).render('contact.pug');
})
//START THE SERVER
app.listen(port, ()=>{
    console.log(`the application started successfully on port ${port}`);
})
