const Videojuego = require('../models/Videojuego');
const Slider = require('../models/Slider');
const path = require('path');
const express = require('express');
const router = express.Router({mergeParams: true});

router.post('/new', (req, res) => {
    //console.log('req.files: ', req.files);
    //console.log('req.body.videojuego: ', JSON.parse(req.body.videojuego));
    let s = JSON.parse(req.body.slider);
    let i = 0;

   // let imagenNombre = s.titulo.replace(' ', '');
   let imagenNombre = s.titulo.replace(new RegExp(' ', 'g'), '');
    req.files.imagen.name = imagenNombre+".jpg";
    
    let rutaImagen = "http://localhost:3000/imgSlider/" + req.files.imagen.name;
    let rutaAbsoluta = path.join(__dirname + "/../public/imgSlider/" + req.files.imagen.name);
    let slider = new Slider({
        titulo: s.titulo,
        imagen: rutaImagen,
        });
        

    console.log(rutaImagen);
    console.log(rutaAbsoluta);
    req.files.imagen.mv(rutaAbsoluta, (err) => {
        if(err){
            console.log('Error imagen');
            return res.status(400).send({message: 'Ocurrio un error al copiar imagen'});
        }
        slider.save((err) => {
            if(err)
                return res.status(500).send({message: err.message});
            
            res.send(slider);

        });
    });
});

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

router.get('/', (req, res) => {
    Slider.find((err, sliders) => {
        let sliderArr = [];
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(sliders) {
            sliders.forEach(v => {
                sliderArr.push(v);
            });
        }
        res.send(sliderArr);
    });
});


router.delete('/:id', (req, res) => {
    Slider.findById(req.params.id, (err, slider) => {
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(!slider) {
            return res.status(500).send({message: "Imagen de Slider no encontrado"});
        }
        slider.remove(err => {
            if(err) {
                return res.status(500).send({message: err.message});
            }
            res.status(200).send({message: "Imagen de Slider eliminado exitosamente"});
        });
    });
});

module.exports = router;