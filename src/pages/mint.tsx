import { NextPage } from "next"
import Link from "next/link"

import { useMoralis } from "react-moralis"
import {
  Cutomizing_piece_contractAddress,
  Cutomizing_piece_abi,
} from "data/contract"
import { useEffect, useState } from "react"
let Web3 = require("web3")
declare let window: any
import { Layout } from "@base/components"

var BigNumber = require("big-number")
const Mint: NextPage = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()
  let Web3 = require("web3")
  const [amount, setAmount] = useState(0)
  //Amount Input Number 핸들러
  const handleChange = (value: any) => {
    // let stringValue = value.target.value ;
    // console.log(typeof(stringValue));
    let NumberValue = BigNumber(value.target.value)
    // console.log(typeof(NumberValue));

    setAmount(NumberValue)
  }

  //handleChange(event) {    this.setState({value: event.target.value});  }
  //민팅 함수
  async function publicMint() {
    console.log(amount)
    console.log(isAuthenticated)
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      let account = user!.get("ethAddress")
      let contract = new window.web3.eth.Contract(
        Cutomizing_piece_abi,
        Cutomizing_piece_contractAddress
      )
      //0.01 이더리움 : 1000000000000000
      let total_value = amount * 1000000000000000

      await contract.methods
        .publicMint(amount)
        .estimateGas({
          from: account,
          gas: 6000000,
          value: total_value,
        })
        .then(function (gasAmount: any) {
          let estmated_gas = gasAmount
          console.log("gas :" + estmated_gas)
          contract.methods
            .publicMint(amount)
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

  function test() {
    console.log(typeof amount)
    console.log(isAuthenticated)
  }

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
        <>
          <h1>민팅페이지</h1>
          <h2>
            <Link href="/">
              <a>홈으로 돌아가기</a>
            </Link>
          </h2>
          <form>
            <label>Amount (1 to 10 number):</label>
            <p>
              <input
                type="number"
                step={1}
                onChange={handleChange}
                id="amount"
                name="amount"
                placeholder="1"
              />
            </p>
          </form>
          <button className="lg:ml-4" onClick={() => publicMint()}>
            Mint
          </button>
          {/* <button className="mt-10 block bg-gray-800 py-3 px-4 text-lg font-bold uppercase text-white hover:bg-gray-900">
              {user?.get("ethAddress")}
            </button> */}
          <button
            className="mt-10 block bg-gray-800 py-3 px-4 text-lg font-bold uppercase text-white hover:bg-gray-900"
            onClick={() => logout()}
          >
            LogOut
          </button>
        </>
      )}
    </Layout>
  )
}

export default Mint
