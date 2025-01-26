import type { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ params }: LoaderFunctionArgs) {

    const name = params.name ?? '';

    return Response.json({ message: `Hello ${name}, json from Remix` });
}
