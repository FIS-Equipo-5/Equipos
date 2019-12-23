const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    player_name: String,
    firstname: String,
    lastname: String,
    position: String,
    nationality: String,
    value: Number,
    team_id: Number,
    goals: {
        total: Number,
        assists: Number 
    },
    cards: {
        yellow: Number,
        red: Number
    }   
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;