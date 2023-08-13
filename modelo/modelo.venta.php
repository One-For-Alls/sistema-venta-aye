<?php
require_once 'conexion.php';
class ModeloVentas{
  static public function mdlObtenerNroBoleta(){
    $stmt = Conexion::Connection()->prepare('CALL sp_cargar_nro_boleta()');
    $stmt -> execute();
    return $stmt->fetch(PDO::FETCH_OBJ);
    $stmt = null;
  }
  static public function mdlRegistrarVenta($datos){
    $stmt = Conexion::Connection()->prepare("INSERT INTO venta_cabecera (nro_boleta_venta_cabecera, descripcion_venta_cabecera, subtotal_venta_cabecera, igv_venta_cabecera, total_venta_cabecera) VALUES
      (:nro_boleta, :descripcion, :subtotal, :igv, :total_venta)");

    $stmt -> bindparam(':nro_boleta', $datos['nro_correlativo'], PDO::PARAM_STR);
    $stmt -> bindparam(':descripcion', $datos['descripcion_venta'], PDO::PARAM_STR);
    $stmt -> bindparam(':subtotal', $datos['subtotal_venta'], PDO::PARAM_STR);
    $stmt -> bindparam(':igv', $datos['igv_venta'], PDO::PARAM_STR);
    $stmt -> bindparam(':total_venta', $datos['total_venta'], PDO::PARAM_STR);

    if($stmt -> execute()){
      $id_venta_cabecera = Conexion::Connection()->lastInsertId();
      $stmt = null;

      $stmt = Conexion::Connection()->prepare("UPDATE empresa SET empresa_nro_correlativo_boleta = LPAD(empresa_nro_correlativo_boleta + 1, 9, 0)");
      if($stmt -> execute()){
        $stmt = null;

        $listaDetalleCabecera = [];

        for($i = 0; $i < count($datos['detalle']); $i++){
          $listaDetalleCabecera = explode(",",$datos['detalle'][$i]);
          
          $stmt = Conexion::Connection()->prepare("INSERT INTO venta_detalle (id_venta_cabecera, id_codigo_producto, cantidad, precio_unitario, total_venta) VALUES
          (:id_venta_cabecera, :id_producto, :cantidad, :precio_unitario, :total_venta)");

          $stmt -> bindparam(':id_venta_cabecera', $id_venta_cabecera, PDO::PARAM_INT);
          $stmt -> bindparam(':id_producto', $listaDetalleCabecera[0], PDO::PARAM_INT);
          $stmt -> bindparam(':cantidad', $listaDetalleCabecera[1], PDO::PARAM_INT);
          $stmt -> bindparam(':precio_unitario', $listaDetalleCabecera[2], PDO::PARAM_STR);
          $stmt -> bindparam(':total_venta', $listaDetalleCabecera[3], PDO::PARAM_STR);

          if($stmt -> execute()){
            $stmt = null;

            $stmt = Conexion::Connection()->prepare("UPDATE productos SET stock_producto = stock_producto - :cantidad WHERE id = :id");
            $stmt -> bindparam(':id', $listaDetalleCabecera[0], PDO::PARAM_INT);
            $stmt -> bindparam(':cantidad', $listaDetalleCabecera[1], PDO::PARAM_INT);

            if($stmt -> execute()){
              $resultado = "Se registro la venta correctamente";
            }else{
              $resultado = "Error al actualizar stock";
            }
          }else{
            $resultado = "Error al registar la venta";
          }
        }
        return $resultado;
        $stmt = null;
      }
    }
  }
  static public function mdlBuscarVentas($v_desde,$v_hasta){
    try{
      $stmt = Conexion::Connection()->prepare("CALL sp_buscar_ventas('$v_desde','$v_hasta')");
      $stmt -> execute();
      return $stmt->fetchAll();
      $stmt = null;
    }catch(Exception $e){
      return "Excepcion capturada: " . $e->getMessage();
    }
  }
  static public function mdlEliminarVenta($idVenta){
    try{
      $stmt = Conexion::Connection()->prepare("CALL sp_eliminar_venta(:id_venta_cabecera)");
      $stmt -> bindparam(':id_venta_cabecera', $idVenta, PDO::PARAM_INT);
      $stmt -> execute();
      return $stmt->fetch();
      $stmt = null;
    }catch(Exception $e){
      return "Excepcion capturada: " . $e->getMessage();
    }
  }
}