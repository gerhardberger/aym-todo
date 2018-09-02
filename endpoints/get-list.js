const TodoFetcher = require('../service/todo-fetcher.js')

module.exports = async (request) => {
  const todoFetcher = TodoFetcher.create()
  const listId = request.params.listId

  return { list: await todoFetcher.get(listId) }
}
