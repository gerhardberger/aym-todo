module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 8080,

  db: {
    region: process.env.AWS_REGION || 'eu-central-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy key',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy secret',
    endpoint: process.env.DYNAMODB_ENDPOINT || 'http://aym-todo-db:8000',
    usersTableName: process.env.DYNAMODB_USERS_TABLENAME || 'Users_LOCAL',
    todoListsTableName: process.env.DYNAMODB_LISTS_TABLENAME || 'TodoLists_LOCAL',
    usersListsTableName: process.env.DYNAMODB_USERS_LISTS_TABLENAME || 'UsersLists_LOCAL'
  }
}
