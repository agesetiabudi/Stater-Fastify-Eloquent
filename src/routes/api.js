const ContentController = require('../controllers/content.controller')
const AuthController = require('../controllers/auth.controller')

const router = (fastify, options, done) => {
    fastify.post('/login', AuthController.login);

    fastify.get('/content', ContentController.getData);
    fastify.post('/content', ContentController.store);
    fastify.get('/content/:id', ContentController.show);
    fastify.put('/content/:id', ContentController.update);
    fastify.delete('/content/:id', ContentController.destroy);

    done()
};

module.exports = router