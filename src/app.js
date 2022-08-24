"use strict";



const express = require("express")
const db = require("./models/db")
const base = require("./routes/base")
let app = express();
const path = require("path");
// const { order } = require("./models/order");

// app.set("db", db);

app.use(
  express.json()
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");
// order.sequelize.sync();

// app.get('/',(request,response)=>{
//     try {
//         sequelize.authenticate()
//             .then(()=> console.log('Connection has been established successfully.'))
//             response.json(` ${add(1,2)}!!`)
//         } catch (error) {
//             // console.error('Unable to connect to the database:', error);
//             response.json(`${error}`)
//     }
// })

app.use('/public',express.static('public'))


app.use('', base);

app.use((req, res, next) => {
  res.render('error');
});

module.exports = app;