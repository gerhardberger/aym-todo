const ListsRepository = require('./lists-repository.js')
const config = require('../config.js')

let listsRepository
let dbMock

const LIST_ID = 'dummy list id'
const TODO_LIST = [{ item: 'dummy todo item', completed: false }]

beforeEach(async () => {
  dbMock = {
    put: jest.fn(),
    delete: jest.fn(),
    scan: jest.fn()
  }

  listsRepository = new ListsRepository(dbMock)
})

describe('#setList', () => {
  beforeEach(async () => {
    dbMock.put.mockReturnValue({ promise: () => Promise.resolve() })

    await listsRepository.setList(LIST_ID, TODO_LIST)
  })

  test('saves todo list', async () => {
    expect(dbMock.put).toHaveBeenCalledWith({
      TableName: config.db.todoListsTableName,
      Item: { id: LIST_ID, todos: TODO_LIST }
    })
  })
})

describe('#removeList', () => {
  beforeEach(async () => {
    dbMock.delete.mockReturnValue({ promise: () => Promise.resolve() })

    await listsRepository.removeList(LIST_ID)
  })

  test('removes todo list', async () => {
    expect(dbMock.delete).toHaveBeenCalledWith({
      TableName: config.db.todoListsTableName,
      Key: { id: LIST_ID }
    })
  })
})

describe('#getLists', () => {
  let todoLists

  beforeEach(async () => {
    dbMock.scan.mockReturnValue({
      promise: () => Promise.resolve({ Items: [TODO_LIST] })
    })

    todoLists = await listsRepository.getLists([{ listId: LIST_ID }])
  })

  test('queries todo lists from db', async () => {
    expect(dbMock.scan).toHaveBeenCalledWith({
      TableName: config.db.todoListsTableName,
      FilterExpression: `id IN (:${LIST_ID})`,
      ExpressionAttributeValues: { [`:${LIST_ID}`]: LIST_ID }
    })
  })

  test('returns todo lists from db', async () => {
    expect(todoLists).toEqual([TODO_LIST])
  })
})
