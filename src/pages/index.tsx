import type { NextPage } from "next"
import { useMoralis } from "react-moralis"

import { Layout } from "@base/components"

import axios from "axios"
import { useRef } from "react"

const Home: NextPage = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()

  const onClickLogin = () => {
    authenticate({
      signingMessage: "여소 좀 해주세요 ㅠㅜ",
    })
  }

  const testInput = useRef<HTMLInputElement>(null)

  const goPin = () => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const data = new FormData()
    if (testInput.current?.files)
      data.append("file", testInput.current.files[0])

    const metadata = JSON.stringify({
      name: "moko2",
      keyvalues: {
        color: "green",
        skin: "aman",
      },
    })
    data.append("pinataMetadata", metadata)
    console.log(data)

    return axios
      .post(url, data, {
        maxBodyLength: Infinity,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PIN_KEY!,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PIN_SECRET_KEY!,
        },
      })
      .then(res => console.log(res))
      .catch(err => console.log("err"))
  }

  return (
    <Layout title="Home" hasHeader>
      {!isAuthenticated ? (
        <>
          <input
            type="file"
            defaultValue="img/puzzle-dummy.png"
            ref={testInput}
          />
          <button
            className="mt-10 block bg-gray-800 py-3 px-4 text-lg uppercase text-white hover:bg-gray-900"
            onClick={() => goPin()}
          >
            Login
          </button>
        </>
      ) : (
        <button className="mt-10 block bg-gray-800 py-3 px-4 text-lg font-bold uppercase text-white hover:bg-gray-900">
          {user?.get("ethAddress")}
        </button>
      )}
    </Layout>
  )
}

export default Home
