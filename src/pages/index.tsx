import type { NextPage } from "next"
import { useMoralis } from "react-moralis"

import { Layout } from "@base/components"

import axios from "axios"
import { useEffect, useRef } from "react"
import { dataURItoBlob } from "@base/utils"

const Home: NextPage = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()

  const onClickLogin = () => {
    authenticate({
      signingMessage: "여소 좀 해주세요 ㅠㅜ",
    })
  }

  const testInput = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!testInput.current) return

    const context = testInput.current.getContext("2d")

    const image1 = new Image()
    const image2 = new Image()
    image1.crossOrigin = "Anonymous"
    image2.crossOrigin = "Anonymous"

    image1.src = "img/test.png"
    image1.onload = () => {
      context?.drawImage(image1, 0, 0)
    }
    image2.src =
      "https://yt3.ggpht.com/ytc/AKedOLQbGU7E36ebO2GboqjekjMHShyKDB4cXao0TbDi0A=s900-c-k-c0x00ffffff-no-rj"
    image2.onload = () => {
      context?.drawImage(image2, 100, 100, 100, 100)
    }
  }, [testInput])

  const goPin = async () => {
    if (!testInput.current) return
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
    const data = new FormData()
    //https://gateway.pinata.cloud/ipfs/QmYH9S5XtH83MS6dJyCRXvPUx2nnKEfqtcBS6nm7gSpyR8
    //https://yt3.ggpht.com/ytc/AKedOLQbGU7E36ebO2GboqjekjMHShyKDB4cXao0TbDi0A=s900-c-k-c0x00ffffff-no-rj

    const canvasResult = testInput.current.toDataURL("image/png")
    const uploadImg = dataURItoBlob(canvasResult)
    data.append("file", uploadImg)
    console.log(uploadImg)

    const metadata = JSON.stringify({
      name: "apple",
      keyvalues: {
        color: "white",
        skin: "black",
      },
    })
    data.append("pinataMetadata", metadata)

    return axios
      .post(url, data, {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data`,
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
      <canvas ref={testInput} width="700" height="700"></canvas>
    </Layout>
  )
}

export default Home
