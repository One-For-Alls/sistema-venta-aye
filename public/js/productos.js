import * as prodFunciones from './productos-validaciones.js';

let d = document,
  tablaProductos,
  idProducto,
  forms = d.getElementsByClassName('needs-validation'),
  btnGuardar = d.getElementById('btnGuardar'),
  btnGuardarStock = d.getElementById('btnGuardarStock'),
  accion,
  accionStock,
  Toast,
  verbo, verbo_1, verbo_2;

Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 4000
});

$(d).ready(function () {
  tablaProductos = $('#tbl-productos').DataTable({
    'ajax': {
      'type': 'POST',
      'url': 'ajax/ajax.productos.php',
      'dataSrc': '',
      'data': { accion: 1 }
    },
    "dom": 'Bfrtip',
    "stripeClasses": false,
    "rowClass": "",
    "buttons": [
      {
        "text": 'Nuevo producto',
        "className": 'btn btn-info m-1 rounded-0',
        action: function () {
          $("#mod-productos").modal('show');
          accion = 2;
        }
      },
      {
        "extend": 'csv', "text": "Excel", "className": 'btn btn-success m-1 rounded-0', exportOptions: {
          columns: [1, 2, 3, 4] // Índices de las columnas que deseas exportar (comenzando desde 0)
        }
      },
      {
        "extend": 'print', "className": 'btn btn-danger m-1 rounded-0', exportOptions: {
          columns: [1, 2, 3, 4] // Índices de las columnas que deseas exportar (comenzando desde 0)
        }
      },
      { "extend": 'pageLength', "className": 'btn btn-default m-1' }
    ],
    "responsive": true, "lengthChange": false, "autoWidth": false,
    "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, 'todos']],
    "pageLength": 10,
    "columnDefs": [
      { "targets": 0, "orderable": false, "class": "control" },
      { "targets": 1, "class": "text-center", 'visible': false },
      {
        "targets": 6, "orderable": false, render: function (data) {
          return 'S/ ' + data;
        }
      },
      {
        "targets": 7, "orderable": false,  render: function (data) {
          return 'S/ ' + data;
        }
      },
      {
        "targets": 8, "orderable": false, render: function (data) {
          return 'S/ ' + data;
        }
      },
      {
        "targets": 9, "class": "text-center",
        "createdCell": function (td, cellData, rowData, row, cel) {
          if (rowData[9] >= 0 && rowData[9] <= 3)
            $(td).parent().css({ 'background': '#ff00237a', 'color': '#fff' });
        }
      },
      { "targets": 10, "visible": false},
      { "targets":11, "visible": false},
      { "targets": 12, "visible": false},
      {
        "targets": 13, "orderable": false, render: function () {
          return '<center>' +
            '<span class="btnEditar text-primary px-1" style="cursor:pointer;">' +
            '<i class="fas fa-pencil-alt" style="font-size:1.2rem;"></i>' +
            '</span>' +
            '<span class="btnAumStock text-success px-1" style="cursor:pointer;">' +
            '<i class="fas fa-plus-circle" style="font-size:1.2rem;"></i>' +
            '</span>' +
            '<span class="btnDisStock text-warning px-1" style="cursor:pointer;">' +
            '<i class="fas fa-minus-circle" style="font-size:1.2rem;"></i>' +
            '</span>' +
            '<span class="btnEliminar text-danger px-1" style="cursor:pointer;">' +
            '<i class="fas fa-trash-alt" style="font-size:1.2rem;"></i>' +
            '</span>' +
            '</center>'
        }
      },
    ],
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

  $.ajax({
    url: 'ajax/ajax.categorias.php',
    method: 'POST',
    data: {
      accion: 1
    },
    dataType: 'json',
    success: (respuesta) => {
      let options = '<option value = "" selected>Seleccione una categoria</option>';
      respuesta.forEach((categoria) => {
        options = options + `<option value=${categoria[1]}>${categoria[2]}</option>`;
      })
      $('#catProducto').html(options);
    }
  });

  prodFunciones.validacionProductosInput();

  $('#tbl-productos tbody').on('click', '.btnEditar', function () {
    accion = 3;

    let filaSelec = $(this).parents('tr').hasClass('selected'),
      valDimTabla = tablaProductos.row(this).child.isShown(),
      data;
    //al hacer clic en el boton editar se pinta el registro
    (filaSelec)
      ? $(this).parents('tr').removeClass('selected')
      : tablaProductos.$('tr.selected').removeClass('selected'), $(this).parents('tr').addClass('selected');

    $('#mod-productos').modal('show');

    //vlidamos si esta en pantalla completa o responsive
    (valDimTabla)
      ? data = tablaProductos.row(this).data()
      : data = tablaProductos.row($(this).parents('tr')).data();

      console.log('id producto: ',data)
    idProducto = data[1];
    $("#codProducto").val(data[2]);
    $("#nomProducto").val(data[4]);
    $("#desProducto").val(data[5]);
    $("#precProducto").val(data[6]);
    $("#precProducto2").val(data[7]);
    $("#precProducto3").val(data[8]);
    $("#stockProducto").val(data[9]);
    $("#catProducto").val(data[12]);
    console.log(data);
    prodFunciones.fn.validarVacio(prodFunciones.codProd, prodFunciones.codProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.nomProd, prodFunciones.nomProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.catProd, prodFunciones.catProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.desProd, prodFunciones.desProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.precProd, prodFunciones.precProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.precProd2, prodFunciones.precProd2.name);
    prodFunciones.fn.validarVacio(prodFunciones.precProd3, prodFunciones.precProd3.name);
    prodFunciones.fn.validarVacio(prodFunciones.stockProd, prodFunciones.stockProd.name);
  });

  $('#tbl-productos tbody').on('click', '.btnAumStock', function () {
    accion = 4;
    accionStock = 1;

    let filaSelec = $(this).parents('tr').hasClass('selected'),
        valDimTabla = tablaProductos.row(this).child.isShown(),
        stockCantProd = d.getElementById('cantStockProd'),
        data;

    if (accionStock === 1) verbo = 'aumentar';
    if (accionStock === 1) verbo_1 = 'aumentado';
    if (accionStock === 1) verbo_2 = 'aumentalo';

    if (accionStock === 1) {
      $('#titulo-stock').html('Aumentar Stock');
      $('#texto-label-stock').html('Agregar al stock');
      $('#cantStockProd').attr('placeholder', 'Ingresa cantidad de stock a aumentar');

      //al hacer clic en el boton editar se pinta el registro
      (filaSelec)
        ? $(this).parents('tr').removeClass('selected')
        : tablaProductos.$('tr.selected').removeClass('selected'), $(this).parents('tr').addClass('selected');

      $('#mod-productos-stock').modal('show');

      //vlidamos si esta en pantalla completa o responsive
      (valDimTabla)
        ? data = tablaProductos.row(this).data()
        : data = tablaProductos.row($(this).parents('tr')).data();

      $('#stock-id').html(data[1]);
      $('#stock-prod').html(data[3]);
      $('#stock-cant').html(data[9]);
      $('#stock-nuevo').html(data[9]);
      idProducto = data[1];

      stockCantProd.addEventListener('input', (e) => {
        let stockCantProdNuevo = data[9],
          stockCantProdAnterior = stockCantProd.value;

        stockCantProdAnterior = (stockCantProdAnterior) ? stockCantProdAnterior : 0;

        prodFunciones.fn.validarStock(stockCantProd, stockCantProd.name);
        $('#stock-nuevo').html(parseInt(stockCantProdAnterior) + parseInt(stockCantProdNuevo));
      });
    }
  });

  $('#tbl-productos tbody').on('click', '.btnDisStock', function () {
    accion = 5;
    accionStock = 2;

    if (accionStock === 2) verbo = 'disminuir';
    if (accionStock === 2) verbo_1 = 'disminuido';
    if (accionStock === 2) verbo_2 = 'disminuyelo';

    if (accionStock === 2) {
      $('#titulo-stock').html('Disminuir Stock');
      $('#texto-label-stock').html('Descontar al stock');
      $('#cantStockProd').attr('placeholder', 'Ingresa cantidad de stock a disminuir');

      let filaSelec = $(this).parents('tr').hasClass('selected'),
        valDimTabla = tablaProductos.row(this).child.isShown(),
        stockCantProd = d.getElementById('cantStockProd'),
        data;
      //al hacer clic en el boton editar se pinta el registro
      (filaSelec)
        ? $(this).parents('tr').removeClass('selected')
        : tablaProductos.$('tr.selected').removeClass('selected'), $(this).parents('tr').addClass('selected');

      $('#mod-productos-stock').modal('show');

      //vlidamos si esta en pantalla completa o responsive
      (valDimTabla)
        ? data = tablaProductos.row(this).data()
        : data = tablaProductos.row($(this).parents('tr')).data();

      $('#stock-id').html(data[1]);
      $('#stock-prod').html(data[3]);
      $('#stock-cant').html(data[9]);
      $('#stock-nuevo').html(data[9]);
      idProducto = data[1];

      stockCantProd.addEventListener('input', (e) => {
        let stockCantProdNuevo = data[9],
          stockCantProdAnterior = stockCantProd.value;

        if(stockCantProdAnterior === '') stockCantProd.value = 0;

        console.log(stockCantProdAnterior);

        prodFunciones.fn.validarStock(stockCantProd, stockCantProd.name);
        $('#stock-nuevo').html(parseInt(stockCantProdNuevo) - parseInt(stockCantProdAnterior));

        console.log('stock actual' + parseInt(stockCantProdNuevo),'cantidad a restar' + (stockCantProdAnterior));
        console.log(parseInt(stockCantProdNuevo) - parseInt(stockCantProdAnterior));

        if ($('#stock-nuevo').html() <= 0) {
          Toast.fire({
            icon: 'warning',
            title: `La cantidad a ingresar no puede ser menor a la cantidad actual. (Nuevo stock <= 0)`
          });
          stockCantProd.value = '';
          stockCantProd.focus();
          $('#cantStockProd').removeClass("is-valid");
          $('#cantStockProd').removeClass("is-invalid");
          $('#stock-nuevo').html(parseInt(stockCantProdNuevo));
        }
      });
    }
  });

  $('#tbl-productos tbody').on('click', '.btnEliminar', function () {
    accion = 6;

    if (accion === 6) verbo = 'eliminar';
    if (accion === 6) verbo_1 = 'eliminado';
    if (accion === 6) verbo_2 = 'eliminarlo';

    let filaSelec = $(this).parents('tr').hasClass('selected'),
      valDimTabla = tablaProductos.row(this).child.isShown(),
      data;
    //al hacer clic en el boton editar se pinta el registro
    (filaSelec)
      ? $(this).parents('tr').removeClass('selected')
      : tablaProductos.$('tr.selected').removeClass('selected'), $(this).parents('tr').addClass('selected');

    //vlidamos si esta en pantalla completa o responsive
    (valDimTabla)
      ? data = tablaProductos.row(this).data()
      : data = tablaProductos.row($(this).parents('tr')).data();

    idProducto = data[1];

    Swal.fire({
      title: `¿Estas seguro de ${verbo} el producto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, deseo ${verbo_2}`,
      cancelButtonText: 'Cancelar'
    }).then((result => {
      if (result.isConfirmed) {

        var datos = new FormData();
        datos.append('accion', accion);
        datos.append('idProducto', idProducto);

        $.ajax({
          method: "POST",
          url: "ajax/ajax.productos.php",
          cache: false,
          contentType: false,
          data: datos,
          processData: false,
          dataType: "json",
          success: function (respuesta) {

            if (respuesta == 'ok') {
              Toast.fire({
                icon: 'success',
                title: `El producto se ha ${verbo_1} correctamente!`
              });
              tablaProductos.ajax.reload();
            } else {
              Toast.fire({
                icon: 'error',
                title: `El cliente no se pudo ${verbo}!`
              });
            }
          }
        });
      }
    }));
  });

  btnGuardar.addEventListener('click', () => {

    prodFunciones.fn.validarVacio(prodFunciones.nomProd, prodFunciones.nomProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.desProd, prodFunciones.desProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.catProd, prodFunciones.catProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.precProd, prodFunciones.precProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.stockProd, prodFunciones.stockProd.name);

    Array.prototype.filter.call(forms, (form) => {
      if (form.checkValidity() === true) {
        verbo = (accion === 2) ? 'registrar' : 'actualizar';
        verbo_1 = (accion === 2) ? 'registrado' : 'actualizado';
        verbo_2 = (accion === 2) ? 'registrarlo' : 'actualizarlo';

        Swal.fire({
          title: `¿Estas seguro de ${verbo} el producto?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: `Si, deseo ${verbo_2}`,
          cancelButtonText: 'Cancelar'
        }).then((result => {
          if (result.isConfirmed) {

            var datos = new FormData();
            datos.append('accion', accion);
            datos.append('idProducto', idProducto);
            datos.append('codProducto', $('#codProducto').val());
            datos.append('nomProducto', $('#nomProducto').val());
            datos.append('catProducto', $('#catProducto').val());
            datos.append('desProducto', $('#desProducto').val());
            datos.append('precProducto', $('#precProducto').val());
            datos.append('precProducto2', $('#precProducto2').val());
            datos.append('precProducto3', $('#precProducto3').val());
            datos.append('stockProducto', $('#stockProducto').val());

            $.ajax({
              method: "POST",
              url: "ajax/ajax.productos.php",
              cache: false,
              contentType: false,
              data: datos,
              processData: false,
              dataType: "json",
              success: function (respuesta) {

                if (respuesta == 'ok') {
                  Toast.fire({
                    icon: 'success',
                    title: `El producto se ha ${verbo_1} correctamente!`
                  });
                  tablaProductos.ajax.reload();

                  $("#mod-productos").modal('hide');

                  $("#nomProducto").val("");
                  $("#catProducto").val("");
                  $("#desProducto").val("");
                  $("#precProducto").val("");
                  $("#stockProducto").val("");

                  $('#nomProducto').removeClass("is-valid");
                  $('#catProducto').removeClass("is-valid");
                  $('#desProducto').removeClass("is-valid");
                  $('#precProducto').removeClass("is-valid");
                  $('#stockProducto').removeClass("is-valid");
                  $('#nomProducto').removeClass("is-invalid");
                  $('#catProducto').removeClass("is-invalid");
                  $('#desProducto').removeClass("is-invalid");
                  $('#precProducto').removeClass("is-invalid");
                  $('#stockProducto').removeClass("is-invalid");
                } else {
                  Toast.fire({
                    icon: 'error',
                    title: `El cliente no se pudo ${verbo}!`
                  });
                }
              }
            });
          }
        }));
      }
    });
  });

  btnGuardarStock.addEventListener('click', () => {

    prodFunciones.fn.validarStock(prodFunciones.stockCantProd, prodFunciones.stockCantProd.name);
    
    if ($('#cantStockProd').val() !== '' && parseInt($('#cantStockProd').val()) > 0) {
      var datos = new FormData();
      datos.append('accion', accion);
      datos.append('id', idProducto);
      datos.append('nuevoStock', $('#stock-nuevo').html());
      $.ajax({
        method: "POST",
        url: "ajax/ajax.productos.php",
        cache: false,
        contentType: false,
        data: datos,
        processData: false,
        dataType: "json",
        success: function (respuesta) {

          if (respuesta == 'ok') {
            Toast.fire({
              icon: 'success',
              title: `El stock se ha ${verbo_1} correctamente!`
            });
            tablaProductos.ajax.reload();
            $("#mod-productos-stock").modal('hide');
            $('#cantStockProd').val("");
            $('#cantStockProd').removeClass("is-valid");
            $('#cantStockProd').removeClass("is-invalid");

          } else {
            Toast.fire({
              icon: 'error',
              title: `El stock no se pudo ${verbo}!`
            });
          }
        }
      });
    }else{
      Toast.fire({
        icon: 'error',
        title: ` El nuevo stock no puede ser negativo`
      });
    }
  });
});

$(d).ready(() => {
  d.addEventListener('click', e => {
    if (e.target.matches('#btnCancelar')) {
      $('#codProducto').val("");
      $('#nomProducto').val("");
      $('#catProducto').val("");
      $('#desProducto').val("");
      $('#precProducto').val("");
      $('#precProducto2').val("");
      $('#precProducto3').val("");
      $('#stockProducto').val("");

      $('#nomProducto').removeClass("is-valid");
      $('#codProducto').removeClass("is-valid");
      $('#catProducto').removeClass("is-valid");
      $('#desProducto').removeClass("is-valid");
      $('#precProducto').removeClass("is-valid");
      $('#precProducto2').removeClass("is-valid");
      $('#precProducto3').removeClass("is-valid");
      $('#stockProducto').removeClass("is-valid");
      $('#nomProducto').removeClass("is-invalid");
      $('#codProducto').removeClass("is-invalid");
      $('#catProducto').removeClass("is-invalid");
      $('#desProducto').removeClass("is-invalid");
      $('#precProducto').removeClass("is-invalid");
      $('#precProducto2').removeClass("is-invalid");
      $('#precProducto3').removeClass("is-invalid");
      $('#stockProducto').removeClass("is-invalid");
    }
  });

  d.addEventListener('click', e => {
    if (e.target.matches('#btnCancelarStock')) {
      console.log('aquiiiii');
      $('#cantStockProd').val("");

      $('#cantStockProd').removeClass("is-valid");
      $('#cantStockProd').removeClass("is-invalid");
    }
  })
})