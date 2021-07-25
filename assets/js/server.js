const http = require('http')
const fs = require('fs')

http
.createServer((req, res) => {
    if (req.url === '/'){
        fs.readFile('index.html', (err, data) => {
            if (err){
                res.end(err)
            }
            else{
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'} )
                res.end(data)
            }
        } )
    }
})
.listen(3000, () => console.log('Servidor levantado en el puerto 3000...'))