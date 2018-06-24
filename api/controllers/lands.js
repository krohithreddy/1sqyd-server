const mongoose = require("mongoose");
const Land = require("../models/land");
const User = require("../models/user");

exports.Lands_get_all = (req, res, next) => {
  Land.find()
    .select("Email Aadhar LandImage SurveyImage")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        lands: docs.map(doc => {
          return {
            Email: doc.Email,
             Aadhar: doc.Aadhar,
             LandImage: doc.LandImage,
              SurveyImage: doc.SurveyImage,
          };
        })
      }
    );
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
            var SurveyImage,LandImage;
            req.files.forEach(function(File){
              if(File.fieldname == "LandImage"){
                LandImage = File.path;
              }
               else if(File.fieldname == "SurveyImage"){
                SurveyImage = File.path;
              }
            });
            // if(SurveyImage==null){
            //   SurveyImage = "not available";
            // }
            const land = new Land({
              _id: new mongoose.Types.ObjectId(),
              Email: req.body.Email,
              Aadhar: req.body.Aadhar,
              LandImage: LandImage,
              SurveyImage:SurveyImage
            //  SurveyImage: req.files[0].path
            });
            land
              .save()
              .then(result => {
                console.log(result);
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
                  res.status(500).json({
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
