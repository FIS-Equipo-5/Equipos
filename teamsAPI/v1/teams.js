const mongoose = requie('mongoose');

const teamSchema = new mongoose.Schema({
    team_id: Number,
    name: String,
    code: String,
    logo: String,
    country: String,
    founded: Number,
    venue_name: String,
    venue_surface: String,
    venue_address: String,
    venue_city: String,
    venue_capacity: Number,
	budget: Number,
	value: Number

});


const Team = mongoose.model('Team', teamSchema);

module.exports(Team);