<!DOCTYPE html>
<html lang="en">
<body class="login-page">
  <div class="login-box">
    <div class="login-logo">
      <a href="#" class="text-primary"><b class="text-danger">A & E </b> Store</a>
    </div>

    <div class="card">
      <div class="card-body">
        <p class="login-box-msg text-secundary fw-bold">Ingresa tus credenciales para iniciar sesion</p>
  
        <form method="POST" class="needs-validation-login" novalidate>
          <div class="input-group mb-3">
            <input type="text" class="form-control" name="nombre_usuario" placeholder="Usuario"  required>
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
            <div class="invalid-feedback">Debes ingresar un usuario</div>
          </div>

          <div class="input-group mb-3">
            <input type="password" class="form-control" name="password_usuario" placeholder="Contraseña" required>
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
            <div class="invalid-feedback">Debes ingresar una contraseña</div>
          </div>
          
          <div class="row">
            <div class="col-8">
              <p class="mb-1">
                <a href="forgot-password.html">olvide mi contraseña</a>
              </p>
            </div>
            <?php
              $login = ControladorUsuarios::ctrIngresoUsuario();
            ?>
            <div class="col-4">
              <button type="submit" class="btn btn-primary">Ingresar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</body>

</html>
