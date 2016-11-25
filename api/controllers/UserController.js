/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
var db = require('node-localdb');
var User = db('api/data/user.json');


module.exports = {



  /**
   * `UserController.create()`
   */
  create: function (req, res) {
    var r = req.body;

    User.find({username: r.username}).then(function (data) {
      if(data.length >= 1){
        res.send("User already exists")
      }
      else{
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(r.password, salt, function(err, hash) {
            if (err) {
              console.log(err);
              cb(err);
            } else {
              r.password = hash;
              User.insert(
                {
                  "username": r.username,
                  "password": r.password
                })
                .then(function (u) {
                  res.send(u);
                });
            }
          });
        });
      }
    })


  },


  /**
   * `UserController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};

