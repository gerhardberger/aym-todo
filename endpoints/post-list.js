const TodoModifier = require('../service/todo-modifier.js')

module.exports = async (request) => {
  const todoModifier = TodoModifier.create()
  const todoList = request.body

  const newListId = await todoModifier.save(todoList)

  return { id: newListId }
}
