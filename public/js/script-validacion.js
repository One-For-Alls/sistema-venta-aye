function validarVacio(input,name){
  if(!input.value){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `El campo ${name} es obligatorio`;
    return true;
  }else{
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }
}

function validarTexto(input,name){
  if(!input.value){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `El campo ${name} es obligatorio`;
    return true;
  }else if(!(/^[a-zA-Z ]+$/.test(input.value))){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `Este campo solo admite letras`;
    return true;
  }else if(!(/^[a-zA-Z ]{3,50}$/.test(input.value))){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `El campo debe tener entre 3 y 50 caracteres`;
    return true;
  }else{
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }
}

function validarDireccion(input,name){
  
  if(!input.value){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `El campo ${name} es obligatorio`;
    return true;
  }else if(!(/^[\w\s.,#-]*$/.test(input.value))){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `Uno o mas caracteres especiales no son permitos`;
    return true;
  }else{
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }
}
function validarNumero(input,name){
  if(!input.value){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `El campo ${name} es obligatorio`;
    return true;
  }else if(!(/^[0-9]+$/.test(input.value))){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `Este campo solo admite numeros`;
    return true;
  }else if(!(/^[0-9]{6,9}$/.test(input.value))){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `El campo debe tener entre 6 y 9 caracteres`;
    return true;
  }else{
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }
}
function validarCodigo(input,name){
  if(!input.value){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `El campo ${name} es obligatorio`;
    return true;
  }else if(!(/^[0-9]+$/.test(input.value))){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `Este campo solo admite numeros`;
    return true;
  }else if(!(/^[0-9]{13}$/.test(input.value))){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `El codigo debe contener 13 digitos`;
    return true;
  }else{
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }
}

function validarStock(input,name){
  if(!input.value){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `El campo ${name} es obligatorio`;
    return true;
  }else if(!(/^[1-9]\d*$/.test(input.value))){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `El valor minimo de ingreso debe ser mayor a 0`;
    return true;
  }else{
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }
}

function validarNumero_2(input,name){
  if(!input.value){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `El campo ${name} es obligatorio`;
    return true;
  }else if(!(/^\d{1,11}(\.\d{1,2})?$/.test(input.value))){
    input.classList.add('is-invalid');
    input.nextElementSibling.textContent = `se ha sobre paso el limite de enteros o decimales`;
    return true;
  }else{
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }
}
export {validarVacio,validarTexto,validarNumero,validarCodigo,validarNumero_2,validarStock,validarDireccion};