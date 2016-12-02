var axios = require('axios');
module.exports.getOne = function (username, cb) {
  axios.get('https://devpoint-api.herokuapp.com/user?username=' + username)
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
};

