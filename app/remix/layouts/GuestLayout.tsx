import React from 'react';

import ThemeGuestLayout from '@remix/themes/default/layouts/GuestLayout';


const GuestLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeGuestLayout>
                {children} 
        </ThemeGuestLayout>
    );
};

export default GuestLayout;
