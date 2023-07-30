/* eslint-disable @next/next/no-img-element */
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Spinner from "./Spinner"
import { ReactSortable } from "react-sortablejs"

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
}) => {
  const [title, setTitle] = useState(existingTitle || "")
  const [description, setDescription] = useState(existingDescription || "")
  const [price, setPrice] = useState(existingPrice || "")
  const [images, setImages] = useState(existingImages || [])
  const [category, setCategory] = useState(existingCategory || "")
  const [goToProducts, setGoToProducts] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [categories, setCategories] = useState([])
  const router = useRouter()

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data)
    })
  }, [])

  async function saveProduct(e) {
    e.preventDefault()
    const data = { title, description, price, images, category }
    if (_id) {
      await axios.put("/api/products", { ...data, _id })
    } else {
      await axios.post("/api/products", data)
    }
    await setGoToProducts(true)
  }

  if (goToProducts) {
    router.push("/products")
  }

  async function uploadImages(e) {
    e.preventDefault()
    const files = e.target?.files

    if (files?.length > 0) {
      setIsUploading(true)
      const data = new FormData()
      for (const file of files) {
        data.append("file", file)
      }
      console.log(data)
      const res = await axios.post("/api/upload", data)
      setImages((oldImages) => [...oldImages, ...res.data.links])
      setIsUploading(false)
    }
  }

  const properties = []

  if (categories.length > 0) {
    const selCatInfo = categories.find(({ _id }) => _id === category)
    console.log(selCatInfo.properties)
  }
  console.log("properties")

  return (
    <>
      <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Uncategorized</option>
          {!!categories.length &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        <label>Photos</label>
        <div className="flex flex-wrap mb-2 gap-1">
          <ReactSortable
            className="flex flex-wrap gap-1"
            list={images}
            setList={setImages}
          >
            {!!images?.length &&
              images.map((link) => (
                <div key={link} className="h-24 ">
                  <img src={link} alt="" className="rounded-md" />
                </div>
              ))}
          </ReactSortable>
          {isUploading && (
            <div className="flex items-center h-24">
              <Spinner />
            </div>
          )}
          <label className="flex items-center justify-center w-24 h-24 text-sm text-gray-500 bg-gray-200 border rounded-lg gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Upload</div>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
          {!images?.length && <div>No photos</div>}
        </div>
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Price (in USD)</label>
        <input
          type="text"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </>
  )
}

export default ProductForm
