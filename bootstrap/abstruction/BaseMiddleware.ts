import type { Context, Next } from 'hono';

// Interface approach
interface IMiddleware {
    boot(context: Context, next: Next): Promise<Response | void>;
}


abstract class BaseMiddleware implements IMiddleware {
    constructor() {
        // Automatically bind the boot method in the constructor
        this.boot = this.boot.bind(this);
    }

    abstract boot(context: Context, next: Next): Promise<Response | void>;
}

export default BaseMiddleware