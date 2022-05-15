import { cls } from "@base/utils"
import Link from "next/link"
import UserInfo from "./UserInfo"

const NavBar = () => {
  return (
    <nav className="header-nav">
      <ul
        className={cls(
          "font-AeonikL",
          "lg:flex lg:items-center lg:justify-center lg:gap-5 lg:text-sm"
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
  )
}

export default NavBar
