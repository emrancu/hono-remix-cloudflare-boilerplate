import type {MetaFunction } from "@remix-run/cloudflare";
import React, { useState} from 'react'


import Checkbox from '@remix/themes/default/components/Checkbox';
import InputError from '@remix/themes/default/components/InputError';
import InputLabel from '@remix/themes/default/components/InputLabel';
import PrimaryButton from '@remix/themes/default/components/PrimaryButton';
import TextInput from '@remix/themes/default/components/TextInput';

import { FormEventHandler } from 'react';


export const meta: MetaFunction = () => {
  return [{ title: "Remix and Hono on Vite on Cloudflare pages" }];
};


export default function Login() {

    const [status, setStatus] = useState(false)
    const [data, setData] = useState({})

    const submit: FormEventHandler = (e) => {
        e.preventDefault();


    };

    return (
        <>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                    />

                    {/*<InputError message={errors.email} className="mt-2" />*/}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    {/*<InputError message={errors.password} className="mt-2" />*/}
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"

                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">

                        <a
                            href={""}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </a>

                    <PrimaryButton className="ms-4" disabled={false}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}

