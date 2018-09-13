const TodoModifier = require('../../service/todo-modifier.js')

module.exports = async (request) => {
  const todoModifier = TodoModifier.create()
  const userId = request.params.userId
  const todoList = request.body

  const newListId = await todoModifier.save(userId, todoList)

  return { id: newListId }
}
