<?php

require_once '../../modelo/conexion.php';
require_once '../../controlador/controlador.producto.php';
require_once '../../modelo/modelo.producto.php';

if(isset($_POST['action']) && $_POST['action'] == 'edit') {

  if(!(isset($_POST['id']))){
    $_POST['id'] = null;
  }

  if(!(isset($_POST['cantidad']))){
    $_POST['cantidad'] = null;
  }

  if(!(isset($_POST['codigo_producto']))){
    $_POST['codigo_producto'] = null;
  }
  $data = [
    'id' => $_POST['id'],
    'cantidad' => $_POST['cantidad'],
    'codigo_producto' => $_POST['codigo_producto']
  ];

  $datos = [
    'id' => $_POST['id'],
    'cantidad_compra' => $_POST['cantidad']
  ];

  $respuesta = ModeloProductos::mdlVerificarDetalleStockProducto($datos);

  $infoProducto  = [
    'validacion' => $respuesta->existe,
    'action'=> $_POST['action'],
    'id' => $data['id'],
    'cantidad' => $data['cantidad'],
    'codigo_producto' => $data['codigo_producto']
  ];

  if($respuesta->existe == 1) {
    $stmt = Conexion::Connection()->prepare("CALL sp_actualizar_detalle_venta(:id_vd, :codigo_producto, :cantidad)");
    $stmt -> bindParam(':id_vd', $data['id'], PDO::PARAM_INT);
    $stmt -> bindParam(':codigo_producto', $data['codigo_producto'], PDO::PARAM_INT);
    $stmt -> bindParam(':cantidad', $data['cantidad'], PDO::PARAM_INT);
  
    $stmt->execute();
  
    echo json_encode($infoProducto);
  }else{
    echo json_encode($infoProducto);
  }
}

if(isset($_POST['action']) && $_POST['action'] == 'delete') {

  $id = $_POST['id'];
  $stmt = Conexion::Connection()->prepare("CALL sp_eliminar_detalle_producto(:id)");
  $stmt -> bindParam(':id', $id, PDO::PARAM_INT);

  $stmt->execute();
  echo json_encode($_POST);

  $stmt = null;

}