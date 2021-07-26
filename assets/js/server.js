const http = require('http')
const fs = require('fs')
const {agregarRoommate, obtenerRoommates} = require('./roommates')
const {agregarGasto, obtenerGastos} = require('./gastos')

http
.createServer(async (req, res) => {
    if (req.url === '/' && req.method == 'GET'){
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

    if (req.url.startsWith('/roommate') && req.method == 'POST'){
        await agregarRoommate()
        res.end()
    }

    if (req.url.startsWith('/roommates') && req.method == 'GET'){
        // const roommates = await obtenerRoommates()
        // console.log(roommates)
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(fs.readFileSync('./assets/json/roommates.json', 'utf-8'))
    }

    if (req.url.startsWith('/gasto') && req.method == 'POST'){
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            body = JSON.parse(body)
            agregarGasto(body)
            res.end()
        })
    }

    // if (req.url.startsWith('/gasto') && req.method == 'PUT')

    // if (req.url.startsWith('/gasto') && req.method == 'DELETE')


    if (req.url.startsWith('/gastos') && req.method == 'GET'){
        const gastos = obtenerGastos()
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(JSON.stringify(gastos))
    }

})
.listen(3000, () => console.log('Servidor levantado en el puerto 3000...'))