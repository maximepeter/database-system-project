// ce fichier permet de créer la base de données

let data = require("./data.js");

let utils = require("./database_utils.js");

let mysql = require("mysql");

/*

Créer un fichier database_coonection.js contenant le code suivant :


const databasePwd = "votre_mot_de_passe";

module.exports = {
  databasePwd,
};


Prener soin de renseigner votre mot de base

*/

let databasePwd = require("./database_connection.js").databasePwd;

// connection à l'instance MySQL
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: databasePwd,
});

con.connect(function (err) {
  if (err) throw err;
  else console.log("Connecté !");
});

// creation d'une base de données
utils.createDataBase(data.databaseName, con, () => {});

con.end(function (err) {
  if (err) {
    return console.log("error:" + err.message);
  } else {
    console.log("Connection à la base de données fermée.");
  }
});
