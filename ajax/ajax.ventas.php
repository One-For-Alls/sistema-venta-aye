<?php
require_once '../controlador/controlador.venta.php';
require_once '../modelo/modelo.venta.php';

class AjaxVentas{
  static public function ajaxObtenerNroBoleta(){
    $datos = ControladorVentas::ctrObtenerNroBoleta();
    echo json_encode($datos,JSON_UNESCAPED_UNICODE);
  }
  static public function ajaxRegistrarVenta($datos){
    $registrarVenta = ControladorVentas::ctrRegistrarVenta($datos);
    echo json_encode($registrarVenta);
  }
  static public function ajaxBuscarVenta($v_desde,$v_hasta){
    $buscarVentas = ControladorVentas::ctrBuscarVentas($v_desde,$v_hasta);
    echo json_encode($buscarVentas);
  }
  static public function ajaxEliminarVenta($idVenta){
    $eliminarVentas = ControladorVentas::ctrEliminarVenta($idVenta);
    echo json_encode($eliminarVentas,JSON_UNESCAPED_UNICODE);
  }
}

if(isset($_POST['accion']) && $_POST['accion'] == 1){
  $datos = AjaxVentas::ajaxObtenerNroBoleta();
}else if(isset($_POST['accion']) && $_POST['accion'] == 2){ //BUSCAR VENTAS POR RANGO DE FECHAS
  $venta_desde = $_POST['v_desde'];
  $venta_hasta = $_POST['v_hasta'];
  $datos = AjaxVentas::ajaxBuscarVenta($venta_desde, $venta_hasta);
}if(isset($_POST['accion']) && $_POST['accion'] == 3){
  $idVenta = $_POST['boleta'];
  $datos = AjaxVentas::ajaxEliminarVenta($idVenta);
}else if(isset($_POST['arr'])){
  $datos = [
    'detalle' => $_POST['arr'],
    'igv_venta' => $_POST['igv_venta'],
    'subtotal_venta' => $_POST['subtotal_venta'],
    'total_venta' => $_POST['total_venta'],
    'nro_correlativo' => $_POST['nro_correlativo'],
    'descripcion_venta' => $_POST['descripcion_venta']
  ];
  $datos = AjaxVentas::ajaxRegistrarVenta($datos);
}