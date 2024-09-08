const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Function to serve static files
function serveStaticFile(res, filePath, contentType, responseCode = 200) 
{
    fs.readFile(filePath, (err, data) => {
        // console.log(filePath + " ------------")
        if (err) 
        {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        }
        else 
        {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

// Create the server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    // console.log(parsedUrl.pathname + " url")
    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, 'front', sanitizePath);
    // console.log(req.url + " req.url")

    // Handle files in the static directory
    if (req.url.startsWith('/static')) 
    {
        pathname = path.join(__dirname, 'frontend', sanitizePath);
        fs.exists(pathname, (exist) => {
            if (!exist) 
            {
                res.statusCode = 404;
                res.end(`File ${pathname} not found!`);
                return;
            }

            if (fs.statSync(pathname).isDirectory()) {
                pathname += '/index.html';
            }

            fs.readFile(pathname, (err, data) => {
                if (err) 
                {
                    res.statusCode = 500;
                    res.end(`Error getting the file: ${err}.`);
                }
                else 
                {
                    const ext = path.parse(pathname).ext;
                    const map = {
                        '.ico': 'image/x-icon',
                        '.html': 'text/html',
                        '.js': 'text/javascript',
                        '.json': 'application/json',
                        '.css': 'text/css',
                        '.png': 'image/png',
                        '.jpg': 'image/jpeg',
                        '.wav': 'audio/wav',
                        '.mp3': 'audio/mpeg',
                        '.svg': 'image/svg+xml',
                        '.pdf': 'application/pdf',
                        '.doc': 'application/msword'
                    };

                    res.setHeader('Content-type', map[ext] || 'text/plain');
                    res.end(data);
                }
            });
        });
    } 
    else {
        // Catch-all route to serve index.html
        serveStaticFile(res, path.join(__dirname, 'frontend', 'index.html'), 'text/html');
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
