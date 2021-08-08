const express = require('express'); //invoco a express
const app = express(); //asigno express a una constante

const jwt = require('jsonwebtoken'); //uso de jsonwebtoken

const keys = require('./settings/keys'); //referenciando el archivo keys

//middlewares
app.set('key', keys.key); //invoco a dicha key
app.use(express.urlencoded({extended:false}));
app.use(express.json());//formato json cuando se cargan los datos

//Ruta para el login
app.post('/login', (req, res) =>{
    if(req.body.usuario == 'admin' && req.body.pass == '12345'){
      	const payload = {
        	check: true
    	};
	    const token = jwt.sign(payload, app.get('key'), {
	     	expiresIn: '2d'
	    });
	    res.json({
	        message: '¡AUTENTICACION EXITOSA!',
	        token: token
	    });
	}else{
      	res.json({
        	message: 'Usuario y/o password son incorrectos',
      	});
	}
});
  
//Protegiendo peticiones no deseadas
const verificacion = express.Router();

verificacion.use((req, res, next) => { //tipo de acceso || tipo de autorizacion
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    //console.log(token);
    if(!token){ //no se ingreso nada
      	res.status(401).send({
        	error: 'Es necesario un token de autenticación'
      	})
      	return 
    }
    if(token.startsWith('Bearer ')){
      	token = token.slice(7, token.length);
      	console.log(token);
    }
    if(token){ 
      	jwt.verify(token, app.get('key'), (error, decoded) =>{
	        if(error){
	          	return res.json({
	            	message: 'El token no es válido'
	          	});
	        }else{
	          	req.decoded = decoded;
	          	next();
	        }
      	})
    }
});
   
app.get('/info', verificacion, (req, res) =>{
    res.json('TOKEN VALIDO');
});

// init server
app.listen(3000, ()=>{
	console.log('Servidor escuchando en http://localhost:3000');
});

  
