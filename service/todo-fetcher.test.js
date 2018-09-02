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

beforeEach(async () => {
  UsersRepository.mockClear()
  ListsRepository.mockClear()

  usersRepository = new UsersRepository()
  listsRepository = new ListsRepository()
  todoFetcher = new TodoFetcher(usersRepository, listsRepository)
})

describe('#get', () => {
  test('returns todo list from repository', async () => {
    const expectedTodoList = [{ item: 'dummy todo item', completed: false }]
    listsRepository.getLists.mockReturnValue([expectedTodoList])

    const todoList = await todoFetcher.get(LIST_ID)

    expect(listsRepository.getLists).toHaveBeenCalledWith([LIST_ID])
    expect(todoList).toEqual(expectedTodoList)
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
  test('returns todos from repository', async () => {
    const expectedTodoList = [{ item: 'dummy todo item', completed: false }]

    usersRepository.getUserListIds.mockReturnValue([LIST_ID])
    listsRepository.getLists.mockReturnValue([expectedTodoList])

    const todoLists = await todoFetcher.list(USER_ID)

    expect(usersRepository.getUserListIds).toHaveBeenCalledWith(USER_ID)
    expect(listsRepository.getLists).toHaveBeenCalledWith([LIST_ID])
    expect(todoLists).toEqual([expectedTodoList])
  })
})
