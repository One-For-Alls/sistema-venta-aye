<?php
require_once '../controlador/controlador.empresa.php';
require_once '../modelo/modelo.empresa.php';

class AjaxEmpresa{
  static public function ajaxCargarEmpresa(){
    $datos = ControladorEmpresa::ctrCargarEmpresa();
    echo json_encode($datos);
  }
}

if($_POST['accion'] && $_POST['accion'] == 1){
  $datos = AjaxEmpresa::ajaxCargarEmpresa();
}