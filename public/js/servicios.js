import * as prodFunciones from './servicios-validaciones.js';

let d = document,
  tablaServicios,
  idProducto,
  forms = d.getElementsByClassName('needs-validation'),
  btnGuardar = d.getElementById('btnGuardar'),
  accion,
  Toast,
  verbo, verbo_1, verbo_2;

Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 4000
});

$(d).ready(function () {
  tablaServicios = $('#tbl-servicios').DataTable({
    'ajax': {
      'type': 'POST',
      'url': 'ajax/ajax.servicios.php',
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
          $("#mod-servicios").modal('show');
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
      { "targets": 1, "class": "text-center" },
      {
        "targets": 5, "orderable": false, render: function (data) {
          return 'S/ ' + data;
        }
      },
      { "targets": 6, "visible": false },
      {
        "targets": 7, "orderable": false, render: function () {
          return '<center>' +
            '<span class="btnEditar text-primary px-1" style="cursor:pointer;">' +
            '<i class="fas fa-pencil-alt" style="font-size:1.2rem;"></i>' +
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

  $('#tbl-servicios tbody').on('click', '.btnEditar', function () {
    accion = 3;

    let filaSelec = $(this).parents('tr').hasClass('selected'),
      valDimTabla = tablaServicios.row(this).child.isShown(),
      data;
    //al hacer clic en el boton editar se pinta el registro
    (filaSelec)
      ? $(this).parents('tr').removeClass('selected')
      : tablaServicios.$('tr.selected').removeClass('selected'), $(this).parents('tr').addClass('selected');

    $('#mod-servicios').modal('show');

    //vlidamos si esta en pantalla completa o responsive
    (valDimTabla)
      ? data = tablaServicios.row(this).data()
      : data = tablaServicios.row($(this).parents('tr')).data();

      console.log(data);
    idProducto = data[1];
    $("#catProducto").val(data[6]);
    $("#nomProducto").val(data[3]);
    $("#desProducto").val(data[4]);
    $("#precProducto").val(data[5]);

    prodFunciones.fn.validarVacio(prodFunciones.nomProd, prodFunciones.nomProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.catProd, prodFunciones.catProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.desProd, prodFunciones.desProd.name);
    prodFunciones.fn.validarVacio(prodFunciones.precProd, prodFunciones.precProd.name);
  });

  $('#tbl-servicios tbody').on('click', '.btnEliminar', function () {
    accion = 4;

    if (accion === 4) verbo = 'eliminar';
    if (accion === 4) verbo_1 = 'eliminado';
    if (accion === 4) verbo_2 = 'eliminarlo';

    let filaSelec = $(this).parents('tr').hasClass('selected'),
      valDimTabla = tablaServicios.row(this).child.isShown(),
      data;
    //al hacer clic en el boton editar se pinta el registro
    (filaSelec)
      ? $(this).parents('tr').removeClass('selected')
      : tablaServicios.$('tr.selected').removeClass('selected'), $(this).parents('tr').addClass('selected');

    //vlidamos si esta en pantalla completa o responsive
    (valDimTabla)
      ? data = tablaServicios.row(this).data()
      : data = tablaServicios.row($(this).parents('tr')).data();

    idProducto = data[1];

    Swal.fire({
      title: `¿Estas seguro de ${verbo} el servicio?`,
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
          url: "ajax/ajax.servicios.php",
          cache: false,
          contentType: false,
          data: datos,
          processData: false,
          dataType: "json",
          success: function (respuesta) {

            if (respuesta == 'ok') {
              Toast.fire({
                icon: 'success',
                title: `El servicio se ha ${verbo_1} correctamente!`
              });
              tablaServicios.ajax.reload();
            } else {
              Toast.fire({
                icon: 'error',
                title: `El servicio no se pudo ${verbo}!`
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

    Array.prototype.filter.call(forms, (form) => {
      if (form.checkValidity() === true) {
        verbo = (accion === 2) ? 'registrar' : 'actualizar';
        verbo_1 = (accion === 2) ? 'registrado' : 'actualizado';
        verbo_2 = (accion === 2) ? 'registrarlo' : 'actualizarlo';

        Swal.fire({
          title: `¿Estas seguro de ${verbo} el servicio?`,
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
            datos.append('nomProducto', $('#nomProducto').val());
            datos.append('catProducto', $('#catProducto').val());
            datos.append('desProducto', $('#desProducto').val());
            datos.append('precProducto', $('#precProducto').val());

            $.ajax({
              method: "POST",
              url: "ajax/ajax.servicios.php",
              cache: false,
              contentType: false,
              data: datos,
              processData: false,
              dataType: "json",
              success: function (respuesta) {
                console.log(respuesta);
                if (respuesta == 'ok') {
                  Toast.fire({
                    icon: 'success',
                    title: `El servicio se ha ${verbo_1} correctamente!`
                  });
                  tablaServicios.ajax.reload();

                  $("#mod-servicios").modal('hide');

                  $("#nomProducto").val("");
                  $("#catProducto").val("");
                  $("#desProducto").val("");
                  $("#precProducto").val("");

                  $('#nomProducto').removeClass("is-valid");
                  $('#catProducto').removeClass("is-valid");
                  $('#desProducto').removeClass("is-valid");
                  $('#precProducto').removeClass("is-valid");
                  $('#nomProducto').removeClass("is-invalid");
                  $('#catProducto').removeClass("is-invalid");
                  $('#desProducto').removeClass("is-invalid");
                  $('#precProducto').removeClass("is-invalid");
                } else {
                  Toast.fire({
                    icon: 'error',
                    title: `El servicio no se pudo ${verbo}!`
                  });
                }
              }
            });
          }
        }));
      }
    });
  });
});

$(d).ready(() => {
  d.addEventListener('click', e => {
    if (e.target.matches('#btnCancelar')) {
      $('#nomProducto').val("");
      $('#catProducto').val("");
      $('#desProducto').val("");
      $('#precProducto').val("");

      $('#nomProducto').removeClass("is-valid");
      $('#catProducto').removeClass("is-valid");
      $('#desProducto').removeClass("is-valid");
      $('#precProducto').removeClass("is-valid");
      $('#nomProducto').removeClass("is-invalid");
      $('#catProducto').removeClass("is-invalid");
      $('#desProducto').removeClass("is-invalid");
      $('#precProducto').removeClass("is-invalid");
    }
  });
})