import { useEffect, useState, useRef } from "react"
//import { CategoryTab, PuzzleList } from "./components"
import Router, { useRouter } from "next/router"
import Switch from "react-switch"
import { Puzzle_M_contractAddress, Puzzle_M_abi } from "data/pmcontract"
import { useMoralis } from "react-moralis"
import { dataURItoBlob } from "@base/utils"
import Image from "next/image"
//import console from "console"
let Web3 = require("web3")
declare let window: any

export type CategoryType = "NewPicture" | "MyStatus"

const Puzzle_gameContainer = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()
  const [category, setCategory] = useState<CategoryType>("NewPicture")
  const router = useRouter()

  var rows = 5
  var colums = 5

  const [curTile, setCurTile] = useState<HTMLImageElement | null>(null)
  const [otherTile, setOtherTile] = useState<HTMLImageElement | null>(null)

  const [imgArr, setImgArr] = useState<string[]>([])
  const [turns, setTurns] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // let imgs : any[] = []
    // imgs.fill('/img/blank.jpg');
    //   let boardImgs:string[]=[]

    //   boardImgs.fill('/img/blank.jpg');
    //   let PieceImgs= []
    //   console.log("clicked")

    //   for (let i = 1; i <= rows * colums; i++) {
    //     boardImgs.push('/img/blank.jpg') //put "1" to "25" into the array (puzzle images names)
    //   }
    //  //init Board Image
    //  //setImgBoardArr(imgBoardArr => [...imgBoardArr,'/img/blank.jpg']);
    //  setImgBoardArr(boardImgs);
    //  //init PieceImg
    //  let pieces = []

    //  let index  = 0 ;

    //   //shuffle
    //   for (let i = 1; i <= rows * colums; i++) {
    //     pieces.push(i.toString()) //put "1" to "25" into the array (puzzle images names)
    //   }

    //   pieces.reverse()
    //   for (let i = 0; i < pieces.length; i++) {
    //     let j = Math.floor(Math.random() * pieces.length)

    //     //swap
    //     let tmp: any = pieces[i]
    //     pieces[i] = pieces[j]
    //     pieces[j] = tmp
    //   }

    //   for (let i = 0; i < pieces.length; i++) {
    //     ///let tile = document.createElement("img")
    //     //tile.src = "./images/" + pieces[i] + ".jpg"
    //    // console.log("index:", pieces[i])
    //     let img = "/img/" + pieces[i] + ".jpg"
    //     //setImgPieceArr(imgPieceArr => [...imgPieceArr,img] )
    //     //let img = "/img/" + pieces[i] + ".jpg"
    //     PieceImgs[i] = img
    //   }

    //   setImgPieceArr(PieceImgs)
    //   //console.log('BoardImage Arr result test',imgBoardArr);
    //   //console.log('PieceImage Arr result test',imgPieceArr);

    //console.log('board', imgBoardArr)
    // console.log('imgArr', imgArr)
    // //성공 시 알림
    // console.log('성공 알림',imgArr)
    // let success = true ;
    // for (let i  = 0 ; i<25 ;i++){
    //   if(imgArr[i]){

    //     if (!imgArr[i].includes((i+1).toString())){
    //       success = false
    //       break
    //     }
    //   }else{
    //     success = false
    //   }

    // }
    // if(success){
    //   alert('성공하셨습니다.')
    // }

    //그려진 이후에 확인을 해보자.
    if (isSuccess) {
      alert("성공 하셨습니다.")
    }
    //성공 시 알림
    console.log("성공 알림", imgArr)
    let success = true
    for (let i = 0; i < 25; i++) {
      if (imgArr[i]) {
        if (!imgArr[i].includes((i + 1).toString())) {
          success = false
          break
        }
      } else {
        success = false
      }
    }
    if (success) {
      setIsSuccess(true)
    } else {
      setIsSuccess(false)
    }
  }, [imgArr, turns ,isSuccess])

  const board = () => {
    console.log("BoardRendering")

    // let imgs : any[] = []
    // imgs.fill('/img/blank.jpg');
    // console.log(imgs)
    // setImgBoardArr(imgs)
    // setImgBoardArr(imgBoardArr => [...imgBoardArr,'/img/blank.jpg']);
    ///img/blank.jpg

    const result = []
    let index_board = 0

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < colums; c++) {
        result.push(
          <img
            //src="/img/blank.jpg"
            id={index_board.toString()}
            className="puzzle_game-board"
            src={imgArr[index_board]}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          ></img>
        )
        index_board = index_board + 1
      }
    }
    return result
  }

  //Piece
  const piece = () => {
    console.log("PieceRendering")
    let pieces = []
    const result = []
    let index_piece = 25
    let imgs: any[] = []

    //shuffle
    for (let i = 1; i <= rows * colums; i++) {
      pieces.push(i.toString()) //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse()
    for (let i = 0; i < pieces.length; i++) {
      let j = Math.floor(Math.random() * pieces.length)

      //swap
      let tmp: any = pieces[i]
      pieces[i] = pieces[j]
      pieces[j] = tmp
    }

    for (let i = 0; i < pieces.length; i++) {
      ///let tile = document.createElement("img")
      //tile.src = "./images/" + pieces[i] + ".jpg"
      // console.log("index:", pieces[i])
      let img = "/img/" + pieces[i] + ".jpg"
      imgs[i] = img
    }
    //setImgPieceArr(imgs)

    for (let i = 0; i < pieces.length; i++) {
      ///let tile = document.createElement("img")
      //tile.src = "./images/" + pieces[i] + ".jpg"
      //  console.log("index:", pieces[i])
      //let img = "/img/" + pieces[i] + ".jpg"
      //imgs[i] = img

      result.push(
        <img
          //src={img}
          id={index_piece.toString()}
          className="puzzle_game-piece"
          src={imgArr[index_piece]}
          draggable={true}
          onDragStart={dragStart}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
        ></img>
      )
      index_piece = index_piece + 1
    }

    return result
  }
  //DRAG TILES
  function dragStart(e: any) {
    console.log("dragStart", e)
    console.log("dragStart", e.target.src)
    //curTile : = this; //this refers to image that was clicked on for dragging
    setCurTile(e.target)
  }

  function dragOver(e: any) {
    e.preventDefault()
  }

  function dragEnter(e: any) {
    e.preventDefault()
  }

  function dragLeave() {}

  function dragDrop(e: any) {
    console.log("dragDrop", e)

    //otherTile = this; //this refers to image that is being dropped on
    setOtherTile(e.target)
  }

  function dragEnd(e: any) {
    setOtherTile(e.target)
    //CurTile 집을 떄 index 가져오기
    //이미지 어레이 값을 index에 대해서 변경 해주기 .

    console.log("dragEnd")
    if (curTile!.src.includes("blank")) {
      return
    }
    console.log("curTile:", curTile)
    console.log("otherTile:", otherTile)
    //let currImg = curTile?.src
    console.log("curID:", curTile?.id)
    //let otherImg = otherTile?.src
    console.log("otherID:", otherTile?.id)

    console.log("curImg.className = ", curTile?.className)
    console.log("otherImg.className = ", otherTile?.className)

    let currImg_idx = Number(curTile?.id)
    let otherImg_idx = Number(otherTile?.id)
    let tmp_img_arr: string[] = imgArr
    // let tmp_Pieces_arr:string[] =  imgPieceArr

    //현재 집힌 img
    let currImg = tmp_img_arr[currImg_idx]

    let otherImg = tmp_img_arr[otherImg_idx]
    // if(otherTile?.className === 'puzzle_game-piece'){
    //   otherImg = tmp_Pieces_arr[currImg_idx]
    // }else if(otherTile?.className === 'puzzle_game-board'){
    //   otherImg = tmp_Board_arr[currImg_idx]
    // }

    console.log("현재 집힌 img 값", currImg)
    //놓을때 집힌 img
    //tmp_Pieces_arr[otherImg_idx]
    console.log("놓은 img 값", otherImg)

    if (otherImg && currImg) {
      tmp_img_arr[currImg_idx] = otherImg
      tmp_img_arr[otherImg_idx] = currImg
    }

    setImgArr(tmp_img_arr)
    //turns + 1
    setTurns(turns + 1)

    // //성공 시 알림
    // console.log('성공 알림',imgArr)
    // for (let i  = 0 ; i<25 ;i++){
    //   if (!imgArr[i].includes((i+1).toString())){
    //     return
    //   }
    // }
    // alert('성공하셨습니다.')
  }

  const test2 = () => {
    let imgs_arr: string[] = []
    console.log("clicked")
    //Board
    for (let i = 1; i <= rows * colums; i++) {
      imgs_arr.push("/img/blank.jpg") //put "1" to "25" into the array (puzzle images names)
    }
    //piece
    let pieces = []
    //shuffle
    for (let i = 1; i <= rows * colums; i++) {
      pieces.push(i.toString()) //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse()
    for (let i = 0; i < pieces.length; i++) {
      let j = Math.floor(Math.random() * pieces.length)
      //swap
      let tmp: any = pieces[i]
      pieces[i] = pieces[j]
      pieces[j] = tmp
    }

    //Insert
    for (let i = 0; i < pieces.length; i++) {
      let img = "/img/" + pieces[i] + ".jpg"
      imgs_arr.push(img)
    }
    setImgArr(imgs_arr)
  }

  return (
    <div>
      <div id="board">{board()}</div>
      <h2>
        Turns:<span id="turns">{turns}</span>
      </h2>
      <div id="pieces">{piece()}</div>
      <button
        className="mt-10 block bg-gray-800 py-3 px-4 text-lg uppercase text-white hover:bg-gray-900"
        onClick={() => test2()}
      >
        GameStart
      </button>
    </div>
  )
}

export default Puzzle_gameContainer
