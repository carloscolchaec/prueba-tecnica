const AppError = require("../utils/appError");
const conn = require("../services/db");


// Listar CLientes
exports.listClients = (req, res, next) => {
  conn.query("SELECT * FROM tb_clients", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};


// Filtrar Cliente por NI
exports.niClient = (req, res, next) => {
  let { ni } = req.params;
  conn.query(`SELECT * FROM tb_clients WHERE ni_client = '${ni}'`, function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      data: data
    });
  });
};

// Agregar Clientes
exports.addClient = (req, res, next) => {
  let { ni_client, name_client, surname_client, email_client } = req.body;
  conn.query(`INSERT INTO tb_clients (ni_client, name_client, surname_client, email_client ) VALUES ('${ni_client}', '${name_client}', '${surname_client}','${email_client}' )`, function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      message: "Se ha agregado correctamente"
    });
  });
};

// Eliminar Cliente por NI

exports.updateClient = (req, res, next) => {
  let { ni_client, name_client, surname_client, email_client } = req.body;
  conn.query(`UPDATE tb_clients SET name_client = '${name_client}', surname_client = '${surname_client}',email_client = '${email_client}' WHERE ni_client = '${ni_client}'`, function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      data: data
    });
  });
};

// Eliminar Cliente por NI
exports.deleteClient = (req, res, next) => {
  let { ni_client } = req.body;
  conn.query(`DELETE FROM tb_clients WHERE ni_client = '${ni_client}'`, function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      message: "Se ha eliminado correctamente"
    });
  });
};
