const Notifier = require('./notifier.js')
const UsersListsRepository = require('../repository/users-lists-repository.js')
const UsersRepository = require('../repository/users-repository.js')

jest.mock('../repository/users-lists-repository.js')
jest.mock('../repository/users-repository.js')

let notifier
let usersListsRepository
let usersRepository
let sendToDeviceMock

const USER_ID = 'dummy user id'
const LIST_ID = 'dummy list id'
const REGISTRATION_TOKEN = 'dummy registration token'
const MESSAGE = 'dummy message'
const DATA = { dummy: 'data' }

beforeEach(async () => {
  sendToDeviceMock = jest.fn()
  const mockFirebaseApp = {
    messaging: () => ({ sendToDevice: sendToDeviceMock })
  }

  UsersListsRepository.mockClear()
  UsersRepository.mockClear()

  usersListsRepository = new UsersListsRepository()
  usersRepository = new UsersRepository()
  notifier = new Notifier(usersListsRepository, usersRepository, mockFirebaseApp)
})

describe('#send', () => {
  beforeEach(async () => {
    usersListsRepository.getListUserIds.mockReturnValue(Promise.resolve([USER_ID]))
    usersRepository.getUserById.mockReturnValue(Promise.resolve({
      registrationToken: REGISTRATION_TOKEN
    }))

    await notifier.send(LIST_ID, MESSAGE, DATA)
  })

  test('fetches user ids for list', async () => {
    expect(usersListsRepository.getListUserIds).toHaveBeenCalledWith(LIST_ID)
  })

  test('fetches user data', async () => {
    expect(usersRepository.getUserById).toHaveBeenCalledWith(USER_ID)
  })

  test('sends message to token', async () => {
    expect(sendToDeviceMock).toHaveBeenCalledWith([REGISTRATION_TOKEN], {
      data: DATA,
      notification: MESSAGE
    })
  })
})
