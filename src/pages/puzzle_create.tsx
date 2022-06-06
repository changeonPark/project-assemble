import { Layout } from "@base/components"
import { NextPage } from "next"
import Puzzle_createContainer from "puzzle_create"

const puzzle_create: NextPage = () => {
  return (
    <Layout title="Customizing" hasHeader>
      <Puzzle_createContainer />
    </Layout>
  )
}

export default puzzle_create
