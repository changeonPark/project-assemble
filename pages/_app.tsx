import "../styles/globals.css"
import type { AppProps } from "next/app"

import { MoralisProvider } from "react-moralis"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react"

declare let window: any

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleAccountChanged = (account: string[]) => {
      console.log(account[0])
    }
    const handleChainChanged = (_hexChainId: string) => {
      if (typeof window !== "undefined") {
        console.log("switched to chain...!", _hexChainId)
        window.location.reload()
      } else {
        console.log("window is undefined")
      }
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged)
      window.ethereum.on("chainChanged", handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

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
