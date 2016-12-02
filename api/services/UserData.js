var axios = require('axios');
module.exports.getAll = function (cb) {
  axios.get('http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC')
    .then(function (response) {
      cb(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
};

