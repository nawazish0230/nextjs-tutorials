// - when we build project only product-1 page is created and rest product-2 & product-3 would be created on the fly
// - bt we change the price of p-1 it wont affect in the page as that i prebuild while build
// - in case of p-2 & p-3 for the first time it would show the chaged price in api/json-server bt then same cached and created page would be server
// - it basically solves the issue of stale data 

// there was a need to update only those pages which needed a change without having to rebuilt entire app
// here comes the need of Incremental static regenration (ISR)
// * with ISR nextjs allows us to update static page after you have built your project
// * we can statically generate individual pages without needing to rebuilt the entire site, effectively solving the issue of stale data 
// * we can add (revalidate)props and it will generate in that particular second 

// * if we reload the page multiple time whithin validate timeframe it will serve the cached data 
// and after 10s only it will give new data

// issue with ISR (refer to isr-issue img)
// - server send cached data until time(10s) completes and when then it validates the old data and after the 10s only bt with second request data will change

// re-generation
// - an generation is initiated only if a user makes a request after the revalidate time
// - if a user visits our product details page there is no other user hitting that page the entire day the re-generation does not happen
// - revalidate does not mean the page automatically re-generates every 10 seconds
// - it simply denotes the time after which, if a user makes a request , a regeneration has to be initiated
// - the re-generation can also fail and the previosuly cached HTML could be served till the subsequest re-generatations succeed


import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const products = ({ products }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading</p>
  }

  return (
    <div><h1>list of products (ISR)</h1>
      {products?.map(product =>
        <Link href={`products/${product?.id}`} passHref>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>{product?.title}</p> | <p>{product?.price}</p>
          </div>
        </Link>
      )}
    </div>
  )
}

export default products

export async function getStaticProps() {
  console.log(`generating / regenerating built`)
  const res = await fetch("http://localhost:4000/products")
  const products = await res.json();

  return {
    props: {
      products: products
    },
    revalidate: 10,
  }
}


