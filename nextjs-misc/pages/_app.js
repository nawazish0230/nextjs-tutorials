import Footer from "@/layout/header"
import Header from '@/layout/Header'
import 'styles/globals.css'

// added page layout thing
// added absolute/relative path using jsconfig.json file
// added redirect thing from next.config

export default function App({ Component, pageProps }) {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return <>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </>
}
