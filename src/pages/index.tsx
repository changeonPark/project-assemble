import type { NextPage } from "next"
import { useMoralis } from "react-moralis"

import { Layout } from "@base/components"

const Home: NextPage = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()

  const onClickLogin = () => {
    authenticate({
      signingMessage: "여소 좀 해주세요 ㅠㅜ",
    })
  }

  return (
    <Layout title="Home" hasHeader>
      {!isAuthenticated ? (
        <button
          className="mt-10 block bg-gray-800 py-3 px-4 text-lg uppercase text-white hover:bg-gray-900"
          onClick={() => onClickLogin()}
        >
          Login
        </button>
      ) : (
        <button className="mt-10 block bg-gray-800 py-3 px-4 text-lg font-bold uppercase text-white hover:bg-gray-900">
          {user?.get("ethAddress")}
        </button>
      )}
    </Layout>
  )
}

export default Home
