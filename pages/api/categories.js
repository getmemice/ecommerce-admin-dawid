import { mongooseConnect } from "@/lib/mongoose"
import { Category } from "@/models/Category"

export default async function categories(req, res) {
  const { method } = req

  await mongooseConnect()

  if (method === "GET") {
    res.json(await Category.find().populate("parent"))
  }

  if (method === "POST") {
    const { name, parentCategory, properties } = req.body
    res.json(
      await Category.create({
        name,
        parent: parentCategory || null,
        properties,
      })
    )
  }

  if (method === "PUT") {
    const { _id, name, parentCategory, properties } = req.body
    console.log(req.body)
    res.json(
      await Category.updateOne(
        { _id },
        { name, parent: parentCategory || null, properties }
      )
    )
  }

  if (method === "DELETE") {
    const { _id } = req.query
    console.log(req.query)
    await Category.deleteOne({ _id })
    res.json({ message: "Category deleted" })
  }
}
