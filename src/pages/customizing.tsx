import { Layout } from "@base/components"
import { NextPage } from "next"
import CustoMizingContainer from "customizing"

const Customizing: NextPage = () => {
  return (
    <Layout title="Customizing" hasHeader>
      <CustoMizingContainer/>
    </Layout>
  )
}

export default Customizing
