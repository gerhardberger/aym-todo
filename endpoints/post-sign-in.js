const UserManager = require('../service/user-manager.js')

module.exports = async (request) => {
  const userManager = UserManager.create()
  const email = request.body.email
  const password = request.body.password

  const userId = await userManager.auth(email, password)

  return { id: userId }
}
