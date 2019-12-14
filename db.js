var DataStore = require('nedb');

/*Base de datos de equipos*/
var DB_TEAM_FILE_NAME = __dirname + "/teams.json";
var teamDB = new DataStore({ filename: DB_TEAM_FILE_NAME, autoload: true });
/*Base de datos de jugadores*/
var DB_PLAYER_FILE_NAME = __dirname + "/players.json";
var playerDB = new DataStore({ filename: DB_PLAYER_FILE_NAME, autoload: true });

module.exports = {teamDB, playerDB};