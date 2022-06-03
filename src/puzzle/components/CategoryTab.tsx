import { Tab } from "@headlessui/react"
import { CategoryType } from "puzzle"
import { Dispatch, SetStateAction } from "react"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
interface Props {
  onClick: Dispatch<SetStateAction<CategoryType>>
}

const tabValues = ["NewPicture", "MyStatus"]

const CategoryTab = ({ onClick }: Props) => {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 font-AeonikB">
        {tabValues.map(item => (
          <Tab
            key={item}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg px-2 py-2 text-sm leading-5 text-black",
                "lg:py-3 lg:text-xl",
                "ring-white ring-opacity-60 ring-offset-1 ring-offset-white focus:outline-none focus:ring-2",
                selected ? "bg-signature shadow" : "hover:bg-white/[0.12]"
              )
            }
            onClick={() => onClick(() => item as CategoryType)}
          >
            {item}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
}

export default CategoryTab
