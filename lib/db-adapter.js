const AWS = require('aws-sdk')

const config = require('../config.js')

module.exports = class DbAdapter {
  static getInstance () {
    if (!DbAdapter._instance) {
      throw new Error('Did not connect to database.')
    }
    return DbAdapter._instance
  }

  static setup () {
    const { region, accessKeyId, secretAccessKey, endpoint } = config.db

    AWS.config.region = region
    AWS.config.credentials = new AWS.Credentials({ accessKeyId, secretAccessKey })

    DbAdapter._instance = new AWS.DynamoDB.DocumentClient({ region, endpoint })
  }
}
