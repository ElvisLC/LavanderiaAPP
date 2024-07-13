const userRouter = require("express").Router();
const user = require("../models/usuario");
const secadora = require("../models/secadora");
const lavadora = require("../models/lavado");
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
const e = require("express");

userRouter.post("/registro", async (req, res) => {
  const { nombre, email, password, telefono, rol } = req.body;
  const usuario = new user();

  const listado = [nombre, email, password, telefono, rol].some((i) => i === "");

  if (listado) {
    return res
      .status(400)
      .json({ message: "No puede dejar los campos vacios" ,validate:true});
  }

  const getUser= await user.find({email:email})
  console.log(getUser);
  if(getUser==[]){
    res.json({message:'El usuario ya se encuentra registrado, por favor, inicia sesion',validate:true})
  }else{
    
  usuario.usuario = nombre;
  usuario.email = email;
  usuario.password = password;
  usuario.telefono = telefono;
  usuario.rol = 0



  try {
    await usuario.save();
    res.status(200).json({
      message: "Se ha creado el usuario con exito",validate:false})

      ;
  } catch (error) {
    console.error();
  }


  }


});

userRouter.post("/login", async (req, res) => {
  console.log('working login');
  const { email, password } = req.body;
  try {
    const consulta = await user.findOne({
      email: email,
      password: password
      // rol: rol, // Add rol filter
    })

    if(consulta == null){
      res.status(200).json({message:'La contraseña o el correo no son correctos',validate:true})
    } else {
      // Genera un token JWT
      const usuarioToken = {
        nombre: consulta.usuario,
        userId: consulta._id,
        email: consulta.email,
        rol: consulta.rol
      };  
      console.log(consulta.email);

      try {
        
      } catch (error) {
        console.error(error); // Verificar que no haya errores de escritura
      }
      const token = jwt.sign(usuarioToken, process.env.SECRET, { expiresIn: '3h'});

      // Establecer la cookie antes de enviar la respuesta
      res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 3600 * 1000 });
      // Enviar la respuesta
      res.status(200).json({ message: 'Has iniciado sesion con exito' ,rol:consulta.rol,validate:false});
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al consultar usuario",validate:true,
    });
  }
});

userRouter.post("/logout", async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token");

    // Return a response indicating that the user has been logged out
    res.status(200).json({ message: "Sesión cerrada exitosamente" ,validate:false});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cerrar sesión" ,validate:true});
  }
});

userRouter.get("/verificar", async(req, res) => {
  const cookiesTrue = req.headers.cookie
  if(!cookiesTrue){
    res.json({message:'No existe una sesion activa'})
    return // <--- Add this l 
  }
  else{
    
 
  try {
  const cookies = req.headers.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  const token = tokenCookie && tokenCookie.trim().split('=')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    console.log(decoded.exp , Date.now());
    

    // Autenticado correctamente, proceder con la solicitud
    res.status(200).json({ message: 'TOKEN ACTIVO' ,validate:true});
  } catch (err) {
    if(err.name=='TokenExpiredError'){
      res.json({message:'Su sexion ha expirado, por favor, inicie sesion',validate:false})
      // const updatedUser = await user.findOneAndUpdate({ email: email }, { $set: { verificar: false } }, { new: true });

    }else{
      console.log(err);
    }
  }
  }

  
  //...
});

userRouter.get("/cargar", async(req, res) => {
 
    
 
  try {
  const cookies = req.headers.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  const token = tokenCookie && tokenCookie.trim().split('=')[1];
  const decoded = jwt.verify(token, process.env.SECRET);
    
  const buscar= await user.find({_id:decoded.userId})
    res.json(buscar)

  } catch (err) {
    if(err.name=='TokenExpiredError'){
      res.json({message:'Su sexion ha expirado, por favor, inicie sesion',validate:false})
      // const updatedUser = await user.findOneAndUpdate({ email: email }, { $set: { verificar: false } }, { new: true });

    }else{
      console.log(err);
    }
  
  }

  
  //...
});

userRouter.post("/cambiar", async (req, res) => {
  try {
    const { nuevaP, actualP } = req.body;
    const cookies = req.headers.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    const token = tokenCookie && tokenCookie.trim().split('=')[1];
    const decoded = jwt.verify(token, process.env.SECRET);

    const Usuario = await user.findById(decoded.userId);

    if (!Usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" ,validate:true});
    }

    if (Usuario.password!== actualP) {
      return res.json({ message: "La contraseña actual es incorrecta" ,validate:true});
    }

    Usuario.password = nuevaP;
    await Usuario.save();

    res.json({ message: "Contraseña actualizada correctamente" ,validate:false});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cambiar" });
  }
});

userRouter.get("/registrados", async(req, res) => {
 
    
 
  try {
  
    
  const buscar= await user.find({rol:0})

    res.json(buscar.length)

  } catch (err) {
    if(err.name=='TokenExpiredError'){
      res.json({message:'Su sexion ha expirado, por favor, inicie sesion',validate:false})
      // const updatedUser = await user.findOneAndUpdate({ email: email }, { $set: { verificar: false } }, { new: true });

    }else{
      console.log(err);
    }
  
  }

  
  //...
});


userRouter.get("/reservasActivas", async(req, res) => {
 
  const objetos = await lavadora.find().exec();
  const objetosS = await secadora.find().exec();
  let total=0
  let secadoras=0
  let lavadoras=0
 
  try {
  
    for (const objeto of objetosS) {


      const reservas = objeto.reservasObj;
    
      for (const reserva of Object.values(reservas)) {
      
        if(reserva.estado=='En curso'){
            secadoras++
        }
    
  
      }
    
    
    }
     // retrieve all objects from the database

    for (const objeto of objetos) {
      const reservas = objeto.reservasObj;
    
      for (const reserva of Object.values(reservas)) {
         
        if(reserva.estado=='En curso'){
          lavadoras++
      }
  
        
  
      }
    
    
    }

    total=secadoras+lavadoras

    res.json(total)
  } catch (err) {
   
  
  }

  
  //...
});


module.exports = userRouter;
    