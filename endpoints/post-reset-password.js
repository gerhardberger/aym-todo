const UserManager = require('../service/user-manager.js')

module.exports = async (request) => {
  const userManager = UserManager.create()
  const id = request.params.id
  const password = request.body.password

  const userId = await userManager.resetPassword(id, password)

  return { id: userId }
}
