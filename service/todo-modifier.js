const hat = require('hat')

const UsersListsRepository = require('../repository/users-lists-repository')
const ListsRepository = require('../repository/lists-repository')
const Notifier = require('./notifier')

class TodoModifier {
  static create () {
    return new TodoModifier(
      UsersListsRepository.create(),
      ListsRepository.create(),
      hat,
      Notifier.create()
    )
  }

  constructor (usersListsRepository, listsRepository, generateUniqueId, notifier) {
    this.usersListsRepository = usersListsRepository
    this.listsRepository = listsRepository
    this.generateUniqueId = generateUniqueId
    this.notifier = notifier
  }

  async save (userId, todoList) {
    const listId = this.generateUniqueId()

    await this.usersListsRepository.addUserList(userId, listId)
    await this.listsRepository.setList(listId, todoList)

    return listId
  }

  async update (listId, todoList) {
    await this.listsRepository.setList(listId, todoList)

    await this.notifier.send(listId, {
      title: 'AYM Todo',
      body: 'Todo list updated'
    }, { list: listId })
  }

  async remove (listId) {
    await this.listsRepository.removeList(listId)
  }

  async addCollaborator (listId, userId) {
    await this.usersListsRepository.addUserList(userId, listId)

    await this.notifier.send(listId, {
      title: 'AYM Todo',
      body: 'Collaborator added to todo list'
    }, { user: userId })
  }

  async removeCollaborator (listId, userId) {
    await this.usersListsRepository.removeUserList(userId, listId)

    await this.notifier.send(listId, {
      title: 'AYM Todo',
      body: 'Collaborator removed from todo list'
    }, { user: userId })
  }
}

module.exports = TodoModifier
