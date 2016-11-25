// Handlebars = require('handlebars');
// Handlebars.registerHelper('test',function(content){
//   console.log(content)
// });
// module.exports = Handlebars.helpers;

exports.section = function(name, script){
  if(!this._sections) this._sections = {};
  this._sections[name] = script.fn(this);
  return null;
};

exports.consoleObject = function(content){
  console.log(content)
};
