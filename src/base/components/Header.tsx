import Logo from "./Logo"
import NavBar from "./NavBar"
import UserInfo from "./UserInfo"
import { cls } from "@base/utils"

const Header = () => {
  return (
    <header
      className={cls(
        "fixed top-0 left-0",
        "lg:flex lg:w-screen lg:justify-between lg:p-8"
      )}
    >
      <Logo />
      <NavBar />
    </header>
  )
}

export default Header
