const TodoFetcher = require('./todo-fetcher.js')
const UsersRepository = require('../repository/users-repository.js')
const ListsRepository = require('../repository/lists-repository.js')

jest.mock('../repository/users-repository.js')
jest.mock('../repository/lists-repository.js')

let todoFetcher
let usersRepository
let listsRepository

const USER_ID = 'dummy user id'
const LIST_ID = 'dummy list id'
const TODO_LIST = [{ item: 'dummy todo item', completed: false }]

beforeEach(async () => {
  UsersRepository.mockClear()
  ListsRepository.mockClear()

  usersRepository = new UsersRepository()
  listsRepository = new ListsRepository()
  todoFetcher = new TodoFetcher(usersRepository, listsRepository)
})

describe('#get', () => {
  describe('when list in db exists', () => {
    let todoList

    beforeEach(async () => {
      listsRepository.getLists.mockReturnValue([TODO_LIST])

      todoList = await todoFetcher.get(LIST_ID)
    })

    test('gets lists of user from repository', async () => {
      expect(listsRepository.getLists).toHaveBeenCalledWith([LIST_ID])
    })

    test('returns todo list from repository', async () => {
      expect(todoList).toEqual(TODO_LIST)
    })
  })

  test('throws error on not existing list', async () => {
    listsRepository.getLists.mockReturnValue([])

    try {
      await todoFetcher.get(LIST_ID)
    } catch (err) {
      expect(err.message).toEqual('Not existing todo list')
      return
    }
    throw new Error('Error should have been thrown')
  })
})

describe('#list', () => {
  let todoLists

  beforeEach(async () => {
    usersRepository.getUserListIds.mockReturnValue([LIST_ID])
    listsRepository.getLists.mockReturnValue([TODO_LIST])

    todoLists = await todoFetcher.list(USER_ID)
  })

  test('gets list ids associated with user', async () => {
    expect(usersRepository.getUserListIds).toHaveBeenCalledWith(USER_ID)
  })

  test('gets todo lists of user', async () => {
    expect(listsRepository.getLists).toHaveBeenCalledWith([LIST_ID])
  })

  test('returns todos from repository', async () => {
    expect(todoLists).toEqual([TODO_LIST])
  })
})
