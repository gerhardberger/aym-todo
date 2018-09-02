const TodoModifier = require('./todo-modifier.js')
const UsersListsRepository = require('../repository/users-lists-repository.js')
const ListsRepository = require('../repository/lists-repository.js')

jest.mock('../repository/users-lists-repository.js')
jest.mock('../repository/lists-repository.js')

let todoModifier
let usersListsRepository
let listsRepository

const USER_ID = 'dummy user id'
const LIST_ID = 'dummy list id'
const TODO_LIST = [{ item: 'dummy todo item', completed: false }]

beforeEach(async () => {
  const idGenerator = jest.fn(() => LIST_ID)

  UsersListsRepository.mockClear()
  ListsRepository.mockClear()

  usersListsRepository = new UsersListsRepository()
  listsRepository = new ListsRepository()
  todoModifier = new TodoModifier(usersListsRepository, listsRepository, idGenerator)
})

describe('#save', () => {
  let listId

  beforeEach(async () => {
    listId = await todoModifier.save(USER_ID, TODO_LIST)
  })

  test('saves user-list assignment', async () => {
    expect(usersListsRepository.addUserList).toHaveBeenCalledWith(USER_ID, LIST_ID)
  })

  test('saves todo list', async () => {
    expect(listsRepository.setList).toHaveBeenCalledWith(LIST_ID, TODO_LIST)
  })

  test('returns list id', async () => {
    expect(listId).toEqual(LIST_ID)
  })
})

describe('#update', () => {
  beforeEach(async () => {
    await todoModifier.update(LIST_ID, TODO_LIST)
  })

  test('updates todo list', async () => {
    expect(listsRepository.setList).toHaveBeenCalledWith(LIST_ID, TODO_LIST)
  })
})

describe('#remove', () => {
  beforeEach(async () => {
    await todoModifier.remove(LIST_ID)
  })

  test('removes todo list', async () => {
    expect(listsRepository.removeList).toHaveBeenCalledWith(LIST_ID)
  })
})

describe('#addCollaborator', () => {
  beforeEach(async () => {
    await todoModifier.addCollaborator(LIST_ID, USER_ID)
  })

  test('adds collaborator to list', async () => {
    expect(usersListsRepository.addUserList).toHaveBeenCalledWith(USER_ID, LIST_ID)
  })
})

describe('#removeCollaborator', () => {
  beforeEach(async () => {
    await todoModifier.removeCollaborator(LIST_ID, USER_ID)
  })

  test('removes collaborator to list', async () => {
    expect(usersListsRepository.removeUserList).toHaveBeenCalledWith(USER_ID, LIST_ID)
  })
})
