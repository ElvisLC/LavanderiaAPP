import { createNotificacion } from "../components/noti.js";



const formulario = document.querySelector("#formulario");
const inputUser = document.querySelector("#usuario");
const inputPass = document.querySelector("#password");
const confirmPass = document.querySelector("#confirmpass");
const inputEmail = document.querySelector("#email");
const inputTelf = document.querySelector("#telefono");

const emailValidate =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const passValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const userValidate = /^[A-Z][a-z]*(?: [A-Z][a-z]*)?$/;

const telfValidate = /[(]?\d{3}[)]?\s?-?\s?\d{3}\s?-?\s?\d{4}/;

let validarEmail = false;
let validarUser = false;
let validarPass = false;
let validarTelf = false;

function Validate(input, validate, rejex) {
  if (input.value === "") {
    input.classList.remove("border-green-600");
    input.classList.remove("border-red-600");
  }

  validate = rejex.test(input.value);

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
  if (confirmPass.value === inputPass.value) {
    confirmPass.classList.add("border-green-600");
    confirmPass.classList.remove("border-red-600");
  } else {
    confirmPass.classList.remove("border-green-600");
    confirmPass.classList.add("border-red-600");
  }
});

inputUser.addEventListener("input", (e) => {
  Validate(e.target, validarUser, userValidate);
});

inputTelf.addEventListener("input", (e) => {
  Validate(e.target, validarTelf, telfValidate);
});

confirmPass.addEventListener("input", (e) => {
  if (e.target.value === inputPass.value) {
    confirmPass.classList.add("border-green-600");
    confirmPass.classList.remove("border-red-600");
  } else {
    confirmPass.classList.remove("border-green-600");
    confirmPass.classList.add("border-red-600");
  }



});

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  

  const newUser = {
    nombre: inputUser.value,
    email: inputEmail.value,
    password: inputPass.value,
    telefono: inputTelf.value,
    rol:0
  };
  try {
    const post = await axios.post("/api/users/registro", newUser);
    createNotificacion(post.data.validate, post.data.message)

    // Esperar 3 segundos antes de redirigir
    await new Promise(resolve => setTimeout(resolve, 3000));
    

  } catch (error) {
  console.log(error)
  }

});