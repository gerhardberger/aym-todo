const UsersRepository = require('./users-repository.js')
const config = require('../config.js')

let usersRepository
let dbMock

const EMAIL = 'dummy email'
const USER_ID = 'dummy id'
const USER_DATA = {
  id: USER_ID,
  email: EMAIL,
  registrationToken: 'dummy registration token'
}

beforeEach(async () => {
  dbMock = {
    put: jest.fn(),
    query: jest.fn()
  }

  usersRepository = new UsersRepository(dbMock)
})

describe('#addUser', () => {
  beforeEach(async () => {
    dbMock.put.mockReturnValue({ promise: () => Promise.resolve() })

    await usersRepository.addUser(USER_DATA)
  })

  test('saves user data', async () => {
    expect(dbMock.put).toHaveBeenCalledWith({
      TableName: config.db.usersTableName,
      Item: USER_DATA
    })
  })
})

describe('#getUser', () => {
  let userData

  beforeEach(async () => {
    dbMock.query.mockReturnValue({ promise: () => Promise.resolve({ Items: [USER_DATA] }) })

    userData = await usersRepository.getUser(EMAIL)
  })

  test('queries user data', async () => {
    expect(dbMock.query).toHaveBeenCalledWith({
      TableName: config.db.usersTableName,
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': EMAIL }
    })
  })

  test('returns user data', async () => {
    expect(userData).toEqual(USER_DATA)
  })
})

describe('#getUserById', () => {
  let userData

  beforeEach(async () => {
    dbMock.query.mockReturnValue({ promise: () => Promise.resolve({ Items: [USER_DATA] }) })

    userData = await usersRepository.getUserById(USER_ID)
  })

  test('queries user data', async () => {
    expect(dbMock.query).toHaveBeenCalledWith({
      TableName: config.db.usersTableName,
      IndexName: config.db.usersIdIndexName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': USER_ID }
    })
  })

  test('returns user data', async () => {
    expect(userData).toEqual(USER_DATA)
  })
})
