import Image from "next/image"

import { cls } from "@base/utils"
import { CategoryType } from "puzzle"
import { useNFTBalances } from "react-moralis"
import { useMoralis } from "react-moralis"
import { Cutomizing_piece_contractAddress } from "data/contract"
import { Customizing_M_contractAddress } from "data/cmcontract"
import { useEffect, useState } from "react"
//import Moralis from "moralis"
import { useMoralisWeb3Api } from "react-moralis"

import React from "react"
//import { useMoralisWeb3Api } from "react-moralis";

interface Props {
  category: CategoryType
}

const PuzzleList = ({ category }: Props) => {
  const { getNFTBalances, data } = useNFTBalances()
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()

  const [nftList, setNFTList] = useState([])

  //Moralist NFT 가져오기
  // useEffect(() => {
  //   getNFTBalances({
  //     params: {
  //       chain: "rinkeby",
  //       address: user!.get("ethAddress"),
  //     },
  //   })
  //   // data?.result?.map((nft: any, index) => {
  //   //   console.log("in useEffect", nft)
  //   // })
  // }, [])

  const Web3Api = useMoralisWeb3Api()

  const fetchNFTsForContract = async (address: String) => {
    const options: any = {
      chain: "rinkeby",
      address: user!.get("ethAddress"),
      token_address: address,
    }
    const ethNFTs = await Web3Api.account.getNFTsForContract(options)
    console.log(ethNFTs)
    console.log(ethNFTs.result)
    const result = []
    ethNFTs.result?.forEach(element => {
      console.log(element.token_uri)
      getJsonDataFromToken_url(element.token_uri)
      //result.push()
    })
    // if (ethNFTs.result) {

    // }

    // ethNFTs.result.forEach(element => {

    // });
  }

  //더미 데이터 적용 예제
  const listDummy = (category: CategoryType) => {
    const result = []
    for (let i = 0; i < 12; i++) {
      result.push(
        <div
          className="fade-in flex cursor-pointer flex-col items-center"
          key={i}
        >
          <div className="relative h-full min-h-[150px] w-full min-w-[150px]">
            <Image
              src={
                category === "NewPicture"
                  ? "/img/custom-dummy.png"
                  : "/img/puzzle-dummy.png"
              }
              //alt="ghostLoad"
              layout="fill"
              className="z-0 rounded-lg object-contain"
            />
          </div>
          <span className="mt-2 mb-[6px] text-sm">No. {i}</span>
          <span className="text-xs">
            {category} #{i}
          </span>
        </div>
      )
    }

    return result
  }

  const getJsonDataFromToken_url = async (token_uri: any) => {
    const res = await fetch(token_uri)
    const data = await res.json()
    console.log(data)
  }

  //Customizing Piece 실제 예제 적용 예정
  const listNFT = (category: CategoryType) => {
    if (isAuthenticated && user) {
      //로그인 된 부분 유저가 가지고 있는 것 만 가져오기.

      const result: any = []

      //카테고리 별 contractAddress 수정
      var contractAddress = ""
      contractAddress = Cutomizing_piece_contractAddress
      //"NewPicture" | "MyStatus"
      if (category === "NewPicture") {
        //listDummy(category)
        //return
        contractAddress = Cutomizing_piece_contractAddress
        // contractAddress = Customizing_M_contractAddress
      } else {
        contractAddress = Customizing_M_contractAddress
      }
      //데이터 만들어서 저장 ?

      //console.log(data)
      {
        data &&
          data?.result?.map((nft: any, index) => (
            <>
              {nft.token_address == contractAddress &&
                result.push(
                  <>
                    {console.log(nft)}
                    <div
                      className="fade-in flex cursor-pointer flex-col items-center"
                      key={index}
                    >
                      <div className="relative h-full min-h-[150px] w-full min-w-[150px]">
                        <span className="text-xs">{nft.image}</span>
                        {nft.image ? (
                          <p>
                            <Image
                              src={nft.image}
                              alt="ghostLoad"
                              layout="fill"
                              className="z-0 rounded-lg object-contain"
                            />
                            <span className="mt-2 mb-[6px] text-sm">
                              No. {index}
                            </span>
                            <span className="text-xs">
                              {category} #{index}
                            </span>
                          </p>
                        ) : (
                          <p>
                            <label>토큰URI:{nft.token_uri} </label>
                            <span className="mt-2 mb-[6px] text-sm">
                              No. {index}
                            </span>
                            <span className="text-xs">
                              {category} #{index}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
            </>
          ))
      }
      return result
    }
    //로그인 안되있을 경우
    else {
      console.log("NotLogin")
      listDummy(category)
    }
  }

  const listNFT2 = (category: CategoryType) => {
    if (isAuthenticated && user) {
      //로그인 된 부분 유저가 가지고 있는 것 만 가져오기.

      const result: any = []

      //카테고리 별 contractAddress 수정
      var contractAddress = ""
      contractAddress = Cutomizing_piece_contractAddress
      if (category === "NewPicture") {
        contractAddress = Cutomizing_piece_contractAddress
        // contractAddress = Customizing_M_contractAddress
      } else {
        contractAddress = Customizing_M_contractAddress
      }
      fetchNFTsForContract(contractAddress)
      //데이터 만들어서 저장 ?

      //console.log(data)
      {
        data &&
          data?.result?.map((nft: any, index) => (
            <>
              {nft.token_address == contractAddress &&
                result.push(
                  <>
                    <div
                      className="fade-in flex cursor-pointer flex-col items-center"
                      key={index}
                    >
                      <div className="relative h-full min-h-[150px] w-full min-w-[150px]">
                        <span className="text-xs">{nft.image}</span>
                        {nft.image ? (
                          <p>
                            <Image
                              src={nft.image}
                              alt="ghostLoad"
                              layout="fill"
                              className="z-0 rounded-lg object-contain"
                            />
                            <span className="mt-2 mb-[6px] text-sm">
                              No. {index}
                            </span>
                            <span className="text-xs">
                              {category} #{index}
                            </span>
                          </p>
                        ) : (
                          <p>
                            <label>토큰URI:{nft.token_uri} </label>
                            <span className="mt-2 mb-[6px] text-sm">
                              No. {index}
                            </span>
                            <span className="text-xs">
                              {category} #{index}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
            </>
          ))
      }
      return result
    }
    //로그인 안되있을 경우
    else {
      console.log("NotLogin")
      listDummy(category)
    }
  }
  

  return (
    
    <div
      className={cls(
        "grid grid-cols-2 gap-[15px]",
        "md:grid-cols-3",
        "lg:grid-cols-4 lg:gap-[26px]"
      )}
    >
      
      {listDummy(category)}
    </div>
  )
}

export default PuzzleList
