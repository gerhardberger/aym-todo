const DbAdapter = require('../lib/db-adapter.js')
const config = require('../config.js')

class UsersRepository {
  static create () {
    return new UsersRepository(DbAdapter.getInstance())
  }

  constructor (db) {
    this.db = db
  }

  async addUser (userData) {
    await this.db.put({
      TableName: config.db.usersTableName,
      Item: userData
    }).promise()
  }

  async getUser (email) {
    const result = await this.db.query({
      TableName: config.db.usersTableName,
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email }
    }).promise()

    return result.Items[0]
  }

  async getUserById (id) {
    const result = await this.db.query({
      TableName: config.db.usersTableName,
      IndexName: config.db.usersIdIndexName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': id }
    }).promise()

    return result.Items[0]
  }
}

module.exports = UsersRepository
