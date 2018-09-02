const hat = require('hat')

const UsersListsRepository = require('../repository/users-lists-repository')
const ListsRepository = require('../repository/lists-repository')

class TodoModifier {
  static create () {
    return new TodoModifier(UsersListsRepository.create(), ListsRepository.create(), hat)
  }

  constructor (usersListsRepository, listsRepository, generateUniqueId) {
    this.usersListsRepository = usersListsRepository
    this.listsRepository = listsRepository
    this.generateUniqueId = generateUniqueId
  }

  async save (userId, todoList) {
    const listId = this.generateUniqueId()

    await this.usersListsRepository.addUserList(userId, listId)
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
    await this.usersListsRepository.addUserList(userId, listId)
  }

  async removeCollaborator (listId, userId) {
    await this.usersListsRepository.removeUserList(userId, listId)
  }
}

module.exports = TodoModifier
