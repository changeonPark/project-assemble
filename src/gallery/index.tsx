import { useEffect, useState } from "react"
import { CategoryTab } from "./components"
import GalleryList from "./components/GalleryList"

export type CategoryType = "CUSTOMIZING" | "PUZZLE"

const GalleryContainer = () => {
  const [category, setCategory] = useState<CategoryType>("CUSTOMIZING")

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
      <GalleryList category={category} />
    </section>
  )
}

export default GalleryContainer
