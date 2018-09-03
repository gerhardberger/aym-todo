const UsersListsRepository = require('./users-lists-repository.js')
const config = require('../config.js')

let usersListsRepository
let dbMock

const USER_ID = 'dummy user id'
const LIST_ID = 'dummy list id'

beforeEach(async () => {
  dbMock = {
    put: jest.fn(),
    delete: jest.fn(),
    query: jest.fn()
  }

  usersListsRepository = new UsersListsRepository(dbMock)
})

describe('#addUserList', () => {
  beforeEach(async () => {
    dbMock.put.mockReturnValue({ promise: () => Promise.resolve() })

    await usersListsRepository.addUserList(USER_ID, LIST_ID)
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

    await usersListsRepository.removeUserList(USER_ID, LIST_ID)
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

    listIds = await usersListsRepository.getUserListIds(USER_ID)
  })

  test('queries user-list assignments', async () => {
    expect(dbMock.query).toHaveBeenCalledWith({
      TableName: config.db.usersListsTableName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': USER_ID
      }
    })
  })

  test('returns user-list assignments', async () => {
    expect(listIds).toEqual([LIST_ID])
  })
})

describe('#getListUserIds', () => {
  let userIds

  beforeEach(async () => {
    dbMock.query.mockReturnValue({
      promise: () => Promise.resolve({ Items: [{ userId: USER_ID }] })
    })

    userIds = await usersListsRepository.getListUserIds(LIST_ID)
  })

  test('queries list-user assignments', async () => {
    expect(dbMock.query).toHaveBeenCalledWith({
      TableName: config.db.usersListsTableName,
      IndexName: config.db.listUserIdsIndexName,
      KeyConditionExpression: 'listId = :listId',
      ExpressionAttributeValues: {
        ':listId': LIST_ID
      }
    })
  })

  test('returns list-user assignments', async () => {
    expect(userIds).toEqual([USER_ID])
  })
})
