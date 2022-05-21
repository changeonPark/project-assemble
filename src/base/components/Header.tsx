import { cls } from "@base/utils"
import Logo from "./Logo"
import NavBar from "./NavBar"

const Header = () => {
  return (
    <header className={cls("fixed top-0 left-0 w-full p-4")}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <Logo />
        <NavBar />
      </div>
    </header>
  )
}

export default Header
