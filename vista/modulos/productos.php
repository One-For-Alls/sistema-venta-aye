<div class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card card-info card-outline">
          <div class="card-header">
            <h5>Listado de productos</h5>
          </div>
          <div class="card-body">
            <table class="table table-bordered" id="tbl-productos">
              <thead>
                <tr>
                  <th></th>
                  <th>id</th>
                  <th>codigo</th>
                  <th>categoria</th>
                  <th>nombre</th>
                  <th>descripcion</th>
                  <th>precio</th>
                  <th>precio 2</th>
                  <th>precio 3</th>
                  <th>stock</th>
                  <th>fecha creacion</th>
                  <th>fecha actualiza</th>
                  <th>id categoria</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <div class="modal fade" id="mod-productos" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mod-productosLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header bg-info py-2 align-items-center">
                  <h5 class="modal-title" id="titulo-productos">Agregar Producto</h5>
                </div>
                <div class="modal-body">
                  <form class="needs-validation" novalidate>
                    <div class="row">
                      <div class="col-lg-7">
                        <div class="form-group mb-2">
                          <label for="codProducto" class="small"><i class="fas fa-barcode"></i> Codigo producto <span class="text-danger">*</span></label>
                          <input id="codProducto" name="codigo" class="form-control no-spin" type="number" placeholder="1234567898765" required>
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
                      <div class="col-lg-6">
                        <div class="form-group mb-2">
                          <label for="nomProducto" class="small"><i class="fas fa-file-signature"></i></i> Nombre producto <span class="text-danger">*</span></label>
                          <input id="nomProducto" name="nombre" class="form-control" type="text" placeholder="Shampoo" required>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group mb-2">
                          <label for="desProducto" class="small"><i class="fas fa-file-signature"></i> Descripcion <span class="text-danger">*</span></label>
                          <input id="desProducto" name="descripcion" type="text" class="form-control" placeholder="shampoo sin sal especial para cabello" required>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                      
                      <div class="col-lg-3">
                        <div class="form-group mb-2">
                          <label for="precioProducto" class="small"><i class="fas fa-dollar-sign"></i> Precio 1 <span class="text-danger">*</span></label>
                          <input id="precProducto" name="precio" type="number" class="form-control no-spin" placeholder="S/ 23.00" step="0.01" inputmode="decimal" required>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group mb-2">
                          <label for="precioProducto2" class="small"><i class="fas fa-dollar-sign"></i> Precio 2 <span class="text-danger">*</span></label>
                          <input id="precProducto2" name="precio2" type="number" class="form-control no-spin" placeholder="S/ 23.00" step="0.01" inputmode="decimal" required>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group mb-2">
                          <label for="precioProducto3" class="small desktop"><i class="fas fa-dollar-sign"></i> Precio 3<span class="text-danger">*</span></label>
                          <input id="precProducto3" name="precio3" type="number" class="form-control no-spin" placeholder="S/ 23.00" step="0.01" inputmode="decimal" required>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group mb-2">
                          <label for="stockProducto" class="small"><i class="fas fa-plus-circle"></i> Stock <span class="text-danger">*</span></label>
                          <input id="stockProducto" name="stock" type="number" class="form-control no-spin" placeholder="10" required>
                          <div class="invalid-feedback"></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button id="btnCancelar" type="button" class="btn btn-danger mt-3 mx-2" data-bs-dismiss="modal">Close</button>
                  <button id="btnGuardar" type="button" class="asa btn btn-primary mt-3 mx-2">Guardar cliente</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal fade" id="mod-productos-stock" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mod-productos-stockLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header bg-info py-2 align-items-center">
                  <h5 class="modal-title" id="titulo-stock"></h5>
                </div>
                <div class="modal-body">
                  <form class="needs-validation" novalidate>
                    <div class="row">
                      <div class="col-lg-10 mb-3">
                        <label for="" class="col-form-label d-block text-primary">Codigo: <span id="stock-id" class="text-secondary"></span></label>
                        <label for="" class="col-form-label d-block text-primary">Producto: <span id="stock-prod" class="text-secondary"></span></label>
                        <label for="" class="col-form-label d-block text-primary">Stock: <span id="stock-cant" class="text-secondary"></span></label>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group mb-2">
                          <i class="fas fa-plus-circle"></i> <label for="cantStockProd" class="small" id="texto-label-stock"></label>
                          <input id="cantStockProd" name="stock" class="form-control no-spin" type="number" placeholder="Ingresa la cantidad del producto" required>
                          <div class="invalid-feedback"></div>
                          <label class="col-form-label d-block text-danger">Nuevo stock: <span class="text-secondary" id="stock-nuevo"></span></label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button id="btnCancelarStock" type="button" class="btn btn-danger mt-3 mx-2" data-bs-dismiss="modal">Close</button>
                  <button id="btnGuardarStock" type="button" class="asa btn btn-primary mt-3 mx-2">Guardar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>