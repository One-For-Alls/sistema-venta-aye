import * as catFunciones from './categorias-validaciones.js';

let d = document,
    tablaCategorias,
    accion,
    verbo,verbo_1,verbo_2,
    idCategoria = 0,
    Toast,
    forms = d.getElementsByClassName('needs-validation'),
    btnGuardar = d.getElementById('btnGuardar'),
    btnLimpiar = d.getElementById('btnLimpiar');

    Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000
    });

$(document).ready(function () {

  tablaCategorias = $('#tbl-categorias').DataTable({
    "ajax":{
      "url": 'ajax/ajax.categorias.php',
      "type": "POST",
      "dataSrc": "",
      "data": { accion: 1 }
    },
    "columnDefs": [
      { "targets": 0, "orderable": false, "class": "control" },
      { "targets": 1, "visible": true },
      {
        "targets": 5, "orderable": false, render: function () {
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
    "stripeClasses": false,
    "rowClass": "",
    "responsive": true, "lengthChange": false, "autoWidth": false,
    "dom": 'Bfrtip',//cada letra repesenta un componente a mostrar en pantalla
    "buttons": [
      { "extend": 'csv', "text": "Excel", "className": 'btn btn-success m-1 rounded-0',exportOptions: {
        columns: [1,2,3,4] // Índices de las columnas que deseas exportar (comenzando desde 0)
        }
      },
      { "extend": 'print', "className": 'btn btn-danger m-1 rounded-0',exportOptions: {
        columns: [1,2,3,4] // Índices de las columnas que deseas exportar (comenzando desde 0)
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

  document.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') e.preventDefault();
  });

  catFunciones.validacionCategoriasInput();

  $('#tbl-categorias tbody').on('click', '.btnEditar', function(){
    let filaSelec = $(this).parents('tr').hasClass('selected'),
      valDimTabla = tablaCategorias.row(this).child.isShown(),
      data;
        //vlidamos si esta en pantalla completa o responsive
    (valDimTabla)
    ? data = tablaCategorias.row(this).data()
    : data = tablaCategorias.row($(this).parents('tr')).data();

    //al hacer clic en el boton editar se pinta el registro
    if(filaSelec){
      $(this).parents('tr').removeClass('selected'); 
      idCategoria = 0; 
      $("#nomCategoria").val("");
    }else{
      tablaCategorias.$('tr.selected').removeClass('selected'), 
      $(this).parents('tr').addClass('selected'); 
      idCategoria = data[1]; 
      $("#nomCategoria").val(data[2]);
    }

    catFunciones.funciones.validarVacio(catFunciones.nombreCategoria,catFunciones.nombreCategoria.name);
  })

  $('#tbl-categorias tbody').on('click', '.btnEliminar', function(){
    accion = 4;
    if(accion === 4)  {verbo = 'eliminar'; verbo_1 = 'eliminado'; verbo_2 = 'eliminarlo'}

    let filaSelec = $(this).parents('tr').hasClass('selected'),
      valDimTabla = tablaCategorias.row(this).child.isShown(),
      data;
        //vlidamos si esta en pantalla completa o responsive
    (valDimTabla)
    ? data = tablaCategorias.row(this).data()
    : data = tablaCategorias.row($(this).parents('tr')).data();

    //al hacer clic en el boton editar se pinta el registro
    (filaSelec)
      ? $(this).parents('tr').removeClass('selected') 
      : tablaCategorias.$('tr.selected').removeClass('selected'), $(this).parents('tr').addClass('selected');
    
    idCategoria = data[1]; 

    Swal.fire({
      title: `¿Estas seguro de ${verbo} la categoria ${data[2]}?`,
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
        datos.append('id',idCategoria);

        $.ajax({
          method: "POST",
          url: "ajax/ajax.categorias.php",
          cache: false,
          contentType: false,
          data: datos,
          processData: false,
          dataType: "json",
          success: function (respuesta) {

            if (respuesta == 'ok') {
              Toast.fire({
                icon: 'success',
                title: `La categoria se ha ${verbo_1} correctamente!`
              });
              tablaCategorias.ajax.reload();
            } else {
              Toast.fire({
                icon: 'error',
                title: `La categoria no se pudo ${verbo}!`
              });
            }
          }
        });
      }
    }));
  })

  btnGuardar.addEventListener('click', () => {
    catFunciones.funciones.validarVacio(catFunciones.nombreCategoria,catFunciones.nombreCategoria.name);
  
    Array.prototype.filter.call(forms, (form) => {
        
      verbo = (idCategoria === 0) ?  'registrar' : 'actualizar';
      verbo_1 = (idCategoria === 0) ? 'registrado' : 'actualizado';
      verbo_2 =  (idCategoria === 0) ? 'registrarlo' : 'actualizarlo';

        (idCategoria === 0) ? verbo = 'registrarlo' : 'actualizarlo';
  
      if (form.checkValidity() === true) {
        Swal.fire({
          title: `¿Estas seguro de ${verbo} la categoria?`,
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
            datos.append('id',idCategoria);
            datos.append('nomCategoria', $('#nomCategoria').val());
  
            $.ajax({
              type: "POST",
              url: "ajax/ajax.categorias.php",
              cache: false,
              contentType: false,
              data: datos,
              processData: false,
              dataType: "json",
              success: function (respuesta) {
  
                if (respuesta == 'ok') {
                  Toast.fire({
                    icon: 'success',
                    title: `La categoria se ha ${verbo_1} correctamente!`
                  });
                  tablaCategorias.ajax.reload();
  
                  $("#nomCategoria").val("");
                  $('#nomCategoria').removeClass('is-valid');
                  $('#nomCategoria').removeClass('is-invalid');
                } else {
                  Toast.fire({
                    icon: 'error',
                    title: `La categoria no se pudo ${verbo}!`
                  });
                }
              }
            });
          }
        }));
      }else{
        console.log('error');
      }
    });
    // console.log(forms);
    //console.log(validation);
  });

  btnLimpiar.addEventListener('click', () => {
    idCategoria = 0;
    $("#nomCategoria").val("");
    $('#nomCategoria').removeClass('is-valid');
    $('#nomCategoria').removeClass('is-invalid');
  });
});