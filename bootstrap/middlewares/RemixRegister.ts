import type { RequestHandler } from '@remix-run/cloudflare';
import { type AppLoadContext } from '@remix-run/cloudflare';
import { remix } from 'remix-hono/handler';
import type { Context, Next } from 'hono';
import BaseMiddleware from '@/bootstrap/abstruction/BaseMiddleware'

class RemixRegister extends BaseMiddleware {
    private handler: RequestHandler | undefined;

    public async boot(context: Context, next: Next) {

        if (process.env.NODE_ENV !== 'development' || import.meta.env.PROD) {
            const serverBuild = await import('@/build/server');

            return remix({
                mode: 'production',
                // @ts-ignore
                build: serverBuild,
                // @ts-ignore
                getLoadContext(context) {
                    return {
                        hono: context
                    }
                }
            })(context, next);

        } else {

            if (!this.handler) {
                // @ts-ignore
                const build = await import('virtual:remix/server-build');
                const { createRequestHandler } = await import('@remix-run/cloudflare');
                this.handler = createRequestHandler(build, 'development');
            }

            const remixContext = {
                hono: context
            } as unknown as AppLoadContext;

            return this.handler(context.req.raw, remixContext);
        }
    }
}

export default RemixRegister;