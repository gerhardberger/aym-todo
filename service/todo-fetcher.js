const UsersListsRepository = require('../repository/users-lists-repository')
const ListsRepository = require('../repository/lists-repository')

class TodoFetcher {
  static create () {
    return new TodoFetcher(UsersListsRepository.create(), ListsRepository.create())
  }

  constructor (usersListsRepository, listsRepository) {
    this.usersListsRepository = usersListsRepository
    this.listsRepository = listsRepository
  }

  async get (listId) {
    const todosList = await this.listsRepository.getLists([listId])

    if (todosList.length === 0) {
      throw new Error('Not existing todo list')
    }

    return todosList[0]
  }

  async list (userId) {
    const todosListIds = await this.usersListsRepository.getUserListIds(userId)
    const todosList = await this.listsRepository.getLists(todosListIds)

    return todosList
  }
}

module.exports = TodoFetcher
