const express = require("express")
const productos = require("./productos.js")
const Contenedor = require("./class.js")
const app = express()
const { Router } = express
const router = Router()
let products = new Contenedor()


app.use(express.static('public'));
app.use(express.json()) // para poder usar el .body
app.use(express.urlencoded({extended: true}))// para poder usar el .body

app.listen(8080, ()=> {
    console.log("Listening to server")
})

app.on("error", ()=> {console.log("Server error")})

app.use("/api/productos", router)

router.get("", (req, res)=> {
    let productos = products.getAll()
    res.send(productos)
})

router.get("/:id", (req, res)=> {
    let productos = products.getById(parseInt(req.params.id))
    res.send(productos)
})

router.post("", (req, res)=> {
    products.save(req.body)
    res.send({producto: req.body, id: req.body.id})
})

router.put("/:id", (req, res) => {
    let producto = products.replace(req.params.id, req.body)
    res.send({producto: producto, id: producto.id})     
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    res.send({productos: products.delete(id)})
})