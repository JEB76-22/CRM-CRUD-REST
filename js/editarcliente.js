import { obtenerCliente, editarCliente } from "./API.js";
import {mostrarAlerta, validar} from './funciones.js'



(function () {
  //Campos del formulario
  const nombreInput = document.querySelector("#nombre");
  const empresaInput = document.querySelector("#empresa");
  const telefonoInput = document.querySelector("#telefono");
  const emailInput = document.querySelector("#email");
  const idInput = document.querySelector("#id");

  document.addEventListener("DOMContentLoaded", async () => {
    const parametrosUrl = new URLSearchParams(window.location.search);

    const idCliente = parametrosUrl.get("id");

    const cliente = await obtenerCliente(idCliente);
    mostrarCliente(cliente);

    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente);

  });

  function mostrarCliente(cliente) {
    const { nombre, empresa, telefono, email, id } = cliente;
    nombreInput.value = nombre;
    empresaInput.value = empresa;
    telefonoInput.value = telefono;
    emailInput.value = email;
    idInput.value = id;
  };

  function validarCliente(e){
    e.preventDefault();

    const cliente = {
          nombre: nombreInput.value,
          email: emailInput.value,
          telefono: telefonoInput.value,
          empresa: empresaInput.value,
          id: idInput.value
        };

        if(validar(cliente)){
          mostrarAlerta('Todos los campos son obligatorios')
          return;
          }
          //reescribe el objeto
          editarCliente(cliente);
        };

})();
