const UsersRepository = require('../repository/users-repository')
const ListsRepository = require('../repository/lists-repository')

class TodoFetcher {
  static create () {
    return new TodoFetcher(UsersRepository.create(), ListsRepository.create())
  }

  constructor (usersRepository, listsRepository) {
    this.usersRepository = usersRepository
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
    const todosListIds = await this.usersRepository.getUserListIds(userId)
    const todosList = await this.listsRepository.getLists(todosListIds)

    return todosList
  }
}

module.exports = TodoFetcher
