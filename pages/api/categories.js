import { mongooseConnect } from "@/lib/mongoose"
import { Category } from "@/models/Category"

export default async function categories(req, res) {
  const { method } = req

  await mongooseConnect()

  if (method === "GET") {
    res.json(await Category.find())
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body
    console.log(req.body)
    res.json(await Category.create({ name, parent: parentCategory }))
  }
}
