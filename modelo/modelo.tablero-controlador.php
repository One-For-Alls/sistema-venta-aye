<?php
require_once 'conexion.php';

class ModeloTableroPrincipal{
  static public function mdlDatosTableroPrincipal(){
    $stmt = Conexion::Connection()->prepare("CALL sp_cargar_dashboard()");
    $stmt -> execute();
    return $stmt -> fetch();
    $stmt = null;
  }

  static public function mdlCargarVentasMesActual(){
    $stmt = Conexion::Connection()->prepare("CALL sp_cargar_ventas_mes_actual()");
    $stmt -> execute();
    return $stmt -> fetchAll();
    $stmt = null;
  }
}