<?php
class ControladorUsuarios {
  static public function ctrIngresoUsuario(){
    if(isset($_POST['nombre_usuario']) && isset($_POST['password_usuario'])){
      $user = $_POST['nombre_usuario'];
      $pass = crypt($_POST['password_usuario'],'$2a$07$usesomesillystringforeN7/2NBfGxbAuv02IPrTFBImFJd5PJ1m');

      $respuesta = ModeloUsuarios::mdlIngresoUsuario($user, $pass);
      
      if(count($respuesta) > 0){
        $_SESSION['usuario'] = $respuesta[0];

        echo '
          <script>
            window.location = "http://localhost/sistema-A&E/";
          </script>
        ';
      }else{
        echo '
        <script>
          fncSweetAlert(
            "error",
            "usuario y/o contraseña invalidas",
            "http://localhost/sistema-A&E/"
          );
        </script>
        ';
      }
    }
  }

  static public function ctrObtenerMenuUsuario($id_useruario){
    $menu_usuario = ModeloUsuarios::mdlObtenerMenuUsuario($id_useruario);
    return $menu_usuario;
  }
  static public function ctrObtenerSubMenuUsuario($id_useruario){
    $menu_usuario = ModeloUsuarios::mdlObtenerSubMenuUsuario($id_useruario);
    return $menu_usuario;
  }
}
