<?php
require_once '../controlador/controlador.categoria.php';
require_once '../modelo/modelo.categoria.php';

  class AjaxCategorias{
    static public function ajaxCargarCategorias() {
      $datos = ControladorCategorias::ctrCargarCategorias();
      echo json_encode($datos);
    }
    static public function ajaxGuardarCategorias() {
      $tabla = 'categorias';
      $nombre = $_POST['nomCategoria'];
      $categorias = ControladorCategorias::ctrGuardarCategorias($tabla, $nombre);
      echo json_encode($categorias);
    }
    static public function ajaxEditarCategorias() {
      $tabla = 'categorias';
      $datos = [
        'nombre' => $_POST['nomCategoria'],
        'id' => $_POST['id']
      ];
      $categorias = ControladorCategorias::ctrEditarCategorias($tabla, $datos);
      echo json_encode($categorias);
    }
    static public function ajaxEliminarCategorias() {
      $tabla = 'categorias';
      $id = $_POST['id'];
      $categorias = ControladorCategorias::ctrEliminarCategorias($tabla, $id);
      echo json_encode($categorias);
    }
  }

  if(isset($_POST['accion']) && $_POST['accion'] == 1){
    $datos = AjaxCategorias::ajaxCargarCategorias();
  }else if(isset($_POST['accion']) && $_POST['accion'] == 4){
    $guardarCategoria = AjaxCategorias::ajaxEliminarCategorias();
  }else if(isset($_POST['id']) && $_POST['id'] == 0){
    $guardarCategoria = AjaxCategorias::ajaxGuardarCategorias();
  }else if(isset($_POST['id']) && $_POST['id'] >= 1){
    $guardarCategoria = AjaxCategorias::ajaxEditarCategorias();
  }