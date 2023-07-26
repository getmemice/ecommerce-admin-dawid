import { mongooseConnect } from "@/lib/mongoose"
import { Category } from "@/models/Category"

export default async function categories(req, res) {
  const { method } = req

  await mongooseConnect()

  if (method === "GET") {
    res.json(await Category.find().populate("parent"))
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body
    console.log(req.body)
    res.json(
      await Category.create({ name, parent: parentCategory || undefined })
    )
  }

  if (method === "PUT") {
    const { _id, name, parentCategory } = req.body
    console.log(req.body)
    res.json(
      await Category.updateOne({ _id }, { name, parent: parentCategory })
    )
  }

  if (method === "DELETE") {
    const { _id } = req.query
    console.log(req.query)
    await Category.deleteOne({ _id })
    res.json({ message: "Category deleted" })
  }
}
