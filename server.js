var http = require('http');
var url = require('url');
var fs = require('fs');
const path = require('path');

var port = 8081;

var extensions = ['.html', '.css', '.js', '.txt','.json'];

const mimeType = 
{
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
};



http.createServer(function(request, response){
    var address = request.url;
    var q = url.parse(address, true);
    const extension = path.parse(q.pathname).ext;

    if (extensions.indexOf(extension)!==false)
    {
        console.log(q.pathname);
        fs.readFile("." + q.pathname, function(err, data){
            if (err)
            {
                response.writeHead(404, {'Content-Type' : 'text/html'});
                return response.end("404 Not Found");
            }
            // {'Content-Type': mimeType[extension] }
            response.writeHead(200,{'Content-Type' : 'text/html'});
            response.write(data);
            response.end();
        })
    }
}).listen(port);

console.log('Server running at http://127.0.0.1:8081/');