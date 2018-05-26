const Videojuego = require('../models/Videojuego');
const Sucursal = require('../models/Sucursal');
const path = require('path');
const express = require('express');
const router = express.Router({mergeParams: true});

router.post('/new', (req, res) => {
    //console.log('req.files: ', req.files);
    //console.log('req.body.videojuego: ', JSON.parse(req.body.videojuego));
    let vj = JSON.parse(req.body.videojuego);
    let i = 0;
    req.files.imagen.name = vj.titulo + ".jpg";
    let rutaImagen = path.join("/assets/img/" + req.files.imagen.name);
    let rutaAbsoluta = path.join(__dirname + "/../../src/assets/img/" + req.files.imagen.name);
    Videojuego.findOne({
        $or: [
            {titulo_lower: vj.titulo.toLowerCase()},
            {codigo: vj.codigo}
        ]
    }, (err, videojuegoExistente) => {
        if(err)
            return res.status(500).send({message: err.message});
        if(videojuegoExistente)
            return res.status(500).send({message: 'Ya existe un videojuego con ese titulo'});
        
        let videojuego = new Videojuego({
            titulo: vj.titulo,
            titulo_lower: vj.titulo.toLowerCase(),
            codigo: vj.codigo,
            genero: vj.genero,
            plataforma: vj.plataforma,
            cantidadMinima: vj.cantidadMinima,
            cantidadMaxima: vj.cantidadMaxima,
            imagen: rutaImagen,
            urlVideo: vj.urlVideo,
            precio: vj.precio,
            descuento: vj.descuento,
            destacado: vj.destacado,
            descripcion: vj.descripcion,
            stock: vj.stock,
            file: req.files.imagen,
            activo: true
        });
        console.log(rutaImagen);
        console.log(rutaAbsoluta);
        req.files.imagen.mv(rutaAbsoluta, (err) => {
            if(err){
                console.log('Error imagen');
                return res.status(400).send({message: 'Ocurrio un error al copiar imagen'});
            }
            videojuego.save((err) => {
                if(err)
                    return res.status(500).send({message: err.message});
                Sucursal.find({}, (err, sucursales) => {
                    if(err)
                        return res.status(500).send({message: err.message});
                    sucursales.forEach(sucursal => {
                        sucursal.videojuegos.push(videojuego);
                        sucursal.save((err) => {
                            if(err)
                                return res.status(500).send({message: err.message});
                            i++;
                            if(i == sucursales.length - 1) {
                                return res.status(200).send(videojuego);
                            }
                        });
                    });
                });
            });
        });
    });
});

    router.get('/', (req, res) => {
        Videojuego.find({activo: true}, (err, videojuegos) => {
            let videojuegosArr = [];
            if(err) {
                return res.status(500).send({message: err.message});
            }
            if(videojuegos) {
                videojuegos.forEach(v => {
                    videojuegosArr.push(v);
                });
            }
            res.send(videojuegosArr);
        });
    });

module.exports = router;