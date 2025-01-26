import {type Context, Env, Hono, Next} from 'hono'
import { poweredBy } from 'hono/powered-by'
import Environment from '@/bootstrap/Environment'
import {router as apiRoutes} from '@/routes/api'
import appConfig from '@/config/app'
import KvSession from '@/bootstrap/middlewares/KvSession'

const app = new Hono<{ Bindings: Env }>();


app.use('*', async (c: Context, next: Next) => {

    // Initialize environment
    Environment.initialize(c);

   return  await next();
});


app.use(poweredBy())

const config = appConfig();


config.middlewares.forEach((middleware) => {
    const middlewareInstance = new middleware();
    let matchCondition = false

    /**
     *  we need to initiate Hono route after KV session middleware register.
     */
    if( middlewareInstance instanceof KvSession ) {

        app.use(middlewareInstance.boot);

        /**
         *  Hono Routes
         */
        app.route('/api', apiRoutes)

        matchCondition = true
    }

    if(!matchCondition) {
        app.use(middlewareInstance.boot);
    }
})



export default {
    boot: ()=>{
        return app;
    },
};
