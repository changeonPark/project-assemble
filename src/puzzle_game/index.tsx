import { useEffect, useState, useRef } from "react"
//import { CategoryTab, PuzzleList } from "./components"
import Router, { useRouter } from "next/router"
import Switch from "react-switch"
import { Puzzle_M_contractAddress, Puzzle_M_abi } from "data/pmcontract"
import { useMoralis } from "react-moralis"
import { dataURItoBlob } from "@base/utils"
import Image from "next/image"
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

  const [curTile, setCurTile] = useState(null)
  const [otherTile, setOtherTile] = useState(null)
  const [turns, setTurns] = useState(0)

  const board = () => {
    const result = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < colums; c++) {
        result.push(
          //   <Image
          //     src="/img/custom-dummy.PNG"
          //     layout="fill"
          //     className="h-16 w-16 border-4"
          //   />
          <img
            src="/img/blank.jpg"
            draggable={true}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          ></img>
        )
      }
    }
    return result
  }

  //Piece
  const piece = () => {
    let pieces = []
    const result = []
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
      console.log("index:", pieces[i])
      let img = "/img/" + pieces[i] + ".jpg"
      result.push(
        //   <Image
        //     src="/img/custom-dummy.PNG"
        //     layout="fill"
        //     className="h-16 w-16 border-4"
        //   />
        <img
          src={img}
          draggable={true}
          onDragStart={dragStart}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
        ></img>
      )
      //DRAG FUNCTIONALITY
      // tile.addEventListener("dragstart", dragStart); //click on image to drag
      // tile.addEventListener("dragover", dragOver);   //drag an image
      // tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
      // tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
      // tile.addEventListener("drop", dragDrop);       //drop an image onto another one
      // tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

      // document.getElementById("pieces").append(tile);
    }
    return result
  }
  //DRAG TILES
  function dragStart(e: any) {
    console.log("dragStart", e)
    console.log("dragStart", e.target.src)
    //curTile : = this; //this refers to image that was clicked on for dragging
    //setCurTile(this)
  }

  function dragOver(e:any) {
    e.preventDefault()
  }

  function dragEnter(e:any) {
    e.preventDefault()
  }

  function dragLeave() {}

  function dragDrop(e:any) {
    console.log('dragDrop',e)
    
    //otherTile = this; //this refers to image that is being dropped on
   // setOtherTile(this)
  }

  function dragEnd() {
    console.log('dragEnd');
    // if (curTile!.src.includes("blank")) {
    //   return
    // }
    // let currImg = curTile?.src
    // let otherImg = otherTile?.src
    // curTile?.src = otherImg
    // otherTile?.src = currImg

    // setTurns(turns + 1)
    //turns += 1
    //document.getElementById("turns").innerText = turns
  }

  return (
    <div>
      <div id="board">{board()}</div>
      <h2>
        Turns:<span id="turns">0</span>
      </h2>
      <div id="pieces">{piece()}</div>
    </div>
  )
}

export default Puzzle_gameContainer
