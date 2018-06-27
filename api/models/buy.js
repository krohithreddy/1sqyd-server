const mongoose = require('mongoose');

const landSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: { type: String, required: true },
    Owner_email: { type: String, required: true },
    OrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    TradeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trade'},
    LandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Land', required: true },
    Available_units: { type: Number, required: true},
    Cost_unit_value: { type: Number, required: true },
    Owner_name: { type: String,required: true},
    Phone_number: { type: Number,required: true },
    Land_unit_value: { type: Number, required: true },
    Total_size: { type: Number},
    Percent_sold: { type: Number, required: true },
    Total_units: { type: Number, required: true},
    City: { type: String,required:true}
});

module.exports = mongoose.model('Buy', landSchema);
