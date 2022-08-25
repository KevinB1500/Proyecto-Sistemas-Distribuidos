const nodemailer = require('nodemailer');
module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
 host:"smtp.gmail.com",
 port: 465,
 secure:true,
 auth: {
 user: 'futfinder2021@gmail.com', // Cambialo por tu email
 pass: 'futFinder!2021' // Cambialo por tu password
 }
 });
const mailOptions = {
 from: `"${formulario.Nombre}" <${formulario.Correo}>`,
 to: 'alejandropaz98.ap@gmail.com', // Cambia esta parte por el destinatario
 subject: "Prueba",
 html: `
 <strong>Nombre:</strong> ${formulario.Nombre} <br/>
 <strong>Genero:</strong> ${formulario.Genero} <br/>
 <strong>Origen:</strong> ${formulario.Origen} <br/>
 <strong>Fecha:</strong> ${formulario.Fecha} <br/>
 <strong>Celular:</strong> ${formulario.Celular} <br/>
 <strong>E-mail:</strong> ${formulario.Correo} <br/>
 <strong>Mensaje:</strong> ${formulario.Detalles}
 `
 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}