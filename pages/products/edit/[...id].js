import Layout from "@/components/Layout"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function EditProductPage() {
  const { query } = useRouter()
  const { id } = query
  useEffect(() => {
    axios.get("/api/products?id=" + id).then((response) => {
      console.log(response.data)
    })
  }, [id])
  return (
    <>
      <Layout>edit product from here</Layout>
    </>
  )
}
