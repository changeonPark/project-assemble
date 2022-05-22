import { NextPage } from "next"
import Link from "next/link"

import { useMoralis } from "react-moralis"
import { abi, contractAddress } from "data/contract"
let Web3 = require("web3")
declare let window: any

import { Layout } from "@base/components"

const Mint: NextPage = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()
  let Web3 = require("web3")

  function test() {
    console.log("test")
    ;(async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        let account = user?.get("ethAddress")

        let contract = new window.web3.eth.Contract(abi, contractAddress)
        //0.1 이더리움 : 100000000000000000
        contract.methods
          .safeMint(account)
          .send({ from: account, value: "100000000000000000" })
      }
    })()
  }

  return (
    <Layout title="Mint" hasHeader>
      <h1>민팅페이지</h1>
      <h2>
        <Link href="/">
          <a>홈으로 돌아가기</a>
        </Link>
        <button className="lg:ml-4" onClick={() => test()}>
          Mint
        </button>
      </h2>
    </Layout>
  )
}

export default Mint
