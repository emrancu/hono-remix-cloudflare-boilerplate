import type { Context, Next } from 'hono';
import { workerKVSession } from "remix-hono/cloudflare";
import BaseMiddleware from '@/bootstrap/abstruction/BaseMiddleware'
import appConfig from '@/config/app'
import sessionDrivers from '@/bootstrap/constants/SessionDrivers'

class KvSession extends BaseMiddleware {

    public async boot(context: Context, next: Next) {
        const config = appConfig();

        if(config.session.driver !== sessionDrivers.kv){
            return await next();
        }

        // Create the session middleware
        const sessionMiddleware = workerKVSession({
            autoCommit: true,
            cookie: {
                name: "session",
                secrets(c) {
                    return [c.env.SECRET];
                },
                secure: true,
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
            },
            binding: "kv",
        });

        // Apply the session middleware and continue the chain
        return sessionMiddleware(context, next);
    }
}

export default KvSession;