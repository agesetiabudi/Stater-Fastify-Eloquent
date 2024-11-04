const fastify = require('fastify')({ logger: true })
const routes = require('./src/routes/api')

// routes
fastify.register(require('@fastify/formbody'))
fastify.register(routes)

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()