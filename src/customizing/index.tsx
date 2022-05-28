import { useEffect, useState } from "react"
import { CategoryTab } from "./components"
import CutomizingList from "./components/CutomizingList"

export type CategoryType = "PIECE" | "MASTERPIECE"

const CustoMizingContainer = () => {
  const [category, setCategory] = useState<CategoryType>("PIECE")

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
      <CutomizingList category={category} />
    </section>
  )
}

export default CustoMizingContainer
