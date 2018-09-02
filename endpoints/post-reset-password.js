const UserManager = require('../service/user-manager.js')

module.exports = async (request) => {
  const userManager = UserManager.create()
  const userData = request.body

  const userId = await userManager.create(userData)

  return { id: userId }
}
