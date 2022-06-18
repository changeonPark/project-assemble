import { useEffect, useState, useRef } from "react"
//import { CategoryTab, PuzzleList } from "./components"
import Router, { useRouter } from "next/router"
import Switch from "react-switch"
import { Puzzle_M_contractAddress, Puzzle_M_abi } from "data/pmcontract"
import { useMoralis } from "react-moralis"
import { dataURItoBlob } from "@base/utils"
import axios from "axios"
let Web3 = require("web3")
declare let window: any

export type CategoryType = "NewPicture" | "MyStatus"

const Puzzle_createContainer = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()
  const [category, setCategory] = useState<CategoryType>("NewPicture")
  const router = useRouter()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  //false : 배포 안함 true : 배포함
  const [DeployFlag, setDeployFlag] = useState(true)
  const [hair, setHair] = useState("")
  const [eye, setEye] = useState("")
  const [nose, setNose] = useState("")
  const [mouth, setMouth] = useState("")
  //TEST for FILE UPLOAD in PINATA
  const testInput = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    console.log(category)

    //Image preview
    //preview()
    // return () => preview()
    preview()
  }, [category, image])

  const preview = () => {
    console.log("preview start")
    if (!image) {
      console.log("image is null")
      return false
    }

    //const imgEl: any = document.querySelector(".img__box")
    const imgEl: any = document.querySelector(".yangtest")

    const reader = new FileReader()

    reader.onload = () => {
      console.log("imgEl:", imgEl)
      // (imgEl.style.backgroundImage = `url(${reader.result})`)
      imgEl.src = `${reader.result}`
      console.log("reader.result:", reader.result)
    }

    reader.readAsDataURL(image[0])
  }

  const createPuzzle = () => {
    console.log("createPuzzle clicked")
    //router.push("/puzzle_create")
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    goPin()
    //Mint 기능 구현
    //이름 , 이미지 , 설명 으로 구현.
    //다른 사람들 에게 배포 할건지 말건지
  }
  //Input File onChange Listener
  const onLoadFile = (e: any) => {
    const file = e.target.files
    console.log(file)
    setImage(file)
    // preview()
  }

  //SafeMint
  async function safeMint(tokenURL: any) {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      let account = user!.get("ethAddress")
      let contract = new window.web3.eth.Contract(
        Puzzle_M_abi,
        Puzzle_M_contractAddress
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
    const PM = {
      name: name,
      description: description,
      DeployFlag: DeployFlag,
    }

    console.log("Start Upload IMG FILE")

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const data = new FormData()
    //https://gateway.pinata.cloud/ipfs/QmYH9S5XtH83MS6dJyCRXvPUx2nnKEfqtcBS6nm7gSpyR8
    //https://yt3.ggpht.com/ytc/AKedOLQbGU7E36ebO2GboqjekjMHShyKDB4cXao0TbDi0A=s900-c-k-c0x00ffffff-no-rj

    //Img Data 에 추가 과정
   // if (!testInput.current) return
   // const canvasResult = testInput.current.toDataURL("image/png")
    if(!image) return
    const uploadImg = image[0]
    console.log('uploadImg:',uploadImg)
    //Inpute Data 로 수정
    data.append("file", uploadImg)

    console.log(uploadImg)

    //피나타 내부 메타 데이터 data에 추가
    const metadata = JSON.stringify({
      name: PM.name,
      keyvalues: {
        color: "7777",
        skin: "7777",
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
              name: PM.name,
              keyvalues: {
                customKey: "sample",
                customKey2: "sample2",
              },
            },

            /* The contents of the "pinataContent" object will be added to IPFS */
            /* The hash provided back will only represent the JSON contained in this object */
            /* The JSON the returned hash links to will NOT contain the "pinataMetadata" object above */
            pinataContent: {
              name: PM.name,
              description: PM.description,
              image: `ipfs://${res.data.IpfsHash}`,
              attributes: [
                {
                  trait_type: "DeployFlag",
                  value: PM.DeployFlag,
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
              console.log("METAData", JSONBody)
              safeMint(`ipfs://${res.data.IpfsHash}`)
            })
            .catch(function (err: any) {
              console.log(err)
              alert("Json 파일 업로드에 실패하였습니다.")
              //민팅 함수 연결
            })
        })
        .catch(function (err: any) {
          console.log(err)
        })
    )
  }

  return (
    <section>
      <div className="flex grid grid-cols-1 place-items-center">
        <span className="text-6xl font-bold ">Create New Item</span>
        <span className="mt-7 mb-7 text-xs">Required field</span>
        {/* <div className="img__box">이미지</div> */}
        <form
          className="mr-10 flex grid grid-cols-1 place-content-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="bolder-dashed shrink-0 border-4 border-indigo-500/75">
            <img
              className="yangtest h-80  w-80 object-cover "
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
              alt="Current profile photo"
            />
          </div>

          <label className="block">
            <span className="sr-only">chose file</span>

            <input
              required
              type="file"
              accept="image/png, image/jpeg"
              onChange={onLoadFile}
              className="block w-full text-sm text-slate-500
              file:mr-4 file:rounded-full file:border-0
              file:bg-violet-50 file:py-2
              file:px-4 file:text-sm
              file:font-semibold file:text-violet-700
              hover:file:bg-violet-100
              "
            />
          </label>

          <span className="text-xl font-bold">Name *</span>
          <input
            className="bolder-dashed shrink-0 border-4 border-indigo-500/75"
            type="text"
            id="name"
            name="name"
            required
            onChange={e => setName(e.target.value)}
            placeholder="item Name"
          />

          <span className="text-xl font-bold">Description *</span>
          <textarea
            className="bolder-dashed shrink-0 border-4 border-indigo-500/75"
            //value={this.state.textAreaValue}
            onChange={e => setDescription(e.target.value)}
            rows={5}
            cols={5}
          />

          <label htmlFor="material-switch" className="flex items-stretch">
            <span>Deploy or Private</span>
            <Switch
              checked={DeployFlag}
              onChange={flag => setDeployFlag(flag)}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch "
              id="material-switch"
            />
          </label>

          <button
            className="mt-10 block bg-gray-800 py-3 px-4 text-lg font-bold uppercase text-white hover:bg-gray-900"
            // onClick={() => createPuzzle()}
          >
            Create
          </button>
        </form>
      </div>
    </section>
  )
}

export default Puzzle_createContainer
