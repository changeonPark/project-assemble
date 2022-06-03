import { Layout } from "@base/components"
import { NextPage } from "next"
import PuzzleContainer from "puzzle"

const Puzzle: NextPage = () => {
  return (
    <Layout title="Puzzle" hasHeader>
      <PuzzleContainer />
    </Layout>
  )
}

export default Puzzle
