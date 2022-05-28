import { Layout } from "@base/components"
import { NextPage } from "next"
import CustomizingContainer from "customizing"

const Customizing: NextPage = () => {
  return (
    <Layout title="Customizing" hasHeader>
      <CustomizingContainer />
    </Layout>
  )
}

export default Customizing
