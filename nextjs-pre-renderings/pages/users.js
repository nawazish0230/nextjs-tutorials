// Link Pre-fetching contd.
// - when a page with getStaticProps is pre-rendered at build time, in addition to the page HTML file, Next.js generates a JSON file holding the result of running getStaticProps
// - The JSON file will be used in client-side routing throguh next/link or next/router
// - when you navigate to the page that's pre-rendered using getStataicProps, Next.js fetches the JSON file (pre-compusted at build time) and used it as the props to crate the page component client-side
// - Client-side page transitions will not call getStaticProps as only the exported JSON is used

// Static generation summary so far
// - static generation is a method of pre-rendering where the HTML pages are generated at build time
// - with and without external data
// - HTML, javascript and a JSON file are generated
// - If you navigate directly to the page route, the HTML file is served
// - If you navigate to the page route from a different route, the page is created client side using the javascript and JSON prefetched from the server

import React from 'react'

const users = ({ users }) => {
  return (
    <div><h1>list of users</h1>
      {users?.map(user => <p>{user?.name}</p>)}</div>
  )
}

export default users

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const users = await res.json();

  return {
    props: {
      users,
    }
  }
}