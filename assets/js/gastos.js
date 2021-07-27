const fs = require('fs')
const {v4: uuidv4} = require('uuid')

//POST gasto
const agregarGasto = (gasto) => {
    const {gastos} = obtenerGastos()
    gastos.push(gasto)
    fs.writeFileSync('./assets/json/gastos.json', JSON.stringify({gastos: gastos}))
}

//GET gasto
const obtenerGastos = () => {
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
    console.log(arregloGastos)
    //guardar el nuevo arreglo en el json de gastos
    fs.writeFileSync('./assets/json/gastos.json', JSON.stringify({gastos: arregloGastos}))
}

//PUT gasto

module.exports = {agregarGasto, obtenerGastos, borrarGasto}