import type { NextPage } from "next"
import { useMoralis } from "react-moralis"
import Link from "next/link";
const Home: NextPage = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()

  const onClickLogin = () => {
    authenticate({
      signingMessage: "여친 소개좀 씨빨아 쫌!",
    })
  }

  return (
    <div className="relative h-screen overflow-hidden bg-indigo-900">
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <header className="absolute top-0 left-0 right-0 z-20">
        <nav className="container mx-auto px-6 py-4 md:px-12">
          <div className="items-center justify-center bg-signature-color md:flex">
            <div className="flex items-center justify-between">
              <div className="md:hidden">
                <button className="text-white focus:outline-none">
                  <svg
                    className="h-12 w-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="hidden items-center md:flex">
              <a href="/" className="mx-3 cursor-pointer text-lg uppercase text-white hover:text-gray-300">
                Ticket
              </a>

              <Link href="/mint" >
                <a className="mx-3 cursor-pointer text-lg uppercase text-white hover:text-gray-300" >MINT</a>
              </Link>
              <Link href="/NFT" >
                <a className="mx-3 cursor-pointer text-lg uppercase text-white hover:text-gray-300"> NFT</a>
             
              </Link>
              <a className="mx-3 cursor-pointer text-lg uppercase text-white hover:text-gray-300">
                Contact
              </a>
            </div>
          </div>
        </nav>
      </header>
      <div className="container relative z-10 mx-auto my-24 flex w-4/5 items-center rounded-lg border-4 border-white py-16 md:my-32">
        <div className="relative z-10 flex w-full flex-col items-center justify-between">
          <p className="flex flex-col items-center text-center text-6xl font-extrabold text-white md:text-8xl">
            Planet need you
          </p>
          <p className="mt-6 flex max-w-lg flex-col items-center text-center text-lg font-extrabold text-white">
            The first European to set eyes on the great river was a Spanish
            explorer, called De Soto, who came across the mouth of the river in
            1541; yet it was not until over a century later that the Mississippi
            river began to take a significant place in the history of North
            America.
          </p>
          {!isAuthenticated ? (
            <button
              className="mt-10 block bg-gray-800 py-3 px-4 text-lg font-bold uppercase text-white hover:bg-gray-900"
              onClick={() => onClickLogin()}
            >
              Login
            </button>
          ) : (
            <button className="mt-10 block bg-gray-800 py-3 px-4 text-lg font-bold uppercase text-white hover:bg-gray-900">
              {user?.get("ethAddress")}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
