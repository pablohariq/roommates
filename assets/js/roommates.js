const axios = require('axios')
const {v4: uuidv4} = require('uuid')
const fs = require('fs')

//Roommate POST
const agregarRoommate = async () => {
    const {data} = await axios.get('https://randomuser.me/api')
    const datosUsuario = data.results[0]
    const nuevoRoommate = {
        nombre: `${datosUsuario.name.first} ${datosUsuario.name.last}`,
        id: uuidv4().slice(0,6),
        debe: 0,
        recibe: 0
    }
    fs.readFile('./assets/json/roommates.json', (err, data) => {
        if (err) throw err;
        if (data){
            const {roommates} = JSON.parse(data)
            roommates.push(nuevoRoommate)
            fs.writeFile('assets/json/roommates.json', JSON.stringify({roommates: roommates}), (err) => {
                if (err){
                    console.log(err)
                }
                else{
                    console.log(roommates)
                }
            })
        }
    })
    return nuevoRoommate
}
//Roommate GET
const obtenerRoommates = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./assets/json/roommates.json', (err, data) => {
            if (err){
                reject(err)
            }
            else{
                const roommates = JSON.parse(data)
                resolve(roommates)
            }
        })

    })
}
module.exports = {agregarRoommate, obtenerRoommates}

//debug
// agregarRoommate()
// obtenerRoommates()
