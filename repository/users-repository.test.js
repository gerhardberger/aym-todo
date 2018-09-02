const UsersRepository = require('./users-repository.js')
const config = require('../config.js')

let usersRepository
let dbMock

const EMAIL = 'dummy email'
const USER_DATA = {
  email: EMAIL,
  registrationToken: 'dummy registration token'
}

beforeEach(async () => {
  dbMock = {
    put: jest.fn(),
    get: jest.fn()
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
    dbMock.get.mockReturnValue({ promise: () => Promise.resolve({ Item: USER_DATA }) })

    userData = await usersRepository.getUser(EMAIL)
  })

  test('queries user data', async () => {
    expect(dbMock.get).toHaveBeenCalledWith({
      TableName: config.db.usersTableName,
      Key: { email: EMAIL }
    })
  })

  test('returns user data', async () => {
    expect(userData).toEqual(USER_DATA)
  })
})
