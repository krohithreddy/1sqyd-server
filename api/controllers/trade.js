const mongoose = require("mongoose");

const Trade = require("../models/trade");
const Land = require("../models/land");
const Buy = require("../models/buy");
const Order = require("../models/order");



exports.trade_get_all = (req, res, next) => {
  Trade.find()
    // .select("product quantity _id")
    // .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json(docs
      //   {
      //   count: docs.length,
      //   trade: docs.map(doc => {
      //     return {
      //       _id: doc._id,
      //       product: doc.product,
      //       quantity: doc.quantity,
      //       request: {
      //         type: "GET",
      //         url: "http://localhost:3000/trade/" + doc._id
      //       }
      //     };
      //   })
      // }
    );
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.trade_create_buy = (req, res, next) => {
  Order.findById(req.body.OrderId)
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "order not found"
        });
      }
      else if ((order.Quantity-req.body.Quantity)<=-1) {
        return res.status(404).json({
          message: "Quantity out of bound"
        });
      }
      Order.update({ $and: [ {_id:req.body.OrderId}, {Email:req.body.Owner_email} ] },{$set:{Quantity: order.Quantity-req.body.Quantity}})
      .exec()

      const trade = new Trade({
        _id: mongoose.Types.ObjectId(),
        OrderId: req.body.OrderId,
        LandId: req.body.LandId,
        Email: req.body.Email,
        Owner_email:  req.body.Owner_email,
        Quantity: req.body.Quantity,
      //  Available_units:  land.Available_units-req.body.Quantity,
      //  Amount_paid:  req.body.Amount_paid,
        City: req.body.City,
        Total_size: req.body.Total_size,
        Phone_number: req.body.Phone_number,
        Owner_name: req.body.Owner_name,
        Total_units: req.body.Total_units,
        Percent_sold: req.body.Percent_sold,
        Land_unit_value: req.body.Land_unit_value,
        Cost_unit_value: req.body.Cost_unit_value
        });
      return trade.save();
    })
    .then(result => {
      console.log(result);
      const buy = new Buy({
        _id: new mongoose.Types.ObjectId(),
        TradeId: result._id,
        OrderId: req.body.OrderId,
        Email: req.body.Email,
        Owner_email: req.body.Owner_email,
        LandId: req.body.LandId,
        Phone_number: req.body.Phone_number,
        Owner_name: req.body.Owner_name,
        Total_units: req.body.Total_units,
        Total_size: req.body.Total_size,
        Available_units: req.body.Quantity,
        Percent_sold: req.body.Percent_sold,
        Land_unit_value: req.body.Land_unit_value,
        Cost_unit_value: req.body.Cost_unit_value,
        City: req.body.City,

      })
        buy
          .save()
          .catch(err => {
              console.log(err);
              res.status(501).json({
                error: err
              });
            });
      res.status(201).json({
        message: "trade stored",
        createdtrade: {
          _id: result._id,
          Email: result.Email,
          Quantity: result.Quantity,
          Owner_email: result.Owner_email
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/trade/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
