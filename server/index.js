const express = require('express');
const app= express();
const cors= require('cors');
const bodyParser = require('body-parser');
const mysql= require('mysql');

const db= mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "deliverydb",
});
 
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.get("/api/get", (req, res) => {

    const item = req.body.item;
    const qt= req.body.qt;
    const amt= req.body.amt;

    const sqlSelect = "SELECT * FROM product_sold";
    db.query(sqlSelect, [item, qt, amt], (err, result) =>{
        res.send(result);
    });
});
app.post("/api/insert", (req, res)=>{

    const item = req.body.item;
    const qt= req.body.qt;
    const amt= req.body.amt;


    const sqlInsert = "INSERT INTO product_sold (item, qt, amt) VALUES (?,?,?)";
    db.query(sqlInsert, [item,qt,amt], (err, result)=>{
        console.log(result);
    });
});
app.listen(3001, ()=>{
    console.log('running on port 3001')
});