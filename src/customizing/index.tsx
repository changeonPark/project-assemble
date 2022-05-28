import { useEffect, useState } from "react"
import { CategoryTab, CustomizingList } from "./components"

export type CategoryType = "PIECE" | "MASTERPIECE"

const CustomizingContainer = () => {
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
      <CustomizingList category={category} />
    </section>
  )
}

export default CustomizingContainer
