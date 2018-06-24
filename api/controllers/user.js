const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_get_all = (req, res, next) => {
  User.find()
    // .select("name price _id productImage")
    .exec()
    .then(docs => {
      // const response = {
      //   count: docs.length,
      //   products: docs.map(doc => {
      //     return {
      //       name: doc.name,
      //       price: doc.price,
      //       productImage: doc.productImage,
      //       _id: doc._id,
      //     };
      //   })
      // };
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_signup = (req, res, next) => {
  User.find({ Email: req.body.Email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        console.log(user);
        const token = jwt.sign(
          {
            email: user[0].Email,
            userId: user[0]._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          }
        );
        return res.status(200).json({
          token: token,
          ServerId: user[0]._id,
          message: "Mail exists"
        });
      }
       else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              Email: req.body.Email,
              GivenName: req.body.GivenName,
              FamilyName: req.body.FamilyName,
              DisplayName: req.body.DisplayName,
              Url: req.body.Url
            });
            user
              .save()
              .then(result => {
                const token = jwt.sign(
                  {
                    email: result.Email,
                  //  userId: result._id
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: "1h"
                  }
                );
                console.log(result);
              return  res.status(201).json({
                  token: token,
                  ServerId: result._id,
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ Email: req.body.Email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed1"
        });
      }
        else {
          const token = jwt.sign(
            {
              email: user[0].Email,
          //    userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
