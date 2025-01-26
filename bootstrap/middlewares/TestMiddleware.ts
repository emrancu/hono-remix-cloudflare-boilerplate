import {Context, Hono, Next} from 'hono'
import BaseMiddleware from '@/bootstrap/abstruction/BaseMiddleware'


class TestMiddleware extends BaseMiddleware {

    public async boot(context: Context, next: Next) {

        return context.json({
            data: "Protected by middleware"
        })

      // await next()
    }

}

export default TestMiddleware;