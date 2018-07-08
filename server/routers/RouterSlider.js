const Videojuego = require('../models/Videojuego');
const Slider = require('../models/Slider');
const path = require('path');
const express = require('express');
const router = express.Router({mergeParams: true});

router.post('/new', (req, res) => {

    extensiones_permitidas = new Array(".gif", ".jpg", ".bmp",".png",".psd",".cdr",".dwg",".svg",".raw",".nef"); 
    let imagen = req.files.imagen.name;
    let extension = (imagen.substring(imagen.lastIndexOf("."))).toLowerCase(); 

    permitida = false; 
    for (var j = 0; j < extensiones_permitidas.length; j++) { 
       if (extensiones_permitidas[j] == extension) { 
       permitida = true; 
       break; 
       } 
    } 
    if (!permitida) { 
       mierror = "Sólo se pueden subir imagenes con extensiones: .gif, .jpg, .bmp, .png, .psd, .cdr, .dwg, .svg, .raw y .nef"; 
    return res.status(409).send({message:mierror});
    }

    let s = JSON.parse(req.body.slider);
    let i = 0;

   let imagenNombre = s.titulo.replace(new RegExp(' ', 'g'), '');

    req.files.imagen.name = imagenNombre+extension;
    
    let rutaImagen = "http://localhost:3000/imgSlider/" + req.files.imagen.name;
    let rutaAbsoluta = path.join(__dirname + "/../public/imgSlider/" + req.files.imagen.name);
    let slider = new Slider({
        titulo: s.titulo,
        imagen: rutaImagen,
        visible: s.visible,
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

router.put('/visible', (req, res) => {
    console.log('Llegue: ', req.body);
    
        
    Slider.findById(req.body.id, (err, slider) => {
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(slider) {
            console.log(slider);
            slider.visible = req.body.visible;

            slider.save((err) => {
                if(err) {
                    return res.status(500).send({message: err.message});
                }
                res.send(slider);
            });
        }
    });
});

module.exports = router;