<?php

class Conexion {
  private static $host = 'localhost';
  private static $db = 'aye_styles';
  private static $user = 'root';
  private static $pwd = '';
  private static $conn = null;

  static public function Connection() {
    //la $conn empieza vacia luego se carga con conexion y despues si ya existe ya no crea otra
    if(self::$conn == null){
      try {
        self::$conn = new PDO("mysql:host=" . self::$host . ";dbname=" . self::$db, self::$user, self::$pwd);
        //modo de error que se mostrara
        self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch (PDOException $excepcion) {
        echo "Error de conexión: " . $excepcion->getMessage();
      }
    }
    return self::$conn;
  }
}