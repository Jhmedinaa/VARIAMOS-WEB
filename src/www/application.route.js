// application.model.js

const express = require('express');
const applicationRoutes = express.Router();

// Require Application model in our routes module
let Application = require('./application.model');

// Defined store route
applicationRoutes.route('/add').post(function (req, res) {
    let application = new Application(req.body);
    application.save()
        .then(() => {
            res.status(200).json({ 'business': 'business in added successfully' });
        })
        .catch(() => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
applicationRoutes.route('/').get(function (req, res) {
    Application.find(function (err, applications) {
        if (err) {
            res.json(err);
        }
        else {
            console.log("Entro");
            res.json(applications);
        }
    });
});

//  Defined update route
applicationRoutes.route('/update/:id').post(function (req, res) {
    Application.findById(req.params.id, function(err, application) {

    if (!application)
      res.status(404).send("data is not found");
    else {
        application.estado = req.body.estado;
        application.save().then(() => {
          res.json(req.body.estado);
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

module.exports = applicationRoutes;