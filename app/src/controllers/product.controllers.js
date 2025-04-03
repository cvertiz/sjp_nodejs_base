const {
  json
} = require("body-parser");

const global_config = require("../config/settings.js");
const hanaClient = require("@sap/hana-client");
const connection = hanaClient.createConnection();
const connectionParams = global_config.connectionParams;
const {
  v4: uuidv4
} = require("uuid");

exports.saludar = (req, res) => {
  console.info(req.params);
  res.json({
    saludos: `Hola ${req.params.name || "Samuel"}`
  });
};
exports.updateRemesa = (req, res) => {
const connection1 = hanaClient.createConnection();
// console.info(JSON.stringify(req))
  console.info("-----------------");
  console.info(JSON.stringify(req.originalUrl))
  console.info("-----------------");
  console.info("antes de sCmd");
  // console.info(JSON.stringify(req.body));
  connection1.connect(connectionParams, (err) => {
    if (err) {
      return console.error("Connection error", err);
    }
    let aCmd = req.query.dataObject;
    console.info(aCmd);
    console.info("despues de sCmd");
    console.info("-----------------");
    let obj = JSON.parse(aCmd)
    console.info(obj);
    console.info("-----------------");
    let nameTable = obj.NameTable
    let columns = obj.Columns
    let newData = obj.NewData
    let columnSearch = obj.ColumnSearch
    let search = obj.Search

    const sql =
      'UPDATE "sc-mta-db::tables.' +
      nameTable +
      '" SET "' +
      columns +
      '" = ' +
      "'" +
      newData +
      "' WHERE " +
      '"' +
      columnSearch +
      '" =' +
      search +
      ';'
    connection1.exec(sql, (err, rows) => {
      connection1.disconnect();
      if (err) {
        if (err.code != -20004) {
          console.error(err);
          res.json({
            status: 500,
            transaction: "",
            mensaje: err,
          });
        }
      }
      res.json({
        status: 200,
        transaction: "",
        mensaje: "Update remesa OK",
      });
    });
  });
};

exports.findAllClients = (req, res) => {
  connection.connect(connectionParams, (err) => {
    if (err) {
      return console.error("Connection error", err);
    }
    const sql = `SELECT * FROM clientes`;
    connection.exec(sql, (err, rows) => {
      connection.disconnect();
      if (err) {
        return console.error("SQL execute error:", err);
      }
      console.log("Results:", rows);
      console.log(`Query '${sql}' returned ${rows.length} items`);
      res.json({
        ProductCollection: rows
      });
    });
  });
};

////////////////////////////////////////////////////////////////////////

exports.findAll = (req, res) => {
  connection.connect(connectionParams, (err) => {
    if (err) {
      return console.error("Connection error", err);
    }
    const sql = `SELECT P.*, S.NAME AS SUPPLIERNAME FROM PRODUCTS P
   JOIN SUPPLIER S ON S.SUPPPLIERID = P.SUPPPLIERID where P.status=1 order by P.NAME`;
    connection.exec(sql, (err, rows) => {
      connection.disconnect();
      if (err) {
        return console.error("SQL execute error:", err);
      }
      console.log("Results:", rows);
      console.log(`Query '${sql}' returned ${rows.length} items`);
      res.json({
        ProductCollection: rows
      });
    });
  });
};

exports.create = (req, res) => {
  console.info(JSON.stringify(req.body));
  connection.connect(connectionParams, (err) => {
    if (err) {
      return console.error("Connection error", err);
    }
    const sql = `CALL Insert_Product('${req.body.name}', '${req.body.price}');`;
    connection.exec(sql, (err, rows) => {
      connection.disconnect();
      if (err) {
        if (err.code != -20004) {
          console.error(err);
          res.json({
            status: 500,
            transaction: "",
            mensaje: err,
          });
        }
      }
      res.json({
        status: 200,
        transaction: "",
        mensaje: "Producto insertado satisfactoriamente",
      });
    });
  });
};

exports.update = (req, res) => {
  console.info(JSON.stringify(req.body));
  connection.connect(connectionParams, (err) => {
    if (err) {
      return console.error("Connection error", err);
    }
    const sql = `CALL Update_Product(${req.body.productid},'${req.body.name}', '${req.body.price}');`;
    connection.exec(sql, (err, rows) => {
      connection.disconnect();
      if (err) {
        if (err.code != -20004) {
          console.error(err);
          res.json({
            status: 500,
            transaction: "",
            mensaje: err,
          });
        }
      }
      res.json({
        status: 200,
        transaction: "",
        mensaje: "Producto actualizado satisfactoriamente",
      });
    });
  });
};

exports.seach_by_name = (req, res) => {
  console.info(JSON.stringify(req.body));
  connection.connect(connectionParams, (err) => {
    if (err) {
      return console.error("Connection error", err);
    }
    const sql = `CALL Search_Product_By_Name('${req.body.name}');`;
    connection.exec(sql, (err, rows) => {
      connection.disconnect();
      if (err) {
        if (err.code != -20004) {
          console.error(err);
          res.json({
            status: 500,
            transaction: "",
            mensaje: err,
          });
        }
      }
      res.json({
        ProductCollection: rows
      });
    });
  });
};

exports.seach_by_id = (req, res) => {
  console.info(JSON.stringify(req.body));
  connection.connect(connectionParams, (err) => {
    if (err) {
      return console.error("Connection error", err);
    }
    const sql = `CALL Search_Product_By_ID('${req.body.productid}');`;
    connection.exec(sql, (err, rows) => {
      connection.disconnect();
      if (err) {
        if (err.code != -20004) {
          console.error(err);
          res.json({
            status: 500,
            transaction: "",
            mensaje: err,
          });
        }
      }
      res.json({
        ProductCollection: rows
      });
    });
  });
};

exports.delete = (req, res) => {
  console.info(JSON.stringify(req.body));
  connection.connect(connectionParams, (err) => {
    if (err) {
      return console.error("Connection error", err);
    }
    const sql = `CALL Delete_Product('${req.body.productid}');`;
    connection.exec(sql, (err, rows) => {
      connection.disconnect();
      if (err) {
        if (err.code != -20004) {
          console.error(err);
          res.json({
            status: 500,
            transaction: "",
            mensaje: err,
          });
        }
      }
      res.json({
        status: 200,
        transaction: "",
        mensaje: "Producto eliminado satisfactoriamente",
      });
    });
  });
};