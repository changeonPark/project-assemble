import { useEffect, useState } from "react"
import { CategoryTab, PuzzleList } from "./components"

export type CategoryType = "NewPicture" | "MyStatus"

const PuzzleContainer = () => {
  const [category, setCategory] = useState<CategoryType>("NewPicture")

  useEffect(() => {
    console.log(category)
  }, [category])

  return (
    <section>
      <div className="mb-5 flex items-center justify-between border-b border-black border-opacity-10 pb-5">
        <div className="w-5/12 lg:w-1/4">
          <CategoryTab onClick={setCategory} />
        </div>
        <div>
          <span>1000</span>
          <span>MY COLLECTION</span>
        </div>
      </div>
      <PuzzleList category={category} />
    </section>
  )
}

export default PuzzleContainer
