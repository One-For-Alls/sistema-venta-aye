<div class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class=" card card-info card-outline">
          <!-- /.card-header -->
          <div class="card-body">
            <table id="tbl-clientes" class="table table-bordered">
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Direccion</th>
                  <th>Celular</th>
                  <th>Fecha creacion</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- Button trigger modal -->

        <!-- Modal -->
        <div class="modal fade" id="mod-clientes" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mod-clientesLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-info py-2 align-items-center">
                <h5 class="modal-title" id="mod-clientes">Agregar Cliente</h5>
                <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button> -->
              </div>
              <div class="modal-body">
                <form class="needs-validation" novalidate>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group mb-2">
                      <label for="nomCliente" class="small"><i class="fas fa-signature"></i> Nombres <span class="text-danger">*</span></label>
                      <input id="nomCliente" name="nombre" class="form-control" type="text" placeholder="Juan Mighel" required>
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group mb-2">
                      <label for="apeCliente" class="small"><i class="fas fa-signature"></i> Apellidos <span class="text-danger">*</span></label>
                      <input id="apeCliente" name="apellido" type="text" class="form-control" placeholder="Rengifo Garcia" required>
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group mb-2">
                      <label for="dirCliente" class="small"><i class="fas fa-street-view"></i> Direccion <span class="text-danger">*</span></label>
                      <input id="dirCliente" name="direccion" type="text" class="form-control" placeholder="Av enrrique meiggs 765" required>
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group mb-2">
                      <label for="celCliente" class="small"><i class="fas fa-mobile-alt"></i> Celular/Telefono <span class="text-danger">*</span></label>
                      <input id="celCliente" name="celular" type="tel" class="form-control" placeholder="923346200 / 329865" required>
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                </div>
                </form>
              </div>
              <div class="modal-footer">
                <button id="btnCancelar" type="button" class="btn btn-danger mt-3 mx-2" data-bs-dismiss="modal">Close</button>
                <button id="btnGuardar"  type="button" class="asa btn btn-primary mt-3 mx-2" >Guardar cliente</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>