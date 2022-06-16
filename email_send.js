const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: 'AKIAXJ7ZGRRYB6T6NDFY',
    secretAccessKey: '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',
    region: 'us-east-2',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let sendEmail = (recipientEmail, name, code) => {
    let params = {
      Source: 'info.ontap.no.reply@gmail.com',
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `Use this code, ${code}!`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}!`,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};

module.exports = {
  sendEmail
};