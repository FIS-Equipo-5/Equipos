const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4'); // para generar claves únicas

const apiKeySchema = new mongoose.Schema({
    user: String,
    apikey: String
});

// Función ejecutada antes de almacenar un objeto, para fijar la apikey
apiKeySchema.pre('save', function(next){
    const user = this;
    user.apikey = uuidv4();
    next();
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey;
