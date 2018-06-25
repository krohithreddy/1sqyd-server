const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    LandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Land', required: true },
    Email: { type: String, required: true },
    Owner_email: { type: String, required: true },
    Available_units: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    Amount_paid: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
