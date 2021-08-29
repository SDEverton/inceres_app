import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ListProvider } from '../hooks/Items'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ListProvider>
      <Header />
      <ToastContainer />
      <Component {...pageProps} />
    </ListProvider>
  )
}

export default MyApp
