module.exports.email = {
  service: 'Mailgun',
  auth: {
    user: process.env.user,
    pass: process.env.pass
  },
  templateDir: 'api/emailTemplates',
  from: 'info@mycompany.com',
  testMode: false,
  ssl: true
};
