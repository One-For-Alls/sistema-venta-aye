<?php
  class ControladorClientes{
    static public function ctrCargarCliente(){
      $respuesta = ModeloClientes::mdlCargarCliente();
      return $respuesta;
    }
    
    static public function ctrCrearCliente($tabla, $datos) {
      $respuesta = ModeloClientes::mdlCrearCliente($tabla, $datos);
      return $respuesta;
    }
    static public function ctrEditarCliente($tabla, $datos) {
      $respuesta = ModeloClientes::mdlEditarCliente($tabla, $datos);
      return $respuesta;
    }

    static public function ctrEliminarCliente($tabla, $id) {
      $respuesta = ModeloClientes::mdlEliminarCliente($tabla, $id);
      return $respuesta;
    }
  }