import React from 'react';
import ApplicationLogo from './../components/ApplicationLogo'

const GuestLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div
            className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div>
                <a href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500"/>
                </a>
            </div>

            <div
                className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
};

export default GuestLayout;
