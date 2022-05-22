import { Layout } from "@base/components"
import GalleryContainer from "gallery"
import { NextPage } from "next"

const Gallery: NextPage = () => {
  return (
    <Layout title="Gallery" hasHeader>
      <GalleryContainer />
    </Layout>
  )
}

export default Gallery
