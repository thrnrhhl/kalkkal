'use client';
import { SessionProvider } from 'next-auth/react';
import { Session } from "next-auth";
import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/src/app/store';

type ProvidersProps = {
    children: React.ReactNode;
    session: Session | null
};

export const Providers: FC<ProvidersProps> = ({ children, session }) => {

    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                {children}
            </Provider>
        </SessionProvider>
    );
};