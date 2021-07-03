const sendgridMail = require('@sendgrid/mail');
const config = require('../config');
const fs = require('fs');

sendgridMail.setApiKey(process.env.PAGESPEEDY_SENDGRID_API_KEY);

const emailRegistrationNotification = async (user, ipAddress) => {
  const { email, first_name } = user;
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"PageSpeedy Support" <yusuf.ganiyu@spectrumsolutionsltd.com.ng>', // sender address
    to: email, // list of receivers
    subject: 'PageSpeedy - Registration', // Subject line
    html: 'Sample',
    templateId: config.registrationTemplate(),
    dynamic_template_data: {
      first_name: first_name,
    },
  };

  triggerEmail(mailOptions);
};

const emailPasswordResetInstructions = async (user, ipAddress) => {
  const { email, first_name, last_name, passwordResetToken } = user;
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"PageSpeedy Support" <yusuf.ganiyu@spectrumsolutionsltd.com.ng>', // sender address
    to: email, // list of receivers
    subject: 'PageSpeedy - Password Reset', // Subject line
    html: 'Sample',
    templateId: config.passwordResetTemplate(),
    dynamic_template_data: {
      first_name: first_name,
      last_name: last_name,
      user_ip_address: ipAddress,
      reset_password_admin_url: `${config.passwordResetBaseUrl()}?token=${passwordResetToken}&email=${email}`,
    },
  };

  triggerEmail(mailOptions);
};

const emailPasswordResetConfirmation = async (user, ipAddress) => {
  const { email, first_name, last_name } = user;

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"PageSpeedy Support" <yusuf.ganiyu@spectrumsolutionsltd.com.ng>', // sender address
    to: email, // list of receivers
    subject: 'PageSpeedy - Password Reset Successful', // Subject line
    html: 'Sample',
    templateId: config.passwordResetConfirmationTemplate(),
    dynamic_template_data: {
      first_name: first_name,
      last_name: last_name,
      user_ip_address: ipAddress,
    },
  };

  triggerEmail(mailOptions);
};

const raiseUserTicket = async (contact, destemail, ipAddress) => {
  const { first_name, last_name, email, phone_number, website_url, message } = contact;
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"PageSpeedy Support" <yusuf.ganiyu@spectrumsolutionsltd.com.ng>', // sender address
    to: destemail, // list of receivers
    subject: 'PageSpeedy - Support', // Subject line
    html: 'Sample',
    templateId: config.supportTicketTemplate(),
    dynamic_template_data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      website_url: website_url,
      message: message,
    },
  };

  triggerEmail(mailOptions);
};

function getFileInBase64(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return bitmap.toString('base64');
}

const raiseServiceRequest = async (request, destemail, ipAddress, attachment) => {
  const { subject, request_type, hosting_provider, email, service_disabled, website_url, description } = request;
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"PageSpeedy Support" <yusuf.ganiyu@spectrumsolutionsltd.com.ng>', // sender address
    to: destemail, // list of receivers
    subject: 'PageSpeedy - Service Request', // Subject line
    html: 'Sample',
    templateId: config.serviceRequestTemplate(),
    dynamic_template_data: {
      subject,
      request_type,
      hosting_provider,
      email,
      service_disabled,
      website_url,
      description,
      ipAddress,
    },
  };

  // if (attachment) {
  //   mailOptions.attachments = [
  //     {
  //       content: fs.readFileSync(attachment.file, 'base64'),
  //       filename: attachment.file.name,
  //       type: `application/${attachment.file.mimetype.split('/')[1]}`,
  //       disposition: 'attachment',
  //     },
  //   ];
  // }

  triggerEmail(mailOptions);
};

const triggerEmail = mailOptions => {
  console.log(mailOptions);
  sendgridMail.send(mailOptions, (error, result) => {
    if (error) {
      return console.log('Error while sending email', { meta: error });
    }
    console.log('Email sent', { meta: result });
  });
};

module.exports = { emailPasswordResetInstructions, emailPasswordResetConfirmation, emailRegistrationNotification, raiseUserTicket, raiseServiceRequest };
