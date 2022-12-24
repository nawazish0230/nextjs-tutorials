import React from 'react'
import Footer from '../components/layout/footer'

const login = () => {
  return (
    <div>login</div>
  )
}

export default login

login.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
      <Footer />
    </>
  )
}