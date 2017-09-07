var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
  */

  // Check if request is both of GET type and for the /listings directory.
  if(request.method == 'GET' && parsedUrl.pathname == '/listings'){
    // If so, send a successful message and the requesting listing JSON data.
    response.writeHead(200);
    response.end(listingData);
  }else{
    // If not, return a 404 error and corresponding message.
    response.writeHead(404);
    response.end('Bad gateway error');
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
  This callback function should save the data in the listingData variable, 
  then start the server. 
  */

  // Save the passed JSON data from the file into the global 'listingData' variable for future use.
  listingData = data;

  // Create server at desired port.
  server = http.createServer(requestHandler);

  // Initialize listener to wake up application if user activity occurs. 
  server.listen(port, function() {
    console.log('Server listening on: http://127.0.0.1:' + port);
  });
});
