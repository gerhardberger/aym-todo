const hat = require('hat')
const bcrypt = require('bcryptjs')

const UsersRepository = require('../repository/users-repository')

class UserManager {
  static create () {
    return new UserManager(UsersRepository.create(), hat, bcrypt)
  }

  constructor (usersRepository, generateUniqueId, passwordHasher) {
    this.usersRepository = usersRepository
    this.generateUniqueId = generateUniqueId
    this.passwordHasher = passwordHasher
  }

  async create (userData) {
    const id = this.generateUniqueId()
    const password = this.passwordHasher.hashSync(userData.password)
    const userDataToSave = { ...userData, id, password }

    await this.usersRepository.addUser(userDataToSave)

    return id
  }

  async auth (email, password) {
    const userData = await this.usersRepository.getUser(email)

    if (!this.passwordHasher.compareSync(password, userData.password)) {
      throw new Error('Wrong password')
    }

    return userData.id
  }

  async resetPassword (id, newPassword) {
    const userData = await this.usersRepository.getUserById(id)
    const password = this.passwordHasher.hashSync(newPassword)
    const userDataToSave = { ...userData, id, password }

    await this.usersRepository.addUser(userDataToSave)

    return id
  }
}

module.exports = UserManager
