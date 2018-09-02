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

    await this.usersRepository.addUserList(userId, listId)
    await this.listsRepository.setList(listId, todoList)

    return listId
  }

  async update (listId, todoList) {
    await this.listsRepository.setList(listId, todoList)
  }

  async remove (listId) {
    await this.listsRepository.removeList(listId)
  }

  async addCollaborator (listId, userId) {
    await this.usersRepository.addUserList(userId, listId)
  }

  async removeCollaborator (listId, userId) {
    await this.usersRepository.removeUserList(userId, listId)
  }
}

module.exports = TodoModifier
