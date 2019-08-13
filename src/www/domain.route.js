// domain.model.js

const express = require('express');
const domainRoutes = express.Router();

// Require Adaptation model in our routes module
let Domain = require('./domain.model');

// Defined store route
domainRoutes.route('/add').post(function (req, res) {
    let domain = new Domain(req.body);
    domain.save()
        .then(() => {
            res.status(200).json({ 'business': 'business in added successfully' });
        })
        .catch(() => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
domainRoutes.route('/').get(function (req, res) {
    Domain.find(function (err, domains) {
        if (err) {
            res.json(err);
        }
        else {
            console.log("Entro");
            res.json(domains);
        }
    });
});

module.exports = domainRoutes;