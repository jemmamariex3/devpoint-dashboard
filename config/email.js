module.exports.email = {
  service: 'Mailgun',
  auth: {
    user: process.env.user,
    pass: process.env.pass
  },
  templateDir: 'api/emailTemplates',
  from: 'MyPortfolio',
  testMode: false,
  ssl: true
};
