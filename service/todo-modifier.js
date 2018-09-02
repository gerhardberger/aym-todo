const hat = require('hat')

const UsersRepository = require('../repository/users-repository')
const ListsRepository = require('../repository/lists-repository')

class TodoModifier {
  static create () {
    return new TodoModifier(UsersRepository.create(), ListsRepository.create(), hat)
  }

  constructor (usersRepository, listsRepository, generateUniqueId) {
    this.usersRepository = usersRepository
    this.listsRepository = listsRepository
    this.generateUniqueId = generateUniqueId
  }

  async save (userId, todoList) {
    const listId = this.generateUniqueId()

    this.usersRepository.addUserList(userId, listId)
    this.listsRepository.addList(listId, todoList)

    return listId
  }

  async update (listId, todoList) {
  }

  async remove (listId, todoList) {
  }

  async addCollaborator (listId, userId) {
  }

  async removeCollaborator (listId, userId) {
  }
}

module.exports = TodoModifier
