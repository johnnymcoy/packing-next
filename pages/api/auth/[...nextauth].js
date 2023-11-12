import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    session: {
        maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Password"
                },
            },
            async authorize(credentials, req){
                //! Where you'd access a database of users
                // https://next-auth.js.org/configuration/providers/credentials
                const users = [
                    { id: "1", name: "Curtis", password: process.env.LOGIN_PASS},
                    { id: "2", name: "Rory", password: process.env.LOGIN_PASS},
                    { id: "3", name: "Elken", password: process.env.LOGIN_PASS},
                    { id: "4", name: "Yannis", password: process.env.LOGIN_PASS}
                ]
                for(let i = 0; i < users.length; i++)
                {
                    if(credentials.username === users[i].name && credentials.password === users[i].password)
                    {
                        return users[i];
                    }
                }
                return null;
            }
        }),
    ],
    pages: {
    //     // signIn: 'pages/auth/signin',
    //     // signOut: 'pages/auth/signout',
    //     // error: 'pages/auth/error', // Error code passed in query string as ?error=
    //     // verifyRequest: 'pages/auth/verify-request', // (used for check email message)
    //     // newUser: 'pages/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)    
    }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}

export default NextAuth(authOptions);
