<?php
require_once 'conexion.php';

  class ModeloCategorias{
    static public function mdlCargarCategorias(){
      $stmt = Conexion::Connection()->prepare('CALL sp_cargar_categorias');
      $stmt -> execute();
      return $stmt->fetchAll();
      $stmt = null;
    }
    static public function mdlGuardarCategorias($tabla, $nombre){
      try {
        $stmt = Conexion::Connection()->prepare("INSERT INTO $tabla (nombre_categoria, fecha_creacion, fecha_actualizacion) 
        VALUES (:nombre, NOW(), NOW())");
      
        $stmt -> bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt -> execute();

        if($stmt){
          $resultado = 'ok';
        }else{
          $resultado = 'error';
        }
      } catch (PDOException $e) {
        $resultado = 'Se capturo una excepcion: ' . $e->getMessage();
      }
      return $resultado;
      $stmt = null;
    }
    static public function mdlEditarCategorias($tabla, $datos){
      try {
        $stmt = Conexion::Connection()->prepare("UPDATE $tabla SET nombre_categoria = :nombre WHERE id = :id");
      
        $stmt -> bindParam(':id', $datos['id'], PDO::PARAM_INT);
        $stmt -> bindParam(':nombre', $datos['nombre'], PDO::PARAM_STR);
        $stmt -> execute();

        if($stmt){
          $resultado = 'ok';
        }else{
          $resultado = 'error';
        }
      } catch (PDOException $e) {
        $resultado = 'Se capturo una excepcion: ' . $e->getMessage();
      }
      return $resultado;
      $stmt = null;
    }

    static public function mdlEliminarCategorias($tabla, $id){
      try {
        $stmt = Conexion::Connection()->prepare("DELETE FROM $tabla WHERE id = :id");
      
        $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
        $stmt -> execute();

        if($stmt){
          $resultado = 'ok';
        }else{
          $resultado = 'error';
        }
      } catch (PDOException $e) {
        $resultado = 'Se capturo una excepcion: ' . $e->getMessage();
      }
      return $resultado;
    }
  }