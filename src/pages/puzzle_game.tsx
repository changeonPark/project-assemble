import { Layout } from "@base/components"
import { NextPage } from "next"
import Puzzle_gameContainer from "puzzle_game"
import Puzzle_slideContainer from "puzzle_slide"


const puzzle_game: NextPage = () => {
  return (
    <Layout title="Customizing" hasHeader>
      <Puzzle_gameContainer />
      {/* <Puzzle_slideContainer/> */}
    </Layout>
  )
}

export default puzzle_game
