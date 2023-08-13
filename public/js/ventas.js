let tabla,
  items = [],
  itemProducto = 1,
  Toast;

Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

$(document).ready(function () {

  cargarNumeroBoleta();

  $('#btnVaciarListado').on('click', function () {
    vaciarListado();
  })


  tabla = $('#tbl-ventas').DataTable({
    'columns': [
      { 'data': 'id' },
      { 'data': 'detalles' },
      { 'data': 'codigo_producto' },
      { 'data': 'id_categoria' },
      { 'data': 'nombre_categoria' },
      { 'data': 'nombre_producto' },
      { 'data': 'cantidad' },
      { 'data': 'precio_venta_producto' },
      { 'data': 'total' },
      { 'data': 'acciones' },
      { 'data': 'precio_venta_producto_1' },
      { 'data': 'precio_venta_producto_2' },
    ],
    columnDefs: [
      { "targets": 1, "orderable": false, "class": "control", 'sortable': false },
      { "targets": 0, "visible": false },
      { "targets": 2, 'sortable': false, },
      { "targets": 3, "visible": false },
      { "targets": 4, "visible": false },
      {
        "targets": 5,
        // // render: function (data) {
        // //   var maxWords = 3; // Número máximo de palabras a mostrar
        // //   console.log(data);
        // //   var words = data.split(' ');
        // //   if (words.length > maxWords) {
        // //     var truncated = words.slice(0, maxWords).join(' ') + '...';
        // //     return truncated;
        // //   }
        // //   return data;
        // } 
      },
      { "targets": 6, 'sortable': false, "orderable": false, "class": "text-center" },
      { "targets": 10, "visible": false },
      { "targets": 11, "visible": false },
    ],
    "responsive": true,
    //scrollX: true, // para hacer scroll horizontal si se desborda
    "autoWidth": false,
    "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, 'todos']],
    "pageLength": 10,
    "language": {
      "decimal": "",
      "emptyTable": "No hay información",
      "lengthMenu": "Mostrar _MENU_ Entradas",
      "info": "Mostrando del _START_ al _END_ de un total de _TOTAL_ registros",
      "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
      "infoFiltered": "(Filtrado de _MAX_ total entradas)",
      "infoPostFix": "",
      "thousands": ",",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Anterior"
      },
      "buttons": {
        "pageLength": {
          "_": "Mostrar %d registros",
          "-1": "Mostrar todos"
        }
      }
    },
  });

  function verificarAnchoPantalla() {
    if ($(window).width() <= 767) {
      tabla.destroy(); // Destruir la instancia DataTables actual
      tabla = $('#tbl-ventas').DataTable({
        'columns': [
          { 'data': 'id' },
          { 'data': 'detalles' },
          { 'data': 'codigo_producto' },
          { 'data': 'id_categoria' },
          { 'data': 'nombre_categoria' },
          { 'data': 'nombre_producto' },
          { 'data': 'cantidad' },
          { 'data': 'precio_venta_producto' },
          { 'data': 'total' },
          { 'data': 'acciones' },
          { 'data': 'precio_venta_producto_1' },
          { 'data': 'precio_venta_producto_2' },
        ],
        columnDefs: [
          { "targets": 1, "orderable": false, "class": "control", 'sortable': false },
          { "targets": 0, "visible": false },
          { "targets": 2, 'sortable': false, },
          { "targets": 3, "visible": false },
          { "targets": 4, "visible": false },
          {
            "targets": 5,
            // // render: function (data) {
            // //   var maxWords = 3; // Número máximo de palabras a mostrar
            // //   console.log(data);
            // //   var words = data.split(' ');
            // //   if (words.length > maxWords) {
            // //     var truncated = words.slice(0, maxWords).join(' ') + '...';
            // //     return truncated;
            // //   }
            // //   return data;
            // } 
          },
          { "targets": 6, 'sortable': false, "orderable": false, "class": "text-center" },
          { "targets": 10, "visible": false },
          { "targets": 11, "visible": false },
        ],
        "responsive": true,
        scrollX: true, // para hacer scroll horizontal si se desborda
        "autoWidth": false,
        "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, 'todos']],
        "pageLength": 10,
        "language": {
          "decimal": "",
          "emptyTable": "No hay información",
          "lengthMenu": "Mostrar _MENU_ Entradas",
          "info": "Mostrando del _START_ al _END_ de un total de _TOTAL_ registros",
          "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
          "infoFiltered": "(Filtrado de _MAX_ total entradas)",
          "infoPostFix": "",
          "thousands": ",",
          "loadingRecords": "Cargando...",
          "processing": "Procesando...",
          "search": "Buscar:",
          "zeroRecords": "Sin resultados encontrados",
          "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
          },
          "buttons": {
            "pageLength": {
              "_": "Mostrar %d registros",
              "-1": "Mostrar todos"
            }
          }
        },
      });
    }
  }

  // Verificar el ancho de la pantalla al cargar la página
  verificarAnchoPantalla();

  // Verificar el ancho de la pantalla al cambiar su tamaño
  $(window).on('resize', function () {
    verificarAnchoPantalla();
  });

  // AUTOCOMPLETADO PARA INPUT PRODUCTOS
  $.ajax({
    async: false,
    type: "POST",
    url: "ajax/ajax.productos.php",
    data: { accion: 7 },
    dataType: "json",
    success: function (respuesta) {
      for (let i = 0; i < respuesta.length; i++) {
        items.push(respuesta[i]['nombre_producto']);
      }

      $('#iptCodVenta').autocomplete({
        source: items,
        select: function (event, ui) {
          cargarProductos(ui.item.value);
          return false;
        }
      })
      console.log(items);
    }
  });

  // cuando se escanea codigo barra detecter el enter y agregue en producto
  $('#iptCodVenta').change(function (e) {
    cargarProductos();
  });

  // ELIMINAR PRODUCTO

  $('#tbl-ventas tbody').on('click', '.btnEliminarProducto', function () {
    tabla.row($(this).parents('tr')).remove().draw();
    recalcularTotales();
  });

  // AUMENTAR CANTIDAD

  $('#tbl-ventas tbody').on('click', '.btnAumStock', function () {
    let data = tabla.row($(this).parents('tr')).data(); // recupera datos de la fila
    let idx = tabla.row($(this).parents('tr')).index();
    let codigo_producto = data['codigo_producto'];
    let cantidad = data['cantidad'];

    $.ajax({
      type: "post",
      url: "ajax/ajax.productos.php",
      data: {
        'accion': 9,
        'codigo_producto': codigo_producto,
        'cantidad': cantidad
      },
      dataType: "json",
      success: function (respuesta) {
          console.log(respuesta['existe']);
          console.log(parseInt(respuesta['existe']));
        if (parseInt(respuesta['existe']) === 0) {
          Toast.fire({
            icon: 'error',
            title: '<p> El producto ' + '<b>' + data['nombre_producto'] + '</b>' + ' no cuenta con stock </p>'
          });
          $('#iptCodVenta').val('');
          $('#iptCodVenta').focus();
        } else {
          cantidad = parseInt(data['cantidad']) + 1;
          tabla.cell(idx, 6).data(cantidad).draw();
          let nuevoPrecio = (data['cantidad'] * data['precio_venta_producto'].replace('S./', '')).toFixed(2);
          nuevoPrecio = 'S./ ' + nuevoPrecio;
          tabla.cell(idx, 8).data(nuevoPrecio).draw();
        }
        recalcularTotales();
      }
    });
  });

  // DISMINUIR CANTIDAD
  $('#tbl-ventas tbody').on('click', '.btnDisStock', function () {

    let data = tabla.row($(this).parents('tr')).data(); // recupera datos de la fila
    if (data['cantidad'] > 1) {

      let cantidad = parseInt(data['cantidad']) - 1;
      let idx = tabla.row($(this).parents('tr')).index();

      tabla.cell(idx, 6).data(cantidad).draw();
      let nuevoPrecio = (data['cantidad'] * data['precio_venta_producto'].replace('S./', '')).toFixed(2);
      nuevoPrecio = 'S./ ' + nuevoPrecio;
      tabla.cell(idx, 8).data(nuevoPrecio).draw();
    } else {
      Toast.fire({
        icon: 'error',
        title: '<p> La cantidad no puede ser menor a 1 unidad</p>'
      })
    }
    recalcularTotales();
  });

  // CAMBIAR PRECIO VENTA PRODUCTO

  $('#tbl-ventas tbody').on('click', '.dropdown-item', function () {
    let codigo = $(this).attr('codigo'),
      precio_venta = parseFloat($(this).attr('precio').replaceAll('S./ ', '')).toFixed(2);
    recalcularPrecio(codigo, precio_venta);
  });
  /*===================================================================*/
  // VUELTO EXACTO EVENTO
  /*===================================================================*/
  $('#chkEfectivoExacto').on('change', function () {
    if ($('#chkEfectivoExacto').is(':checked')) {
      let vuelto = 0,
        total_venta = $('#total_venta').html();

      $('#monto_recibido').val(total_venta);
      $('#monto_entregado').html(total_venta);

      let EfectivoRecibido = parseFloat($('#monto_entregado').html());

      vuelto = parseFloat(total_venta) - parseFloat(EfectivoRecibido);
      $('#vuelto_venta').html(vuelto.toFixed(2));
    } else {
      $('#monto_recibido').val('');
      $('#monto_entregado').html('0.00');
      $('#vuelto_venta').html('0.00');
    }
  });

  /*===================================================================*/
  // INGRESANDO EL DINERO RECIBIDO DE FORMA MANUAL
  /*===================================================================*/
  $('#monto_recibido').keyup(function () {
    actualizarVuelto();
  });

  $('#btnRealizarVenta').on('click', () => {
    realizarVenta();
  });

}); // FIN DOC READY


