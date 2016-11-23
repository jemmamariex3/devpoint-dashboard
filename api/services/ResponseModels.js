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

module.exports.set = function (res, cb) {
  service.find({}).then(function (data) {
    res.locals.services = data;

    portfolio.find({}).then(function (projects) {
      res.locals.portfolio = projects;

      var categories = getUniqueCategories(projects);
      res.locals.categories = categories;

      cb()
    });
  });
};
