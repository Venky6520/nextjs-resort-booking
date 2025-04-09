


import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import UserModel from "./utilis/models/Users";


// export const {signIn, signOut, auth, handlers:{GET,POST}} = NextAuth({
//     providers:[
//         CredentialProvider({
//             name:"credentials",

//             async authorize(credentials) {
//                 const user = await UserModel.findOne({ email: credentials?.email });
//                 console.log("User from DB:", user);

            
//                 if (!user) {
//                     console.log("User not found");
//                     console.log("❌ No user found with email:", credentials.email);

//                     return null;
//                 }
            
//                 // Compare passwords properly (do NOT do direct string comparison in production)
//                 if (credentials?.password !== user.password) {
//                     console.log("❌ Incorrect password for user:", user.email);

//                     console.log("Invalid password");
//                     return null;
//                 }
            
//                 console.log("✅ Login success:", user.email);

//                 return {
//                     name: user.username,
//                     email: user.email,
//                     role: user.role,
//                 };
//             }
            

//         })
//     ],
//     secret:process.env.SECRET_KEY,

//     callbacks: {
//       async jwt({token, user}) {
//         if(user) {
//           token.userId = user.id;
//           token.username = user.username;
//           token.email = user.email;
//           token.role = user.role;
//         }
//         return token;
//       },
//     },
//     async session({session,token}){
//       session.userId = token.userId;
//       session.username = token.username;
//       session.email = token.email;
//       session.role = token.role;
//       return session;
//     }

// })



export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      async authorize(credentials) {
        const user = await UserModel.findOne({ email: credentials?.email });
        if (!user || credentials?.password !== user.password) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.username,  // this will be available as `user.name` in jwt
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.SECRET_KEY,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.username = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.userId = token.userId;
      session.username = token.username;
      session.email = token.email;
      session.role = token.role;
      return session;
    },
  },
});
