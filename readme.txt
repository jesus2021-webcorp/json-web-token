10 - JWT (Json web token) - Node Js ¡desde cero!

Uso de JWT. Se crea una aplicación que simula un login para generar el token. Para realizar las peticiones se usa el programa postman.

Informática DP
https://www.youtube.com/watch?v=xr7hv3Qae04

***************DOCUMENTACION************************
* https://www.npmjs.com/package/jsonwebtoken
* https://jwt.io/

Abrir una terminal, ubicarse en la carpeta del proyecto e instalar los siguientes modulos

npm install express jsonwebtoken
npm install nodemon

//Para correr la aplicacion y que se refresque el servidor cuando haya un cambio
nodemon app

Instalar postman para las pruebas

//Proceso jwt
1. El cliente realiza un login, autenticando las credenciales ingresadas como usuario y password
2. El cliente es validado en el servidor y se crea un nuevo token usando nuestra llave secreta que es la que establecemos nostoros para entregarsela al cliente cuando generemos el jsonwebtoken
3. El servidor envia el token al cliente
4. El cliente almacena el en browser el token para su uso y lo envia en cada peticion  mediante el tipo de autorizacion
5. El servidor verifica la firma del token, su caducidad y comprueba si el usuario tiene permisos al recurso
6. El servidor responde al cliente la peticion, una vez ya confirmado el token y los permisos de usuario son correctos