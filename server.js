const fastify = require('fastify')({ logger: true })

const config = require('./config.js')
const DbAdapter = require('./lib/db-adapter.js')
const FirebaseAdapter = require('./lib/firebase-adapter.js')

fastify.register(require('./endpoints/routes.js'))

const serverSetup = () => {
  DbAdapter.setup()
  FirebaseAdapter.setup()
}

const start = async () => {
  try {
    serverSetup()

    await fastify.listen(config.port, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
