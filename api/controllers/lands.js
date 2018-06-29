const mongoose = require("mongoose");
const Land = require("../models/land");
const Buy = require("../models/buy");
const User = require("../models/user");

exports.Lands_get_all = (req, res, next) => {
  Land.find()
    // .select("Email Aadhar LandImage SurveyImage")
    .exec()
    .then(docs => {
      res.status(200).json(docs
      //   {
      //   count: docs.length,
      //   lands: docs.map(doc => {
      //     return {
      //       Email: doc.Email,
      //        Aadhar: doc.Aadhar,
      //        LandImage: doc.LandImage,
      //         SurveyImage: doc.SurveyImage,
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

exports.Lands_get_userlands = (req, res, next) => {
  Land.find({ Email: req.params.email })
  //  .populate("product")
    .exec()
    .then(docs => {
      if (!docs) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json(docs
    );
      // res.status(200).json({
      //   order: order,
      //   request: {
      //     type: "GET",
      //     url: "http://localhost:3000/orders"
      //   }
      // });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};


exports.Lands_create_newland = (req, res, next) => {
  User.find({ Email: req.body.Email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Not a valid user"
        });
      }
       else {
            var SurveyImage,LandImage,AaadharImage,PanImage;
            req.files.forEach(function(File){
              if(File.fieldname == "LandImage"){
                LandImage = File.path;
              }
               else if(File.fieldname == "SurveyImage"){
                SurveyImage = File.path;
              }
              else if(File.fieldname == "AaadharImage"){
               AaadharImage = File.path;
             }
             else if(File.fieldname == "PanImage"){
              PanImage = File.path;
            }
            });
            const land = new Land({
              _id: new mongoose.Types.ObjectId(),
              Email: req.body.Email,
              Phone_number: req.body.Phone_number,
              Owner_name: req.body.Owner_name,
              Total_units: req.body.Total_units,
              Available_units: req.body.Total_units,
              Percent_sold: req.body.Percent_sold,
              Land_unit_value: req.body.Land_unit_value,
              Cost_unit_value: req.body.Cost_unit_value,
              Latitude: req.body.Latitude,
              Longitude: req.body.Longitude,
              State: req.body.State,
              District: req.body.District,
              Division: req.body.Division,
              Mandal: req.body.Mandal,
              Village: req.body.Village,
              City: req.body.City,
              Survey_number: req.body.Survey_number,
              Total_size: req.body.Total_size,
              width: req.body.width,
              length: req.body.length,
              Aadhar: req.body.Aadhar,
              Land_status: false,
              LandImage: LandImage,
              AaadharImage: AaadharImage,
              PanImage: PanImage,
              SurveyImage:SurveyImage
            //  SurveyImage: req.files[0].path
            });
            land
              .save()
              .then(result => {
                const buy = new Buy({
                  _id: new mongoose.Types.ObjectId(),
                  Email: req.body.Email,
                  Owner_email: req.body.Email,
                  LandId: result._id,
                  Phone_number: req.body.Phone_number,
                  Owner_name: req.body.Owner_name,
                  Total_units: req.body.Total_units,
                  Total_size: req.body.Total_size,
                  Available_units: req.body.Total_units,
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
                console.log(buy);
                res.status(201).json({
                  message: "Added new land successfully",
                  createdland: {
                    Email: result.Email,
                    Aadhar: result.Aadhar,
                    _id: result._id,
                    LandImage: LandImage,
                    SurveyImage: SurveyImage,
                    request: {
                      type: "GET",
                      url_LandImage: "http://localhost:3100/" + LandImage,
                     url_SurveyImage: "http://localhost:3100/" + SurveyImage,
                    }
                  }
                });
              })
              .catch(err => {
                  console.log(err);
                  res.status(502).json({
                    error: err
                  });
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
