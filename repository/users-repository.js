class UsersRepository {
  static create () {
    return new UsersRepository()
  }

  async addUserList (userId, listId) {
  }

  async removeUserList (userId, listId) {
  }

  async getUserListIds (userId) {
    return []
  }
}

module.exports = UsersRepository