/*===================================================================*/
// FUNCIONES PARA EJECUTAR EN LOS EVENTOS 
/*===================================================================*/

/*===================================================================*/
// CARGAR NUMERO DE BOLETA
/*===================================================================*/
function cargarNumeroBoleta() {
  $.ajax({
    method: 'post',
    url: 'ajax/ajax.ventas.php',
    data: { 'accion': '1' },
    dataType: 'json',
    success: function (respuesta) {
      let serie_boleta = respuesta["nro_serie"],
        correlativo_boleta = respuesta['nro_correlativo'];

      $('#nro_serie').val(serie_boleta);
      $('#nro_correlativo').val(correlativo_boleta);
    }
  });
}

/*===================================================================*/
// CARGAR PRODUCTOS AL DATATABLE
/*===================================================================*/
function cargarProductos(producto = '') {
  let titulo_producto,
    codigo_producto,
    producto_repetido = 0;

  if (producto !== '') {
    titulo_producto = producto;
  } else {
    titulo_producto = $('#iptCodVenta').val();
  }

  codigo_producto = titulo_producto.split('-')[0].trim(); //obtenemos solo el codigo de todo el texto
  // VALIDAR QUE SI SE REPITE YA NO SE COLOCA EL MISMO PRODUCTO PERO AUMENTA CANTIDAD
  tabla.rows().eq(0).each(function (index) {
    let row = tabla.row(index);
    let data = row.data();
    if (parseInt(codigo_producto) === parseInt(data['codigo_producto'])) {

      producto_repetido = 1;

      $.ajax({
        type: "post",
        url: "ajax/ajax.productos.php",
        data: {
          'accion': 9,
          'codigo_producto': data['codigo_producto'],
          'cantidad': data['cantidad']
        },
        dataType: "json",
        success: function (respuesta) {
            console.log(respuesta);
          if (parseInt(respuesta['existe']) === 0) {
            Toast.fire({
              icon: 'error',
              title: '<p> El producto ' + '<b>' + data['nombre_producto'] + '</b>' + ' no cuenta con stock </p>'
            });
            $('#iptCodVenta').val('');
            $('#iptCodVenta').focus();
          } else {
            tabla.cell(index, 6).data(parseInt(data['cantidad']) + 1).draw();
            let nuevoPrecio = (data['cantidad'] * data['precio_venta_producto'].replace('S./', '')).toFixed(2);
            nuevoPrecio = 'S./ ' + nuevoPrecio;
            tabla.cell(index, 8).data(nuevoPrecio).draw();
          }
          recalcularTotales();
        }
      });
    }
  });
    
    console.log(producto_repetido);
    console.log(codigo_producto);
    
    console.log(producto_repetido === codigo_producto);
    console.log('Producto: ' + titulo_producto);
  /*===================================================================*/
  // SI EL PRODUCTO YA ESTA INGRESADO EN LA TABLA HACE UN RETUN VACIO PARA Q NO VUELVA A BUSCA E INGRESARLO
  /*===================================================================*/
  if (producto_repetido == 1) {
    return;
  }

  /*===================================================================*/
  // BUSCA EL PRODUCTO POR SU CODIGO, Y LO INGRESA EN LA TABLA
  /*===================================================================*/
  $.ajax({
    type: "POST",
    url: "ajax/ajax.productos.php",
    cache: false,
    data: {
      accion: '8',
      id_producto: codigo_producto
    },
    dataType: "json",
    success: function (respuesta) {
        console.log(respuesta);
      if (respuesta) {
        tabla.row.add({
          'id': respuesta['id'],
          'detalles': respuesta['detalles'],
          'codigo_producto': respuesta['codigo_producto'],
          'id_categoria': respuesta['id_categoria'],
          'nombre_categoria': respuesta['nombre_categoria'],
          'nombre_producto': respuesta['nombre_producto'],
          'cantidad': respuesta['cantidad'],
          'precio_venta_producto': respuesta['precio_venta_producto'],
          'total': respuesta['total'],
          'acciones': '<center>' +
            '<span class="btnAumStock text-success px-1" style="cursor:pointer;">' +
            '<i class="fas fa-cart-plus" style="font-size:1.2rem;"></i>' +
            '</span>' +
            '<span class="btnDisStock text-warning px-1" style="cursor:pointer;">' +
            '<i class="fas fa-cart-arrow-down" style="font-size:1.2rem;"></i>' +
            '</span>' +
            '<span class="btnEliminarProducto text-danger px-1" style="cursor:pointer;">' +
            '<i class="fas fa-trash-alt" style="font-size:1.2rem;"></i>' +
            '</span>' +
            '<span class="btn-group px-1 pb-1">' +
            '<button type="button" class = "p-0 btn border-0 dropdown-toggle btn btn-primary transparentBar" data-bs-toggle="dropdown" aria-expanded="false">' +
            '<i class="fas fa-cog text-primary" style="font-size:1.2rem;"></i> <i class="fas fa-chevron-down  text-primary"></i>' +
            '</button>' +
            '<ul class="dropdown-menu">' +
            '<li><a class="dropdown-item" codigo="' + respuesta['codigo_producto'] + '" precio="' + respuesta['precio_venta_producto'] + '" style="cursor:pointer; font-size:14px">' +
            'Precio 1: ' + respuesta['precio_venta_producto'] + '</a></li>' +
            '<li><a class="dropdown-item" codigo="' + respuesta['codigo_producto'] + '" precio="' + respuesta['precio_venta_producto_1'] + '" style="cursor:pointer; font-size:14px">' +
            'Precio 2: ' + respuesta['precio_venta_producto_1'] + '</a></li>' +
            '<li><a class="dropdown-item" codigo="' + respuesta['codigo_producto'] + '" precio="' + respuesta['precio_venta_producto_2'] + '" style="cursor:pointer; font-size:14px">' +
            'Precio 3: ' + respuesta['precio_venta_producto_2'] + '</a></li>' +
            '</ul>' +
            '</span>' +
            '</center>',
          'precio_venta_producto_1': respuesta['precio_venta_producto_1'],
          'precio_venta_producto_2': respuesta['precio_venta_producto_2']
        }).draw();

        itemProducto = itemProducto++;
        recalcularTotales();
      }
      else {
        Toast.fire({
          icon: 'error',
          title: `El producto no existe o no cuenta con stock`
        });
        $('#iptCodVenta').val('');
        $('#iptCodVenta').focus();
      }

    },
    error: function(xhr, status, error) {
        // Función que se ejecutará si hay un error en la petición
        console.log("Error en la petición AJAX: " + error);
      }
  });
}

