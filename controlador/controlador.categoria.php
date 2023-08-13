<?php

  class ControladorCategorias{
    static public function ctrCargarCategorias(){
      $respuesta = ModeloCategorias::mdlCargarCategorias();
      return $respuesta;
    }
    static public function ctrGuardarCategorias($tabla, $nombre){
      $respuesta = ModeloCategorias::mdlGuardarCategorias($tabla, $nombre);
      return $respuesta;
    }
    static public function ctrEditarCategorias($tabla, $datos){
      $respuesta = ModeloCategorias::mdlEditarCategorias($tabla, $datos);
      return $respuesta;
    }
    static public function ctrEliminarCategorias($tabla, $id){
      $respuesta = ModeloCategorias::mdlEliminarCategorias($tabla, $id);
      return $respuesta;
    }
  }