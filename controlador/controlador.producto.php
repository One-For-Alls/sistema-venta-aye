<?php

class ControladorProductos{
  static public function ctrCargarProductos(){
    $respuesta = ModeloProductos::mdlCargarProductos();
    return $respuesta;
  }
  static public function ctrGuardarProductos($tabla,$datos){
    $respuesta = ModeloProductos::mdlGuardarProductos($tabla,$datos);
    return $respuesta;
  }
  static public function ctrEditarProductos($tabla, $datos){
    $respuesta = ModeloProductos::mdlEditarProductos($tabla,$datos);
    return $respuesta;
  }
  static public function ctrEliminarProductos($tabla, $id){
    $respuesta = ModeloProductos::mdlEliminarProductos($tabla,$id);
    return $respuesta;
  }
  static public function ctrAumentarSock($tabla, $datos){
    $respuesta = ModeloProductos::mdlAumentarSock($tabla,$datos);
    return $respuesta;
  }
  static public function ctrDisminuirStock($tabla, $datos){
    $respuesta = ModeloProductos::mdlDisminuirStock($tabla,$datos);
    return $respuesta;
  }
  static public function ctrListarNombresProductos(){
    $respuesta = ModeloProductos::mdlListarNombresProductos();
    return $respuesta;
  }
  static public function ctrBuscarCodigoProductos($id){
    $respuesta = ModeloProductos::mdlBuscarCodigoProducto($id);
    return $respuesta;
  }
  static public function ctrVerificarStockProducto($datos){
    $respuesta = ModeloProductos::mdlVerificarStockProducto($datos);
    return $respuesta;
  }
}