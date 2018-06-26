const mongoose = require('mongoose');

const landSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: { type: String, required: true },
    Latitude: { type: Number },
    Longitude: { type: Number},
    State: { type: String },
    District: { type: String},
    Division: { type: String },
    Mandal: { type: String},
    Village: { type: String },
    City: { type: String,required:true},
    Survey_number: { type: String },
    Total_size: { type: Number},
    width: { type: Number },
    length: { type: Number},
    Owner_name: { type: String,required: true},
    Phone_number: { type: Number,required: true },
    Aadhar: { type: Number },
    Land_value: { type: Number, required: true },
    Total_units: { type: Number, required: true},
    Available_units: { type: Number, required: true},
    LandImage: { type: String, required: true },
    SurveyImage: { type: String},
    Land_status: { type: Boolean}

});

module.exports = mongoose.model('Land', landSchema);
