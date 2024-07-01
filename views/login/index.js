import { createNotificacion } from "../components/noti.js";

const formulario = document.querySelector("#formulario");
const inputPass = document.querySelector("#password");
const inputEmail = document.querySelector("#email");


const emailValidate =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const passValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

let validarEmail = false;
let validarPass = false;


function validarCampos() {
  const listadoInputs = [inputEmail.value, inputPass.value].some((i) => i === "");
  if (listadoInputs) {
    createNotificacion(true,"No puede dejar los campos vacios");
    return; // Exit validation function if any field is empty
  }

  validarEmail = emailValidate.test(inputEmail.value);
  validarPass = passValidate.test(inputPass.value);

  if (!validarEmail || !validarPass) {
    createNotificacion(
      true,
      "Correo electrónico o contraseña incorrectos" // More specific error message
    );
    return; // Exit validation function if validation fails
  }
}

// Improved input validation function (optional)
function Validate(input, validate, regex) {
  if (input.value === "") {
    input.classList.remove("border-green-600");
    input.classList.remove("border-red-600");
    return; // No need to proceed if input is empty
  }

  validate = regex.test(input.value);

  if (validate) {
    input.classList.add("border-green-600");
    input.classList.remove("border-red-600");
  } else {
    input.classList.remove("border-green-600");
    input.classList.add("border-red-600");
  }
}

inputEmail.addEventListener("input", (e) => {
  Validate(e.target, validarEmail, emailValidate);
});

inputPass.addEventListener("input", (e) => {
  Validate(e.target, validarPass, passValidate);
});

// Removed unnecessary `confirmPass` references
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validate email and password (assuming `validarCampos` handles validation)
  validarCampos();

  if (!inputEmail.value || !inputPass.value) {
    createNotificacion(true, "Campos incorrectos");
    return; // Prevent further execution if validation fails
  }

  try {
    const respuesta = await axios.post("/api/users/login", {

        email: inputEmail.value,
        password: inputPass.value,});
      createNotificacion(respuesta.data.validate,respuesta.data.message)
    if(respuesta.data.rol==0){
       window.location.href='/reservar/'
    }
    else if(respuesta.data.rol==1){
      window.location.href='/administrador-estadisticas/'
    }
    

   
  } catch (error) {
    console.error("Error:", error);
    // Inform user about error
  }
});

