var playersAPI = {};
var BASE_API_PATH = "/api/v1";

module.exports = playersAPI;

playersAPI.register = function (app, playerDB, teamBD) {

    app.get(BASE_API_PATH + '/players', (req, res) => {
        console.log('-------> GET /players');
        playerDB.find({}, function (err, data) {
            if (err) {
                console.log(Date() + " - " + err);
                res.sendStatus(500);
            } else {
                res.statusCode = 200;
                res.send(data);
            }
        });
    });

    app.post(BASE_API_PATH + '/player', (req, res) => {
        console.log('-------> POST /player');
        var player = req.body;
        if (validatePlayer(player, true)) {
            playerDB.insert(player, (err, newPlayer) => {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    res.statusCode = 201;
                    res.send(newPlayer);
                }
            });
        } else {
            res.send(400);
        }
    });

    app.get(BASE_API_PATH + '/player', (req, res) => {
        console.log('-------> GET /player');
        var uuid = req.query.uuid;
        if (!uuid) {
            res.send(400);
        } else {
            playerDB.find({ uuid: uuid }, function (err, data) {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    res.statusCode = 200;
                    res.send(data);
                }
            });
        }
    });

    app.put(BASE_API_PATH + '/player', (req, res) => {
        console.log('-------> PUT /player');
        var player = req.body;
        if (validatePlayer(player, false)) {
            playerDB.update({ uuid: player.uuid }, player, (err, nModified) => {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    if (nModified == 1) {
                        res.statusCode = 200;
                        res.send(player);
                    } else {
                        res.sendStatus(404);
                    }
                }
            });
        } else {
            res.sendStatus(400);
        }
    });

    app.delete(BASE_API_PATH + '/player', (req, res) => {
        console.log('-------> DELETE /player');
        var uuid = req.body.uuid;
        if (!uuid) {
            res.send(400);
        } else {
            playerDB.remove({ uuid: uuid }, (err, numRemoved) => {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    if (numRemoved == 1) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(404);
                    }
                }

            });
        }

    });

    app.put(BASE_API_PATH + '/player/value', (req, res) => {
        console.log('-------> PUT /player/value');
        var uuid = req.body.uuid;
        if (!uuid) {
            res.send(400);
        } else {
            playerDB.update({ uuid: uuid }, { value: req.body.value }, (err, numModified) => {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    if (numModified == 1) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(404);
                    }
                }
            });
        }
    });

    app.get(BASE_API_PATH + '/players/team', (req, res) => {
        console.log('-------> GET /players/team');
        var team_id = req.query.team_id;
        if (!team_id) {
            res.send(400);
        } else {
            playerDB.find({ team_id: team_id }, function (err, data) {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    res.statusCode = 200;
                    res.send(data);
                }
            });
        }
    });

    app.put(BASE_API_PATH + '/player/goals', (req, res) => {
        console.log('-------> PUT /player/goals');
        var uuid = req.body.uuid;
        var goals = req.body.goals;

        if (!uuid || !goals || goals < 0) {
            res.sendStatus(400);
        } else {
            playerDB.find({ uuid: uuid }, function (err, player) {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    var newGoals = player.goals;
                    newGoals.goals = newGoals.total + goals;
                    playerDB.update({ uuid: uuid }, { goals: newGoals }, (err, numModified) => {
                        if (err) {
                            console.log(Date() + " - " + err);
                            res.sendStatus(500);
                        } else {
                            if (numModified == 1) {
                                player.goals = newGoals;
                                res.statusCode = 200;
                                res.send(player);
                            } else {
                                res.sendStatus(404);
                            }
                        }
                    });
                }
            });
        }
    });

    app.put(BASE_API_PATH + '/player/cards', (req, res) => {
        console.log('-------> PUT /player/cards');
        var uuid = req.body.uuid;
        var red = req.body.red;
        var yellow = req.body.yellow;

        if (!uuid || !red || !yellow || red < 0 || yellow < 0) {
            res.sendStatus(400);
        } else {
            playerDB.find({ uuid: uuid }, function (err, player) {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    var newCards = player.cards;
                    newCards.red = newCards.red + red;
                    newCards.yellow = newCards.yellow + yellow;
                    playerDB.update({ uuid: uuid }, { cards: newCards }, (err, numModified) => {
                        if (err) {
                            console.log(Date() + " - " + err);
                            res.sendStatus(500);
                        } else {
                            if (numModified == 1) {
                                player.cards = newCards;
                                res.statusCode = 200;
                                res.send(player);
                            } else {
                                res.sendStatus(404);
                            }
                        }
                    });
                }
            });
        }
    });

    app.get(BASE_API_PATH + '/player/all', (req, res) => {
        console.log('-------> GET /player/all');
        var uuid = req.query.uuid;
        if(!uuid){
            res.sendStatus(400);
        }else{
            playerDB.find({uuid : uuid}, function (err, data) {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    //Llamada a la BD de teams a y la api de Transfer
                }
            });
        }
    });

    app.get(BASE_API_PATH + '/player/team', (req, res) => {
        console.log('-------> GET /player/team');
        var uuid = parseInt(req.query.uuid);
        if(!uuid){
            res.sendStatus(400);
        }else{
            playerDB.find({uuid : uuid}, function (err, player) {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    teamBD.find({uuid : player.team_id}, function (err, team) {
                        if (err) {
                            console.log(Date() + " - " + err);
                            res.sendStatus(500);
                        } else {
                            player.team = team;
                            res.statusCode = 200;
                            res.send(player);
                        }
                    });
                }
            });
        }
    });








}


function validatePlayer(player, isNew) {
    var valid = true;
    if ((isNew && player.uuid) || (!isNew && !player.uuid)) {
        valid = true;
    }

    if (!player.firstname) {
        valid = false;
    }

    if (!player.lastname) {
        valid = false;
    }

    if (!player.position) {
        valid = false;
    }

    if (!player.nationality) {
        valid = false;
    }

    if (!player.value || player.value < 0) {
        valid = false;
    }

    if (!player.goals.total || player.goals.total < 0) {
        valid = false;
    }

    if (!player.goals.assists || player.goals.assists < 0) {
        valid = false;
    }

    if (!player.cards.yellow || player.cards.yellow < 0) {
        valid = false;
    }

    if (!player.cards.red || player.cards.red < 0) {
        valid = false;
    }

    return valid;
}