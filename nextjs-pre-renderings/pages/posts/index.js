import Link from 'next/link'
import React from 'react'

const posts = ({ posts }) => {
  return (
    <div><h1>list of posts (CSR with getStaticPaths)</h1>
      {posts?.map(post => <Link href={`posts/${post?.id}`} passHref><p>{post?.title}</p></Link>)}</div>
  )
}

export default posts

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  const posts = await res.json();

  return {
    props: {
      posts: posts?.slice(0, 5),
    }
  }
}