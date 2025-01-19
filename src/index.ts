import express, { json, urlencoded} from "express"
import productRoutes from "./routes/products/index"
import authRoutes from "./routes/auth/index"
import blogRoutes from "./routes/blogs/index"

const port = 3000

const app = express()

app.use(urlencoded({ extended: false }))

app.use(json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/products", productRoutes)
app.use("/auth", authRoutes)
app.use("/blogs", blogRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
