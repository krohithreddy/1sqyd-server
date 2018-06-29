const mongoose = require("mongoose");

const Buy = require("../models/buy");
const Land = require("../models/land");

exports.buy_get_all = (req, res, next) => {
  Buy.find( { Available_units: { $ne: 0 } } )
     .sort({LandId:-1})
    // .select("product quantity _id")
    // .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json(docs
      //   {
      //   count: docs.length,
      //   buy: docs.map(doc => {
      //     return {
      //       _id: doc._id,
      //       product: doc.product,
      //       quantity: doc.quantity,
      //       request: {
      //         type: "GET",
      //         url: "http://localhost:3000/buy/" + doc._id
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

exports.buy_delete = (req, res, next) => {
  buy.remove({ _id: req.params.buyId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "buy deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/buy",
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
