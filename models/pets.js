const mongoose = require('mongoose');

const petsSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true },
    age: { type: mongoose.Schema.Types.Number, required: true },
    colour: { type: mongoose.Schema.Types.String, required: true },

});

module.exports = mongoose.model('Pets', petsSchema);