<?php

require_once '../controlador/controlador.servicio.php';
require_once '../modelo/modelo.servicio.php';

class AjaxServicios{
  static public function ajaxCargarServicios(){
    $datos = ControladorServicios::ctrCargarServicios();
    echo json_encode($datos);
  }
  static public function ajaxGuardarServicios($tabla, $datos){
    $servicios = ControladorServicios::ctrGuardarServicios($tabla, $datos);
    echo json_encode($servicios);
  }
  static public function ajaxEditarServicios($tabla, $datos){
    $servicios = ControladorServicios::ctrEditarServicios($tabla, $datos);
    echo json_encode($servicios);
  }
  static public function ajaxEliminarServicios($tabla, $datos){
    $servicios = ControladorServicios::ctrEliminarServicios($tabla, $datos);
    echo json_encode($servicios);
  }
}

if($_POST['accion'] && $_POST['accion'] == 1){

  $datos = AjaxServicios::ajaxCargarServicios();

}else if($_POST['accion'] && $_POST['accion'] == 2) {

  $tabla = 'servicios';
  $datos = [
    'nombre' => $_POST['nomProducto'],
    'categoria' => $_POST['catProducto'],
    'descripcion' => $_POST['desProducto'],
    'precio' => $_POST['precProducto'],
  ];
  $guardarServicios = AjaxServicios::ajaxGuardarServicios($tabla, $datos);
}else if($_POST['accion'] && $_POST['accion'] == 3) {

  $tabla = 'servicios';
  $datos = [
    'id' => $_POST['idProducto'],
    'nombre' => $_POST['nomProducto'],
    'categoria' => $_POST['catProducto'],
    'descripcion' => $_POST['desProducto'],
    'precio' => $_POST['precProducto'],
  ];
  $guardarServicios = AjaxServicios::ajaxEditarServicios($tabla, $datos);
}else if($_POST['accion'] && $_POST['accion'] == 4) {

  $tabla = 'servicios';
  $datos = [
    'id' => $_POST['idProducto']
  ];
  $guardarServicios = AjaxServicios::ajaxEliminarServicios($tabla, $datos);
}


