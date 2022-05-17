import { Header } from "@base/components"
import Head from "next/head"

interface Props {
  title: string
  children: React.ReactNode
  hasHeader?: true
}

const Layout = ({ children, title, hasHeader }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {hasHeader && <Header />}
      <main className="pt-24">{children}</main>
    </>
  )
}

export default Layout
