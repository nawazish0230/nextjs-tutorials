import React from 'react'
import GitHubProviders from 'next-auth/providers/github'
import NextAuth from 'next-auth'

export default NextAuth({
  providers: [
    GitHubProviders({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      state: "imaParam=look-at-me-go",
      httpTimeout: 2000
    })
  ],
});

