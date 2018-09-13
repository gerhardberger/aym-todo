const DbAdapter = require('../../lib/db-adapter.js')
const TodoFetcher = require('../../service/todo-fetcher.js')

DbAdapter.setup()

exports.getUserList = async (event, context) => {
  const todoFetcher = TodoFetcher.create()
  const userId = event.pathParameters.userId

  return { lists: await todoFetcher.list(userId) }
}
