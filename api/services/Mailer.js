module.exports.contactMe = function (data) {
  sails.hooks.email.send(
    'contactMe',
    data,
    {
      to: 'jonathan.arellano.216@gmail.com',
      subject: 'New Potential Client'
    },
    function (err) {
      console.log(err || 'Mail Sent!');
    }
  )
};
