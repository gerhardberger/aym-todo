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
    const result = await this.db.get({
      TableName: config.db.usersTableName,
      Key: { email }
    }).promise()

    return result.Item
  }
}

module.exports = UsersRepository
