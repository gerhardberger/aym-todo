const TodoModifier = require('../../service/todo-modifier.js')

module.exports = async (request) => {
  const todoModifier = TodoModifier.create()
  const listId = request.params.listId

  await todoModifier.remove(listId)

  return {}
}
