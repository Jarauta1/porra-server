const express = require("express");
const router = express.Router();
const app = express();
const bcrypt = require("bcrypt");
const cifrarContrasenia = require("./cifrarContrasenia")

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();  
});

router.post("/registro", cifrarContrasenia, function(req, res) {
    let db = req.app.locals.db

    let nombre = req.body.nombre;
    let mail = req.body.mail;
    
   /*  let password = req.body.password; */

    db.collection("usuarios").find({ mail: mail }).toArray(function(err, datos) {
        if (err !== null) {
            res.send({mensaje: "Error: " + err})
        } else {
            if (datos.length > 0) {
                res.send({registro: "no", mensaje: "Ese mail ya ha sido utilizado"})
            } else {
              
                db.collection("usuarios").insertOne({ usuario: nombre, mail: mail/* , password: password */}, function(err, datos) {
                    if (err !== null) {
                        console.log(err)
                        res.send({registro: "no", mensaje: "Error al registrar el usuario" })
                    } else {
                        res.send({registro: "si", mensaje: "Usuario registrado correctamente", usuario: mail})
                    }
                });
            }
        }
    })

    
})



router.post("/", function(req, res) {
    let db = req.app.locals.db

    let usuario = req.body.usuario

   db.collection("usuarios").find({mail: usuario}).toArray(function(err, datos) {
        if (err !== null) {
            res.send({ mensaje: "Ha habido un error" });
        } else {
            res.send({datos})
        }
    });
});



module.exports = router;