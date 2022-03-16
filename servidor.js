const express = require("express")
const productos = require("./productos.js")
const app = express()
const { Router } = express
const router = Router()
const products = require("./productos.js")


app.use(express.static('public'));
app.use(express.json()) // para poder usar el .body
app.use(express.urlencoded({extended: true}))// para poder usar el .body

app.listen(8080, ()=> {
    console.log("Listening to server")
})

app.on("error", ()=> {console.log("Server error")})

app.use("/api/productos", router)

router.get("", (req, res)=> {
    res.send(products)
})

router.get("/:id", (req, res)=> {
    const id = req.params.id
    if (products.length < id || id < 1) {
        res.send({error: "producto no encontrado"})
    }else{
        res.send(products[id-1])
    }
})

router.post("", (req, res)=> {
    const producto = req.body
    producto.id = productos.length + 1
    products.push(producto)
    res.send({producto: producto, id: producto.id})
})

router.put("/:id", (req, res) => {
    const producto = req.body
    const id = req.params.id
    products[id-1] = producto
    producto.id = id
    res.send({producto: producto, id: producto.id})     
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    const productos = products.filter((i)=> i.id != id)
    console.log(productos)
    res.send("ok")
})