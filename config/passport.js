var db = require('node-localdb');
var User = db('api/data/user.json');

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(username, done) {
  User.find({ username: username } , function (err, user) {
    return done(err, user[0]);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {

    User.find({ username: username }).then(function (user) {
      if (user.length < 1) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      bcrypt.compare(password, user[0].password, function (err, res) {
        if (!res)
          return done(null, false, {
            message: 'Invalid Password'
          });
        var returnUser = {
          username: user[0].username,
          id: user[0]._id
        };
        return done(null, returnUser, {
          message: 'Logged In Successfully'
        });
      });
    });
  }
));
