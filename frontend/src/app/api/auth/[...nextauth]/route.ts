import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user, account, profile }) {

            console.log("User signed in:", user);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/your-endpoint`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: user.email
                    }),
                });

                if (!response.ok) {
                    console.error("Failed to call API after sign-in");
                }
            } catch (error) {
                console.error("Error calling API after sign-in:", error);
            }

            return true;
        },

    },

});

export { handler as GET, handler as POST };
