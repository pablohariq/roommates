const fs = require('fs')
const {v4: uuidv4} = require('uuid')
const {actualizarDeudasyPagos} = require('./utilidades')
const moment = require('moment')


//POST gasto
const agregarGasto = (gasto) => {
    const {gastos} = obtenerGastos()
    gasto.fechaingreso = moment()
    gastos.push(gasto)
    actualizarDeudasyPagos()
    fs.writeFileSync('./assets/json/gastos.json', JSON.stringify({gastos: gastos}))
}

//GET gasto
const obtenerGastos = () => {
    actualizarDeudasyPagos()
    const gastosJSON = fs.readFileSync('./assets/json/gastos.json', 'utf-8')
    const contenidoArchivoGastos = JSON.parse(gastosJSON)
    return contenidoArchivoGastos
}

//DELETE gasto
const borrarGasto = (id) => {
    const gastosJSON = fs.readFileSync('./assets/json/gastos.json', 'utf-8')
    const {gastos: arregloGastos} = JSON.parse(gastosJSON)
    const indice = arregloGastos.findIndex((g) => g.id == id)
    arregloGastos.splice(indice, 1)
    //guardar el nuevo arreglo en el json de gastos
    fs.writeFileSync('./assets/json/gastos.json', JSON.stringify({gastos: arregloGastos}))
    actualizarDeudasyPagos()
}

//PUT gasto
const editarGasto = (id, nuevoGasto) => { //
    const gastosJSON = fs.readFileSync('./assets/json/gastos.json', 'utf-8')
    const {gastos: arregloGastos} = JSON.parse(gastosJSON)
    const indice = arregloGastos.findIndex(g => g.id == id)
    nuevoGasto.id = id
    arregloGastos[indice] = nuevoGasto
    fs.writeFileSync('./assets/json/gastos.json', JSON.stringify({gastos: arregloGastos}))
    actualizarDeudasyPagos()
}

module.exports = {agregarGasto, obtenerGastos, borrarGasto, editarGasto}