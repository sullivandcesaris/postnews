import { query as q } from 'faunadb'

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna'

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            authorization: {
                url: "https://github.com/login/oauth/authorize",
                params: { scope: "read:user" },
            },

        }),
    ],
    callbacks: {
        async session({ session }) {
            try{
                const userActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection([
                            q.Match(
                                q.Index('subscription_by_user_ref'),
                                q.Select(
                                    "ref",
                                    q.Get(
                                        q.Match(
                                            q.Index('user_by_email'),
                                            q.Casefold(session.user.email!)
                                        )
                                    )
                                )
                            ),
                            q.Match(
                                q.Index('subscription_by_status'),
                                "active"
                            )
                        ]),
                    )
                )
                return {
                    ...session,
                    activeSubscription: userActiveSubscription,
                };
            } catch {
                return session;
            }
        },
        async signIn({ user, account, profile }) {
            const { email } = user

            try {

                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email!)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email } },
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email!)
                            )
                        )
                    )
                )
                .then((ret) => console.log(ret))
                .catch((err) => console.error(
                    'Error: [%s] %s: %s',
                    err.name,
                    err.message,
                    err.errors()[0].description,
                ))

                return true;
            } catch {
                return false;
            }
        },
    }
})