const TodoFetcher = require('../../service/todo-fetcher.js')

module.exports = async (request) => {
  const todoFetcher = TodoFetcher.create()
  const userId = request.params.userId

  return { lists: await todoFetcher.list(userId) }
}
