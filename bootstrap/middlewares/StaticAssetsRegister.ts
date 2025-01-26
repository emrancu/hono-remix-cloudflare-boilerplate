import { staticAssets } from 'remix-hono/cloudflare';
import type { Context, Next } from 'hono';
import BaseMiddleware from '@/bootstrap/abstruction/BaseMiddleware'

class StaticAssetsRegistry extends BaseMiddleware {
    public async boot(context: Context, next: Next){

        if (process.env.NODE_ENV !== 'development' || import.meta.env.PROD) {
            return staticAssets()(context, next)
        }

      return   await next()
    }

}

export default StaticAssetsRegistry;
