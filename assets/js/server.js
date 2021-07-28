const http = require('http')
const fs = require('fs')
const {agregarRoommate, obtenerRoommates} = require('./roommates')
const {agregarGasto, obtenerGastos, borrarGasto, editarGasto} = require('./gastos')
const {v4: uuidv4} = require('uuid')
const url = require('url')
const {actualizarDeudasyPagos, reiniciarAplicacion} = require('./utilidades')


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
        const nuevoRoommate = await agregarRoommate()
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(JSON.stringify(nuevoRoommate))
    }

    if (req.url.startsWith('/roommates') && req.method == 'GET'){
        actualizarDeudasyPagos()
        const roommates = await obtenerRoommates()
        fs.readFile('./assets/json/roommates.json', 'utf-8', (err, data) => {
            if (err) console.log(err)
            if (data){
                res.writeHead(200, {'Content-type': 'application/json'})
                res.end(data)
            }
        })
    }

    if (req.url.startsWith('/gasto') && req.method == 'POST'){
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            body = JSON.parse(body)
            body.id = uuidv4().slice(0,6)
            agregarGasto(body)
            res.end()
        })
    }

    if (req.url.startsWith('/gasto') && req.method == 'PUT'){
        const id = url.parse(req.url, true).query.id
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            const edicionGasto = JSON.parse(body) 
            editarGasto(id, edicionGasto)
            res.statusCode = 200
            res.end()
        })
    }

    if (req.url.startsWith('/gasto') && req.method == 'DELETE'){
        const id = url.parse(req.url, true).query.id
        borrarGasto(id)
        res.statusCode = 200
        res.end()
    }

    if (req.url.startsWith('/gastos') && req.method == 'GET'){
        const gastos = obtenerGastos()
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(JSON.stringify(gastos))
    }
    //bonus
    if (req.url.startsWith('/reiniciar')){
        reiniciarAplicacion()
        res.end()
    }
})
.listen(3000, () => console.log('Servidor levantado en el puerto 3000...'))