/*===================================================================*/
// RECALCULAR PRECIO , POR MEDIO DE LOS NUEVOS PRECIOS
/*===================================================================*/
function recalcularPrecio(codigo_prod, prec_venta) {

  tabla.rows().eq(0).each(function (index) {
    let row, data;

    row = tabla.row(index);
    data = row.data();

    if (data['codigo_producto'] == codigo_prod) {
      tabla.cell(index, 7).data('S./ ' + parseFloat(prec_venta)).draw();
      let nuevoPrecio = (parseFloat(data['cantidad']) * data['precio_venta_producto'].replace('S./', '')).toFixed(2);
      nuevoPrecio = 'S./ ' + nuevoPrecio;
      tabla.cell(index, 8).data(nuevoPrecio).draw();
    }
    recalcularTotales();
  });
}

/*===================================================================*/
// FUNCION RECALCULAR TOTAL
/*===================================================================*/
function recalcularTotales() {
  let igv = 0.18,
    sub_total = 0.00,
    total_venta = 0.00;

  tabla.rows().eq(0).each(function (index) {
    let row, data;

    row = tabla.row(index);
    data = row.data();

    total_venta = parseFloat(total_venta) + parseFloat(data['total'].replace('S./ ', ""));
  });
  $('#total_venta').html('');
  $('#total_venta').html(total_venta.toFixed(2));
  $('#totalVentaRegistrar').html('');
  $('#totalVentaRegistrar').html(total_venta.toFixed(2));

  $('#iptCodVenta').val('');

  igv = parseFloat(total_venta) * igv;
  sub_total = parseFloat(total_venta) - parseFloat(igv);
  $('#sub_total').html('');
  $('#sub_total').html(sub_total.toFixed(2));
  $('#igv').html('');
  $('#igv').html(igv.toFixed(2));
  $('#total').html('');
  $('#total').html(total_venta.toFixed(2));

  $('#monto_recibido').val('');
  $('#chkEfectivoExacto').prop('checked', false);
  $('#monto_entregado').html('0.00');
  $('#vuelto_venta').html('0.00');

  $('#iptCodVenta').val('');
  $('#iptCodVenta').focus();
}

