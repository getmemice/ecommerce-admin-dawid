/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "@/components/Layout"
import axios from "axios"
import { useEffect, useState } from "react"

export default function categories() {
  const [name, setName] = useState("")
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    await axios.get("/api/categories").then((res) => {
      setCategories(res.data)
    })
  }

  async function saveCategory(e) {
    e.preventDefault()
    await axios
      .post("/api/categories", { name, parentCategory })
      .then((res) => {
        setCategories(res.data)
      })
    setName("")
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder={"Category name"}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="">No parent category</option>
          {!!categories.length &&
            categories.map((category, _index) => (
              <option key={_index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
          </tr>
        </thead>
        <tbody>
          {!!categories.length &&
            categories.map((category, _index) => (
              <tr key={_index}>
                <td>{category.name}</td>
                <td>{category.parent}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  )
}
