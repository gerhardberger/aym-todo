const AWS = require('aws-sdk')

const {
  db: {
    region,
    accessKeyId,
    secretAccessKey,
    endpoint,
    usersTableName,
    usersIdIndexName,
    todoListsTableName,
    usersListsTableName,
    listUserIdsIndexName
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
    { AttributeName: 'userId', AttributeType: 'S' },
    { AttributeName: 'listId', AttributeType: 'S' }
  ],
  KeySchema: [
    { AttributeName: 'userId', KeyType: 'HASH' },
    { AttributeName: 'listId', KeyType: 'RANGE' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: listUserIdsIndexName,
      KeySchema: [
        { AttributeName: 'listId', KeyType: 'HASH' },
        { AttributeName: 'userId', KeyType: 'RANGE' }
      ],
      Projection: {
        ProjectionType: 'KEYS_ONLY'
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
  ]
}

const USERS_TABLE_SCHEMA = {
  TableName: usersTableName,
  AttributeDefinitions: [
    { AttributeName: 'email', AttributeType: 'S' },
    { AttributeName: 'id', AttributeType: 'S' }
  ],
  KeySchema: [
    { AttributeName: 'email', KeyType: 'HASH' },
    { AttributeName: 'id', KeyType: 'RANGE' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: usersIdIndexName,
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
        { AttributeName: 'email', KeyType: 'RANGE' }
      ],
      Projection: {
        ProjectionType: 'ALL'
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
  ]
}

const provision = async () => {
  const dynamodb = new AWS.DynamoDB({ region, endpoint })

  try {
    await dynamodb.createTable(USERS_TABLE_SCHEMA).promise()
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
