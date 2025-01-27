import type {MetaFunction} from '@remix-run/cloudflare'
import HomePage from '@remix/themes/default/pages/Home';


export const meta: MetaFunction = () => {
    return [{title: 'Remix and Hono on Vite on Cloudflare pages'}]
}

export default function Home() {
    return (<HomePage></HomePage>)
}
