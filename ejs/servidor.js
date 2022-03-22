const express = require("express")
const Contenedor = require("./class.js")
const app = express()
const { Router } = express
const router = Router()
let products = new Contenedor()


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



app.use(express.static('public'));
app.use(express.json()) // para poder usar el .body
app.use(express.urlencoded({extended: true}))// para poder usar el .body

app.listen(8080, ()=> {
    console.log("Listening to server")
})

app.on("error", ()=> {console.log("Server error")})

app.use("", router)

router.get("/productos", (req, res)=> {
    let productos = products.getAll()
    res.render("list.ejs", { productos })
  
})
router.get("/", (req, res)=> {

	res.render('form.ejs');
})


router.post('/', (req, res) => {
	const { name, price, thumbnail } = req.body;
    console.log("POST")
	products.save({
		name,
		price,
		thumbnail,
	});
    console.log(products)

	res.redirect('/');
});


