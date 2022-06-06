import { useEffect, useState } from "react"
//import { CategoryTab, PuzzleList } from "./components"
import Router, { useRouter } from "next/router"
import Switch from "react-switch"

export type CategoryType = "NewPicture" | "MyStatus"

const Puzzle_createContainer = () => {
  const [category, setCategory] = useState<CategoryType>("NewPicture")
  const router = useRouter()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  //false : 배포 안함 true : 배포함
  const [DeployFlag, setDeployFlag] = useState(true)
  const [hair, setHair] = useState("")
  const [eye, setEye] = useState("")
  const [nose, setNose] = useState("")
  const [mouth, setMouth] = useState("")


  useEffect(() => {
    console.log(category)

    //Image preview
    //preview()
    // return () => preview()
    preview()
  }, [category, image])

  const preview = () => {
    console.log("preview start")
    if (!image) {
      console.log("image is null")
      return false
    }

    //const imgEl: any = document.querySelector(".img__box")
    const imgEl: any = document.querySelector(".yangtest")

    const reader = new FileReader()

    reader.onload = () => {
      console.log("imgEl:", imgEl)
      // (imgEl.style.backgroundImage = `url(${reader.result})`)
      imgEl.src = `${reader.result}`
      console.log("reader.result:", reader.result)
    }

    reader.readAsDataURL(image[0])
  }

  const createPuzzle = () => {
    console.log("createPuzzle clicked")
    //router.push("/puzzle_create")
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    //Mint 기능 구현
    //이름 , 이미지 , 설명 으로 구현.
    //다른 사람들 에게 배포 할건지 말건지
  }
  //Input File onChange Listener
  const onLoadFile = (e: any) => {
    const file = e.target.files
    console.log(file)
    setImage(file)
    // preview()
  }

  return (
    <section>
      <div className="flex grid grid-cols-1 place-items-center">
        <span className="text-6xl font-bold ">Create New Item</span>
        <span className="mt-7 mb-7 text-xs">Required field</span>
        {/* <div className="img__box">이미지</div> */}
        <form
          className="mr-10 flex grid grid-cols-1 place-content-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="bolder-dashed shrink-0 border-4 border-indigo-500/75">
            <img
              className="yangtest h-80  w-80 object-cover "
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
              alt="Current profile photo"
            />
          </div>

          <label className="block">
            <span className="sr-only">chose file</span>

            <input
              required
              type="file"
              accept="image/png, image/jpeg"
              onChange={onLoadFile}
              className="block w-full text-sm text-slate-500
              file:mr-4 file:rounded-full file:border-0
              file:bg-violet-50 file:py-2
              file:px-4 file:text-sm
              file:font-semibold file:text-violet-700
              hover:file:bg-violet-100
              "
            />
          </label>

          <span className="text-xl font-bold">Name *</span>
          <input
            className="bolder-dashed shrink-0 border-4 border-indigo-500/75"
            type="text"
            id="name"
            name="name"
            required
            onChange={e => setName(e.target.value)}
            placeholder="item Name"
          />

          <span className="text-xl font-bold">Description *</span>
          <textarea
            className="bolder-dashed shrink-0 border-4 border-indigo-500/75"
            //value={this.state.textAreaValue}
            onChange={e => setDescription(e.target.value)}
            rows={5}
            cols={5}
          />

          
          <label htmlFor="material-switch" className="flex items-stretch" >
            <span>Deploy or Private</span>
            <Switch
              checked={DeployFlag}
              onChange={flag => setDeployFlag(flag)}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch "
              id="material-switch"
            />
          </label>

          <button
            className="mt-10 block bg-gray-800 py-3 px-4 text-lg font-bold uppercase text-white hover:bg-gray-900"
            // onClick={() => createPuzzle()}
          >
            Create
          </button>
        </form>
      </div>
    </section>
  )
}

export default Puzzle_createContainer
