import React, { useState, useEffect } from "react"
import Board from "./Board"
import { updateURLParameter } from "./helpers"

const Puzzle_slideContainer = () => {
  const [imgUrl, setImgUrl] = useState("")

  useEffect(() => {
    const urlParams : any = new URLSearchParams(window.location.search)
    if (urlParams.has("img")) {
      setImgUrl(urlParams.get("img"))
    }
  }, [])

  const handleImageChange = (e:any) => {
    setImgUrl(e.target.value)
    window.history.replaceState(
      "",
      "",
      updateURLParameter(window.location.href, "img", e.target.value)
    )
  }

  return (
    <div className="App">
      <h1>React sliding puzzle</h1>
      <Board imgUrl={imgUrl} />
      <input value={imgUrl} onChange={handleImageChange} />
    </div>
  )
}

export default Puzzle_slideContainer
