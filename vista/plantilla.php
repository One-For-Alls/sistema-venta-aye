<?php
	$rutaBack = Ruta::ctrBackend();

	session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>A & E STYLE | Dashboard</title>
<!-- Google Font: Source Sans Pro -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="<?=$rutaBack?>/public/dist/css/adminlte.css">
<link rel="stylesheet" href="<?=$rutaBack?>/public/plugins/fontawesome-free/css/all.min.css">
<link rel="stylesheet" href="<?=$rutaBack?>/public/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
<link rel="stylesheet" href="<?=$rutaBack?>/public/plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
<link rel="stylesheet" href="<?=$rutaBack?>/public/plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
<link rel="stylesheet" href="<?=$rutaBack?>/public/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css">
<link rel="stylesheet" href="<?=$rutaBack?>/public/plugins/toastr/toastr.min.css">
<link rel="stylesheet" href="<?=$rutaBack?>/public/plugins/jquery-ui/jquery-ui.min.css">

<link rel="stylesheet" href="<?=$rutaBack?>/public/css/plantilla.css">

</head>

<?php if(isset($_SESSION['usuario'])){
	$user = $_SESSION['usuario'];
	$nombre_modulo = $user->nombre_modulo;
	$ruta_modulo = $user->vista_modulo;
	$ruta_base = pathinfo($ruta_modulo,PATHINFO_FILENAME)
?>
<body class="hold-transition sidebar-mini layout-fixed">
	<div class="wrapper">
		<!-- Navbar -->
		<?php include 'modulos/cabecera.php' ?>
		<!-- /.navbar -->

		<!-- Main Sidebar Container -->
		<?php include 'modulos/menu.php' ?>
		
		<!-- Content Wrapper. -->
		<?php
		echo "
				<div class='content-wrapper'>
					<!-- Content Header -->
					<div class='content-header'>
						<div class='container-fluid'>
							<div class='row mb-2'>
								<div class='col-sm-6'>
									<h1 class='m-0'>";?> 
									<?php
										if(isset($_GET['url'])){
											$ruta = ucfirst($_GET['url']);
											$ruta_0 = $_GET['url'];
											echo $ruta;
										}else{
											$ruta =  ucfirst(pathinfo(str_replace('-',' ',$ruta_modulo),PATHINFO_FILENAME)) ; //pathinfo quita la extension y el otro cambia - por ' ';
											echo $ruta;
										}
									?> 
									<?php echo"</h1>
								</div>
								<div class='col-sm-6'>
									<ol class='breadcrumb float-sm-right'>
										<li class='breadcrumb-item'><a href='tablero-principal'>Home</a></li>
										<li class='breadcrumb-item active'>";?> <?=$ruta?> <?php echo  "</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
					<!-- Main content -->
					<section class='content'>";
			if(isset($_GET['url'])){
				if(	$_GET['url'] == 'tablero-principal' || 
				$_GET['url'] == 'empresa' ||
						$_GET['url'] == 'clientes' 	||
						$_GET['url'] == 'productos' ||
						$_GET['url'] == 'servicios' ||
						$_GET['url'] == 'categorias' ||
						$_GET['url'] == 'administrar-venta' ||
						$_GET['url'] == 'ventas' ||
						$_GET['url'] == 'salir')
				{
					include "modulos/" .$_GET['url']. ".php";
				}else
				{
					include "modulos/404.php";
				}
			}else
			{
				include "modulos/$ruta_modulo";
			}
				?>
			<!-- <script>
				function cargarContenido(pagina_php,contenedor){
					$('.' + contenedor).load(pagina_php);
				}
			</script> -->
				<?php
			echo "</section>
		</div>";
		?>
		
		<!-- /.content-wrapper -->

		<!-- Footer -->
		<?php include 'modulos/footer.php' ?>
		<!-- /.Footer -->
		
	</div>
	<!-- ./wrapper -->

	<!-- jQuery -->
	<script src="<?=$rutaBack?>/public/plugins/jquery/jquery.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/jquery-ui/jquery-ui.min.js"></script>
	<script src="<?=$rutaBack?>/public/dist/js/adminlte.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/chart.js/Chart.min.js"></script>
	<script src="https://nightly.datatables.net/js/jquery.dataTables.min.js"></script>
	<script src="https://markcell.github.io/jquery-tabledit/assets/js/tabledit.min.js"></script>
	
	<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
	<script>
	$.widget.bridge('uibutton', $.ui.button)
	</script>

	<script>
  /** add active class and stay opened when selected */
  var url = window.location;
	var url2 = window.location;

  const allLinks = document.querySelectorAll('.nav-item a');
	const allLinks2 = document.querySelectorAll('.nav-item a.mn');
  const currentLink = [...allLinks].filter(e => {
    return e.href == url;
  });

	const currentLink2 = [...allLinks2].filter(e => {
    return e.href == url2;
  });
	
  if (currentLink.length > 0) { //this filter because some links are not from menu
      currentLink[0].classList.add("active");
  }

	if (currentLink2.length > 0) { //this filter because some links are not from menu
		currentLink2[0].classList.add("active");
	}
		// $('.nav-link').on('click', function() {
		// 	// Eliminando clases activas en todos los menus 
		// 	$('.nav-link').removeClass('active');
		// 		// Añado clase en el li que se ha hecho click
		// 	$(this).addClass('active');
		// });

		// $('.nav-link-2').on('click', function() {
		// 	// Eliminando clases activas en todos los menus 
		// 	$('.nav-link-2').removeClass('active');
		// 		// Añado clase en el li que se ha hecho click
		// 	$(this).addClass('active');
		// });
	</script>
	<!-- DataTables  & Plugins -->
	<script src="<?=$rutaBack?>/public/plugins/datatables/jquery.dataTables.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	<script src="<?=$rutaBack?>/public/plugins/jszip/jszip.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/pdfmake/pdfmake.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/pdfmake/vfs_fonts.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/datatables-buttons/js/buttons.html5.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/datatables-buttons/js/buttons.print.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/datatables-buttons/js/buttons.colVis.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/sweetalert2/sweetalert2.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/toastr/toastr.min.js"></script>
	<script src="<?=$rutaBack?>/public/plugins/jquery-ui/jquery-ui.min.js"></script>

	<script type="module" src='<?php echo (isset($ruta_0))  ? "$rutaBack/public/js/$ruta_0.js" : "$rutaBack/public/js/$ruta_base.js"?>'></script>
</body>
<?php }else{ ?>
		<body>
			<script src="<?=$rutaBack?>/public/plugins/jquery/jquery.min.js"></script>
			<script src="<?=$rutaBack?>/public/js/plantilla.js"></script>
			<script src="<?=$rutaBack?>/public/plugins/sweetalert2/sweetalert2.min.js"></script>
		<script src="<?=$rutaBack?>/public/plugins/toastr/toastr.min.js"></script>
			<?php include_once 'vista/modulos/login.php'; ?>

			
		</body>
<?php	} ?>
</html>
