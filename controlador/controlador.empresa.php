<?php

class ControladorEmpresa{
  static public function ctrCargarEmpresa(){
    $respuesta = ModeloEmpresa::mdlCargarEmpresa();
    return $respuesta;
  }
}