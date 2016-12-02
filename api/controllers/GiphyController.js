/**
 * GiphyController
 *
 * @description :: Server-side logic for managing Giphies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `GiphyController.grab()`
   */
  grab: function (req, res) {
    UserData.getAll(function(data){
      res.json(data.data[0]);
    })
  },

  addService: function(req, res){
    UserData.getAll(function(data){
      res.locals.giphy = ["item1", "item2", "item3"];
      res.render('list', {layout: false});
    })
  },
  grabOne: function(req, res){
    res.render('giphy');
  },

};

