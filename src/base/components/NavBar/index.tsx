import { useState } from "react"
import Link from "next/link"
import { cls } from "@base/utils"

import { IconClose, IconMenu } from "@base/icons"
import UserInfo from "../UserInfo"
import MenuLink from "./MenuLink"

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
          toggle ? "fixed" : "hidden",
          "top-20 left-0 z-30 block h-screen w-screen bg-white bg-opacity-70 font-AeonikB text-xl backdrop-blur-md",
          "lg:static lg:block lg:h-fit lg:w-fit lg:font-AeonikL lg:text-base"
        )}
      >
        <ul
          className={cls(
            "flex flex-col items-center justify-between px-5",
            "lg:flex-row lg:justify-center lg:gap-5 lg:px-0 lg:text-sm"
          )}
        >
          <MenuLink target="About" />
          <MenuLink target="Gallery" />
          <MenuLink target="Customizing" />
          <MenuLink target="Puzzle" />
          <MenuLink target="Mint" />
          <MenuLink target="Buy" />
          <li
            className={cls(
              "w-full border-b border-black border-opacity-20 py-4",
              "lg:border-none lg:py-0"
            )}
          >
            
          </li>
          <UserInfo />
        </ul>
      </nav>
    </>
  )
}

export default NavBar
