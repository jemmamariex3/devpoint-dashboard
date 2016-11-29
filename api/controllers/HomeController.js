/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nodemailer = require('nodemailer');
var curLayout = "lumos";

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

  homepage: function (req, res) {
    ResponseModels.set(res, function(){
      res.render(curLayout + '/homepage', {layout: curLayout})
    })
  },

  contact: function (req, res) {

    var r = req.body;
    var data = {
      name: r.name,
      message: r.message,
      subject: r.subject,
      email: r.email
    };
    Mailer.contactMe(data);
    res.send("Thank you for your message. I will get back to you as soon as possible.");
  },

};

