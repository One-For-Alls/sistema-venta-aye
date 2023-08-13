<?php
ob_clean(); // Inicia el búfer de salida

// Tu código PHP aquí, asegúrate de no imprimir nada antes de header()
session_destroy();
echo '<script>
	window.location = "http://localhost/sistema-A&E/";

</script>';
exit; // Detiene la ejecución del script después de la redirección
// Envía el contenido almacenado en el búfer
?>