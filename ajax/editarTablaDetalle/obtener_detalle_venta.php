<?php

require_once '../../modelo/conexion.php';

if(isset($_POST['sp_detalle'])) {

  $stmt = Conexion::Connection()->prepare("CALL sp_editar_detalle_venta(:id_venta_cabecera)");
  $stmt -> bindParam(':id_venta_cabecera', $_POST['id_venta_cabecera'], PDO::PARAM_INT);
  $stmt -> execute();
  $numero_filas_encontradas = $stmt -> rowCount();
  $result = $stmt->fetchAll();
}

$output = [
  'draw' => intval($_POST['draw']),
  'recordsTotal' => $numero_filas_encontradas,
  'recordsFiltered' =>$numero_filas_encontradas,
  'data' =>$result
];

echo json_encode($output);