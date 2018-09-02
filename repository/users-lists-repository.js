const DbAdapter = require('../lib/db-adapter.js')
const config = require('../config.js')

class UsersListsRepository {
  static create () {
    return new UsersListsRepository(DbAdapter.getInstance())
  }

  constructor (db) {
    this.db = db
  }

  async addUserList (userId, listId) {
    await this.db.put({
      TableName: config.db.usersListsTableName,
      Item: { userId, listId }
    }).promise()
  }

  async removeUserList (userId, listId) {
    await this.db.delete({
      TableName: config.db.usersListsTableName,
      Key: { userId, listId }
    }).promise()
  }

  async getUserListIds (userId) {
    const result = await this.db.query({
      TableName: config.db.usersListsTableName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId }
    }).promise()

    return result.Items
  }
}

module.exports = UsersListsRepository
