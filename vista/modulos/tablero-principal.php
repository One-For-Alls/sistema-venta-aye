<div class="container-fluid">
  <div class="row">
    <div class="col-lg-3">
      <div class="small-box bg-info">
        <div class="inner">
          <h3 id="total-productos"></h3>
          <p>Total productos</p>
        </div>
        <div class="icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <a href="#" class="small-box-footer">
          More info <i class="fas fa-arrow-circle-right"></i>
        </a>
      </div>
    </div>

    <div class="col-lg-3">
      <div class="small-box bg-success">
        <div class="inner">
          <h3 id="total-ventas"></h3>
          <p>Total de ventas</p>
        </div>
        <div class="icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <a href="#" class="small-box-footer">
          More info <i class="fas fa-arrow-circle-right"></i>
        </a>
      </div>
    </div>

    <div class="col-lg-3">
      <div class="small-box bg-red">
        <div class="inner">
          <h3 id="productos-poco-stock"></h3>
          <p>Productos con poco stock</p>
        </div>
        <div class="icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <a href="#" class="small-box-footer">
          More info <i class="fas fa-arrow-circle-right"></i>
        </a>
      </div>
    </div>

    <div class="col-lg-3">
      <div class="small-box bg-warning">
        <div class="inner">
          <h3 id="total-ventas-dia"></h3>
          <p>ventas del dia</p>
        </div>
        <div class="icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <a href="#" class="small-box-footer">
          More info <i class="fas fa-arrow-circle-right"></i>
        </a>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-success">
        <div class="card-header">
          <h3 class="card-title" id="total-venta-grafica-principal"></h3>
          <div class="card-tools">
            <button type="button" class="btn btn-tool" data-card-widget="collapse">
              <i class="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="chart">
            <canvas id="barChart" style="min-height: 250px; max-height: 350px; width: 100%;">
            </canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>