import type {MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [{ title: "Remix and Hono on Vite on Cloudflare pages" }];
};

export default function Index() {
  return (
    <div>
      <h1>Welcome Remix + Hono + Cloudflare </h1>
        <p>By <a href="https://x.com/ALEMRANCU" target={'_blank'}>Al Emran</a></p>
    </div>
  );
}
