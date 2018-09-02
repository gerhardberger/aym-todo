const AWS = require('aws-sdk')

const {
  db: {
    region,
    accessKeyId,
    secretAccessKey,
    endpoint,
    todoListsTableName,
    usersListsTableName
  }
} = require('../config.js')

AWS.config.region = region
AWS.config.credentials = new AWS.Credentials({ accessKeyId, secretAccessKey })

const LISTS_TABLE_SCHEMA = {
  TableName: todoListsTableName,
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' }
  ],
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
}

const USER_LISTS_TABLE_SCHEMA = {
  TableName: usersListsTableName,
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' }
  ],
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
}

const provision = async () => {
  const dynamodb = new AWS.DynamoDB({ region, endpoint })

  try {
    await dynamodb.createTable(LISTS_TABLE_SCHEMA).promise()
    await dynamodb.createTable(USER_LISTS_TABLE_SCHEMA).promise()
    console.log('Tables created successfully!')
  } catch (err) {
    if (err.message === 'Cannot create preexisting table') {
      return
    }
    console.error(err)
  }
}

provision()