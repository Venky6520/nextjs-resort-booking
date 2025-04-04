import NextAuth from "next-auth";
import  CredentialProvider from "next-auth/providers/credentials";


export const {auth, signIn, signOut, handlers:{GET,POST}} = NextAuth({
    providers:[
        CredentialProvider({
            name:"credentials",
        })
    ]
})