/*===================================================================*/
// VACIAR LISTADO GENERAL
/*===================================================================*/

function vaciarListado() {
  tabla.clear().draw();
  recalcularTotales();
  $('#chkEfectivoExacto').prop('checked', false);
}

/*===================================================================*/
// ACTUALIZAR EL VUELTO A ENTREGAR
/*===================================================================*/

function actualizarVuelto() {
  let vuelto = 0,
    total_venta = $('#total_venta').html(),
    efectivoRecibido = parseFloat($('#monto_recibido').val());
  $('#chkEfectivoExacto').prop('checked', false);

  if (efectivoRecibido > 0) {
    $('#monto_entregado').html(parseFloat(efectivoRecibido).toFixed(2));
    vuelto = parseFloat(efectivoRecibido) - parseFloat(total_venta);
    $('#vuelto_venta').html(vuelto.toFixed(2));
  } else {
    $('#monto_entregado').html('0.00');
    $('#vuelto_venta').html('0.00');
  }
}

/*===================================================================*/
// REALIZAR LA VENTA
/*===================================================================*/

function realizarVenta() {
  let count = 0,
    totalVenta = $('#total_venta').html(),
    nro_correlativo = $('#nro_correlativo').val(),
    subtotal_venta = $('#sub_total').html(),
    igv_venta = $('#igv').html();

  tabla.rows().eq(0).each((index) => {
    count++;
  })
  if (count > 0) {
    if($('#monto_recibido').val() > 0 && $('#monto_recibido').val() != ''){

      if($('#monto_recibido').val() < parseFloat(totalVenta)){
        Toast.fire({
          icon: 'warning',
          title: 'El efectivo recibido es menor al monto total a pagar'
        });
        return false;
      }
        let formData = new FormData(),
            arr = [];

        tabla.rows().eq(0).each((index) => {
          let row = tabla.row(index),
              data = row.data();
          arr[index] = data['id'] + ',' + parseInt(data['cantidad']) + ',' + parseFloat(data['precio_venta_producto'].replace('S./ ', '')).toFixed(2) + ',' + data['total'].replace('S./ ','');
          formData.append('arr[]',arr[index]);
        });
        formData.append('nro_correlativo',nro_correlativo);
        formData.append('descripcion_venta','Venta realizada con numero de correlativo: ' + nro_correlativo);
        formData.append('subtotal_venta',subtotal_venta);
        formData.append('igv_venta',igv_venta);
        formData.append('total_venta',totalVenta);

        $.ajax({
          method: 'POST',
          url: 'ajax/ajax.ventas.php',
          data: formData,
          cache: false,
          contentType: false,
          processData: false,
          dataType: 'json',
          success: function(respuesta){
            console.log(respuesta);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: respuesta,
              showConfirmButton: false,
              timer: 1500
            })

            tabla.clear().draw();
            recalcularTotales();
            cargarNumeroBoleta();
          }
        });
    }else{
      Toast.fire({
        icon: 'error',
        title: 'Ingrese el monto en efectivo'
      })
      $('#monto_recibido').focus();
    }
  } else {
    Toast.fire({
      icon: 'error',
      title: ' No se agregaron productos para la venta'
    })
  }
}