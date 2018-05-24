const mongoose = require('mongoose');

const landSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: { type: String, required: true },
    Aadhar: { type: Number, required: true },
    LandImage: { type: String, required: true },
    SurveyImage: { type: String}
});

module.exports = mongoose.model('Land', landSchema);
