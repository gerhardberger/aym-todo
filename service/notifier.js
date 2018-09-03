const UsersListsRepository = require('../repository/users-lists-repository.js')
const UsersRepository = require('../repository/users-repository.js')
const FirebaseAdapter = require('../lib/firebase-adapter.js')

class Notifier {
  static create () {
    return new Notifier(UsersListsRepository.create(), UsersRepository.create(), FirebaseAdapter.getInstance())
  }

  constructor (usersListsRepository, usersRepository, firebaseApp) {
    this.usersListsRepository = usersListsRepository
    this.usersRepository = usersRepository
    this.firebaseApp = firebaseApp
  }

  async send (listId, notification, data) {
    const messaging = this.firebaseApp.messaging()

    const userIds = await this.usersListsRepository.getListUserIds(listId)
    const tokens = await this._getRegistryTokensForUsers(userIds)

    await messaging.sendToDevice(tokens, { notification, data })
  }

  async _getRegistryTokensForUsers (userIds) {
    const tokens = []
    for (let userId of userIds) {
      const userData = await this.usersRepository.getUserById(userId)
      tokens.push(userData.registrationToken)
    }
    return tokens
  }
}

module.exports = Notifier
