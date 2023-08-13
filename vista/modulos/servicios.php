<div class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card card-info card-outline">
          <div class="card-header">
            <h5>Listado de servicios</h5>
          </div>
          <div class="card-body">
            <table class="table table-bordered" id="tbl-servicios">
              <thead>
                <tr>
                  <th></th>
                  <th>id</th>
                  <th>categoria</th>
                  <th>nombre</th>
                  <th>descripcion</th>
                  <th>precio</th>
                  <th>id_categoria</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <div class="modal fade" id="mod-servicios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mod-serviciosLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header bg-info py-2 align-items-center">
                  <h5 class="modal-title" id="titulo-servicios">Agregar Servicio</h5>
                </div>
                <div class="modal-body">
                  <form class="needs-validation" novalidate>
                    <div class="row">
                      <div class="col-lg-7">
                        <div class="form-group mb-2">
                          <label for="nomProducto" class="small"><i class="fas fa-file-signature"></i></i> Nombre producto <span class="text-danger">*</span></label>
                          <input id="nomProducto" name="nombre" class="form-control" type="text" placeholder="Shampoo" required>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                      <div class="col-lg-5">
                        <div class="form-group mb-2">
                          <label class="small"><i class="fas fa-store"></i> Categoria <span class="text-danger">*</span></label>
                          <select class="form-control select-form-all" name="categoria" id="catProducto" required></select>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group mb-2">
                          <label for="desProducto" class="small"><i class="fas fa-file-signature"></i> Descripcion <span class="text-danger">*</span></label>
                          <input id="desProducto" name="descripcion" type="text" class="form-control" placeholder="shampoo sin sal especial para cabello" required>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group mb-2">
                          <label for="precioProducto" class="small"><i class="fas fa-dollar-sign"></i> Precio <span class="text-danger">*</span></label>
                          <input id="precProducto" name="precio" type="number" class="form-control no-spin" placeholder="S/ 23.00" step="0.01" inputmode="decimal" required>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button id="btnCancelar" type="button" class="btn btn-danger mt-3 mx-2" data-bs-dismiss="modal">Close</button>
                  <button id="btnGuardar" type="button" class="asa btn btn-primary mt-3 mx-2">Guardar servicio</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>