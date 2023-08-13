<?php
require_once 'conexion.php';

class ModeloClientes
{
  static public function mdlCargarCliente()
  {
    $stmt = Conexion::Connection()->prepare('CALL sp_cargar_clientes()');
    $stmt->execute();
    return $stmt->fetchAll();
    $stmt = null;
  }

  static public function mdlCrearCliente($tabla, $datos)
  {
    try {
      $stmt = Conexion::Connection()->prepare("INSERT INTO $tabla (nombre_cliente, apellido_cliente, direccion_cliente, celular_cliente, fecha_creacion) 
        VALUES (:nombre, :apellido, :direccion, :celular, NOW())"); //Los dos puntos se utilizan para indicar que se está utilizando una variable vinculada en la consulta preparada.

      $stmt->bindParam(":nombre", $datos["nombre"], PDO::PARAM_STR);
      $stmt->bindParam(":apellido", $datos["apellido"], PDO::PARAM_STR);
      $stmt->bindParam(":direccion", $datos["direccion"], PDO::PARAM_STR);
      $stmt->bindParam(":celular", $datos["celular"], PDO::PARAM_INT);

      $stmt->execute();

      if ($stmt) {
        $resultado =  'ok';
      } else {
        $resultado = 'error';
      }
    } catch (Exception $e) {
      $resultado = 'Excepcion capturada: ' . $e -> getMessage();
    }

    return $resultado;
    $stmt = null;
  }

  static public function mdlEditarCliente($tabla, $datos)
  {
    try {
      $stmt = Conexion::Connection()->prepare("UPDATE $tabla SET nombre_cliente = :nombre, apellido_cliente = :apellido, direccion_cliente = :direccion, 
      celular_cliente = :celular WHERE id = :id"); //Los dos puntos se utilizan para indicar que se está utilizando una variable vinculada en la consulta preparada.

      $stmt->bindParam(":id", $datos["id"], PDO::PARAM_INT);
      $stmt->bindParam(":nombre", $datos["nombre"], PDO::PARAM_STR);
      $stmt->bindParam(":apellido", $datos["apellido"], PDO::PARAM_STR);
      $stmt->bindParam(":direccion", $datos["direccion"], PDO::PARAM_STR);
      $stmt->bindParam(":celular", $datos["celular"], PDO::PARAM_INT);

      $stmt->execute();

      if ($stmt) {
        $resultado =  'ok';
      } else {
        $resultado = 'error';
      }
    } catch (Exception $e) {
      $resultado = 'Excepcion capturada: ' . $e -> getMessage();
    }

    return $resultado;
    $stmt = null;
  }

  static public function mdlEliminarCliente($tabla, $id){
    try {
      $stmt = Conexion::Connection()->prepare("DELETE FROM $tabla WHERE id = :id");

      $stmt -> bindParam(":id", $id, PDO::PARAM_INT);
      $stmt->execute();

      if ($stmt) {
        $resultado =  'ok';
      } else {
        $resultado = 'error';
      }

    }catch (Exception $e){
      $resultado = 'Excepcion capturada: ' . $e -> getMessage();
    }

    return $resultado;
    $stmt = null;
  }
}
