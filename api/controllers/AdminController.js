/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var db = require('node-localdb');
var service = db('api/data/services.json');
var portfolio = db('api/data/portfolio.json');


var getUniqueCategories = function (portfolioArray) {
  var uniqueCategories = [];
  for (var item in portfolioArray) {
    if (!checkIfExists(portfolioArray[item].category, uniqueCategories)) {
      uniqueCategories.push({name: portfolioArray[item].category, filter: portfolioArray[item].filter});
    }
  }
  return uniqueCategories;
};


function checkIfExists(name, arr) {
  var found = arr.some(function (category) {
    return category.name === name;
  });

  return found
}

module.exports = {


  /**
   * `HomeController.homepage()`
   */

  createService: function (req, res) {
    var r = req.body;
    service.insert(
      {
        "title": r.title,
        "description": r.description,
        "icon": r.icon,
      })
      .then(function (u) {
        ResponseModels.set(res, function () {
          res.locals.admin = true;
          res.render('partials/services', {layout: false});
        })
      });
  },
  deleteService: function (req, res) {
    service
      .remove({_id: req.params.id})
      .then(function () {
        ResponseModels.set(res, function () {
          res.locals.admin = true;
          res.render('partials/services', {layout: false});
        })
      });
  },
  createPortfolio: function (req, res) {
    var r = req.body;
    portfolio.insert(
      {
        "category": r.category,
        "filter": r.filter,
        "name": r.name,
        "postName": r.postName,
        "post" : r.post
      }).then(function (u) {
      res.send(u);
    });
  },

  admin: function (req, res) {
    ResponseModels.set(res, function () {
      res.locals.admin = true;
      return res.render('admin')
    })
  },

  services: function(req, res){
    ResponseModels.set(res, function () {
      res.locals.admin = true;
      return res.render('partials/services', {layout: false});
    })
  }

};

