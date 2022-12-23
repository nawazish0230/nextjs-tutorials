// In SSR html files are not generated while building as pages are built on the fly 
// and there is not caching of pages done here
// we get real time data when we fetch any page


import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const news = ({ news }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading</p>
  }

  return (
    <div><h1>list of news (SSR)</h1>
      {news?.map(newsItem =>
        <Link href={`news/${newsItem?.category}`} passHref>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>{newsItem?.title}</p> | <p>{newsItem?.category}</p>
          </div>
        </Link>
      )}
    </div>
  )
}

export default news

export async function getServerSideProps() {
  console.log('prerendering the news')
  const res = await fetch("http://localhost:4000/news")
  const news = await res.json();

  return {
    props: {
      news: news
    },
  }
}


