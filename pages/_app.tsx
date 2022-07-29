import Bars from '../components/Bars'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Context from 'Context/Context'
import 'bootstrap/dist/css/bootstrap.min.css'



export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Context>
          <Bars>
            <Component {...pageProps} />
          </Bars>
      </Context>
  )
}
