import { useRouter } from 'next/router'
import React from 'react'

const NewsByCategoy = ({ news, category }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>loading</h1>
  }

  return (
    <div>
      <p>news by {category} category</p>
      {news?.map(newsItem =>
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>{newsItem?.title}</p> | <p>{newsItem?.category}</p>
          </div>
          <hr /></>
      )}
    </div>
  )
}

export default NewsByCategoy;

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  const { category } = params
  // console.log(req.headers.cookie);
  res.setHeader("Set-Cookie", ["name=nawazish"])
  console.log('prerendering the news with category ' + category)
  const response = await fetch(`http://localhost:4000/news?category=${category}`)
  const news = await response.json();

  return {
    props: {
      news: news,
      category
    },
  }
}

