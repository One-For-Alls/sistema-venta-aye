
$(document).ready(function(){

  $.ajax({
    url: "ajax/ajax.tablero-principal.php",
    method: "POST",
    dataType: "json",
    success:function(respuesta){
      $("#total-productos").html(respuesta.total_productos);
      $("#total-ventas").html('S/ ' + respuesta.total_ventas);
      $("#productos-poco-stock").html(respuesta.productos_poco_stock);
      $("#total-ventas-dia").html('S/ ' + respuesta.total_ventas_dia);
    }
  });

  setInterval(() => {
    $.ajax({
      url: "ajax/ajax.tablero-principal.php",
      method: "POST",
      dataType: "json",
      success:function(respuesta){
        $("#total-productos").html(respuesta.total_productos);
        $("#total-ventas").html('S/ ' + respuesta.total_ventas);
        $("#productos-poco-stock").html(respuesta.productos_poco_stock);
        $("#total-ventas-dia").html('S/ ' + respuesta.total_ventas_dia);
      }
    });
  }, 6000);

  $.ajax({
    url: "ajax/ajax.tablero-principal.php",
    method: "POST",
    data: {
      'accion': 1
    },
    dataType: "json",
    success:function(respuesta){
      let fecha_creacion = [],
          total_venta = [],
          total_ventas_mes = 0;

      for (let i = 0; i < respuesta.length; i++) {
        fecha_creacion.push(respuesta[i].fecha_creacion);
        total_venta.push(respuesta[i].total_venta);
        total_ventas_mes = parseFloat(total_ventas_mes) + parseFloat(respuesta[i].total_venta);
      }
      $('#total-venta-grafica-principal').html('Total de ventas del mes: S/ ' +  parseFloat(total_ventas_mes).toFixed(2));

      var barChartCanvas = $("#barChart").get(0).getContext('2d');

      var areaChartData = {
        labels: fecha_creacion,
        datasets: [
          {
            label: "Ventas del mes",
            backgroundColor: 'rgba(60, 140,180,0.8)',
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data: total_venta
          }
        ]
      }

      var barChartData = $.extend(true, {}, areaChartData);
      var temp0 = areaChartData.datasets[0];
      barChartData.datasets[0] = temp0;

      var barChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        events: false,
        datasetFill: false,
        legend: {
          display: true
        },
        animation: {
          duration: 500,
          easing: "easeOutQuart",
          onComplete: function(){
            var ctx = this.chart.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            this.data.datasets.forEach(function(dataset){
                for(var i = 0 ; i < dataset.data.length; i++){
                  var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                              scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
                  ctx.fillStyle = '#444';
                  
                  var y_pos = model.y - 5;

                  // Make sure data value does not get overFlow and hidden
                  // When the bar's value is too clase to max value of scale
                  // Note: The y value is reverse, it counts from top down

                  if((scale_max - model.y) / scale_max >= 0.93){
                    y_pos = model.y + 20;
                  }
                  
                  ctx.fillText(dataset.data[i], model.x, y_pos);
                }
            });
          }
        }
      }

      new Chart(barChartCanvas, {
        type:'bar',
        data: barChartData,
        options: barChartOptions
      })
    }
  });

})
