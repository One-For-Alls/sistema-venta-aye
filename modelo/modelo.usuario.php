<?php
require_once 'conexion.php';

class ModeloUsuarios {

  static public function mdlIngresoUsuario($user, $pass){
    $stmt = Conexion::Connection()->prepare("SELECT u.id AS id_usuario, 
                                                u.nombre_usuario AS nombre_usuario,
                                                u.apellido_usuario AS apellido_usuario, 
                                                u.usuario AS usuario,
                                                u.password_usuario AS password_usuario,
                                                u.estado_usuario AS estado_usuario,
                                                p.id AS id_perfil,
                                                p.nombre_perfil AS nombre_perfil,
                                                pm.id AS id_perfil_modulo,
                                                pm.vista_inicio_perfil_modulo AS vista_inicio_perfil_modulo,
                                                m.id AS id_modulo,
                                                m.nombre_modulo AS nombre_modulo,
                                                m.padre_modulo_id AS padre_modulo_id,
                                                m.vista_modulo AS vista_modulo,
                                                m.icon_menu_modulo AS icon_menu_modulo
                                              FROM usuarios AS u INNER JOIN perfiles AS p ON u.id_perfil = p.id
                                              INNER JOIN perfil_modulo as pm ON u.id_perfil = pm.id_perfil
                                              INNER JOIN modulos as m ON m.id = pm.id_modulo WHERE u.usuario = :user 
                                              AND u.password_usuario = :pass
                                              AND pm.vista_inicio_perfil_modulo = 1");
    $stmt->bindParam(':user',$user,PDO::PARAM_STR);
    $stmt->bindParam(':pass',$pass,PDO::PARAM_STR);

    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_CLASS);
  }

  static public function mdlObtenerMenuUsuario($id_usuario){
    $stmt = Conexion::Connection()->prepare("CALL sp_obtener_menu_usuario(:id_user)");
    $stmt->bindParam(':id_user', $id_usuario, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_CLASS);
  }
  static public function mdlObtenerSubMenuUsuario($id_menu){
    $stmt = Conexion::Connection()->prepare("CALL sp_obtener_sub_menu_usuario(:id_menu)");
    $stmt->bindParam(':id_menu', $id_menu, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_CLASS);
  }
}