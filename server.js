const express=require("express");
const mysql=require("mysql");

const db=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'pass',
    port:"33061",
    database : 'first_express',

});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("connected")
})


const app=express();

app.listen(3000,()=>{
    console.log("starting")
});