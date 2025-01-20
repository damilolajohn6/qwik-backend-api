import express, { json, urlencoded} from "express"
import productRoutes from "./routes/products/index.js"
import authRoutes from "./routes/auth/index.js"
import blogRoutes from "./routes/blogs/index.js"
import orderRoutes from "./routes/orders/index.js"
import paymentRoutes from "./routes/paystack/index.js"
import serverless from "serverless-http"
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
app.use("/orders", orderRoutes)
app.use("/payments", paymentRoutes)

if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

export const handler = serverless(app)
