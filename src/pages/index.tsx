import type { NextPage } from "next"
import { useMoralis } from "react-moralis"

import { Layout } from "@base/components"

import axios from "axios"
import { useEffect, useRef, useState } from "react"
import {
  Cutomizing_M_contractAddress,
  Cutomizing_M_abi,
} from "data/cmcontract"
let Web3 = require("web3")
declare let window: any

const Home: NextPage = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [background,setBackground] = useState('')
  const [faceframe,setfaceframe] = useState('')
  const [hair,setHair] = useState('')
  const [eye,setEye] = useState('')    
  const [nose,setNose] = useState('')
  const [mouth,setMouth] = useState('')

  const onClickLogin = () => {
    authenticate({
      signingMessage: "여소 좀 해주세요 ㅠㅜ",
    })
  }

  const handleChange = (value: any) => {
    // // let stringValue = value.target.value ;
    // // console.log(typeof(stringValue));
    //  let NumberValue =  BigNumber(value.target.value) ;
    // // console.log(typeof(NumberValue));

    // setAmount(NumberValue) ;
    console.log(value.target.id);
    if(value.target.id == "name" ){
      setName(value.target.value);
    }
    else if(value.target.id == "description" ){
      setDescription(value.target.value);
    }
    else if(value.target.id == "background" ){
      setBackground(value.target.value);
    }
    else if(value.target.id == "faceframe" ){
      setfaceframe(value.target.value);
    }
    else if(value.target.id == "hair" ){
      setHair(value.target.value);
    }
    else if(value.target.id == "eye" ){
      setEye(value.target.value);
    }
    else if(value.target.id == "nose" ){
      setNose(value.target.value);
    }
    else if(value.target.id == "mouth" ){
      setMouth(value.target.value);
    }
  }




  //TEST for FILE UPLOAD in PINATA
  const testInput = useRef<HTMLInputElement>(null)

  //SafeMint for coutomizing Master piece
  async function safeMint(tokenURL:any) {
    //console.log(amount)
    console.log(isAuthenticated)
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      let account = user!.get("ethAddress")
      let contract = new window.web3.eth.Contract(
        Cutomizing_M_abi,
        Cutomizing_M_contractAddress
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
  const goPin = () => {
    // Cutomizing Masterpiece 완성품
    const CM = {
      name : name,
      description : description,
      background : background,
      faceframe : faceframe,
      hair : hair,
      eye : eye,
      nose : nose,
      mouth : mouth
    }
    console.log("Start Upload IMG FILE");
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const data = new FormData()
    if (testInput.current?.files){
      console.log("test");
      console.log(typeof(testInput.current.files[0]));
      console.log(testInput.current.files[0]);
      data.append("file", testInput.current.files[0])
    }
     
    const metadata = JSON.stringify({
      name: "moko2",
      keyvalues: {
        color: "1234",
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
      .then(function(res:any) {
        //피나타 IPFS cid 값
        console.log(res.data.IpfsHash)
        // res.data.IpfsHash == 이미지 IPFS cid

        //Json 작성
        /*
        필요한 데이터
        "name" = 사용자지정 String + #tokenId
        "description" = 사용자지정 String
        "image" = "ipfs://${res.data.IpfsHash}"
        "attributes" : 
        [
          {
            "trait_type" : "background",
            "value" : "black"
          },

          {
            "trait_type" : "faceframe",
            "value" : "circle"
          },

          {
            "trait_type" : "hair",
            "value" : "curly"
          },

          {
            "trait_type" : "eye",
            "value" : sunglass
          },

          {
            "trait_type" : "nose",
            "value" : "high"
          },
          
          {
            "trait_type" : "mouth",
            "value" : "sexy"
          }
    
          
        ]
    
        
        */
      const JSONBody = 
      {
      /* The "pinataMetadata" object will not be part of your content added to IPFS */
      /* Pinata simply stores the metadata provided to help you easily query your JSON object pins */
        pinataOptions: {
          cidVersion: 0,
          customPinPolicy: 0
        },
        pinataMetadata: {
          name: CM.name,
          keyvalues: {
              customKey: "sample",
              customKey2: "sample2"
          }
        },
        /* The contents of the "pinataContent" object will be added to IPFS */
        /* The hash provided back will only represent the JSON contained in this object */
        /* The JSON the returned hash links to will NOT contain the "pinataMetadata" object above */
        pinataContent: {
            //name: "ysy"
        name : CM.name,
            
        description : CM.description,
        image : `ipfs://${res.data.IpfsHash}`,

        attributes : 
        [
          {
            "trait_type" : "background",
            "value" : CM.background
          },

          {
            "trait_type" : "faceframe",
            "value" : CM.faceframe
          },

          {
            "trait_type" : "hair",
            "value" : CM.hair
          },

          {
            "trait_type" : "eye",
            "value" : CM.eye
          },

          {
            "trait_type" : "nose",
            "value" : CM.nose
          },
          
          {
            "trait_type" : "mouth",
            "value" : CM.mouth
          }
    
          
        ]
        }
      }
      
      console.log("Start Upload Json FILE");
      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

      return axios
          .post(url, JSONBody, {
              headers: {
                pinata_api_key: process.env.NEXT_PUBLIC_PIN_KEY!,
                pinata_secret_api_key: process.env.NEXT_PUBLIC_PIN_SECRET_KEY!,
              }
          })
          .then(function (res:any) {
              console.log(res);
              //alert("민팅에 성공하였습니다.")
              //민팅 함수 연결
              console.log(res.data.IpfsHash);
              safeMint("ipfs://${res.data.IpfsHash}");
              
          })
          .catch(function (err:any) {
            
              console.log(err);
             alert("Json 파일 업로드에 실패하였습니다.")
             //민팅 함수 연결
          });
      
        })
      .catch(function(err:any){
        console.log("err")
      })
  }

  return (
    <Layout title="Home" hasHeader>
      {!isAuthenticated ? (
        <>
         
          <button
            className="mt-10 block bg-gray-800 py-3 px-4 text-lg uppercase text-white hover:bg-gray-900"
            onClick={() => onClickLogin()}
          >
            Login
          </button>
        </>
      ) : (
        <>
        <input
        type="file"
        ref={testInput}
         />

         <p>
         <input type="text" id="name" name="name" required onChange={handleChange} placeholder="name" />
         </p>

         <p>
         <input type="text" id="description" name="description" required onChange={handleChange} placeholder="description" />
         </p>

         <p>
         <input type="text" id="background" name="background" required onChange={handleChange} placeholder="background" />
         </p>

         <p>
         <input type="text" id="faceframe" name="faceframe" required onChange={handleChange} placeholder="faceframe" />
         </p>

         <p>
         <input type="text" id="hair" name="hair" required onChange={handleChange} placeholder="hair" />
         </p>

         <p>
         <input type="text" id="eye" name="eye" required onChange={handleChange} placeholder="eye" />
         </p>

         <p>
         <input type="text" id="nose" name="nose" required onChange={handleChange} placeholder="nose" />
         </p>

         <p>
         <input type="text" id="mouth" name="mouth" required onChange={handleChange} placeholder="mouth" />
         </p>
         
        <button className="mt-10 block bg-gray-800 py-3 px-4 text-lg font-bold uppercase text-white hover:bg-gray-900" onClick={()=>goPin()}>
         goPin
        </button>
        </>
      )}
    </Layout>
  )
}

export default Home