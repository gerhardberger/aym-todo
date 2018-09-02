const {
  signUpSchema,
  signInSchema,
  resetPasswordSchema,
  todoListSchema
} = require('./route-schemas.js')

const routes = async (fastify) => {
  fastify.post('/sign-up', { schema: signUpSchema }, require('./post-sign-up.js'))
  fastify.post('/sign-in', { schema: signInSchema }, require('./post-sign-in.js'))
  fastify.post('/reset-password', { schema: resetPasswordSchema }, require('./post-reset-password.js'))

  fastify.get('/users/:userId/lists', require('./get-user-lists.js'))

  fastify.post('/users/:userId/lists', { schema: todoListSchema }, require('./post-list.js'))
  fastify.put('/lists/:listId', { schema: todoListSchema }, require('./put-list.js'))
  fastify.delete('/lists/:listId', { schema: todoListSchema }, require('./delete-list.js'))

  fastify.post('/lists/:listId/collaborators/:userId', require('./add-collaborator.js'))
  fastify.delete('/lists/:listId/collaborators/:userId', require('./delete-collaborator.js'))
}

module.exports = routes
