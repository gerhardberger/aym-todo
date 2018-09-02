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
    if (listIds.length === 0) {
      return []
    }

    const listIdAttributes = {}
    for (let { listId } of listIds) {
      listIdAttributes[`:${listId}`] = listId
    }

    const result = await this.db.scan({
      TableName: config.db.todoListsTableName,
      FilterExpression: `id IN (${Object.keys(listIdAttributes).toString()})`,
      ExpressionAttributeValues: listIdAttributes
    }).promise()

    return result.Items
  }
}

module.exports = ListsRepository
