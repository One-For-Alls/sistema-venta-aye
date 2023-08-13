import * as fn from './script-validacion.js';

let d = document,
    codProd = d.getElementById('codProducto'),
    nomProd = d.getElementById('nomProducto'),
    catProd = d.getElementById('catProducto'),
    desProd = d.getElementById('desProducto'),
    precProd = d.getElementById('precProducto'),
    precProd2 = d.getElementById('precProducto2'),
    precProd3 = d.getElementById('precProducto3'),
    stockProd = d.getElementById('stockProducto'),
    stockCantProd = d.getElementById('cantStockProd');

  function validacionProductosInput(){
    codProd.addEventListener('input',()=>{
      if(fn.validarCodigo(codProd,codProd.name)){
        fn.validarCodigo(codProd,codProd.name);
      }else{
        codProd.classList.remove('is-invalid');
        codProd.classList.add('is-valid');
        codProd.nextElementSibling.textContent = '';
      }
    });
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
    });

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

    precProd2.addEventListener('input',()=>{
      if(fn.validarNumero_2(precProd2,precProd2.name)){
        fn.validarNumero_2(precProd2,precProd2.name);
      }else{
        precProd2.classList.remove('is-invalid');
        precProd2.classList.add('is-valid');
        precProd2.nextElementSibling.textContent = '';
      }
    });

    precProd3.addEventListener('input',()=>{
      if(fn.validarNumero_2(precProd3,precProd3.name)){
        fn.validarNumero_2(precProd3,precProd3.name);
      }else{
        precProd3.classList.remove('is-invalid');
        precProd3.classList.add('is-valid');
        precProd3.nextElementSibling.textContent = '';
      }
    });

    stockProd.addEventListener('input',()=>{
      if(fn.validarStock(stockProd,stockProd.name)){
        fn.validarStock(stockProd,stockProd.name);
      }else{
        stockProd.classList.remove('is-invalid');
        stockProd.classList.add('is-valid');
        stockProd.nextElementSibling.textContent = '';
      }
    });
  }

  export {validacionProductosInput,fn, codProd,nomProd,desProd,catProd,precProd,precProd2,precProd3,stockProd, stockCantProd};