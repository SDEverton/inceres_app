import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { ListProvider } from '../hooks/Items'
import { NoteProvider } from '../hooks/Notes'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ListProvider>
      <NoteProvider>
        <Header />
        <ToastContainer />
        <Component {...pageProps} />
      </NoteProvider>
    </ListProvider>
  )
}

export default MyApp
