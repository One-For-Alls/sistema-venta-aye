<?php
require_once 'conexion.php';
class ModeloEmpresa{
  static public function mdlCargarEmpresa(){
    $stmt = Conexion::Connection()->prepare('CALL sp_cargar_empresa()');
    $stmt -> execute();
    return $stmt->fetch(PDO::FETCH_OBJ);
    $stmt = null;
  }
}