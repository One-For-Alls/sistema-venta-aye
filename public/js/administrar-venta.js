let d = document;

$(d).ready(function () {
  let tabla,
    fechaActual = new Date(),
    formatoFecha = fechaActual.toLocaleDateString('en-CA'),
    groupColumn = 1,
    groupColumn2 = 0,
    Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000
    });

  $('#v_desde').val(formatoFecha),
    $('#v_hasta').val(formatoFecha);

  let v_desde = $('#v_desde').val(),
    v_hasta = $('#v_hasta').val();



  tabla = $('#tblAdmVentas').DataTable({
    columnDefs: [
      {
        visible: false, targets: [0, groupColumn]
      },
      {
        targets: [2, 3, 4, 5, 6, 7],
        orderable: false
      }
    ],
    ajax: {
      type: 'POST',
      url: 'ajax/ajax.ventas.php',
      datetype: 'json',
      'dataSrc': function (respuesta) {
        let totalVenta = 0.00;

        for (let i = 0; i < respuesta.length; i++) {
          totalVenta = parseFloat(respuesta[i][7].replace('S./ ', '')) + parseFloat(totalVenta);
        }
        $('#totalVenta').html(totalVenta.toFixed(2));
        return respuesta;
      },
      data: {
        'accion': '2',
        'v_desde': v_desde,
        'v_hasta': v_hasta
      }
    },
    order: [[8, 'desc']],
    dom: 'Bfrtip',
    buttons: [{ 'extend': 'csv', 'text': 'Excel', 'className': 'btn btn-success mr-1 rounded-0' },
    { 'extend': 'print', 'className': 'btn btn-danger mr-1' },
    { 'extend': 'pageLength', 'className': 'btn btn-default' }
    ],
    "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, 'todos']],
    "pageLength": 10,
    scrollX: true,
    "drawCallback": function (settings) {
      let api = this.api(),
        rows = api.rows({ page: 'current' }).nodes(),
        last = null,
        arr = [],
        count = 0;
      // data2 = api.rows().data();  /////varaibles para obtener cada cosa
      // data2.each(function (row) {      ////iteramos para obtener la data de cada fila
      //   arr.push(row[0]);
      //   console.log(data2);
      // });

      api.column(groupColumn2, { page: 'current' }).data().each(function (group, i) {
        if (last !== group) {
          arr.push(group);
        }
        last = group;
      });
      
      let arr2= [...new Set(arr)];
      console.log(arr2);
      api.column(groupColumn, { page: 'current' }).data().each(function (group, i) {
        if (last !== group) {
          const data = group.split("-");
          let nroBoleta = data[0];
          nroBoleta = nroBoleta.split(":")[1].trim();
          $(rows).eq(i).before(
            '<tr class="group">' +
            '<td colspan="7" class="fs-6 fw-bold fst-italic bg-success text-white">' +
            '<i nroBoleta=' + arr2[count] + ' style="cursor:pointer;" class="fas fa-trash fs-6 text-danger mx-2 btnEliminarVenta"></i>' +   //arr[count]  si en caso se quiera el id del producto
            '<i nroBoleta=' + arr2[count] + ' style="cursor:pointer;" class="fas fa-edit fs-6 text-warning mx-2 btnEditarVenta"></i>' +
            group +
            '</td>' +
            '</tr>'
          );
          last = group;
          count++;  //aumenta en 1 el indice
        }
      });
    },
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

  /*****************************************************
   * EVENTO PARA ELIMINAR VENTA *
  ******************************************************/
  $('#tblAdmVentas tbody').on('click', '.btnEditarVenta', function () {
    let id_venta_cabecera = $(this).attr('nroboleta');

    if ($.fn.DataTable.isDataTable('#tblDetalleVenta')) {
      $('#tblDetalleVenta').DataTable().destroy();
    }
    $('#tblDetalleVenta tbody').empty();

    $("#tblDetalleVenta").DataTable({
      searching: false,   // Desactiva el buscador
      lengthChange: false, // Desactiva la cantidad de registros por página
      paging: false, // Desactiva la paginación
      columns: [
        { data: 'id_vd' },
        { data: 'nro_boleta' },
        { data: 'id_producto' },
        { data: 'codigo_producto' },
        { data: 'nombre_categoria' },
        { data: 'nombre_producto' },
        { data: 'cantidad' },
        { data: 'precio_producto' },
        { data: 'total_venta' },
      ],
      columnDefs: [
        { targets: 2, visible: false }
      ],
      processing: true,
      serverSide: true,
      ajax: {
        method: 'POST',
        url: 'ajax/editarTablaDetalle/obtener_detalle_venta.php',
        dataType: 'json',
        data: {
          sp_detalle: '1',
          id_venta_cabecera: id_venta_cabecera
        },
      }
    });
    $('#mod-editar-venta').modal('show');
  });


  /*****************************************************
   * EVENTO PARA ELIMINAR VENTA *
  ******************************************************/
  $('#tblAdmVentas tbody').on('click', '.btnEliminarVenta', function () {


    Swal.fire({
      title: `¿Estas seguro de eliminar la venta?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, deseo eliminar`,
      cancelButtonText: 'Cancelar'
    }).then((result => {
      if (result.isConfirmed) {
        let nroBoleta = $(this).attr('nroBoleta');
        $.ajax({
          method: 'POST',
          url: 'ajax/ajax.ventas.php',
          data: { accion: '3', boleta: String(nroBoleta) },
          dataType: 'json',
          success: function (respuesta) {
            console.log(respuesta);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: respuesta[0],
              showConfirmButton: false,
              timer: 2000
            });
            tabla.ajax.reload();
          }
        });
      }
    }));



  });

  $("#btnCancelar").on("click", function () {
    $('#mod-editar-venta').modal('hide');
  });

  $("#btnFiltrar").on("click", function (e) {
    tabla.destroy();
    if ($('#v_desde').val() === '') {
      v_desde = '2023-07-01';
    } else {
      v_desde = $('#v_desde').val();
    }

    if ($('#v_hasta').val() === '') {
      v_hasta = '9999-07-01';
    } else {
      v_hasta = $('#v_hasta').val();
    }

    tabla = $('#tblAdmVentas').DataTable({
      columnDefs: [
        {
          visible: false, targets: [0, groupColumn]
        },
        {
          targets: [2, 3, 4, 5, 6, 7],
          orderable: false
        }
      ],
      ajax: {
        type: 'POST',
        url: 'ajax/ajax.ventas.php',
        datetype: 'json',
        'dataSrc': function (respuesta) {
          let totalVenta = 0.00;

          for (let i = 0; i < respuesta.length; i++) {
            totalVenta = parseFloat(respuesta[i][7].replace('S./ ', '')) + parseFloat(totalVenta);
          }
          $('#totalVenta').html(totalVenta.toFixed(2));
          return respuesta;
        },
        data: {
          'accion': '2',
          'v_desde': v_desde,
          'v_hasta': v_hasta
        }
      },
      order: [[8, 'desc']],
      dom: 'Bfrtip',
      buttons: [{ 'extend': 'csv', 'text': 'Excel', 'className': 'btn btn-success mr-1 rounded-0' },
      { 'extend': 'print', 'className': 'btn btn-danger mr-1' },
      { 'extend': 'pageLength', 'className': 'btn btn-default' }
      ],
      "lengthMenu": [[10, 20, 50, 100, -1], [10, 20, 50, 100, 'todos']],
      "pageLength": 10,
      scrollX: true,
      "drawCallback": function (settings) {
        let api = this.api(),
          rows = api.rows({ page: 'current' }).nodes(),
          last = null,
          arr = [],
          count = 0;
        api.column(groupColumn2, { page: 'current' }).data().each(function (group, i) {
          if (last !== group) {
            arr.push(group);
          }
        });

        api.column(groupColumn, { page: 'current' }).data().each(function (group, i) {
          if (last !== group) {
            const data = group.split("-");
            let nroBoleta = data[0];
            nroBoleta = nroBoleta.split(":")[1].trim();
            $(rows).eq(i).before(
              '<tr class="group">' +
              '<td colspan="7" class="fs-6 fw-bold fst-italic bg-success text-white">' +
              '<i nroBoleta=' + arr[count] + ' style="cursor:pointer;" class="fas fa-trash fs-6 text-danger mx-2 btnEliminarVenta"></i>' +   //arr[count]  si en caso se quiera el id del producto
              '<i nroBoleta=' + arr[count] + ' style="cursor:pointer;" class="fas fa-edit fs-6 text-warning mx-2 btnEditarVenta"></i>' +
              group +
              '</td>' +
              '</tr>'
            );
            last = group;
            count++;  //aumenta en 1 el indice
          }
        });
      },
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
  });
  //console.log(arrPrecios);
  /*****************************************************
   * EVENTO PARA EDITAR DETALLE VENTA *
  ******************************************************/
  $("#tblDetalleVenta").on('draw.dt', function () {
    // let arrPrecios = [];

    // tabla.rows().eq(0).each(function (index) {
    //   let row2, datos2;

    //   row2 = tabla.row(index);
    //   datos2 = row2.data();
    //   if (datos2['id_vcs'] == id_venta_cabecera2) {
    //     arrPrecios.push(datos2['codigo_producto']);
    //     console.log(datos2['codigo_producto']);
    //   }
    // });

    // $.ajax({
    //   method: 'post',
    //   url: 'ajax/ajax.productos.php',
    //   dataType: 'json',
    //   data:{codProductos:arrPrecios}
    // })

    // console.log(arrPrecios);

    $("#tblDetalleVenta").Tabledit({
      url: 'ajax/editarTablaDetalle/acciones_detalle_venta.php',
      dataType: 'json',
      columns: {
        identifier: [0, 'id'],
        editable: [[2, 'codigo_producto'], [5, 'cantidad']]
      },
      buttons: {
        edit: {
          class: 'btn btn-sm btn-default',
          html: '<span class="glyphicon glyphicon-pencil"></span>',
          html: '<i class="fas fa-edit text-primary fs-6"></i>',
          action: 'edit'
        },
        delete: {
          class: 'btn btn-sm btn-default',
          html: '<span class="glyphicon glyphicon-trash"></span>',
          html: '<i class="fas fa-trash-alt text-danger fs-6"></i>',
          action: 'delete'
        }
      },
      onSuccess: function (data, textStatuts, jqXHR) {
        if (data.action == 'edit') {
          if(data.validacion === 0){
            Toast.fire({
              icon: 'error',
              title: 'No cuenta con stock suficiente!'
            });
            $("#tblDetalleVenta").DataTable().ajax.reload();
            tabla.ajax.reload();
          }else{
            Toast.fire({
              icon: 'success',
              title: 'se actualizo correctamente!'
            });
            $("#tblDetalleVenta").DataTable().ajax.reload();
            tabla.ajax.reload();
          }
        }
        if (data.action == 'delete') {
          console.log(data);
          $("#" + data.id).remove();
          $("#tblDetalleVenta").DataTable().ajax.reload();
          tabla.ajax.reload();
          Toast.fire({
            icon: 'success',
            title: 'se elimino correctamente!'
          });
        }
      }
    });
  });
});

