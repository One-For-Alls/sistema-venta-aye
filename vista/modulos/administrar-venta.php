<div class="content-header">
  <div class="content-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-info">
          <div class="card-header">
            <h3 class="card-title">Criterios de busqueda</h3>
            <div class="card-tools">
              <buttton class="btn btn-tool" type="button" data-card-widget="collapse"><i class="fas fa-minus"></i></buttton>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-2">
                <div class="form-group">
                  <label for="">Ventas desde:</label>
                  <input type="date" class="form-control" name="ventas_desde" id="v_desde">
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <label for="">Ventas hasta:</label>
                  <input type="date" class="form-control" name="ventas_hasta" id="v_hasta">
                </div>
              </div>
              <div class="col-md-8 d-flex flex-row align-items-center justify-content-end">
                <div class="form-group m-0">
                  <a style="width:120px" class="btn btn-primary" id="btnFiltrar">Buscar</a>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-12">
                <h4>Total venta: S./ <span id="totalVenta">0.00</span></h4>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <table class="table display nowrap table-striped w-100 shadow" id="tblAdmVentas">
                  <thead class="bg-info">
                    <tr>
                      <th>id</th>
                      <th>Nro. boleta</th>
                      <th>Codigo barras</th>
                      <th>Categoria</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>P. Unitario</th>
                      <th>Total venta</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody class="small"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="mod-editar-venta" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mod-editar-ventaLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header bg-info py-2 align-items-center">
                <h5 class="modal-title" id="mod-editar-ventaLabel">Editar venta</h5>

                </button>
              </div>
              <div class="modal-body">
                <table id="tblDetalleVenta" class="table table-bordered table-striped w-100">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Boleta</th>
                      <th>id producto</th>
                      <th>Cod. producto</th>
                      <th>Categoria</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Prec. Unit.</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody></tbody>

                </table>
              </div>
              <div class="modal-footer">
                <button type="button" id="btnCancelar" class="btn btn-danger" data-dismiss="modal">Salir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>