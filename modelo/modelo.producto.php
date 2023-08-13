<?php
require_once 'conexion.php';

class ModeloProductos{
  static public function mdlCargarProductos(){
    $stmt = Conexion::Connection()->prepare('CALL sp_cargar_productos');
    $stmt -> execute();
    return $stmt->fetchAll();
    $stmt = null;
  }
  static public function mdlGuardarProductos($tabla,$datos){
    try {
      $stmt = Conexion::Connection()->prepare("INSERT INTO $tabla (codigo_producto,nombre_producto, id_categoria, desc_producto, precio_producto, precio_producto_1, precio_producto_2, stock_producto, fecha_creacion)
      VALUES(:codigo, :nombre, :categoria, :descripcion, :precio, :precio2, :precio3, :stock, NOW())");

      $stmt -> bindParam(':codigo', $datos['codigo'], PDO::PARAM_INT);
      $stmt -> bindParam(':nombre', $datos['nombre'], PDO::PARAM_STR);
      $stmt -> bindParam(':categoria', $datos['categoria'], PDO::PARAM_INT);
      $stmt -> bindParam(':descripcion', $datos['descripcion'], PDO::PARAM_STR);
      $stmt -> bindParam(':precio', $datos['precio'], PDO::PARAM_STR);
      $stmt -> bindParam(':precio2', $datos['precio2'], PDO::PARAM_STR);
      $stmt -> bindParam(':precio3', $datos['precio3'], PDO::PARAM_STR);
      $stmt -> bindParam(':stock', $datos['stock'], PDO::PARAM_INT);

      $stmt -> execute();

      $respusta = ($stmt) ? 'ok' : 'error';
      
    }catch (PDOException $e){
      $respusta = 'Excepcion capturada: ' . $e -> getMessage();
    }
    return $respusta;
    $stmt = null;
  }

  static public function mdlEditarProductos($tabla,$datos){
    try {
      $stmt = Conexion::Connection()->prepare("UPDATE $tabla SET codigo_producto = :codigo,  nombre_producto = :nombre, id_categoria = :categoria, desc_producto = :descripcion,
      precio_producto = :precio, precio_producto_1 = :precio2, precio_producto_2 = :precio3, stock_producto = :stock WHERE id = :id");

      $stmt -> bindParam(':id', $datos['id'], PDO::PARAM_INT);
      $stmt -> bindParam(':codigo', $datos['codigo'], PDO::PARAM_INT);
      $stmt -> bindParam(':nombre', $datos['nombre'], PDO::PARAM_STR);
      $stmt -> bindParam(':categoria', $datos['categoria'], PDO::PARAM_INT);
      $stmt -> bindParam(':descripcion', $datos['descripcion'], PDO::PARAM_STR);
      $stmt -> bindParam(':precio', $datos['precio'], PDO::PARAM_STR);
      $stmt -> bindParam(':precio2', $datos['precio2'], PDO::PARAM_STR);
      $stmt -> bindParam(':precio3', $datos['precio3'], PDO::PARAM_STR);
      $stmt -> bindParam(':stock', $datos['stock'], PDO::PARAM_INT);

      $stmt -> execute();

      $respusta = ($stmt) ? 'ok' : 'error';
      
    }catch (PDOException $e){
      $respusta = 'Excepcion capturada: ' . $e -> getMessage();
    }
    return $respusta;
    $stmt = null;
  }

  static public function mdlEliminarProductos($tabla,$id){
    try {
      $stmt = Conexion::Connection()->prepare("DELETE FROM $tabla WHERE id = :id");

      $stmt -> bindParam(':id', $id, PDO::PARAM_INT);

      $stmt -> execute();

      $respusta = ($stmt) ? 'ok' : 'error';
      
    }catch (PDOException $e){
      $respusta = 'Excepcion capturada: ' . $e -> getMessage();
    }
    return $respusta;
    $stmt = null;
  }

  static public function mdlAumentarSock($tabla,$datos){
    try {
      $stmt = Conexion::Connection()->prepare("UPDATE $tabla SET stock_producto = :nuevoStock WHERE id = :id");

      $stmt -> bindParam(':id', $datos['id'], PDO::PARAM_INT);
      $stmt -> bindParam(':nuevoStock', $datos['nuevoStock'], PDO::PARAM_INT);

      $stmt -> execute();

      $respusta = ($stmt) ? 'ok' : 'error';
      
    }catch (PDOException $e){
      $respusta = 'Excepcion capturada: ' . $e -> getMessage();
    }
    return $respusta;
    $stmt = null;
  }

  static public function mdlDisminuirStock($tabla,$datos){
    try {
      $stmt = Conexion::Connection()->prepare("UPDATE $tabla SET stock_producto = :nuevoStock WHERE id = :id");

      $stmt -> bindParam(':id', $datos['id'], PDO::PARAM_INT);
      $stmt -> bindParam(':nuevoStock', $datos['nuevoStock'], PDO::PARAM_INT);

      $stmt -> execute();

      $respusta = ($stmt) ? 'ok' : 'error';
      
    }catch (PDOException $e){
      $respusta = 'Excepcion capturada: ' . $e -> getMessage();
    }
    return $respusta;
    $stmt = null;
  }

  static public function mdlListarNombresProductos() {
    $stmt = Conexion::Connection()->prepare('CALL sp_listar_nombres_productos');
    $stmt -> execute();
    return $stmt -> fetchAll();
    $stmt = null;
  }
  static public function mdlBuscarCodigoProducto($id) {
    $stmt = Conexion::Connection()->prepare('CALL sp_buscar_codigo_producto(:id)');
    $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    $stmt -> execute();
    return $stmt -> fetch();
    $stmt = null;
  }
  static public function mdlVerificarStockProducto($datos) {
    $stmt = Conexion::Connection()->prepare('CALL sp_verificar_stock_producto(:codigo,:cantidad_compra)');
    $stmt -> bindParam(':codigo', $datos['codigo_producto'], PDO::PARAM_INT);
    $stmt -> bindParam(':cantidad_compra', $datos['cantidad_compra'], PDO::PARAM_INT);
    $stmt -> execute();
    return $stmt -> fetch(PDO::FETCH_OBJ);
    $stmt = null;
  }
  static public function mdlVerificarDetalleStockProducto($datos) {
    $stmt = Conexion::Connection()->prepare('CALL sp_verificar_stock_detalle_producto(:codigo,:cantidad_compra)');
    $stmt -> bindParam(':codigo', $datos['id'], PDO::PARAM_INT);
    $stmt -> bindParam(':cantidad_compra', $datos['cantidad_compra'], PDO::PARAM_INT);
    $stmt -> execute();
    return $stmt -> fetch(PDO::FETCH_OBJ);
    $stmt = null;
  }
}