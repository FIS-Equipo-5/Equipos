const Player = require('../model/players');
const Team = require('../../teamsAPI/model/teams');
const TeamResource = require('../../integrations/TeamsResource');
var playersAPI = {};
var BASE_API_PATH = "/api/v1";

module.exports = playersAPI;

playersAPI.register = function (app) {

    app.get(BASE_API_PATH + '/players', (req, res) => {
        console.log('-------> GET /players');
        Player.find({}, function (err, data) {
            if (err) {
                console.log(Date() + " - " + err);
                res.sendStatus(500);
            } else {
                res.statusCode = 200;
                res.send(data);
            }
        });
    });

    app.post(BASE_API_PATH + '/players', (req, res) => {
        console.log('-------> POST /players');
        var player = new Player(req.body);
        if (validatePlayer(player, true)) {
            Player.create(player, (err, result) => {
                if(err){
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                }else{
                    res.statusCode = 201;
                    res.send(player);
                }
            });
        } else {
            res.send(400);
        }
    });

    app.get(BASE_API_PATH + '/player', (req, res) => {
        console.log('-------> GET /player');
        var uuid = req.query._id;
        if (!uuid) {
            res.send(400);
        } else {
            Player.find({ _id: uuid }, function (err, data) {
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
        var player = new Player(req.body);
        if (validatePlayer(player, false)) {
            Player.where({ _id: player._id }).update(player, (err, result) => {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    if (result.nModified == 1) {
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
        var uuid = req.body._id;
        if (!uuid) {
            res.send(400);
        } else {
            Player.deleteOne({ _id: uuid }, (err, result) => {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    if (result.deletedCount > 0) {
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
        var uuid = req.body._id;
        var value = req.body.value;
        if (!uuid) {
            res.send(400);
        } else {
            Player.updateOne({ _id: uuid }, { value: value }, (err, result) => {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });

    app.put(BASE_API_PATH + '/player/goals', (req, res) => {
        console.log('-------> PUT /player/goals');
        var uuid = req.body._id;
        var goals = req.body.goals;

        if (!uuid || !goals) {
            res.sendStatus(400);
        } else {
            Player.findOne({ _id: uuid }, function (err, player) {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    var newGoals = player.goals;
                    newGoals.total = newGoals.total + goals;
                    Player.updateOne({ _id: uuid }, { goals: newGoals }, (err, result) => {
                        if (err) {
                            console.log(Date() + " - " + err);
                            res.sendStatus(500);
                        } else {
                            if (result.ok == 1) {
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
        var uuid = req.body._id;
        var red = req.body.cards.red;
        var yellow = req.body.cards.yellow;

        if (!uuid || !red || !yellow) {
            res.sendStatus(400);
        } else {
            Player.findOne({ _id: uuid }, function (err, player) {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    var newCards = player.cards;
                    newCards.red = newCards.red + red;
                    newCards.yellow = newCards.yellow + yellow;
                    Player.updateOne({ _id: uuid }, { cards: newCards }, (err, result) => {
                        if (err) {
                            console.log(Date() + " - " + err);
                            res.sendStatus(500);
                        } else {
                            if (result.ok == 1) {
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

    app.get(BASE_API_PATH + '/player/all/:idPlayer', (req, res) => {
        console.log('-------> GET /player/all');
        var uuid = req.params.idPlayer;
        if(!uuid){
            res.sendStatus(400);
        }else{
            Player.findOne({_id : uuid}, function (err, player) {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    Team.findOne({team_id : player.team_id}, function (err, team) {
                        if (err) {
                            console.log(Date() + " - " + err);
                            res.sendStatus(500);
                        } else {
                            TeamResource.getPlayerTransfers(player._id)
                            .then((tranfers)=>{
                                player.team = team;
                                player.transfer = tranfers;
                                res.statusCode = 200;
                                res.send(player);
                            })
                            .catch((err)=>{
                                console.log("error: "+ err);
                                response.sendStatus(500);
                            });
                        }
                    });
                }
            }).lean();
        }
    });

    app.get(BASE_API_PATH + '/player/team', (req, res) => {
        console.log('-------> GET /player/team');
        var uuid = req.query._id;
        if(!uuid){
            res.sendStatus(400);
        }else{
            Player.findOne({_id : uuid}, function (err, player) {
                if (err) {
                    console.log(Date() + " - " + err);
                    res.sendStatus(500);
                } else {
                    Team.findOne({team_id : player.team_id}, function (err, team) {
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
            }).lean();
        }
    });
}


function validatePlayer(player, isNew) {
    var valid = true;
    if ((isNew && player.id) || (!isNew && !player.id)) {
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