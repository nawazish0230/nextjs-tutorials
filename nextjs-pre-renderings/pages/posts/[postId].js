import { useRouter } from 'next/router'
import React from 'react'

const postdetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback){
    return <h1>loading</h1>
  }

    return (
      <div>
        <p>post details</p>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    )
}

export default postdetails;

export async function getStaticPaths() {

  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  const posts = await res.json();


  const paths = posts?.slice(0, 5)?.map(post => {
    return {
      params: { postId: `${post.id}` }
    }
  })

  return {
    // paths: [
    //   {
    //     params: { postId: '1' }
    //   },
    //   {
    //     params: { postId: '2' }
    //   },
    //   {
    //     params: { postId: '3' }
    //   }
    // ],
    paths,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.postId}`)
  const post = await res.json();

  if (!post?.id){
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post: post
    }
  }
}