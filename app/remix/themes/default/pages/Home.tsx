
export default function Welcome() {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden')
        document.getElementById('docs-card')?.classList.add('!row-span-1')
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row')
        document.getElementById('background')?.classList.add('!hidden')
    }

    return (<>
        <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">

            <div
                className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                    <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-2">
                        <div className="flex lg:col-start-1">
                            <a href="https://github.com/emrancu/hono-remix-cloudflare-boilerplate"
                               target={'_blank'}>
                                <img src="assets/github-mark.png" className={'w-[60px]'} alt=""/>
                            </a>
                        </div>
                        <nav className="-mx-3 flex flex-1 justify-end">

                            <a
                                href="login"
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </a>
                            <a
                                href="register"
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </a>

                        </nav>
                    </header>

                    <main className="mt-6">
                        <div>
                            <img src="assets/thumbnail.png" alt=""/>
                        </div>
                    </main>

                    <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                        Made with ❤️ by <a href="https://x.com/ALEMRANCU" className={'text-blue-800'}>Al Emran</a>
                    </footer>
                </div>
            </div>
        </div>
    </>)
}
