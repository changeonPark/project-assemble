import type { NextPage } from "next"
import { useMoralis } from "react-moralis"

import { Layout } from "@base/components"

import axios from "axios"

import { useEffect, useRef, useState } from "react"
import {
  Customizing_M_contractAddress,
  Customizing_M_abi,
} from "data/cmcontract"
let Web3 = require("web3")
declare let window: any

// import { useEffect, useRef } from "react"
import { dataURItoBlob } from "@base/utils"

const Home: NextPage = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [background, setBackground] = useState("")
  const [faceFrame, setFaceFrame] = useState("")
  const [hair, setHair] = useState("")
  const [eye, setEye] = useState("")
  const [nose, setNose] = useState("")
  const [mouth, setMouth] = useState("")

  const onClickLogin = () => {
    authenticate({
      signingMessage: "여소 좀 해주세요 ㅠㅜ",
    })
  }

  //TEST for FILE UPLOAD in PINATA
  const testInput = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!testInput.current || !isAuthenticated) return
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
  }, [testInput, isAuthenticated])

  //SafeMint for coutomizing Master piece
  async function safeMint(tokenURL: any) {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      let account = user!.get("ethAddress")
      let contract = new window.web3.eth.Contract(
        Customizing_M_abi,
        Customizing_M_contractAddress
      )
      //0.01 이더리움 : 1000000000000000
      let total_value = 10000000000000000

      await contract.methods
        .safeMint(tokenURL)
        .estimateGas({
          from: account,
          gas: 6000000,
          value: total_value,
        })
        .then(function (gasAmount: any) {
          let estmated_gas = gasAmount
          console.log("gas :" + estmated_gas)
          contract.methods
            .safeMint(tokenURL)
            .send({
              from: account,
              gas: estmated_gas,
              value: total_value,
            })
            .on("transactionHash", (txid: any) => {
              console.log(txid)
            })
            .once("allEvents", (allEvents: any) => {
              console.log(allEvents)
            })
            .once("Transfer", (transferEvent: any) => {
              console.log(transferEvent)
            })
            .once("receipt", (receipt: any) => {
              alert("민팅에 성공하였습니다.")
            })
            .on("error", (error: any) => {
              alert("민팅에 실패하였습니다.")
              console.log(error)
            })
        })
        .catch(function (error: any) {
          console.log(error)
          alert("민팅에 실패하였습니다.")
        })
    }
  }

  const goPin = async () => {
    //   // Cutomizing Masterpiece 완성품
    const CM = {
      name: name,
      description: description,
      background: background,
      faceframe: faceFrame,
      hair: hair,
      eye: eye,
      nose: nose,
      mouth: mouth,
    }

    console.log("Start Upload IMG FILE")

    if (!testInput.current) return
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
    const data = new FormData()
    //https://gateway.pinata.cloud/ipfs/QmYH9S5XtH83MS6dJyCRXvPUx2nnKEfqtcBS6nm7gSpyR8
    //https://yt3.ggpht.com/ytc/AKedOLQbGU7E36ebO2GboqjekjMHShyKDB4cXao0TbDi0A=s900-c-k-c0x00ffffff-no-rj

    //Img Data 에 추가 과정
    const canvasResult = testInput.current.toDataURL("image/png")
    const uploadImg = dataURItoBlob(canvasResult)
    data.append("file", uploadImg)

    console.log(uploadImg)

    //피나타 내부 메타 데이터 data에 추가
    const metadata = JSON.stringify({
      name: "apple",
      keyvalues: {
        color: "white",
        skin: "black",
      },
    })
    data.append("pinataMetadata", metadata)

    return (
      axios
        .post(url, data, {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": `multipart/form-data`,
            pinata_api_key: process.env.NEXT_PUBLIC_PIN_KEY!,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_PIN_SECRET_KEY!,
          },
        })
        //피나타 사진 업로드 성공
        .then(function (res: any) {
          //피나타 IPFS cid 값
          console.log(res.data.IpfsHash)
          // res.data.IpfsHash == 이미지 IPFS cid
          const JSONBody = {
            /* The "pinataMetadata" object will not be part of your content added to IPFS */
            /* Pinata simply stores the metadata provided to help you easily query your JSON object pins */
            pinataOptions: {
              cidVersion: 0,
              customPinPolicy: 0,
            },
            pinataMetadata: {
              name: CM.name,
              keyvalues: {
                customKey: "sample",
                customKey2: "sample2",
              },
            },
            /* The contents of the "pinataContent" object will be added to IPFS */
            /* The hash provided back will only represent the JSON contained in this object */
            /* The JSON the returned hash links to will NOT contain the "pinataMetadata" object above */
            pinataContent: {
              name: CM.name,
              description: CM.description,
              image: `ipfs://${res.data.IpfsHash}`,
              attributes: [
                {
                  trait_type: "background",
                  value: CM.background,
                },

                {
                  trait_type: "faceframe",
                  value: CM.faceframe,
                },

                {
                  trait_type: "hair",
                  value: CM.hair,
                },

                {
                  trait_type: "eye",
                  value: CM.eye,
                },

                {
                  trait_type: "nose",
                  value: CM.nose,
                },

                {
                  trait_type: "mouth",
                  value: CM.mouth,
                },
              ],
            },
          }

          console.log("Start Upload Json FILE")
          const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`

          return axios
            .post(url, JSONBody, {
              headers: {
                pinata_api_key: process.env.NEXT_PUBLIC_PIN_KEY!,
                pinata_secret_api_key: process.env.NEXT_PUBLIC_PIN_SECRET_KEY!,
              },
            })
            .then(function (res: any) {
              console.log(res)
              //alert("민팅에 성공하였습니다.")
              //민팅 함수 연결
              console.log(res.data.IpfsHash)
              safeMint(`ipfs://${res.data.IpfsHash}`)
            })
            .catch(function (err: any) {
              console.log(err)
              alert("Json 파일 업로드에 실패하였습니다.")
              //민팅 함수 연결
            })
        })
        .catch(function (err: any) {
          console.log("err")
        })
    )
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
        <>
          <p>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={e => setName(e.target.value)}
              placeholder="name"
            />
          </p>

          <p>
            <input
              type="text"
              id="description"
              name="description"
              required
              onChange={e => setDescription(e.target.value)}
              placeholder="description"
            />
          </p>

          <p>
            <input
              type="text"
              id="background"
              name="background"
              required
              onChange={e => setBackground(e.target.value)}
              placeholder="background"
            />
          </p>

          <p>
            <input
              type="text"
              id="faceframe"
              name="faceframe"
              required
              onChange={e => setFaceFrame(e.target.value)}
              placeholder="faceframe"
            />
          </p>

          <p>
            <input
              type="text"
              id="hair"
              name="hair"
              required
              onChange={e => setHair(e.target.value)}
              placeholder="hair"
            />
          </p>

          <p>
            <input
              type="text"
              id="eye"
              name="eye"
              required
              onChange={e => setEye(e.target.value)}
              placeholder="eye"
            />
          </p>

          <p>
            <input
              type="text"
              id="nose"
              name="nose"
              required
              onChange={e => setNose(e.target.value)}
              placeholder="nose"
            />
          </p>

          <p>
            <input
              type="text"
              id="mouth"
              name="mouth"
              required
              onChange={e => setMouth(e.target.value)}
              placeholder="mouth"
            />
          </p>

          <button
            className="mt-10 block bg-gray-800 py-3 px-4 text-lg font-bold uppercase text-white hover:bg-gray-900"
            onClick={() => goPin()}
          >
            goPin
          </button>
          <canvas ref={testInput} width="300" height="300"></canvas>
        </>
      )}
    </Layout>
  )
}

export default Home
