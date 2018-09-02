const todoListSchema = {
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        item: { type: 'string' },
        completed: { type: 'boolean' }
      }
    }
  }
}

const routes = async (fastify) => {
  fastify.get('/users/:userId/lists', require('./get-user-lists.js'))

  fastify.post('/users/:userId/lists', { schema: todoListSchema }, require('./post-list.js'))
  fastify.put('/lists/:listId', { schema: todoListSchema }, require('./put-list.js'))
  fastify.delete('/lists/:listId', { schema: todoListSchema }, require('./delete-list.js'))

  fastify.post('/lists/:listId/collaborators/:userId', require('./add-collaborator.js'))
  fastify.delete('/lists/:listId/collaborators/:userId', require('./delete-collaborator.js'))
}

module.exports = routes
