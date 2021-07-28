const fs = require('fs')

function cuantoDebe(nombre, gastos, nroRoommates){
    const sumaGastosAjenos = gastos.reduce((acc, curr) => {
        if (curr.roommate != nombre){
            const resultadoParcial = acc + curr.monto
            return resultadoParcial
        }
        else{
            const resultadoParcial = acc + 0
            return resultadoParcial
        }
    },0)
    const deuda = parseInt(sumaGastosAjenos/nroRoommates)
    return deuda
}

function cuantoRecibe(nombre, gastos, nroRoommates){
    const sumaGastosPropios = gastos.reduce((acc, curr) => {
        if (curr.roommate == nombre){
            const resultadoParcial = acc + curr.monto
            return resultadoParcial
        }
        else{
            const resultadoParcial = acc + 0
            return resultadoParcial
        }
    },0)
    const pago = parseInt(sumaGastosPropios/nroRoommates)
    return pago
}

function actualizarDeudasyPagos(){
    const contenidoRoommates = fs.readFileSync("./assets/json/roommates.json", 'utf8')
    const {roommates} = JSON.parse(contenidoRoommates)
    const contenidoGastos = fs.readFileSync("./assets/json/gastos.json", 'utf8')
    const {gastos} = JSON.parse(contenidoGastos)
    const numeroRoommates = roommates.length
    if (numeroRoommates > 0){
        roommates.forEach((r) => {
            r.debe = cuantoDebe(r.nombre, gastos, numeroRoommates);
            r.recibe = cuantoRecibe(r.nombre, gastos, numeroRoommates)
        })
        const roommatesActualizado = {
            roommates: roommates
        }
        fs.writeFileSync("./assets/json/roommates.json", JSON.stringify(roommatesActualizado), 'utf8')
    }

}

//extra: reiniciar aplicacion
const reiniciarAplicacion = () => {
    const objetoRoommatesInicial = {
        roommates: []
    }
    const objetoGastosInicial = {
        gastos: []
    }
    fs.writeFileSync("./assets/json/roommates.json", JSON.stringify(objetoRoommatesInicial), 'utf8')
    fs.writeFileSync("./assets/json/gastos.json", JSON.stringify(objetoGastosInicial), 'utf8')

}


module.exports = {actualizarDeudasyPagos, reiniciarAplicacion}