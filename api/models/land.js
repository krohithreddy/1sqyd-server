const mongoose = require('mongoose');

const landSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: { type: String, required: true },
    Owner_name: { type: String,required: true},
    Phone_number: { type: Number,required: true },
    Aadhar: { type: Number },
    Latitude: { type: Number },
    Longitude: { type: Number},
    State: { type: String },
    District: { type: String},
    Division: { type: String },
    Mandal: { type: String},
    Village: { type: String },
    City: { type: String,required:true},
    Survey_number: { type: String },
    Total_size: { type: Number,required: true},
    width: { type: Number },
    length: { type: Number},
    Total_units: { type: Number, required: true},
    Percent_sold: { type: Number, required: true },
    Land_unit_value: { type: Number, required: true },
    Cost_unit_value: { type: Number, required: true },
    Available_units: { type: Number, required: true},
    LandImage: { type: String, required: true },
    SurveyImage: { type: String},
    AaadharImage: { type: String},
    PanImage: { type: String},
    Land_status: { type: Boolean}

});

module.exports = mongoose.model('Land', landSchema);
