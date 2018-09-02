module.exports = {
  signUpSchema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        registrationToken: { type: 'string' }
      }
    }
  },
  signInSchema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' }
      }
    }
  },
  resetPasswordSchema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' }
      }
    }
  },
  todoListSchema: {
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
}
