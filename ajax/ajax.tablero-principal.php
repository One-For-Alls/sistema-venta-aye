<?php
require_once '../controlador/controlador.tablero-principal.php';
require_once '../modelo/modelo.tablero-controlador.php';

class AjaxTableroPrincipal{
  static public function ajaxObtenerTableroPrincipal(){
    $datos = ControladorTableroPrincipal::ctrDatosTableroPrincipal();
    echo json_encode($datos);  
  }

  static public function ajaxCargarVentasMesActual(){
    $datos = ControladorTableroPrincipal::ctrCargarVentasMesActual();
    echo json_encode($datos);  
  }
}

if(isset($_POST['accion']) && $_POST['accion'] == 1){
  $datos = AjaxTableroPrincipal::ajaxCargarVentasMesActual();
}else{
  $datos = AjaxTableroPrincipal::ajaxObtenerTableroPrincipal();
}


