import '@/styles/globals.css'
import '../styles/Login.module.css'
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
