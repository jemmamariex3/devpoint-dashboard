/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nodemailer = require('nodemailer');
var db = require('node-localdb');
var service = db('api/data/services.json');
var gmailConfig = sails.config.gmail;

var getUniqueCategories = function (portfolioArray) {
  var uniqueCategories = [];
  for (var item in portfolioArray) {
    if (uniqueCategories.indexOf(portfolioArray[item].category) == -1) {
      uniqueCategories.push(portfolioArray[item].category);
    }
  }
  return uniqueCategories;
};

module.exports = {


  /**
   * `HomeController.homepage()`
   */

  create: function (req, res) {
    service.insert(
      {
        'title': 'Excel VBA',
        'description': 'Custom Excel workbooks with VBA programming for extended features',
        'icon': "budicon-code"
      }).then(function (u) {
      res.send(u);
    });
  },
  getAll: function(req, res){
    service.find({}).then(function(data){
      res.send(data)
    })
  },

  getEnv: function(req, res){
    return res.json({
      email: gmailConfig.email,
      password: gmailConfig.password
    })
  },

  homepage: function (req, res) {
    var services = [
      {
        'title': 'Excel VBA',
        'description': 'Custom Excel workbooks with VBA programming for extended features',
        'icon': "budicon-code"
      },
      {
        'title': 'Java Desktop Application',
        'description': 'Desktop application for processing files and data. Compatible with Windows and Mac. ',
        'icon': "budicon-code"
      }
    ];
    var portfolio = [
      {
        "category": "NodeJs-Express",
        "Name": "Project #1",
        "postName": "post1"
      },
      {
        "category": "NodeJs-Express",
        "Name": "Project #1",
        "postName": "post2"
      },
      {
        "category": "Java",
        "Name": "Project #1",
        "postName": "post3"
      }];

    var categories = getUniqueCategories(portfolio);
    console.log(categories);

    res.locals.portfolio = portfolio;
    res.locals.categories = categories;
    res.locals.services = services;

    return res.render('homepage')
  },

  contact: function (req, res) {
    var r = req.body;
    var name = r.name;
    var message = r.message;
    var subject = r.subject;
    var email = r.email;

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: gmailConfig.email,
        pass: gmailConfig.password
      }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
      to: 'jonathan.arellano.216@gmail.com',
      subject: 'New Potential Client',
      //text: 'Hello world ?',
      html: '<b>Subject: </b>' + subject + '<br>' +
      '<b>Email: </b>' + email + '<br>' +
      '<b>Name: </b>' + name + '<br>' +
      '<b>Message: </b>' + message
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
      res.send("Thank you for you message. I will get back to you as soon as possible.")
    });
  }
};

