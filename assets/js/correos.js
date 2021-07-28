nodemailer = require('nodemailer')

const config = {
    service: 'gmail',
    auth: {
        user: 'nodemailerADL@gmail.com',
        pass: 'desafiolatam'
    }
}
const transporter = nodemailer.createTransport(config)

const enviarNotificacion = (gasto) => {
    transporter.sendMail({
        from: 'nodemailerADL@gmail.com',
        to: 'lizamav.p@gmail.com',
        subject: 'Nuevo gasto de Roommates',
        html: `<p>Se ha creado un nuevo gasto en roommates</p>
                <p>Información del gasto:</p>
                <ul>
                    <li>Roommate: ${gasto.roommate} </li>
                    <li>Descripcion: ${gasto.descripcion} </li>
                    <li>Monto: ${gasto.monto} </li>
                </ul>`
    }, console.log("notificación enviada por correo"))
}

module.exports = {enviarNotificacion}