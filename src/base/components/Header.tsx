import { cls } from "@base/utils"
import Logo from "./Logo"
import NavBar from "./NavBar"

const Header = () => {
  return (
    <header
      className={cls("fixed top-0 left-0 flex w-screen justify-between p-8")}
    >
      <Logo />
      <NavBar />
    </header>
  )
}

export default Header
