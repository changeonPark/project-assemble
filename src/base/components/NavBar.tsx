import { useState } from "react"
import Link from "next/link"
import { cls } from "@base/utils"

import { IconClose, IconMenu } from "@base/icons"
import UserInfo from "./UserInfo"

const NavBar = () => {
  const [toggle, setToggle] = useState<boolean>(false)

  const onClickBtn = () => {
    setToggle(prev => !prev)
  }

  return (
    <>
      <button className="block lg:hidden" onClick={() => onClickBtn()}>
        {toggle ? <IconClose /> : <IconMenu />}
      </button>

      <nav
        className={cls(
          toggle
            ? "fixed top-20 left-0 z-30 block h-screen w-screen bg-[#fdfdfd] bg-opacity-70"
            : "hidden",
          "lg:static lg:block lg:h-fit lg:w-fit"
        )}
      >
        <ul
          className={cls(
            "flex flex-col items-center justify-between font-AeonikL",
            "lg:flex-row lg:justify-center lg:gap-5 lg:text-sm"
          )}
        >
          <li>About</li>
          <li>Gallery</li>
          <li>Customizing</li>
          <li>Puzzle</li>
          <li>
            <Link href="/mint">
              <a>Mint</a>
            </Link>
          </li>
          <li>Buy</li>
          <UserInfo />
        </ul>
      </nav>
    </>
  )
}

export default NavBar
