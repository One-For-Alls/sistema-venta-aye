import * as fn from './script-validacion.js';

let d = document,
    nomProd = d.getElementById('nomProducto'),
    catProd = d.getElementById('catProducto'),
    desProd = d.getElementById('desProducto'),
    precProd = d.getElementById('precProducto')

  function validacionProductosInput(){
    nomProd.addEventListener('input',()=>{
      if(fn.validarTexto(nomProd,nomProd.name)){
        fn.validarTexto(nomProd,nomProd.name);
      }else{
        nomProd.classList.remove('is-invalid');
        nomProd.classList.add('is-valid');
        nomProd.nextElementSibling.textContent = '';
      }
    });
    catProd.addEventListener('change',()=>{
      if(fn.validarVacio(catProd,catProd.name)){
        fn.validarVacio(catProd,catProd.name);
      }else{
        catProd.classList.remove('is-invalid');
        catProd.classList.add('is-valid');
        catProd.nextElementSibling.textContent = '';
      }
    })
    desProd.addEventListener('input',()=>{
      if(fn.validarTexto(desProd,desProd.name)){
        fn.validarTexto(desProd,desProd.name);
      }else{
        desProd.classList.remove('is-invalid');
        desProd.classList.add('is-valid');
        desProd.nextElementSibling.textContent = '';
      }
    });
    precProd.addEventListener('input',()=>{
      if(fn.validarNumero_2(precProd,precProd.name)){
        fn.validarNumero_2(precProd,precProd.name);
      }else{
        precProd.classList.remove('is-invalid');
        precProd.classList.add('is-valid');
        precProd.nextElementSibling.textContent = '';
      }
    });
  }

  export {validacionProductosInput,fn, nomProd,desProd,catProd,precProd};