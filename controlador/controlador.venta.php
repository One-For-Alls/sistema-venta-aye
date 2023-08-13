<?php

class ControladorVentas{
  static public function ctrObtenerNroBoleta(){
    $respuesta = ModeloVentas::mdlObtenerNroBoleta();
    return $respuesta;
  }
  static public function ctrRegistrarVenta($datos){
    $respuesta = ModeloVentas::mdlRegistrarVenta($datos);
    return $respuesta;
  }
  static public function ctrBuscarVentas($v_desde,$v_hasta){
    $respuesta = ModeloVentas::mdlBuscarVentas($v_desde,$v_hasta);
    return $respuesta;
  }
  static public function ctrEliminarVenta($idVenta){
    $respuesta = ModeloVentas::mdlEliminarVenta($idVenta);
    return $respuesta;
  }
}