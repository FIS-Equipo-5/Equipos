const mongoose = require('mongoose');
 
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

//Método para eliminar los atributos que no queremos devolver al usuario
teamSchema.methods.cleanup = function (){
    return {
        team_id: this.team_id,
        name: this.name,
        code: this.code,
        logo: this.logo,
        country: this.country,
        founded: this.founded,
        venue_name: this.venue_name,
        venue_surface: this.venue_surface,
        venue_address: this.venue_address,
        venue_city: this.venue_city,
        venue_capacity: this.venue_capacity,
	    budget: this.budget,
	    value: this.value
    }
};

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;