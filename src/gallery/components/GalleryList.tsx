import Image from "next/image"

import { cls } from "@base/utils"
import { CategoryType } from "gallery"

interface Props {
  category: CategoryType
}

const GalleryList = ({ category }: Props) => {
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
                category === "CUSTOMIZING"
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

  //Customizing Piece 

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

export default GalleryList
