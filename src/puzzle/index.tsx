import { useEffect, useState } from "react"
import { CategoryTab, PuzzleList } from "./components"
import Router, { useRouter } from "next/router"

export type CategoryType = "NewPicture" | "MyStatus"

const PuzzleContainer = () => {
  const [category, setCategory] = useState<CategoryType>("NewPicture")
  const router = useRouter()

  useEffect(() => {
    console.log(category)
  }, [category])

  const goPuzzleCreatePage = () => {
    console.log("clicked")
    router.push("/puzzle_create")
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between border-b border-black border-opacity-10 pb-5">
        <div className="w-5/12 lg:w-1/4">
          <CategoryTab onClick={setCategory} />
        </div>
        <div>
          <button
            className="mt-10 block bg-gray-800 py-3 px-4 text-lg uppercase text-white hover:bg-gray-900"
            onClick={() => goPuzzleCreatePage()}
          >
            Upload
          </button>
        </div>
      </div>
      <PuzzleList category={category} />
    </section>
  )
}

export default PuzzleContainer
