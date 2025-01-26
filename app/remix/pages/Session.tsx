import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "remix-hono/session";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {

    const honoContext: any = context.hono

    const session = getSession(honoContext);

    session.set('user_name', 'Al Emran')

    const sessionData = session.get('user_name')

    return  { data: sessionData }
};

export default function Index() {
    const {data} = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>Remix + Hono Session using Cloudflare KV Driver</h1>
            <p> {data}</p>
        </div>
    )
}