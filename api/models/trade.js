const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    OrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    LandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Land', required: true },
    Email: { type: String, required: true },
    Owner_email: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Cost_unit_value: { type: Number, required: true },
    Land_unit_value: { type: Number, required: true },
    Total_size: { type: Number},
    Percent_sold: { type: Number, required: true },
    Total_units: { type: Number, required: true},
    Owner_name: { type: String,required: true},
    Phone_number: { type: Number,required: true },
    City: { type: String,required:true}
});

module.exports = mongoose.model('Trade', orderSchema);
