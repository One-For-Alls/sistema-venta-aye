<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once '../controlador/controlador.producto.php';
require_once '../modelo/modelo.producto.php';

class AjaxProductos
{
  static public function ajaxCargarProductos()
  {
    $datos = ControladorProductos::ctrCargarProductos();
    echo json_encode($datos);
  }

  static public function ajaxGuardarProductos($tabla, $datos)
  {
    $productos = ControladorProductos::ctrGuardarProductos($tabla, $datos);
    echo json_encode($productos);
  }
  static public function ajaxEditarProductos($tabla, $datos)
  {
    $productos = ControladorProductos::ctrEditarProductos($tabla, $datos);
    echo json_encode($productos);
  }
  static public function ajaxEliminarProductos()
  {
    $tabla = 'productos';
    $id = $_POST['idProducto'];

    $productos = ControladorProductos::ctrEliminarProductos($tabla, $id);
    echo json_encode($productos);
  }
  static public function ajaxAumentarStock($tabla, $datos)
  {
    $productos = ControladorProductos::ctrAumentarSock($tabla, $datos);
    echo json_encode($productos);
  }
  static public function ajaxDisminuirStock($tabla, $datos)
  {
    $productos = ControladorProductos::ctrDisminuirStock($tabla, $datos);
    echo json_encode($productos);
  }
  static public function ajaxListarNombresProductos()
  {
    $productos = ControladorProductos::ctrListarNombresProductos();
    echo json_encode($productos);
  }
  static public function ajaxBuscarCodigoProducto($id)
  {
    $productos = ControladorProductos::ctrBuscarCodigoProductos($id);
    echo json_encode($productos);
  }
  static public function ajaxVerificarStockProducto($datos)
  {
    $productos = ControladorProductos::ctrVerificarStockProducto($datos);
    echo json_encode($productos);
  }
}

// ACCION 1 -> CARGAR LISTA DE PRODUCTOS REGISTRADOS
if (isset($_POST['accion']) && $_POST['accion'] == 1) 
{
  $datos = AjaxProductos::ajaxCargarProductos();

} 
// ACCION 2 -> GUARDAR NUEVOS PRODUCTOS
else if (isset($_POST['accion']) && $_POST['accion'] == 2) 
{
  $tabla = 'productos';
  $datos = [
    'codigo' => $_POST['codProducto'],
    'nombre' => $_POST['nomProducto'],
    'categoria' => $_POST['catProducto'],
    'descripcion' => $_POST['desProducto'],
    'precio' => $_POST['precProducto'],
    'precio2' => $_POST['precProducto2'],
    'precio3' => $_POST['precProducto3'],
    'stock' => $_POST['stockProducto']
  ];
  $guardarProducto = AjaxProductos::ajaxGuardarProductos($tabla, $datos);
} 
// ACCION 3 -> EDITAR PRODUCTOS EXISTENTES
else if (isset($_POST['accion']) && $_POST['accion'] == 3) 
{
  $tabla = 'productos';
  $datos = [
    'id' => $_POST['idProducto'],
    'codigo' => $_POST['codProducto'],
    'nombre' => $_POST['nomProducto'],
    'categoria' => $_POST['catProducto'],
    'descripcion' => $_POST['desProducto'],
    'precio' => $_POST['precProducto'],
    'precio2' => $_POST['precProducto2'],
    'precio3' => $_POST['precProducto3'],
    'stock' => $_POST['stockProducto']
  ];
  $editarProducto = AjaxProductos::ajaxEditarProductos($tabla, $datos);
} 
// ACCION 4 -> AUMENTAR STOCK PRODUCTOS
else if (isset($_POST['accion']) && $_POST['accion'] == 4) 
{
  $tabla = 'productos';
  $datos = [
    'id' => $_POST['id'],
    'nuevoStock' => $_POST['nuevoStock']
  ];
  $aumentarStock = AjaxProductos::ajaxAumentarStock($tabla, $datos);
}
// ACCION 5 -> DISMINUIR STOCK PRODUCTOS
else if (isset($_POST['accion']) && $_POST['accion'] == 5) 
{
  $tabla = 'productos';
  $datos = [
    'id' => $_POST['id'],
    'nuevoStock' => $_POST['nuevoStock']
  ];
  $disminuirStock = AjaxProductos::ajaxDisminuirStock($tabla, $datos);
}
// ACCION 6 -> ELIMINAR PRODUCTOS
else if (isset($_POST['accion']) && $_POST['accion'] == 6) 
{
  $editarProducto = AjaxProductos::ajaxEliminarProductos();
}
// ACCION 7 -> AUTOCOMPLTADO INPUT PRODUCTOS VENTAS
else if (isset($_POST['accion']) && $_POST['accion'] == 7) 
{
  $listarProducto = AjaxProductos::ajaxListarNombresProductos();
}
else if (isset($_POST['accion']) && $_POST['accion'] == 8) 
{   

  $id = $_POST['id_producto'];
  $buscarCodigoProducto = AjaxProductos::ajaxBuscarCodigoProducto($id);

}
else if (isset($_POST['accion']) && $_POST['accion'] == 9) 
{
  $datos = 
    [
      'codigo_producto' => $_POST['codigo_producto'],
      'cantidad_compra' => $_POST['cantidad']
    ];
  $buscarCodigoProducto = AjaxProductos::ajaxVerificarStockProducto($datos);
}