const UserManager = require('./user-manager.js')
const UsersRepository = require('../repository/users-repository.js')

jest.mock('../repository/users-repository.js')

let userManager
let usersRepository

const USER_ID = 'dummy user id'
const EMAIL = 'dummy email'
const PASSWORD = 'dummy password'
const HASHED_PASSWORD = 'dummy hashed password'
const REGISTRATION_TOKEN = 'dummy registration token'
const USER_DATA = {
  id: USER_ID,
  email: EMAIL,
  password: HASHED_PASSWORD,
  registrationToken: REGISTRATION_TOKEN
}

beforeEach(async () => {
  const idGenerator = jest.fn(() => USER_ID)
  const passwordHasher = {
    hashSync: jest.fn(() => HASHED_PASSWORD),
    compareSync: jest.fn(() => true)
  }

  UsersRepository.mockClear()

  usersRepository = new UsersRepository()
  userManager = new UserManager(usersRepository, idGenerator, passwordHasher)
})

describe('#save', () => {
  let userId

  beforeEach(async () => {
    userId = await userManager.create({
      email: EMAIL,
      password: PASSWORD,
      registrationToken: REGISTRATION_TOKEN
    })
  })

  test('saves user data', async () => {
    expect(usersRepository.addUser).toHaveBeenCalledWith(USER_DATA)
  })

  test('returns user id', async () => {
    expect(userId).toEqual(USER_ID)
  })
})

describe('#auth', () => {
  let userId

  describe('correct authentication', () => {
    beforeEach(async () => {
      usersRepository.getUser.mockReturnValue(Promise.resolve(USER_DATA))

      userId = await userManager.auth(EMAIL, PASSWORD)
    })

    test('chhecks user data', async () => {
      expect(usersRepository.getUser).toHaveBeenCalledWith(EMAIL)
    })

    test('returns user id', async () => {
      expect(userId).toEqual(USER_ID)
    })
  })

  describe('false authentication', () => {
    beforeEach(async () => {
      userManager.passwordHasher.compareSync.mockReturnValue(false)
      usersRepository.getUser.mockReturnValue(Promise.resolve(USER_DATA))
    })

    test('throws wrong password error', async () => {
      try {
        await userManager.auth(EMAIL, PASSWORD)
      } catch (err) {
        expect(err.message).toEqual('Wrong password')
        return
      }

      throw new Error('Error should have been thrown')
    })
  })
})

describe('#resetPassword', () => {
  let userId

  const OTHER_HASHED_PASSWORD = 'other hashed password'

  beforeEach(async () => {
    userManager.passwordHasher.hashSync.mockReturnValue(OTHER_HASHED_PASSWORD)
    usersRepository.getUserById.mockReturnValue(USER_DATA)

    userId = await userManager.resetPassword(USER_ID, PASSWORD)
  })

  test('gets user data', async () => {
    expect(usersRepository.getUserById).toHaveBeenCalledWith(USER_ID)
  })

  test('saves user data', async () => {
    expect(usersRepository.addUser).toHaveBeenCalledWith({
      ...USER_DATA,
      password: OTHER_HASHED_PASSWORD
    })
  })

  test('returns user id', async () => {
    expect(userId).toEqual(USER_ID)
  })
})
