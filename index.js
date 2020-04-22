const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const filepath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filepath);
    let contentType = 'text/html'

    switch(extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
    }

    // console.log('GET: ' + req.url);

    fs.readFile(filepath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end(`Server error: ${err.code}`);
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        }
    })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('Server started on port ' + PORT + '.'));