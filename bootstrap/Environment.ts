import type { Context, HonoRequest } from 'hono';
import {setRequestData} from '@/bootstrap/Request'

class Environment {
  private static instance: Environment;
  private env: Record<string, any>;
  private req: HonoRequest;

  private constructor(context: Context) {
    this.env = context.env;
    this.req = context.req

    setRequestData(context.req)
  }

  public static   initialize(context: Context) {

        Environment.instance = new Environment(context);
  }

  public static get(key: string, defaultValue: string = ''): any {
    return Environment.instance?.env[key] || defaultValue;
  }

  public static isProduction(): boolean {
    return Environment.instance?.env.NODE_ENV === 'production';
  }
}

export default Environment;
