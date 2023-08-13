$(document).ready(function () {
  $.ajax({
    method:'post',
    url: 'ajax/ajax.empresa.php',
    data:{'accion':1},
    dataType: 'json',
    success: function(respuesta){
      console.log(respuesta);
      $('#empresa_razon_social').val(respuesta['empresa_razon_social']);
      $('#empresa_ruc').val(respuesta['empresa_ruc']);
      $('#empresa_direccion').val(respuesta['empresa_direccion']);
      $('#empresa_nombre').val(respuesta['empresa_nombre']);
      $('#empresa_serie_boleta').val(respuesta['empresa_serie_boleta']);
      $('#empresa_nro_correlativo_boleta').val(respuesta['empresa_nro_correlativo_boleta']);
      $('#empresa_email').val(respuesta['empresa_email']);
    }
  });
});