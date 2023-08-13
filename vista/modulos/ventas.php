<div class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-9">
        <div class="row">
          <div class="col-12">
            <div class="form-group mb-3">
              <label class="form-label" for=""><i class="fas fa-barcode"></i> Producto</label>
              <input class="form-control" id="iptCodVenta" type="text" placeholder="Ingresa el codigo de barras o el nombre del producto..." autofocus>
            </div>
          </div>
          <div class="col-md-6 mb-3 text-center text-lg-left">
            <h3>Total venta: S./ <span id="total_venta">0.00</span></h3>
          </div>
          <div class="col-md-6 text-center text-lg-right mb-2">
            <button class="btn btn-primary" id="btnRealizarVenta"><i class="fas fa-shopping-cart"></i> Realizar Venta</button>
            <button class="btn btn-danger" id="btnVaciarListado"><i class="fas fa-trash"></i> Vaciar Listado</button>
          </div>
          <div class="col-12">
            <table id="tbl-ventas" class="table table-bordered">
              <thead class="bg-info fs-6 text-center">
                <tr>
                  <th>Item</th>
                  <th></th>
                  <th>Codigo</th>
                  <th>Id Categoria</th>
                  <th>Categoria</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Total</th>
                  <th>Opciones</th>
                  <th>Precio 2</th>
                  <th>Precio 3</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="card shadow">
          <h5 class="card-header py-1 bg-primary text-white text-center">
            Total Venta: S/. <span id="totalVentaRegistrar">0,00</span>
          </h5>
          <div class="card-body p-2">
            <div class="form-group mb-2">
              <label class="col-form-label">
                <i class="fas fa-file-alt fs-6"></i>
                <span class="small">Documento</span>
                <span class="text-danger">*</span>
              </label>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example" id="">
                <option value="0">Seleccione Documentos</option>
                <option value="1" selected="true">Boleta</option>
                <option value="2">Factura</option>
                <option value="3">Ticket</option>
              </select>
              <span id="validate_categoria" class="text-danger small fst-italic" style='display:none'>
                Debe seleccionar documento
              </span>
            </div>
            <div class="form-group mb-2">
              <label class="col-form-label">
                <i class="fas fa-file-alt fs-6"></i>
                <span class="small">Tipo Pago</span>
                <span class="text-danger">*</span>
              </label>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example" id="">
                <option value="0">Seleccione Documentos</option>
                <option value="1" selected="true">Efectivo</option>
                <option value="2">Tarjeta</option>
                <option value="3">Yape</option>
                <option value="3">Plin</option>
              </select>
              <span id="validate_categoria" class="text-danger small fst-italic" style='display:none'>
                Debe seleccionar documento
              </span>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-4">
                  <label for="">Serie</label>
                  <input class="form-control form-control-sm" type="text" id="nro_serie" placeholder="nro. serie" disabled>
                </div>
                <div class="col-md-8">
                  <label for="">Nro. Venta</label>
                  <input class="form-control form-control-sm" type="text" id="nro_correlativo" placeholder="nro. venta" disabled>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="">Cantidad de efectivo recibido</label>
              <input class="form-control form-control-sm" id="monto_recibido" type="number">
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="chkEfectivoExacto">
              <label class="form-check-label" for="">Efectivo exacto</label>
            </div>
            <div class="row mt-2">
              <div class="col-12">
                <h6 class="text-start fw-bold">Monto efectivo: S./<span id="monto_entregado">0.00</span></h6>
              </div>
              <div class="col-12">
                <h6 class="text-start text-danger fw-bold">Vuelto: S./<span id="vuelto_venta">0.00</span></h6>
              </div>
              <div class="row mt-2">
                <div class="col-md-7">Sub Total</div>
                <div class="col-md-5 text-right" id="sub_total">0.00</div>
                <div class="col-md-7">IGV (18%)</div>
                <div class="col-md-5 text-right" id="igv">0.00</div>
                <div class="col-md-7 mt-2 fw-bold">Total</div>
                <div class="col-md-5 text-right mt-2 fw-bold" id="total">0.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>