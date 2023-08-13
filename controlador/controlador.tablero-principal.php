<?php
  class ControladorTableroPrincipal{
    static public function ctrDatosTableroPrincipal(){
      $respuesta = ModeloTableroPrincipal::mdlDatosTableroPrincipal();
      return $respuesta;
    }
    static public function ctrCargarVentasMesActual(){
      $respuesta = ModeloTableroPrincipal::mdlCargarVentasMesActual();
      return $respuesta;
    }
  }