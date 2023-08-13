import * as cliFuncion from './clientes-validaciones.js';

let accion,
  d = document,
  tablaClientes,
  forms = d.getElementsByClassName('needs-validation'),
  btnGuardar = d.getElementById('btnGuardar'),
  idCliente,
  Toast,
  verbo,verbo_1,verbo_2;

Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 4000
});

$(document).ready(function () {

  tablaClientes = $("#tbl-clientes").DataTable({
    "ajax": {
      "url": "ajax/ajax.clientes.php",
      "type": "POST",
      "dataSrc": "",
      "data": { accion: 1 }
    },
    "dom": 'Bfrtip',
    "stripeClasses": false,
    "rowClass": "",
    "responsive": true, "lengthChange": false, "autoWidth": false,
    "columnDefs": [
      { "targets": 0, "orderable": false, "class": "control" },
      { "targets": 1, "visible": true },
      { "targets": 7, "orderable": false, render: function () {
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
    "buttons": [
      {
        "text": 'Nuevo cliente',
        "className": 'btn btn-info m-1 rounded-0',
        action: function () {
          $("#mod-clientes").modal('show');
          accion = 2;
        }
      },
      // {
      //   "extend": 'pdf',"className": 'btn btn-success m-1',
      //     exportOptions: {
      //       columns: [1,2,3,4,5,6] // Índices de las columnas que deseas exportar (comenzando desde 0)
      //     }, 
      //     customize: function (doc) {
      //       // Establecer opciones de estilo para el cuadro
      //       console.log(doc);
      //       doc.content[1].margin = [ 40, 0, 10, 10] //left, top, right, bottom
      //     }, 
      //     title: function () {
      //       return 'Relacion de clientes';
      //   }
      // }
      ,
      { "extend": 'csv', "text": "Excel", "className": 'btn btn-success m-1',exportOptions: {
        columns: [1,2,3,4,5,6] // Índices de las columnas que deseas exportar (comenzando desde 0)
        }
      },
      { "extend": 'print', "className": 'btn btn-danger m-1 rounded-0',exportOptions: {
        columns: [1,2,3,4,5,6] // Índices de las columnas que deseas exportar (comenzando desde 0)
        }
      },
      { "extend": 'pageLength', "className": 'btn btn-default m-1' }
    ],
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
    }
  });

  cliFuncion.validacionClientesInput();

  /* EDITAR CLIENTES */
  $('#tbl-clientes tbody').on('click', '.btnEditar', function () {

    accion = 3; // la accion que recibira el ajax para la edicion

    let filaSelec = $(this).parents('tr').hasClass('selected'),
      valDimTabla = tablaClientes.row(this).child.isShown(),
      data;

    //al hacer clic en el boton editar se pinta el registro
    (filaSelec)
      ? $(this).parents('tr').removeClass('selected')
      : tablaClientes.$('tr.selected').removeClass('selected'), $(this).parents('tr').addClass('selected');

    $('#mod-clientes').modal('show');

    //vlidamos si esta en pantalla completa o responsive
    (valDimTabla)
      ? data = tablaClientes.row(this).data()
      : data = tablaClientes.row($(this).parents('tr')).data();

    idCliente = data[1];
    $("#nomCliente").val(data[2]);
    $("#apeCliente").val(data[3]);
    $("#dirCliente").val(data[4]);
    $("#celCliente").val(data[5]);

    cliFuncion.validarVacio(cliFuncion.nombreCliente,cliFuncion.nombreCliente.name);
    cliFuncion.validarVacio(cliFuncion.apellidoCliente,cliFuncion.apellidoCliente.name);
    cliFuncion.validarVacio(cliFuncion.direccionCliente,cliFuncion.direccionCliente.name);
    cliFuncion.validarVacio(cliFuncion.celularCliente,cliFuncion.celularCliente.name);
  });
  /* ELIMINAR CLIENTES */
  $('#tbl-clientes tbody').on('click','.btnEliminar', function() {
    accion = 4;

    if(accion === 4)  {verbo = 'eliminar'; verbo_1 = 'eliminado'; verbo_2 = 'eliminarlo'}

    let filaSelec = $(this).parents('tr').hasClass('selected'),
      valDimTabla = tablaClientes.row(this).child.isShown(),
      data;

    (filaSelec)
    ? $(this).parents('tr').removeClass('selected')
    : tablaClientes.$('tr.selected').removeClass('selected'), $(this).parents('tr').addClass('selected');
      
    (valDimTabla)
    ? data = tablaClientes.row(this).data()
    : data = tablaClientes.row($(this).parents('tr')).data();

    idCliente = data[1];

    Swal.fire({
      title: `¿Estas seguro de ${verbo} el cliente?`,
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
        datos.append('idCliente',idCliente);

        $.ajax({
          method: "POST",
          url: "ajax/ajax.clientes.php",
          cache: false,
          contentType: false,
          data: datos,
          processData: false,
          dataType: "json",
          success: function (respuesta) {

            if (respuesta == 'ok') {
              Toast.fire({
                icon: 'success',
                title: `El cliente se ha ${verbo_1} correctamente!`
              });
              tablaClientes.ajax.reload();
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

  })
});

/* GUARDAR NUEVOS CLIENTES */
btnGuardar.addEventListener('click', () => {

  cliFuncion.validarVacio(cliFuncion.nombreCliente,cliFuncion.nombreCliente.name);
  cliFuncion.validarVacio(cliFuncion.apellidoCliente,cliFuncion.apellidoCliente.name);
  cliFuncion.validarVacio(cliFuncion.direccionCliente,cliFuncion.direccionCliente.name);
  cliFuncion.validarVacio(cliFuncion.celularCliente,cliFuncion.celularCliente.name);

  Array.prototype.filter.call(forms, (form) => {
      
    verbo = (accion === 2) ? 'registrar' : 'actualizar';
    verbo_1 =  (accion === 2) ?  'registrado' : 'actualizado';
    verbo_2 =  (accion === 2) ?  'registrarlo' : 'actualizarlo';

    if (form.checkValidity() === true) {
      Swal.fire({
        title: `¿Estas seguro de ${verbo} el cliente?`,
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
          datos.append('idCliente',idCliente);
          datos.append('nomCliente', $('#nomCliente').val());
          datos.append('apeCliente', $('#apeCliente').val());
          datos.append('dirCliente', $('#dirCliente').val());
          datos.append('celCliente', $('#celCliente').val());

          $.ajax({
            method: "POST",
            url: "ajax/ajax.clientes.php",
            cache: false,
            contentType: false,
            data: datos,
            processData: false,
            dataType: "json",
            success: function (respuesta) {

              if (respuesta == 'ok') {
                Toast.fire({
                  icon: 'success',
                  title: `El cliente se ha ${verbo_1} correctamente!`
                });
                tablaClientes.ajax.reload();

                $("#mod-clientes").modal('hide');

                $("#nomCliente").val("");
                $("#apeCliente").val("");
                $("#dirCliente").val("");
                $("#celCliente").val("");
                $('#nomCliente').removeClass('is-valid');
                $('#nomCliente').removeClass('is-invalid');
                $('#apeCliente').removeClass('is-valid');
                $('#apeCliente').removeClass('is-invalid');
                $('#dirCliente').removeClass('is-valid');
                $('#dirCliente').removeClass('is-invalid');
                $('#celCliente').removeClass('is-valid');
                $('#celCliente').removeClass('is-invalid');
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
  // console.log(forms);
  //console.log(validation);
});

// para limpiar imputs al dar clic en cancelar
$(document).ready(function () {
  $("#btnCancelar").on("click", function () {

    $("#nomCliente").val("");
    $("#apeCliente").val("");
    $("#dirCliente").val("");
    $("#celCliente").val("");
    $('#nomCliente').removeClass('is-valid');
    $('#nomCliente').removeClass('is-invalid');
    $('#apeCliente').removeClass('is-valid');
    $('#apeCliente').removeClass('is-invalid');
    $('#dirCliente').removeClass('is-valid');
    $('#dirCliente').removeClass('is-invalid');
    $('#celCliente').removeClass('is-valid');
    $('#celCliente').removeClass('is-invalid');
  });
});



