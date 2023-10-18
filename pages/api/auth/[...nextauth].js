import NextAuth from "next-auth"
// import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth();

export { handler as GET, handler as POST}

export const authOptions = {
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET
        // }),
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
                ]
                for(let i = 0; i < users.length; i++)
                {
                    if(credentials.username === users[i].name && credentials.password === users[i].password)
                    {
                        return users[i];
                    }
                }
                return null;
                // const user = { id: "42", name: "Curtis", password: process.env.LOGIN_PASS}
                // if(credentials.username === user.name && credentials.password === user.password)
                // {
                //     return user;
                // }
                // else
                // {
                //     return null;
                // }
            }
        }),
        // EmailProvider({
        //     server: process.env.MAIL_SERVER,
        //     from: 'NextAuth.js <no-reply@example.com>'
        //   }),
    ],
    pages: {
        // signIn: 'pages/auth/signin',
        // signOut: 'pages/auth/signout',
        // error: 'pages/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: 'pages/auth/verify-request', // (used for check email message)
        // newUser: 'pages/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)    

    }
}
  export default NextAuth(authOptions)

  