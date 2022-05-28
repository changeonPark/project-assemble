import { Layout } from "@base/components"
import { NextPage } from "next"

import {
  Customizing_M_contractAddress,
  Customizing_M_abi,
} from "data/cmcontract"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
let Web3 = require("web3")
declare let window: any
//pinata api

const Buy: NextPage = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()
  //민팅 함수
  async function safeMint() {
    //console.log(amount)
    console.log(isAuthenticated)
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
        .safeMint(
          "ipfs://Qme9XnmsaBjaRWtg2We5CueNgPzt7ioJSKipgUnfzQBMWd/1.json"
        )
        .estimateGas({
          from: account,
          gas: 6000000,
          value: total_value,
        })
        .then(function (gasAmount: any) {
          let estmated_gas = gasAmount
          console.log("gas :" + estmated_gas)
          contract.methods
            .safeMint(
              "ipfs://Qme9XnmsaBjaRWtg2We5CueNgPzt7ioJSKipgUnfzQBMWd/1.json"
            )
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
  const onClickLogin = () => {
    authenticate({
      signingMessage: "프론트 킹 박찬건!!존경!",
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

          <button className="lg:ml-4" onClick={() => safeMint()}>
            safeMint
          </button>

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

export default Buy
