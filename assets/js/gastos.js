const fs = require('fs')


const agregarGasto = (gasto) => {
    const {gastos} = obtenerGastos()
    gastos.push(gasto)
    fs.writeFileSync('./assets/json/gastos.json', JSON.stringify({gastos: gastos}))
}

const obtenerGastos = () => {
    const gastosJSON = fs.readFileSync('./assets/json/gastos.json', 'utf-8')
    const contenidoArchivoGastos = JSON.parse(gastosJSON)
    return contenidoArchivoGastos
}

module.exports = {agregarGasto, obtenerGastos}