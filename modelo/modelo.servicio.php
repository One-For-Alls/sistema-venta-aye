<?php
require_once 'conexion.php';

class ModeloServicios{
  static public function mdlCargarServicios(){
    $stmt = Conexion::Connection()->prepare('CALL sp_cargar_servicios');
    $stmt -> execute();
    return $stmt->fetchAll();
    $stmt = null;
  }

  static public function mdlGuardarServicios($tabla, $datos){
    try {
      $stmt = Conexion::Connection()->prepare("INSERT INTO $tabla (nombre_servicio, id_categoria, desc_servicio, precio_servicio) VALUES (:nombre, :categoria, :descripcion, :precio)");
      $stmt -> bindParam(':nombre', $datos['nombre'], PDO::PARAM_STR);
      $stmt -> bindParam(':categoria', $datos['categoria'], PDO::PARAM_INT);
      $stmt -> bindParam(':descripcion', $datos['descripcion'], PDO::PARAM_STR);
      $stmt -> bindParam(':precio', $datos['precio'], PDO::PARAM_STR);

      $stmt -> execute();

      $respuesta = ($stmt) ? 'ok' : 'error';
      
    } catch (PDOException $e) {
      $respuesta = 'Excepcion capturada: ' . $e -> getMessage();
    }
    return $respuesta;
    $stmt = null;
  }

  static public function mdlEditarServicios($tabla, $datos){
    try {
      $stmt = Conexion::Connection()->prepare("UPDATE $tabla SET nombre_servicio = :nombre, id_categoria = :categoria, desc_servicio = :descripcion, precio_servicio = :precio WHERE id = :id");
      $stmt -> bindParam(':id', $datos['id'], PDO::PARAM_INT);
      $stmt -> bindParam(':nombre', $datos['nombre'], PDO::PARAM_STR);
      $stmt -> bindParam(':categoria', $datos['categoria'], PDO::PARAM_INT);
      $stmt -> bindParam(':descripcion', $datos['descripcion'], PDO::PARAM_STR);
      $stmt -> bindParam(':precio', $datos['precio'], PDO::PARAM_STR);

      $stmt -> execute();

      $respuesta = ($stmt) ? 'ok' : 'error';
      
    } catch (PDOException $e) {
      $respuesta = 'Excepcion capturada: ' . $e -> getMessage();
    }
    return $respuesta;
    $stmt = null;
  }
  static public function mdlEliminarServicios($tabla, $datos){
    try {
      $stmt = Conexion::Connection()->prepare("DELETE FROM $tabla WHERE id = :id");
      $stmt -> bindParam(':id', $datos['id'], PDO::PARAM_INT);

      $stmt -> execute();

      $respuesta = ($stmt) ? 'ok' : 'error';
      
    } catch (PDOException $e) {
      $respuesta = 'Excepcion capturada: ' . $e -> getMessage();
    }
    return $respuesta;
    $stmt = null;
  }
}