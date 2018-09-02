const TodoModifier = require('../service/todo-modifier.js')

module.exports = async (request) => {
  const todoModifier = TodoModifier.create()
  const listId = request.params.listId
  const userId = request.params.userId

  await todoModifier.addCollaborator(listId, userId)

  return {}
}
