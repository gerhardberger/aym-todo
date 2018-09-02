const DbAdapter = require('../lib/db-adapter.js')
const config = require('../config.js')

class ListsRepository {
  static create () {
    return new ListsRepository(DbAdapter.getInstance())
  }

  constructor (db) {
    this.db = db
  }

  async setList (listId, listData) {
    await this.db.put({
      TableName: config.db.todoListsTableName,
      Item: {
        id: listId,
        todos: listData
      }
    }).promise()
  }

  async removeList (listId) {
    await this.db.delete({
      TableName: config.db.todoListsTableName,
      Key: {
        id: listId
      }
    }).promise()
  }

  async getLists (listIds) {
    const result = await this.db.query({
      TableName: config.db.todoListsTableName,
      KeyConditionExpression: 'id IN (:listIds)',
      ExpressionAttributeValues: {
        listIds: listIds.toString()
      }
    }).promise()

    return result.Items
  }
}

module.exports = ListsRepository
