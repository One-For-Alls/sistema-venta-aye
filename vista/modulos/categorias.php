<div class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-8">
        <div class="card card-info card-outline">
          <div class="card-header">
            <h5><i class="fas fa-list"></i> Listado de categorias</h5>
          </div>
          <div class="card-body">
            <table id="tbl-categorias" class="table table-bordered">
              <thead>
                <tr>
                  <th></th>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Fecha creacion</th>
                  <th>Fecha modificacion</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card card-info card-outline">
          <div class="card-header">
            <h5> <i class="fas fa-edit"></i> Registro Categorias</h5>
          </div>
          <div class="card-body">
            <form class="needs-validation" novalidate>
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-group mb-2">
                    <label for="nomCategoria" class="small"><i class="fas fa-boxes fa-md"></i> Nombre de categoria <span class="text-danger">*</span></label>
                    <input id="nomCategoria" name="nombre" class="form-control" type="text" placeholder="Shampoo de argan" required>
                    <div class="invalid-feedback"></div>
                  </div>
                </div>
                <div class="col-lg-5">
                  <div class="form-group mt-2">
                  <button id="btnLimpiar" type="button" class="btn btn-primary btn-md w-100">Limpiar</button>
                  </div>
                </div>
                <div class="col-lg-7">
                  <div class="form-group mt-2">
                  <button id="btnGuardar" type="button" class="btn btn-primary btn-md w-100">Guardar Categoria</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>