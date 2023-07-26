/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "@/components/Layout"
import axios from "axios"
import { useEffect, useState } from "react"
import { withSwal } from "react-sweetalert2"

export function Categories({ swal }) {
  const [name, setName] = useState("")
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState("")
  const [editedCategory, setEditedCategory] = useState(null)
  const [properties, setProperties] = useState([])

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
    const data = { name, parentCategory }
    if (editedCategory) {
      await axios.put("/api/categories/", { ...data, _id: editedCategory._id })
      setEditedCategory(null)
    } else {
      await axios.post("/api/categories", data)
    }
    setName("")
    setParentCategory("")
    fetchCategories()
  }

  function editCategory(category) {
    setEditedCategory(category)
    setName(category.name)
    setParentCategory(category.parent?._id)
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete category ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete",
        confirmButtonColor: "#e3342f",
        reverseButtons: true,
      })
      .then(async (result) => {
        const _id = category._id
        if (result.isConfirmed) {
          await axios.delete("/api/categories?_id=" + _id, {
            _id,
          })
          fetchCategories()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }]
    })
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={"Category name"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            {!!categories.length &&
              categories.map((category, _index) => (
                <option key={_index} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="text-sm btn-default"
          >
            Add new property
          </button>
        </div>
        <button type="submit" className="py-1 btn-primary">
          Save
        </button>
      </form>
      <table className="mt-4 basic">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {!!categories.length &&
            categories.map((category, _index) => (
              <tr key={_index}>
                <td>{category.name}</td>
                <td>{category.parent?.name}</td>
                <td>
                  <div className="flex">
                    <button
                      onClick={() => editCategory(category)}
                      className="mr-1 btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-primary"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />)
