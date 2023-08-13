<?php

class ControladorServicios{
  static public function ctrCargarServicios(){
    $respuesta = ModeloServicios::mdlCargarServicios();
    return $respuesta;
  }

  static public function ctrGuardarServicios($tabla, $datos){
    $respuesta = ModeloServicios::mdlGuardarServicios($tabla, $datos);
    return $respuesta;
  }
  static public function ctrEditarServicios($tabla, $datos){
    $respuesta = ModeloServicios::mdlEditarServicios($tabla, $datos);
    return $respuesta;
  }
  static public function ctrEliminarServicios($tabla, $datos){
    $respuesta = ModeloServicios::mdlEliminarServicios($tabla, $datos);
    return $respuesta;
  }
}