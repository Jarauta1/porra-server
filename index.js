const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
/* const bcrypt = require("bcrypt");
const cifrarContrasenia = require("./cifrarContrasenia") */
const cors = require("cors")


let usuarios = require("./usuarios")

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

let db;

MongoClient.connect("mongodb+srv://djarauta:dj18dj18@cluster0.v04vd.mongodb.net/porra?retryWrites=true&w=majority", function(err, client) {
    if (err !== null) {
        console.log(err);
    } else {
        app.locals.db = client.db("Porra");
    }
});

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();  
});

app.use("/usuarios", usuarios)


app.listen(process.env.PORT || 3000);
/* app.listen(3000); */