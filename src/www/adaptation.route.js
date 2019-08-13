// adaptation.model.js

const express = require('express');
const adaptationRoutes = express.Router();

// Require Adaptation model in our routes module
let Adaptation = require('./adaptation.model');

// Defined store route
adaptationRoutes.route('/add').post(function (req, res) {
    let adaptation = new Adaptation(req.body);
    adaptation.save()
        .then(() => {
            res.status(200).json({ 'business': 'business in added successfully' });
        })
        .catch(() => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
adaptationRoutes.route('/').get(function (req, res) {
    Adaptation.find(function (err, adaptations) {
        if (err) {
            res.json(err);
        }
        else {
            console.log("Entro");
            res.json(adaptations);
        }
    });
});

module.exports = adaptationRoutes;