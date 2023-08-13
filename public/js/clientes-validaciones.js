import * as funciones from './script-validacion.js';

let d = document,
  nombreCliente = d.querySelector('#nomCliente'),
  apellidoCliente = d.querySelector('#apeCliente'),
  direccionCliente = d.querySelector('#dirCliente'),
  celularCliente = d.querySelector('#celCliente');

  function validacionClientesInput(){

    nombreCliente.addEventListener('input', () => {
      if (funciones.validarTexto(nombreCliente, nombreCliente.name)) {
        funciones.validarTexto(nombreCliente, nombreCliente.name);
      } else {
        nombreCliente.classList.remove('is-invalid');
        nombreCliente.classList.add('is-valid');
        nombreCliente.nextElementSibling.textContent = '';
      }
    });
  
    apellidoCliente.addEventListener('input', () => {
      if (funciones.validarTexto(apellidoCliente, apellidoCliente.name)) {
        funciones.validarTexto(apellidoCliente, apellidoCliente.name);
      }else {
        apellidoCliente.classList.remove('is-invalid');
        apellidoCliente.classList.add('is-valid');
        apellidoCliente.nextElementSibling.textContent = '';
      }
    });
  
    direccionCliente.addEventListener('input', () => {
      if (funciones.validarDireccion(direccionCliente, direccionCliente.name)) {
        funciones.validarDireccion(direccionCliente, direccionCliente.name);
      } else {
        direccionCliente.classList.remove('is-invalid');
        direccionCliente.classList.add('is-valid');
        direccionCliente.nextElementSibling.textContent = '';
      }
    });
  
    celularCliente.addEventListener('input', () => {
      if (funciones.validarNumero(celularCliente, celularCliente.name)) {
        funciones.validarNumero(celularCliente, celularCliente.name);
      } else {
        celularCliente.classList.remove('is-invalid');
        celularCliente.classList.add('is-valid');
        celularCliente.nextElementSibling.textContent = '';
      }
    });
  }

  const validarVacio = funciones.validarVacio;

  export {d,nombreCliente,apellidoCliente,direccionCliente,celularCliente,validacionClientesInput,validarVacio};