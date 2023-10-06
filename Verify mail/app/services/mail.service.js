import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host:process.env.EMAIL_HOST,
  port:465,
  secure:true,
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASSWORD
  }
})

export async function enviarMailVerificacion(direccion,token){
  return await transporter.sendMail({
    from:"Test Nexo <no-reply@puntojson.com>",
    to:direccion,
    subject:"Verificación de nueva cuenta - NEXO",
    html: crearMailVerificacion(token)
  })
}

function crearMailVerificacion(token){
  return `
  <!DOCTYPE html>
  <html lang="es">
    <style>
      html{
        background-color: white;
      }
      body{
        max-width: 600px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: auto;
        background-color: rgb(229, 255, 246);
        padding: 40px;
        border-radius: 4px;
        margin-top: 10px;
      }
    </style>
  <body>
    <h1>Verificación de correo electrónico - NEXO 💫</h1>
    <p>Se ha creado una cuenta en NEXO💫 con este correo electrónico.</p>
      <p>Si esta cuenta no fue creada por usted, desestime este correo.</p>
      <p></p>Si usted creó la cuenta, entonces verifique la cuenta <a href="http://localhost:4000/verificar/${token}" target="_blank" rel="noopener noreferrer">haciendo click aquí</a>.</p>
      <p>NEXO</p>
  </body>
  </html>
  `
}