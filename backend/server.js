const http = require('http');
const app = require('./app');

/**
 * 
 * La fonction normalizePort test la valeur 'val' du port
 * si le port n'est pas un nombre mais un string retourne ce string
 * si le port est un nombre supérieur à 0 retourne la valeur du port
 * autrement retourne false 
 *  
 */
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

/**
 * la constante port récupère le port fourni par la fonction normalizePort
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


/**
 * 
 * La fonction errorHandler gère les cas d'erreur
 * si l'on obtien une réponse du serveur différente de 'listen' on teste le code de l'erreur pour afficher le message d'erreur
 * adéquat.
 */
const errorHandler = function(error){
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * http.createServer est la méthode du plugin http de nodejs qui permet de créer le server
 */
const server = http.createServer(app);

/**
 * Ici nous indiquons comment gérer les cas possible lorsque l'on lance le server:
 * server.on
 * si la réponse est 'error' alors on appelle la fonction errorHandler pour gérer
 * si la réponse est listening alors on lance une fonction qui récupère l'adresse, on teste sa forme
 * et on affiche le message de succès adéquat (Listening on port 3000 dans notre cas)
 */
server.on('error', errorHandler);
server.on('listening', function(){
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

/**
 * Enfin on dit au serveur d'écouter sur le port (port 3000 dans notre cas)
 */
server.listen(port);
