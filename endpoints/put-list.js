const TodoModifier = require('../service/todo-modifier.js')

module.exports = async (request) => {
  const todoModifier = TodoModifier.create()
  const listId = request.params.listId
  const todoList = request.body

  await todoModifier.update(listId, todoList)

  return {}
}
