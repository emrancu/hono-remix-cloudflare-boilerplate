import { Context } from 'hono';

export let Request: Context['req'] ;

export const setRequestData = (data: Context['req'])=>{
    Request = data
}
 