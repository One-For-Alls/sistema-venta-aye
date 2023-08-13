<?php
$id_usuario = $_SESSION['usuario']->id_usuario;
$menu_user = ControladorUsuarios::ctrObtenerMenuUsuario($id_usuario);

$formatear_nombre = explode(' ', $_SESSION['usuario']->nombre_usuario);
$nombre = $formatear_nombre[0];

$formatear_apellido = explode(' ', $_SESSION['usuario']->apellido_usuario);
$apellido = $formatear_apellido[0];
?>

<aside class="main-sidebar sidebar-no-expand sidebar-dark-primary elevation-4">
  <!-- Brand Logo -->
  <a href="#" class="brand-link">
    <img src="public/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
    <span class="brand-text font-weight-light">A & E STYLE</span>
  </a>

  <!-- Sidebar -->
  <div class="sidebar">
    <!-- Sidebar user panel (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
      <div class="image">
        <img src="public/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
      </div>
      <div class="info">
        <a class="d-block text-center" style="color: #c2c7d0 !important;"> <?php echo  $nombre . ' ' . $apellido ?></a>
      </div>
    </div>

    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">
        <?php
        foreach ($menu_user as $menu) {
          $ruta = pathinfo($menu->vista_modulo, PATHINFO_FILENAME);
          ?>
          <li class="nav-item">
            <a  class="nav-link mn"
              <?php if (!empty($menu->vista_modulo)) { echo 'href="' . $ruta .'"'; } ?> >
              <i class=" <?php echo $menu->icon_menu_modulo ?> "></i>
              <p>
                <?php echo $menu->nombre_modulo; ?>

                <?php if (empty($menu->vista_modulo)) { ?>
                  <i class="right fas fa-angle-left"></i>
                <?php } ?>
              </p>
            </a>
            <?php if (empty($menu->vista_modulo)) {
              $sub_menu_user = ControladorUsuarios::ctrObtenerSubMenuUsuario($menu->id);
            ?>
              <ul class=" nav nav-treeview">
                <?php foreach ($sub_menu_user as $sub_menu) {
                  $sub_ruta = pathinfo($sub_menu->vista_modulo, PATHINFO_FILENAME);
                ?>
                  <li class="nav-item">
                    <a class="nav-link mn" <?php {
                                              echo 'href="'. $sub_ruta .'"';
                                            } ?>>
                      <i class=" <?php echo $sub_menu->icon_menu_modulo ?> nav-icon"></i>
                      <p> <?php echo $sub_menu->nombre_modulo; ?> </p>
                    </a>
                  </li>
                <?php } ?>
              </ul>
            <?php
            } ?>
          </li>
        <?php  }  ?>
        <li class="nav-item">
          <a href="salir" class="nav-link">
            <i class="fas fa-sign-out-alt"></i>
            <p>Cerrar sesion</p>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>