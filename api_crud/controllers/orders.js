const AppError = require("../utils/appError");
const conn = require("../services/db");


// Listar Ordenes
exports.listOrders = (req, res, next) => {
  conn.query("SELECT * FROM tb_orders, tb_clients WHERE tb_orders.ni_client=tb_clients.ni_client", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};


// Agregar Ordenes
exports.addOrders = (req, res, next) => {

  let { code_order, date_order, ni_client } = req.body;

  conn.query(`INSERT INTO tb_orders(code_order, date_order, ni_client) VALUES ('${code_order}', '${date_order}', '${ni_client}');`, function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      message: "Se ha registrado este pedido"
    });
  });
};


exports.deleteOrders = (req, res, next) => {

  let { code_order } = req.body;

  conn.query(`DELETE FROM tb_orders WHERE code_order = '${code_order}'`, function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      message: "Se ha eliminado este pedido"
    });
  });
};
