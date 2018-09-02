const TodoModifier = require('./todo-modifier.js')
const UsersRepository = require('../repository/users-repository.js')
const ListsRepository = require('../repository/lists-repository.js')

jest.mock('../repository/users-repository.js')
jest.mock('../repository/lists-repository.js')

let todoModifier
let usersRepository
let listsRepository

const USER_ID = 'dummy user id'
const LIST_ID = 'dummy list id'

beforeEach(async () => {
  const idGenerator = jest.fn(() => LIST_ID)

  UsersRepository.mockClear()
  ListsRepository.mockClear()

  usersRepository = new UsersRepository()
  listsRepository = new ListsRepository()
  todoModifier = new TodoModifier(usersRepository, listsRepository, idGenerator)
})

describe('#save', () => {
  test('saves todo list', async () => {
    const todoList = [{ item: 'dummy todo item', completed: false }]

    await todoModifier.save(USER_ID, todoList)

    expect(usersRepository.addUserList).toHaveBeenCalledWith(USER_ID, LIST_ID)
    expect(listsRepository.addList).toHaveBeenCalledWith(LIST_ID, todoList)
  })
})
