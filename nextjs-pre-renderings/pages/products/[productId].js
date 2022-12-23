import { useRouter } from 'next/router'
import React from 'react'

const postdetails = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>loading</h1>
  }

  return (
    <div>
      <p>product details</p>
      <h1>{product.title}</h1>
      <h1>{product.price}</h1>
      <h1>{product.description}</h1>
    </div>
  )
}

export default postdetails;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { productId: '1' }
      },
    ],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context;
  console.log(`generating / regenerating product ${params?.productId}`)
  const res = await fetch(`http://localhost:4000/products/${params?.productId}`)
  const product = await res.json();

  return {
    props: {
      product: product
    },
    revalidate: 10,
  }
}

