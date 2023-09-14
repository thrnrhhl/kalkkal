import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                id: {},
                login: {},
                accessToken: {},
            },
            async authorize(credentials) {                
                if(!credentials?.id) return null;

                const user = {
                    id: credentials.id,
                    login: credentials?.login,
                    accessToken: credentials?.accessToken,
                };

               return user;
            },
            
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return {...token, ...user};
        },
        async session({session, token, user}) {
            session.user = token as any;
            return session;
        }
    },
    session: {
        strategy: 'jwt'
    },
    secret: 'kalkulator-kkal'
}