import Link from "next/link"

import { cls } from "@base/utils"

interface Props {
  target: "About" | "Gallery" | "Customizing" | "Puzzle" | "Mint"
}

const MenuLink = ({ target }: Props) => {
  return (
    <li
      className={cls(
        "w-full border-b border-black border-opacity-20 py-4",
        "lg:border-none lg:py-0"
      )}
    >
      <Link href={`/${target.toLowerCase()}`}>
        <a className="w-full uppercase">{target}</a>
      </Link>
    </li>
  )
}

// https://opensea.io/
export default MenuLink
