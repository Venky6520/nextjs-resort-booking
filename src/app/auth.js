


// import NextAuth from "next-auth";
// import CredentialProvider from "next-auth/providers/credentials";
// import UserModel from "./utilis/models/Users";


// export const {signIn, signOut, auth, handlers:{GET,POST}} = NextAuth({
//     providers:[
//         CredentialProvider({
//             name:"Credentials",

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
//     ]
// })


// // import NextAuth from "next-auth";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import UserModel from "./utilis/models/Users";
// // import bcrypt from "bcryptjs";

// // export const {
// //   signIn,
// //   signOut,
// //   auth,
// //   handlers: { GET, POST },
// // } = NextAuth({
// //   providers: [
// //     CredentialsProvider({
// //       name: "Credentials",
// //       credentials: {
// //         email: { label: "Email", type: "email" },
// //         password: { label: "Password", type: "password" },
// //       },
// //       async authorize(credentials) {
// //         const user = await UserModel.findOne({ email: credentials?.email });
// //         if (!user) return null;

// //         const isMatch = await bcrypt.compare(credentials?.password, user.password);
// //         if (!isMatch) return null;

// //         return {
// //           name: user.username,
// //           email: user.email,
// //           role: user.role,
// //         };
// //       },
// //     }),
// //   ],
// //   secret: process.env.SECRET_KEY,
// // });






// lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "./utilis/models/Users";
import bcrypt from "bcryptjs";
import DBconnection from "./utilis/config/db";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        await DBconnection();

        const user = await UserModel.findOne({ email: credentials?.email });
        console.log("User from DB:", user);

        if (!user) {
          console.log("❌ No user found");
          return null;
        }

        const isMatch = await bcrypt.compare(credentials?.password, user.password);
        if (!isMatch) {
          console.log("❌ Invalid password");
          return null;
        }

        console.log("✅ Login success:", user.email);

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // optional: custom login page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
