import Layout from "@/components/Layout"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const DeleteProduct = () => {
  const router = useRouter()
  const [productInfo, setProductInfo] = useState()
  const { id } = router.query

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data)
    })
  }, [id])

  function goBack() {
    router.push("/products")
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id).then((response) => {
      console.log(response.data)
      goBack()
    })
  }

  return (
    <>
      <Layout>
        <h1 className="text-center">
          Do you want really to delete &nbsp;"{productInfo?.title}"?
        </h1>
        <div className="flex justify-center gap-2">
          <button className="btn-red" onClick={deleteProduct}>
            Yes
          </button>
          <button className="btn-default" onClick={goBack}>
            No
          </button>
        </div>
      </Layout>
    </>
  )
}

export default DeleteProduct
