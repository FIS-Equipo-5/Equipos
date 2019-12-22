const monggose = require('mongoose');
const DB_URL = (process.env.MONGO_URL || 'mongodb://mongo/test');

const dbConnect = function () {
    const db = monggose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    return monggose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports = dbConnect;