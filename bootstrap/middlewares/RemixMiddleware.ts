import { Context, Hono, Next } from 'hono';
import BaseMiddleware from '@/bootstrap/abstruction/BaseMiddleware';
import { matchMiddlewares } from '@/bootstrap/supports/RouteManager';
import('@/routes/remix');

class RemixMiddleware extends BaseMiddleware {

    public async boot(context: Context, next: Next) {
        const pathname = new URL(context.req.url).pathname;

        const matchedMiddleware: any = matchMiddlewares(pathname);

        if (matchedMiddleware.length) {
            const modules = import.meta.glob('@/bootstrap/middlewares/**/**.ts');

            for (const middleware of matchedMiddleware) {
                const middlewarePath = middleware.replace('@', '') + '.ts';
                const loader = modules[middlewarePath];

                // Dynamically import the middleware
                // @ts-ignore
                const { default: MiddlewareClass } = await loader();
                const instance = new MiddlewareClass();

                // Call the middleware
                const result = await instance.boot(context, async () => {
                    // If `next()` is called, we proceed to the next middleware
                    return;
                });

                // Check if the middleware returned a response
                if (result !== undefined) {
                    return result; // Stop further middleware and return the response
                }
            }
        }

        return await next();
    }

}

export default RemixMiddleware;
