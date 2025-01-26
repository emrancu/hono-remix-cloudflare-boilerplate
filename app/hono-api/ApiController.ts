import type {Context} from 'hono'
import { getSession } from "remix-hono/session";

export const index =  async (context: Context) => {

    const session = getSession(context);
    session.set('user_name', 'Al Emran')

    const value = session.get('user_name')

    return context.json({message: value});
}


export const SessionSet =  async (context: Context) => {

    const session =  getSession(context);

    session.set('user_name', 'Al Emran')


    return context.json({message: "set successfully"});
}