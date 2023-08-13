<?php
require_once '../controlador/controlador.cliente.php';
require_once '../modelo/modelo.cliente.php';

class AjaxClientes{

  static public function ajaxCargarClientes() {
    $datos = ControladorClientes::ctrCargarCliente();
    echo json_encode($datos);
    
  }

  static public function ajaxCrearCliente($tabla, $datos) {
    $cliente = ControladorClientes::ctrCrearCliente($tabla, $datos);
    echo json_encode($cliente);
  }

  static public function ajaxEditarCliente($tabla, $datos) {
    $cliente = ControladorClientes::ctrEditarCliente($tabla, $datos);
    echo json_encode($cliente);
  }

  static public function ajaxEliminarCliente($tabla, $id) {
    $cliente = ControladorClientes::ctrEliminarCliente($tabla, $id);
    echo json_encode($cliente);
  }
}

// datos recibe el valor que imprime el echo de json_encode($datos);

if (isset($_POST['accion']) && $_POST['accion'] == 1){

  $datos = AjaxClientes::ajaxCargarClientes();

}else if (isset($_POST['accion']) && $_POST['accion'] == 2){
  $tabla = 'clientes';
  $datos = [
    'nombre' => $_POST['nomCliente'],
    'apellido' => $_POST['apeCliente'],
    'direccion' => $_POST['dirCliente'],
    'celular' => $_POST['celCliente']
  ];
  $crearCliente = AjaxClientes::ajaxCrearCliente($tabla,$datos);

}else if (isset($_POST['accion']) && $_POST['accion'] == 3){
  $tabla = 'clientes';
  $datos = [
    'id' => $_POST['idCliente'],
    'nombre' => $_POST['nomCliente'],
    'apellido' => $_POST['apeCliente'],
    'direccion' => $_POST['dirCliente'],
    'celular' => $_POST['celCliente']
  ];
  $editarCliente = AjaxClientes::ajaxEditarCliente($tabla,$datos);
}

else if (isset($_POST['accion']) && $_POST['accion'] == 4){
  $tabla = 'clientes';
  $id = $_POST['idCliente'];
  $editarCliente = AjaxClientes::ajaxEliminarCliente($tabla,$id);
}
