const mongoose = require("mongoose");

const Order = require("../models/order");
const Land = require("../models/land");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    // .select("product quantity _id")
    // .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json(docs
      //   {
      //   count: docs.length,
      //   orders: docs.map(doc => {
      //     return {
      //       _id: doc._id,
      //       product: doc.product,
      //       quantity: doc.quantity,
      //       request: {
      //         type: "GET",
      //         url: "http://localhost:3000/orders/" + doc._id
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

exports.orders_create_order = (req, res, next) => {
  Land.findById(req.body.LandId)
    .then(land => {
      if (!land) {
        return res.status(404).json({
          message: "land not found"
        });
      }
      else if ((land.Available_units-req.body.Quantity)<0) {
        return res.status(404).json({
          message: "land units out of bound"
        });
      }
      Land.update({_id:req.body.LandId},{$set:{Available_units: land.Available_units-req.body.Quantity}})
      .exec()

    //  land.update({Available_units: land.Available_units-req.body.Quantity});
      console.log(land.Available_units);
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        LandId: req.body.LandId,
        Email: req.body.Email,
        Owner_email:  req.body.Owner_email,
        Available_units:  land.Available_units-req.body.Quantity,
        Amount_paid:  req.body.Amount_paid,
        Quantity: req.body.Quantity
        });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          Email: result.Email,
          Amount_paid: result.Amount_paid,
          Available_units: result.Available_units,
          Quantity: result.Quantity,
          Owner_email: result.Owner_email
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
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

exports.orders_get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("product")
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.orders_delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
