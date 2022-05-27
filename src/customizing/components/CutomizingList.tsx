import Image from "next/image"

import { cls } from "@base/utils"
import { CategoryType } from "customizing"
import { useNFTBalances } from "react-moralis";
import { useMoralis } from "react-moralis"
import {Cutomizing_piece_contractAddress} from "data/contract"
import {Cutomizing_M_contractAddress} from "data/cmcontract"
import { useEffect } from "react";



interface Props {
  category: CategoryType
}

const CustomizingList = ({ category }: Props) => {

  const {getNFTBalances , data} = useNFTBalances()
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } = useMoralis()

  //Moralist NFT 가져오기
  useEffect( ()=> {
    getNFTBalances({
        params:{
            chain: "rinkeby",
            address:user?.get('ethAddress')
        }
    })
},[])

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
                category === "PIECE"
                  ? "/img/custom-dummy.png"
                  : "/img/puzzle-dummy.png"
              }
              alt="ghostLoad"
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

  //Customizing Piece 실제 예제 적용 예정
  const listNFT = (category: CategoryType) => {
   


    if(isAuthenticated){
      //로그인 된 부분 유저가 가지고 있는 것 만 가져오기.
 
      const result:any = []

      //카테고리 별 contractAddress 수정
      var contractAddress = '' ;
      contractAddress = Cutomizing_piece_contractAddress
      if(category === "PIECE"){
        contractAddress = Cutomizing_piece_contractAddress
      }else{
        contractAddress = Cutomizing_M_contractAddress
      }

      {data && data?.result?.map((nft , index) => (
        <>
       
       { nft.token_address == contractAddress && 
        result.push(
        <div
          className="fade-in flex cursor-pointer flex-col items-center"
          key={index}
        >
          <div className="relative h-full min-h-[150px] w-full min-w-[150px]">
           
            {nft.image && 
              {/* {console.log(nft)} */}
            <Image src={nft.image} alt="ghostLoad" layout="fill" className="z-0 rounded-lg object-contain"/>
            <span className="mt-2 mb-[6px] text-sm">No. {index}</span>
            <span className="text-xs">
              {category} #{index}
            </span>
            }
          
          </div>
         



        </div>

        )
     }
     </>
      
    ))}

    return result
     
    }
    //로그인 안되있을 경우
    else{
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
      {listNFT(category)}
    </div>
  )
}

export default CustomizingList
