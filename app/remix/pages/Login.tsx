import type {MetaFunction } from "@remix-run/cloudflare";
import LoginPage from '@remix/themes/default/pages/auth/Login';
import GuestLayout from '@remix/layouts/GuestLayout';


export const meta: MetaFunction = () => {
  return [{ title: "Remix and Hono on Vite on Cloudflare pages" }];
};


export default function Login() {


    return (
        <GuestLayout>
         <LoginPage/>
        </GuestLayout>
    );
}

