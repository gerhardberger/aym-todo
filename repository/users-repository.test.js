const UsersRepository = require('./users-repository.js')
const config = require('../config.js')

let usersRepository
let dbMock

const USER_ID = 'dummy user id'
const LIST_ID = 'dummy list id'

beforeEach(async () => {
  dbMock = {
    put: jest.fn(),
    delete: jest.fn(),
    query: jest.fn()
  }

  usersRepository = new UsersRepository(dbMock)
})

describe('#addUserList', () => {
  beforeEach(async () => {
    dbMock.put.mockReturnValue({ promise: () => Promise.resolve() })

    await usersRepository.addUserList(USER_ID, LIST_ID)
  })

  test('saves user-list assignment', async () => {
    expect(dbMock.put).toHaveBeenCalledWith({
      TableName: config.db.usersListsTableName,
      Item: { userId: USER_ID, listId: LIST_ID }
    })
  })
})

describe('#removeUserList', () => {
  beforeEach(async () => {
    dbMock.delete.mockReturnValue({ promise: () => Promise.resolve() })

    await usersRepository.removeUserList(USER_ID, LIST_ID)
  })

  test('saves user-list assignment', async () => {
    expect(dbMock.delete).toHaveBeenCalledWith({
      TableName: config.db.usersListsTableName,
      Key: { userId: USER_ID, listId: LIST_ID }
    })
  })
})

describe('#getUserListIds', () => {
  let listIds

  beforeEach(async () => {
    dbMock.query.mockReturnValue({
      promise: () => Promise.resolve({ Items: [LIST_ID] })
    })

    listIds = await usersRepository.getUserListIds(USER_ID)
  })

  test('queries user-list assignments', async () => {
    expect(dbMock.query).toHaveBeenCalledWith({
      TableName: config.db.usersListsTableName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        userId: USER_ID
      }
    })
  })

  test('returns user-list assignments', async () => {
    expect(listIds).toEqual([LIST_ID])
  })
})
