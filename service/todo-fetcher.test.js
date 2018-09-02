const TodoFetcher = require('./todo-fetcher.js')
const UsersListsRepository = require('../repository/users-lists-repository.js')
const ListsRepository = require('../repository/lists-repository.js')

jest.mock('../repository/users-lists-repository.js')
jest.mock('../repository/lists-repository.js')

let todoFetcher
let usersListsRepository
let listsRepository

const USER_ID = 'dummy user id'
const LIST_ID = 'dummy list id'
const TODO_LIST = [{ item: 'dummy todo item', completed: false }]

beforeEach(async () => {
  UsersListsRepository.mockClear()
  ListsRepository.mockClear()

  usersListsRepository = new UsersListsRepository()
  listsRepository = new ListsRepository()
  todoFetcher = new TodoFetcher(usersListsRepository, listsRepository)
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
    usersListsRepository.getUserListIds.mockReturnValue([LIST_ID])
    listsRepository.getLists.mockReturnValue([TODO_LIST])

    todoLists = await todoFetcher.list(USER_ID)
  })

  test('gets list ids associated with user', async () => {
    expect(usersListsRepository.getUserListIds).toHaveBeenCalledWith(USER_ID)
  })

  test('gets todo lists of user', async () => {
    expect(listsRepository.getLists).toHaveBeenCalledWith([LIST_ID])
  })

  test('returns todos from repository', async () => {
    expect(todoLists).toEqual([TODO_LIST])
  })
})
