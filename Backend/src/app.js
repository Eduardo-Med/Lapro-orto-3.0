const express = require('express');
const cors = require('cors');
const multer = require('multer')
const path = require('path')
var bodyParser = require("body-parser");
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./config/swagger/swaggerDEV.json')
const app = express();


// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(bodyParser.json({limit: '300kb'}));
app.use(multer({dest: path.join(__dirname,  'public/uploads'),
                limits: {fileSize: 1000000},
            fileFilter: (req,file,cb)=>{
                const filetypes = /jpg|jpeg|png/
                const mimetype = filetypes.test(file.mimetype);
                const extname = filetypes.test(path.extname(file.originalname))
                if(mimetype && extname){
                    return cb(null,true)
                }
                cb("Error: Archivo debe ser una imagen valida")
            }
            }).single('imagen'))


// routes
app.use('/api/v1/usuario', require('./routes/usuario.routes'))
app.use('/api/v1/authenticate', require('./routes/authenticate.routes'))
app.use('/api/v1/orden', require('./routes/orden.routes'))
app.use('/api/v1/aparato', require('./routes/aparato.routes'))
app.use('/api/v1/venta', require('./routes/venta.routes'))
app.use('/api/v1/notificacion', require('./routes/notificacion.routes'))
app.use('/api/v1/sendemail', require('./routes/correo.routes'))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


module.exports = app;