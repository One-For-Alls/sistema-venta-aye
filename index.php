<?php

  require_once 'controlador/controlador.plantilla.php';
  require_once 'controlador/controlador.usuario.php';
  // require_once 'controlador/controlador.tablero-principal.php';
  // require_once 'controlador/controlador.cliente.php';

  require_once 'modelo/rutas.php';
  require_once 'modelo/modelo.tablero-controlador.php';
  require_once 'modelo/modelo.usuario.php';

  $plantilla = new ControladorPlantilla;
  $plantilla -> ctrPlantilla();