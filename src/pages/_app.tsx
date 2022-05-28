import "styles/globals.css"
import type { AppProps } from "next/app"
import { MoralisProvider } from "react-moralis"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APPID!}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}
    >
      <>
        <Component {...pageProps} />
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    </MoralisProvider>
  )
}

export default MyApp
