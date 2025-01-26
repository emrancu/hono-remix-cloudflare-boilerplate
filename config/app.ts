import Environment from '@/bootstrap/Environment'
import KvSession from '@/bootstrap/middlewares/KvSession'
import RemixRegister from '@/bootstrap/middlewares/RemixRegister'
import StaticAssetsRegister from '@/bootstrap/middlewares/StaticAssetsRegister'
import RemixMiddleware from '@/bootstrap/middlewares/RemixMiddleware'
import TestMiddleware from '@/bootstrap/middlewares/TestMiddleware'


export default () => ({
    app: {
        environment: Environment.get('NODE_ENV', 'development'),
        name: 'MyApp',
        url: 'http://localhost:3000',
    },
    middlewares: [
        KvSession,
        StaticAssetsRegister,
        RemixMiddleware,
        RemixRegister,
    ],
    remixMiddleware: [
        KvSession
    ],
    database: {
        host: 'localhost',
        port: 5432,
        user: 'db_user',
        password: 'db_password',
        name: 'database_name',
    },
    cache: {
        driver: 'redis',
        host: 'localhost',
        port: 6379,
    },
    session: {
        driver: Environment.get('SESSION_DRIVER'),
        secret: Environment.get('SECRET'),
        expiration: 3600, 
    },
})
 