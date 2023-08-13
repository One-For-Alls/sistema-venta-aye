import * as funciones from './script-validacion.js';

let d = document,
    nombreCategoria = d.getElementById('nomCategoria');

    function validacionCategoriasInput(){
      nombreCategoria.addEventListener('input', () =>{
        if (funciones.validarTexto(nombreCategoria, nombreCategoria.name)) {
          funciones.validarTexto(nombreCategoria, nombreCategoria.name);
        } else {
          nombreCategoria.classList.remove('is-invalid');
          nombreCategoria.classList.add('is-valid');
          nombreCategoria.nextElementSibling.textContent = '';
        }
      })
    }

export {nombreCategoria, validacionCategoriasInput,funciones} 

